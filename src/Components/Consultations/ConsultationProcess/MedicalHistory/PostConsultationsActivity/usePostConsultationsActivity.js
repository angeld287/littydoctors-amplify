import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listMedicalAnalysiss, listSurgicalInterventions, listMedicines } from '../../../../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';


const usePostConsultationsActivity = (global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ error, setError ] = useState(false);
    let { consultation, patient } = useParams();
    const { register, handleSubmit, errors, formState } = useForm();

    const [ _new, setNew ] = useState(global.medicalConsultation.postConsultationsActivity === null);
    const [ _edit, setEdit ] = useState(false);
    const [ editLoading, setEditLoading ] = useState(false);
    const [ api, setApi ] = useState([]);
    const [ items, setItems ] = useState([]);
    const [ table, setTable ] = useState([]);

  useEffect(() => {
        let didCancel = false;
        let api = {};

        const fetch = async () => {
            try {
                const _medicalanalysis = await API.graphql(graphqlOperation(listMedicalAnalysiss, {limit: 400}));
                const _surgicalintervention = await API.graphql(graphqlOperation(listSurgicalInterventions, {limit: 400}));
                const _medications = await API.graphql(graphqlOperation(listMedicines, {limit: 400}));
                
                api = {
                    medicalanalysis: _medicalanalysis.data.listMedicalAnalysiss.items,
                    surgicalintervention: _surgicalintervention.data.listSurgicalInterventions.items,
                    prescriptionmedications: _medications.data.listMedicines.items
                };
                
                setApi(api);
                
                global.medicalHistory.postConsultationActivities = {
                    notEmpty: true,
                    api: api,
                    medicalPrescriptions: {
                        items: [],
                        table: [],
                    },
                };
                setGlobalData(global);
                setLoadingButton(false);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        if (global.medicalHistory.postConsultationActivities.notEmpty !== true) {
            setLoadingButton(true);
            setLoading(true);
            fetch();
        }else{
            const __items = global.medicalHistory.postConsultationActivities.medicalPrescriptions.items;
            const __table = global.medicalHistory.postConsultationActivities.medicalPrescriptions.table;
            setApi(global.medicalHistory.postConsultationActivities.api);
            setItems(__items);
            setTable(__table);
        }

        return () => {
            didCancel = true;
        };
    }, []);
    

    const onSubmit = (i) => {
        setLoading(true);
        createsPhysicalExploration(i);
    }

    const createsPhysicalExploration = async (o) => {
    }

    const editPhysicalExploration = async () => {
    }

    const actions = {
        onSubmit: onSubmit,
        loading: loading,
        error: error,
        register: register,
        handleSubmit: handleSubmit,
        formState: formState
    }

    return { actions, errors, setNew, _new, _edit, setEdit, editLoading, editPhysicalExploration, api, loading};
};

export default usePostConsultationsActivity;