import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { listFamilyHistorys, listNonPathologicalHistorys, listPathologicalHistorys } from '../../../../../graphql/queries';

import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

const usePatientHistory = (global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ error, setError ] = useState(false);
    const { register, handleSubmit, errors, formState } = useForm();

    const [ data, setData ] = useState({});
	const [ test, setTest ] = useState(false);


    useEffect(() => {

    }, []);

    return { data, setData, setTest, test };
    
};

export default usePatientHistory;