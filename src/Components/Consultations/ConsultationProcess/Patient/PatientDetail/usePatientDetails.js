import React,{ useState, useEffect, Fragment } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';
import { listMedicalConsultationsForHistory } from '../../../../../graphql/custom-queries';
import { updatePostConsultActMedAnalysis } from '../../../../../graphql/mutations';
import { MDBIcon, MDBBtn, MDBSpinner, MDBBtnGroup } from 'mdbreact';
import moment from 'moment';
import Swal from 'sweetalert2';

const UsePatientDetails = (childProps, patient, global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingPDF, setLoadingPDF ] = useState(false);
    const [ loadingHistory, setLoadingHistory ] = useState(false);
    const [ PDFModal, setPDFModal ] = useState(false);
    const [ completeResultModal, setCompleteResultModal ] = useState(false);
    const [ resultLoading, setResultLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ patientData, setPatientData ] = useState({});
    const [ data, setData ] = useState([]);
    const [ lastMC, setlastMC ] = useState([]);
    const [ analysis, setanalysis ] = useState([]);
    const [ analysisToEdit, setAnalysisToEdit] = useState({});
    const [ pdfFile, setPdfFile] = useState([]);

    useEffect(() => {
        let didCancel = false;
        var _patientData = {};

        const fetch = async () => {
            
            try {
                if (global.consultationsHistory !== true) {

                    setLoading(true);
                    setLoadingHistory(true);

                    const filtermc = {
                        filter: {
                          and: [
                            {doctorname: {eq: childProps.state.doctorusername}}, 
                            {patientname: {eq: patient.username}},
                            {state: {eq: "DONE"}},
                          ]
                        },
                        limit: 400
                    };

                    const listmc = await API.graphql(graphqlOperation(listMedicalConsultationsForHistory, filtermc)).catch((err) => { console.log("Ocurrio un error: ",err); setLoadingHistory(false); setLoading(false); });   
                    const rows = [];
                    var number = 0;
                    var items = listmc.data.listMedicalConsultations.items.sort((a,b) => { return new Date(b.startedAt) - new Date(a.startedAt)});
                    var medicalAnalysis = items.length > 0 ? items[0].postConsultationsActivity !== null ? items[0].postConsultationsActivity.medicalAnalysis.items : null : null;
                    if(items.length > 0){global.pendingAnalysis = medicalAnalysis};

                    items.forEach(e => {
                        number = number + 1;
                        var str = e.medicalHistory.reason;
                        var row = { 
                                    number: number, 
                                    date: moment(e.createdAt).format('DD - MM - YYYY'), 
                                    reason: e.medicalHistory === null ? "N/A" : str.length < 40 ? str : str.substring(1, 40)+"..." 
                                };
                        rows.push(row);
                    });

                    const data = {
                        columns: [
                            {label: <MDBIcon size="2x" icon="history" className="blue-text" />, field: 'number' },
                            {label: 'Fecha', field: 'date', width: 150 },
                            {label: 'Razon', field: 'reason', width: 270 }
                        ],
                        rows: rows
                    };

                    if(items.length > 0){setAnalysisList(medicalAnalysis);}

                    setData(data);
                    global.consultationsHistory = true;
                    global.consultationsHistoryData = data;
                    setGlobalData(global);
                    setLoadingHistory(false);
                    setLoading(false);
                }else{
                    setData(global.consultationsHistoryData);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
                setLoadingHistory(false);
                setLoading(false);
                setError(true);
            }

            if (!didCancel) {
                setPatientData(_patientData);
                setLoading(false);
            }
        };

        fetch();

        return () => {
            didCancel = true;
        };
    }, []);


    const setAddResultData = (e) => {
        setAnalysisToEdit(e);
        setCompleteResultModal(true);
    }

    const sortAlph = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (b.name > a.name) {
            return 1;
        }
        return 0;
    }

    const setAnalysisList = (items) => {
        const rowa = [];
        var number = 0;
        if (items !== null) {
            items.sort(sortAlph).forEach(e => {
                const attachBtn = (<MDBBtn social="tw" floating size="sm" onClick={(ev) => {ev.preventDefault(); openPDFModal(e)}} ><MDBIcon icon="paperclip" size="2x" /></MDBBtn>);
                const delteBtn = (<MDBBtn social="gplus" floating size="sm" onClick={(ev) => {ev.preventDefault(); deletePDF(e)}} ><MDBIcon icon="trash" size="2x" /></MDBBtn>);
                number = number + 1;
                
                var row = { 
                            number: number, 
                            name: e.medicalAnalysis.name, 
                            state: e.state === "INSERTED" ? "PENDIENTE" : "LISTO",
                            actions: (<MDBBtnGroup size="sm" className="mb-4">{e.file === null && attachBtn}{e.file !== null && delteBtn}<MDBBtn social="tw" floating size="sm" onClick={(ev) => {ev.preventDefault(); setAddResultData(e)}} ><MDBIcon icon="edit" size="2x" /></MDBBtn></MDBBtnGroup>)
                        };
                rowa.push(row);
            });
        }
       

        const adata = {
            columns: [
                {label: <Fragment><MDBIcon size="2x" icon="syringe" className="blue-text" /></Fragment>, field: 'number' },
                {label: 'Nombre', field: 'name' },
                {label: 'Estado', field: 'state' },
                {label: 'Acciones', field: 'actions' }
            ],
            rows: rowa
        };

        setanalysis(adata)

    }

    const openPDFModal = (e) => {
        setAnalysisToEdit(e);
        setPDFModal(true);
    }

    const putPdfonStorage = async () => {
        setLoadingPDF(true);
        const items = global.pendingAnalysis;

        if(pdfFile[0] !== undefined){
            const filename = "PDF_FILES/"+moment(new Date()).format('YYYYMMDDHHmmSS')+"_"+(analysisToEdit.medicalAnalysis.code).replace(" ","_")+"_"+global.patient.username+".pdf";
            const putpdf = await Storage.put(filename, pdfFile[0], { contentType: 'application/pdf' }).catch( e => {console.log(e); setLoadingPDF(false); throw new SyntaxError("Error Storage"); });
            const i = {id: analysisToEdit.id, state: 'DONE', file: filename}
            const pcama = await API.graphql(graphqlOperation(updatePostConsultActMedAnalysis, {input: i} )).catch( e => {console.log(e); setLoadingPDF(false); throw new SyntaxError("Error Storage"); });

            items.splice(items.findIndex(v => v.id === analysisToEdit.id), 1);
            items.push(pcama.data.updatePostConsultActMedAnalysis);
            global.pendingAnalysis = items;
            setGlobalData(global);
        }

        setTimeout(() => {  
            setAnalysisList(global.pendingAnalysis);
            setLoadingPDF(false);
            setPDFModal(false);
        }, 2000);
    }

    const deletePDF = async (e) => {
        setLoadingPDF(true);
        const result = await Swal.fire({ title: '¿Desea eliminar el archivo pdf?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
        const items = global.pendingAnalysis;
        if (result.value) {
            const putpdf = await Storage.remove(e.file).catch( e => {console.log(e); setLoadingPDF(false); throw new SyntaxError("Error Storage"); });
            const i = {id: e.id, file: null}
            const pcama = await API.graphql(graphqlOperation(updatePostConsultActMedAnalysis, {input: i} )).catch( e => {console.log(e); setLoadingPDF(false); throw new SyntaxError("Error Storage"); });

            items.splice(items.findIndex(v => v.id === e.id), 1);
            items.push(pcama.data.updatePostConsultActMedAnalysis);
            global.pendingAnalysis = items;
            setGlobalData(global);
        }
        setTimeout(() => {  
            setAnalysisList(global.pendingAnalysis);
            setLoadingPDF(false);
        }, 2000);
    }

    return { loadingHistory, data, lastMC, loading, analysis, loadingPDF, PDFModal, setPDFModal, setPdfFile, resultLoading, analysisToEdit, setResultLoading, completeResultModal, setCompleteResultModal, putPdfonStorage };
};

export default UsePatientDetails;