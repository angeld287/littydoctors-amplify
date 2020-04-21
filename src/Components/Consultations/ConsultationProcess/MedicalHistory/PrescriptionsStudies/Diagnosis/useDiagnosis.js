import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listCategorys, listDiseases } from '../../../../../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';


const useDiagnosis = (global, setGlobalData) => {
    const [ loading, setLoading ] = useState(true);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ error, setError ] = useState(false);
    let { consultation, patient } = useParams();
    const { register, handleSubmit, errors, formState } = useForm();

    const [ _new, setNew ] = useState(global.medicalConsultation.medicalHistory.diagnosis === null);
    const [ _edit, setEdit ] = useState(false);
    const [ editLoading, setEditLoading ] = useState(false);
    const [ api, setApi ] = useState([]);

  useEffect(() => {
        let didCancel = false;
        let api = {};

        const fetch = async () => {
            
            try {
                const filter = {
                    filter: {
                        or:[
                            {module: {eq: 'DiagnosisType'}},
                            {module: {eq: 'DiagnosisEvolution'}},
                        ]
                    },
                    limit: 400
                };
                const _diseases = await API.graphql(graphqlOperation(listDiseases, {limit: 400}));
                
                const _categories = await API.graphql(graphqlOperation(listCategorys, filter));

                const type = [];
                _categories.data.listCategorys.items.filter(t => t.module === 'DiagnosisType').sort(sortAlph).forEach(element => {
                    type.push({value: element.id, label: element.name});
                });

                const evolution = [];
                _categories.data.listCategorys.items.filter(t => t.module === 'DiagnosisEvolution').sort(sortAlph).forEach(element => {
                    evolution.push({value: element.id, label: element.name});
                });

                const diseases = [];
                _diseases.data.listDiseases.items.sort(sortAlph).forEach(element => {
                    diseases.push({value: element.id, label: element.name});
                });
                
                
                api = {
                    type: type,
                    evolution: evolution,
                    diseases: diseases
                };
                
                setApi(api);
                
                global.medicalHistory.diagnosis = {
                    notEmpty: true,
                    api: api,
                };

                setGlobalData(global);
                setLoadingButton(false);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        
        if (global.medicalHistory.diagnosis.notEmpty !== true) {
            setLoadingButton(true);
            setLoading(true);
            fetch();
        }else{
            setApi(global.medicalHistory.diagnosis.api);
            setLoadingButton(false);
            setLoading(false);
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

    const sortAlph = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (b.name > a.name) {
            return 1;
        }
        return 0;
    }

    return { actions, errors, setNew, _new, _edit, setEdit, editLoading, editPhysicalExploration, api, loading};
};

export default useDiagnosis;