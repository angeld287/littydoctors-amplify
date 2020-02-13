import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
//import { createMedicalHistory, updateMedicalConsultation } from '../../../../graphql/mutations';

const useNewPhysicalExploration = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    let { consultation, patient } = useParams();
    const { register, handleSubmit, errors, formState } = useForm();


    useEffect(() => {
        let didCancel = false;

        const fetch = async () => {
            try {
                /* API.graphql(graphqlOperation(createMedicalHistory, {input: input}))
                .then((r) => {
                    
                }).catch((err) => { 
                    console.log("Ocurrio un error: ",err); 
                    setError(true) 
                    setLoading(false);
                });  */
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetch();

        return () => {
            didCancel = true;
        };
    }, []);

    const onSubmit = (i) => {
        console.log(i);
    }

    return { onSubmit, loading, error, register, handleSubmit, errors, formState };
};

export default useNewPhysicalExploration;