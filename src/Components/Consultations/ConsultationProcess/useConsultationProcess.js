import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';
import { getPatient } from '../../../graphql/queries';
import { getMedicalConsultation } from '../../../graphql/custom-queries';
import { updateMedicalConsultation } from '../../../graphql/mutations';
import moment from 'moment';

const useConsultationProcess = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ createNewPatient, setCreateNewPatient ] = useState(false);
    const [ hasPatientHistory, setHasPatientHistory ] = useState(false);
    const [ patientHistory, setPatientHistory ] = useState({});
    const [ createNewPatientName, setCreateNewPatientName ] = useState("");
    const [ _reason, setReason ] = useState("");
    const [ formActivePanelChanged, setFormActivePanelChanged ] = useState(false);
    const [ formActivePanel, setFormActivePanel ] = useState(0);
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ patientData, setPatientData ] = useState({});
    const [ consultationObject, setConsultationObject ] = useState({});
    const [ global, setGlobal ] = useState({});

    let { consultation, patient } = useParams();

    const swapFormActive = (param) => (e) => {
        if (!createNewPatient) {
            setFormActivePanelChanged(true);
            setFormActivePanel(param);
        }
    }

    const handleNextPrevClick = (param) => (e) => {
        if (!createNewPatient) {
            setFormActivePanelChanged(true);
            setFormActivePanel(param);
        }
    }

    const handleSubmission = async () => {
        setLoadingButton(true);
        const input = { 
            id: global.medicalConsultation.id,
            state: 'DONE',
            finalizedAt: String(moment(new Date).format('YYYY-MM-DDTHH:mm:ss.SSS')),
        };
        const cmh = await API.graphql(graphqlOperation(updateMedicalConsultation, {input: input} )).catch( e => { console.log(e); setLoadingButton(false); throw new SyntaxError("Error GraphQL");});
        window.location.href = "/consultations";
        setLoadingButton(false);
    }

    const calculateAutofocus = () => {
        if (formActivePanelChanged) {
            return true
        }
    }

    const setGlobalData = (object) => {
        setGlobal(object);
    }

    useEffect(() => {
        let didCancel = false;
        var _patientData = {};
        var _consultation = {}

        const fetch = async () => {
            try {
                setFormActivePanel(1);
                if (consultation === "null") {
                    setCreateNewPatient(true);
                    setCreateNewPatientName(patient);
                    setReason(localStorage.getItem('consultationReason'));
                    setLoading(false);
                }else{
                    API.graphql(graphqlOperation(getMedicalConsultation, { id: consultation}))
                    .then((r) => {

                        const patientHistory = {
                            notEmpty: false,
                        };

                        const medicalHistory = {
                            data: r.data.getMedicalConsultation.medicalHistory,
                            postConsultationActivities: {
                                notEmpty: false,
                            },
                            diagnosis: {
                                notEmpty: false,
                            }
                        };
                        
                        setGlobal({
                            consultationid: consultation,
                            patientid: patient,
                            patient: r.data.getMedicalConsultation.patient,
                            medicalHistory: medicalHistory,
                            patientHistory: patientHistory,
                            medicalConsultation: r.data.getMedicalConsultation,
                            pendingAnalysis: [],
                            pendingAnalysisFields: [],
                            regionalExplorationFields: [],
                            regionalExplorationFieldsLoaded: false,
                            consultationsHistory: false,
                            consultationsHistoryData: {
                                medicalHistoryItems: []
                            },
                        });
                        setHasPatientHistory(r.data.getMedicalConsultation.patient.patientHistory.items.length === 0 ? false : true);
                        setPatientData(r.data.getMedicalConsultation.patient);
                        setConsultationObject(r.data.getMedicalConsultation);
                        let _consultation = r.data.getMedicalConsultation;
                        setLoading(false);                        
                        //global.patient.PatientHistory
                    })
                    .catch((err) => { 
                        console.log("Ocurrio un error: ",err);
                        setLoading(false);
                        setError(true);
                    })
                }
            } catch (err) {
                console.log("Ocurrio un error: ",err);
                setLoading(false);
                setError(true);
            }

            if (!didCancel) {
                setPatientData(_patientData);
                setConsultationObject(_consultation);
                //setLoading(false);
            }
        };

        fetch();

        return () => {
            didCancel = true;
        };
    }, []);

    return { consultationObject, setGlobalData, global, error, loading, swapFormActive, handleNextPrevClick, handleSubmission, calculateAutofocus, selectedDate, setSelectedDate, patientData,
             formActivePanelChanged, setFormActivePanelChanged, formActivePanel, setFormActivePanel, createNewPatient, createNewPatientName, setCreateNewPatient,
             setHasPatientHistory, hasPatientHistory, patientHistory, setPatientHistory, _reason, loadingButton  };
};

export default useConsultationProcess;
