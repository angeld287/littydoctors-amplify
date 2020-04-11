import React,{ useState, useEffect, Fragment } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';
import { listMedicalConsultationsForHistory } from '../../../../../graphql/custom-queries';
import { updatePostConsultActMedAnalysis } from '../../../../../graphql/mutations';
import { MDBIcon, MDBBtn, MDBSpinner } from 'mdbreact';
import moment from 'moment';

const UsePatientDetails = (childProps, patient, global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingAnal, setLoadingAnal ] = useState(false);
    const [ loadingHistory, setLoadingHistory ] = useState(false);
    const [ completeResultModal, setCompleteResultModal ] = useState(false);
    const [ resultLoading, setResultLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ patientData, setPatientData ] = useState({});
    const [ data, setData ] = useState([]);
    const [ lastMC, setlastMC ] = useState([]);
    const [ analysis, setanalysis ] = useState([]);
    const [ pdfFile, setPdfFile] = useState([]);
    const [ analysisToEdit, setAnalysisToEdit] = useState({});

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

    const setAnalysisList = (items) => {
        const rowa = [];
        var number = 0;
        if (items !== null) {
            items.sort().forEach(e => {
                number = number + 1;
                
                var row = { 
                            number: number, 
                            name: e.medicalAnalysis.name, 
                            state: e.state === "INSERTED" ? "PENDIENTE" : "LISTO",
                            actions: e.state === "INSERTED" ? (<Fragment><MDBBtn social="tw" floating size="sm" onClick={(ev) => {ev.preventDefault(); setAddResultData(e)}} ><MDBIcon icon="edit" size="2x" /></MDBBtn></Fragment>) : "N/A"
                        };
                rowa.push(row);
            });
        }
       

        const adata = {
            columns: [
                {label: <Fragment>{!loadingAnal && <MDBIcon size="2x" icon="syringe" className="blue-text" />}{loadingAnal && <MDBSpinner small/>}</Fragment>, field: 'number' },
                {label: 'Nombre', field: 'name' },
                {label: 'Estado', field: 'state' },
                {label: 'Acciones', field: 'actions' }
            ],
            rows: rowa
        };

        setanalysis(adata)

    }

    const addResultData = () => {
        if(pdfFile[0] !== undefined){putPdfonStorage();}
    }

    const putPdfonStorage = async () => {
        const filename = "PDF_FILES/"+moment(new Date()).format('YYYYMMDDHHmmSS')+"_"+(analysisToEdit.medicalAnalysis.name).replace(" ","_")+"_"+patient.username+".pdf";
        
        const putpdf = await Storage.put(filename, pdfFile[0], { contentType: 'application/pdf' }).catch( e => {console.log(e); setResultLoading(false); throw new SyntaxError("Error GraphQL"); });
        console.log(putpdf.key);
    }

    const setDone = async (id) => {
        setLoadingAnal(true);
        
        const items = global.pendingAnalysis;
        const input = {};
        input.id = id;
        input.state = 'DONE';
        const pcama = await API.graphql(graphqlOperation(updatePostConsultActMedAnalysis, {input: input} )).catch( e => {console.log(e); setLoadingAnal(false); throw new SyntaxError("Error GraphQL"); });
        
        items.splice(items.findIndex(v => v.id === id), 1);
        items.push(pcama.data.updatePostConsultActMedAnalysis);
        global.pendingAnalysis = items;
        setGlobalData(global);
        setLoadingAnal(false);
    }

    return { loadingHistory, data, lastMC, loading, analysis, setDone, loadingAnal, completeResultModal, setCompleteResultModal, setPdfFile, resultLoading, addResultData, analysisToEdit };
};

export default UsePatientDetails;