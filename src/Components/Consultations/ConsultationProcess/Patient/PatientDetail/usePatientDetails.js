import React,{ useState, useEffect, Fragment } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';
import { listMedicalConsultationsForHistory } from '../../../../../graphql/custom-queries';
import { updatePostConsultActMedAnalysisForGlobal } from '../../../../../graphql/custom-mutations'; 
import { MDBIcon, MDBBtn, MDBSpinner, MDBBtnGroup } from 'mdbreact';
import moment from 'moment';
import Swal from 'sweetalert2';

import TooltipButton from '../../../../TooltipButton';

const UsePatientDetails = (childProps, patient, global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingPDF, setLoadingPDF ] = useState(false);
    const [ loadingHistory, setLoadingHistory ] = useState(false);
    const [ PDFModal, setPDFModal ] = useState(false);
    const [ completeResultModal, setCompleteResultModal ] = useState(false); 
    const [ editResultModal, setEditResultModal ] = useState(false);
    const [ resultLoading, setResultLoading ] = useState(false);
    const [ editResultLoading, setEditResultLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ patientData, setPatientData ] = useState({});
    const [ data, setData ] = useState([]);
    const [ lastMC, setlastMC ] = useState([]);
    const [ analysis, setanalysis ] = useState([]);
    const [ analysisToEdit, setAnalysisToEdit] = useState({});
    const [ analysisToEditPDF, setAnalysisToEditPDF] = useState({});
    const [ pdfFile, setPdfFile] = useState([]);
    const [ date, setDate ] = useState(null);

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
                    setAnalysisList(global.pendingAnalysis);
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

    const setEditResultData = (e) => {
        setAnalysisToEdit(e);
        setEditResultModal(true);
    }

    const sortAlph = (a, b) => {
        if (a.medicalAnalysis.name < b.medicalAnalysis.name) {
            return -1;
        }
        if (b.medicalAnalysis.name > a.medicalAnalysis.name) {
            return 1;
        }
        return 0;
    }

    const loadingIcon = (<div className="spinner-grow spinner-grow-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>);

    const setAnalysisList = (items) => {
        const rowa = [];
        var number = 0;
        if (items !== null) {
            items.sort(sortAlph).forEach(e => {

                const editItem = (e.results.items.length > 0);
                const attachBtn = (<MDBBtn disabled={loadingPDF} social="tw" floating size="sm" onClick={(ev) => {ev.preventDefault(); openPDFModal(e)}} ><MDBIcon icon="paperclip" size="2x" /></MDBBtn>);
                const showPdf = (<MDBBtn disabled={loadingPDF} social="slack" floating size="sm" onClick={(ev) => {ev.preventDefault(); openPDF(e)}} ><MDBIcon icon="external-link-alt" size="2x" /></MDBBtn>);
                const delteBtn = (<MDBBtn disabled={loadingPDF} social="gplus" floating size="sm" onClick={(ev) => {ev.preventDefault(); deletePDF(e)}}><MDBIcon icon="unlink" size="2x" /></MDBBtn>);
                const addBtn = (<MDBBtn social="tw" floating size="sm" onClick={(ev) => {ev.preventDefault(); setAddResultData(e)}} ><MDBIcon icon="plus" size="2x" /></MDBBtn>);
                const editBtn = (<MDBBtn social="so" floating size="sm" onClick={(ev) => {ev.preventDefault(); setEditResultData(e)}} ><MDBIcon icon="edit" size="2x" /></MDBBtn>);

                const tooltipatt = (<TooltipButton helperMessage={"Anexar Pdf"} component={attachBtn} placement="top"/>);
                const tooltipshow = (<TooltipButton helperMessage={"Abrir Pdf"} component={showPdf} placement="top"/>);
                const tooltipdel = (<TooltipButton helperMessage={"Borrar Pdf"} component={delteBtn} placement="top"/>);
                const tooltipadd = (<TooltipButton helperMessage={"Agregar Resultados Graficables"} component={addBtn} placement="top"/>);
                const tooltipedit = (<TooltipButton helperMessage={"Editar Resultados Graficables"} component={editBtn} placement="top"/>);
                
                number = number + 1;
                
                var row = { 
                            number: number, 
                            name: e.medicalAnalysis.name, 
                            state: e.state === "INSERTED" ? "PENDIENTE" : "LISTO",
                            data: moment(e.date).format('DD - MM - YYYY'),
                            actions: (<MDBBtnGroup size="sm" className="mb-4">{e.file === null && tooltipatt}{e.file !== null && tooltipshow}{e.file !== null && tooltipdel}{!editItem && tooltipadd}{editItem && tooltipedit}</MDBBtnGroup>)
                        };
                rowa.push(row);
            });
        }
       

        const adata = {
            columns: [
                {label: <Fragment><MDBIcon size="2x" icon="syringe" className="blue-text" /></Fragment>, field: 'number' },
                {label: 'Nombre', field: 'name' },
                {label: 'Estado', field: 'state' },
                {label: 'Fecha', field: 'date' },
                {label: 'Acciones', field: 'actions' }
            ],
            rows: rowa
        };

        setanalysis(adata)

    }

    const openPDFModal = (e) => {
        setAnalysisToEditPDF(e);
        setPDFModal(true);
    }

    const putPdfonStorage = async () => {
        if (date === null) {
            Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Favor completar la fecha en la que se realizo el examen medico',
                    showConfirmButton: false,
                    timer: 1500
            });
            return
        }

        setLoadingPDF(true);
        const items = global.pendingAnalysis;
        const i = {id: analysisToEditPDF.id, state: 'DONE', date: date}

        if(pdfFile[0] !== undefined){
            if (pdfFile[0].type === "application/pdf") {
                const filename = "PDF_FILES/"+moment(new Date()).format('YYYYMMDDHHmmSS')+"_"+(analysisToEditPDF.medicalAnalysis.code).replace(" ","_")+"_"+global.patient.username+".pdf";
                const putpdf = await Storage.put(filename, pdfFile[0], { contentType: 'application/pdf' }).catch( e => {console.log(e); setLoadingPDF(false); throw new SyntaxError("Error Storage"); });
                i.file = filename;
            }else{
                Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'El tipo de archivo debe ser pdf',
                        showConfirmButton: false,
                        timer: 1500
                });
                setLoadingPDF(false);
                return
            }
        }

        const pcama = await API.graphql(graphqlOperation(updatePostConsultActMedAnalysisForGlobal, {input: i} )).catch( e => {console.log(e); setLoadingPDF(false); throw new SyntaxError("Error Storage"); });

        items.splice(items.findIndex(v => v.id === analysisToEditPDF.id), 1);
        items.push(pcama.data.updatePostConsultActMedAnalysis);
        global.pendingAnalysis = items;
        setGlobalData(global);

        setTimeout(() => {  
            setAnalysisList(global.pendingAnalysis);
            setDate(null);
            setLoadingPDF(false);
            setPDFModal(false);
        }, 2000);
    }

    const deletePDF = async (e) => {
        const result = await Swal.fire({ title: '¿Desea eliminar el archivo pdf?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
        const items = global.pendingAnalysis;
        if (result.value) {
            setLoadingPDF(true);
            const putpdf = await Storage.remove(e.file).catch( e => {console.log(e); setLoadingPDF(false); throw new SyntaxError("Error Storage"); });
            const i = {id: e.id, file: null}
            const pcama = await API.graphql(graphqlOperation(updatePostConsultActMedAnalysisForGlobal, {input: i} )).catch( e => {console.log(e); setLoadingPDF(false); throw new SyntaxError("Error Storage"); });

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

    const openPDF = async (e) => {
        const file = await Storage.get(e.file);
        var win = window.open(file, '_blank');
        win.focus();
    }

    return { setDate, editResultLoading, setEditResultLoading, editResultModal, setEditResultModal, setAnalysisList, loadingHistory, data, lastMC, loading, analysis, loadingPDF, loadingIcon, PDFModal, setPDFModal, setPdfFile, resultLoading, analysisToEdit, setResultLoading, completeResultModal, setCompleteResultModal, putPdfonStorage };
};

export default UsePatientDetails;