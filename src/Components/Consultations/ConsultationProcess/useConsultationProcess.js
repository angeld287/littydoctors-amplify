import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';


const useConsultationProcess = () => {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ formActivePanelChanged, setFormActivePanelChanged ] = useState(false);
    const [ formActivePanel, setFormActivePanel ] = useState(0);
    let { patient } = useParams();

    const swapFormActive = (param) => (e) => {
        setFormActivePanelChanged(true);
        setFormActivePanel(param)
    }

    const handleNextPrevClick = (param) => (e) => {
        setFormActivePanelChanged(true)
        setFormActivePanel(param)
    }

    const handleSubmission = () => {
        alert('Form submitted!');
    }

    const calculateAutofocus = () => {
        if (formActivePanelChanged) {
            return true
        }
    }

    useEffect(() => {
        let didCancel = false;

        const createMedicalConsultation = async () => {

            try {
                setFormActivePanel(0)
            } catch (error) {
                setLoading(false);
                setError(true);
            }

            if (!didCancel) {
                setLoading(false);
            }
        };

        createMedicalConsultation();

        return () => {
            didCancel = true;
        };
    }, []);

    return { error, loading, swapFormActive, handleNextPrevClick, handleSubmission, calculateAutofocus, 
             formActivePanelChanged, setFormActivePanelChanged, formActivePanel, setFormActivePanel  };
};

export default useConsultationProcess;