import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import useForm from 'react-hook-form';
//import { } from '../../../../../../../graphql/queries';
//import { } from '../../../../../../../graphql/mutations';
//import {  } from '../../../../../../../graphql/custom-mutations';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

import { Template } from '../../../../../../Reports/Prescriptions/Template_1';

import moment from 'moment';

import jspdf from 'jspdf';

const useViewDiagnosis = (global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const { register, handleSubmit, errors, formState } = useForm();

    useEffect(() => {
    }, []);

   


    return { register, loading, handleSubmit, formState };
};

export default useViewDiagnosis;
