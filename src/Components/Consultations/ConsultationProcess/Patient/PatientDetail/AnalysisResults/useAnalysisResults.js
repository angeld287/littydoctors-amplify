import React,{ useState, useEffect, Fragment } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';
import { listMedicalConsultationsForHistory } from '../../../../../../graphql/custom-queries';
import { updatePostConsultActMedAnalysis } from '../../../../../../graphql/mutations';
import { MDBIcon, MDBBtn, MDBSpinner } from 'mdbreact';
import moment from 'moment';

const useAnalysisResults = (results) => {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(true);

    useEffect(() => {
        let didCancel = false;

        const fetch = async () => {

            if (!didCancel) {
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

export default useAnalysisResults;