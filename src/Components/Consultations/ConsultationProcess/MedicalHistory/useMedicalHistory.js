import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { createMedicalHistory, updateMedicalConsultation } from '../../../../graphql/mutations';

const useMedicalHistory = (childProps, patientData) => {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    let { consultation, patient } = useParams();

    useEffect(() => {
        let didCancel = false;

        const fetch = async () => {
            try {
                const input= {
                    reason: "data",
                    doctor: childProps.state.doctorusername,
                    secretary: childProps.state.secretary,
                    patientname: patientData.username,
                    medicalHistoryPatientId: patientData.id
                };
                
                API.graphql(graphqlOperation(createMedicalHistory, {input: input}))
                .then((r) => {
                    const object = {
                        id: consultation,
                        medicalConsultationMedicalHistoryId: r.data.createMedicalHistory.id
                    };

                    API.graphql(graphqlOperation(updateMedicalConsultation, {input: object}))
                    .then((r) => {
                        setLoading(false);
                    }).catch((err) => { 
                        console.log("Ocurrio un error: ",err);
                        setError(true) 
                        setLoading(false);
                    });
                }).catch((err) => { 
                    console.log("Ocurrio un error: ",err); 
                    setError(true) 
                    setLoading(false);
                });
                
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

    return { loading, error };
};

export default useMedicalHistory;