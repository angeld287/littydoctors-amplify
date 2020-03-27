import React,{ useState, useEffect, Fragment } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';
import { listMedicalConsultationsForHistory } from '../../../../../graphql/custom-queries';
import { updatePostConsultActMedAnalysis } from '../../../../../graphql/mutations';
import { MDBIcon, MDBBtn, MDBSpinner } from 'mdbreact';
import moment from 'moment';

const UsePatientDetails = (childProps, patient, global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingAnal, setLoadingAnal ] = useState(false);
    const [ loadingHistory, setLoadingHistory ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ patientData, setPatientData ] = useState({});
    const [ data, setData ] = useState([]);
    const [ lastMC, setlastMC ] = useState([]);
    const [ analysis, setanalysis ] = useState([]);

    useEffect(() => {
        let didCancel = false;
        var _patientData = {};

        const fetch = async () => {
            setLoading(true);
            try {
                if (global.consultationsHistory !== true) {
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
                    var items = listmc.data.listMedicalConsultations.items.sort((a,b) => { return new Date(b.createdAt) - new Date(a.createdAt)});

                    global.pendingAnalysis = items[0].postConsultationsActivity.medicalAnalysis.items;

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

                    setAnalysisList(items[0].postConsultationsActivity.medicalAnalysis.items);
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
            } catch (error) {
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

    const setAnalysisList = (items) => {
        const rowa = [];
        var number = 0;
        items.sort().forEach(e => {
            number = number + 1;
            
            var row = { 
                        number: number, 
                        name: e.medicalAnalysis.name, 
                        //state: e.state === "INSERTED" ? "PENDIENTE" : "LISTO",
                        //actions: e.state === "INSERTED" ? (<Fragment><MDBBtn size="sm" onClick={(ev) => {ev.preventDefault(); setDone(e.id) }}>Entregado</MDBBtn></Fragment>) : "N/A"
                    };
            rowa.push(row);
        });

        const adata = {
            columns: [
                {label: <Fragment>{!loadingAnal && <MDBIcon size="2x" icon="syringe" className="blue-text" />}{loadingAnal && <MDBSpinner small/>}</Fragment>, field: 'number' },
                {label: 'Nombre', field: 'name' },
                //{label: 'Estado', field: 'state' },
                //{label: 'Acciones', field: 'actions' }
            ],
            rows: rowa
        };

        setanalysis(adata)

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

    return { loadingHistory, data, lastMC, loading, analysis, setDone, loadingAnal };
};

export default UsePatientDetails;