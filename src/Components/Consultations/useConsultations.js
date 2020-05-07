import React, { useState, useEffect } from 'react';
import {listPatients} from './../../graphql/queries';
import { createMedicalConsultation, createMedicalHistory, createPatient } from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { filterByValue } from '../../Functions/filterArray';
import moment from 'moment';
import Link from '@material-ui/core/Link';

import awsmobile from '../../aws-exports'


const useConsultations = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadingSearch, setLoadingSearch ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ patients, setPatients ] = useState([]);
    const [ patient, setPatient ] = useState({});
    const [ cognitoPatient, setCognitoPatient ] = useState({});
    const [ autoCompleteLoading, setAutoCompleteLoading ] = useState(false);
    const [ newPatientName, setNewPatientName ] = useState("");
    const [ inputValue, setInputValue ] = useState("");
    const [ newPatient, setNewPatient ] = useState(false);
    const [ reason, setReason ] = useState("");
    const [ name, setName ] = useState("");

    const apiOptions = {
        headers: {'Content-Type': 'application/json' },
        body: { UserPoolId: awsmobile.aws_user_pools_id }
    };

    useEffect(() => {
        let didCancel = false;

        const fetchPatients = async () => {
            var _patients = [];
            var _patient = {
                name: "N/A",
                age: "00", 
                image: "https://asociaciondenutriologia.org/img/default_user.png", 
                email: "N/A", 
                phone: "N/A"
            }

            try {
                
                var patientsApi = await API.graphql(graphqlOperation(listPatients));
                
                if(patientsApi.data.listPatients.items.length > 0){
                    patientsApi.data.listPatients.items.forEach(element => {
                        const pdata = {value: element.id, label: element.name, id: element.id, name: element.name, age: element.age, image: "https://asociaciondenutriologia.org/img/default_user.png", email: element.email, phone: element.phone, username: element.username};
                        _patients.push(pdata);
                    });
                }else{
                    _patients = [
                        {id:"1", name: "Bartolo Antonio de Jesús Valerio", value:"1", label: "Bartolo Antonio de Jesús Valerio", age: "34", image: "https://www.morpht.com/sites/morpht/files/styles/landscape/public/dalibor-matura_1.jpg", email: "bjesus@gmail.com", phone: "809-232-3344"},
                        {id:"2", name: "Bernarda Abreu Santos", value:"2", label: "Bernarda Abreu Santos", age: "28", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOHBYH5MlqZjhBsNIZTm66VE7nCfsyuat9wUEi8wIgzlbVJ2E&s", email: "babreu@gmail.com", phone: "829-345-2288"},
                        {id:"3", name: "Damaris María Amparo", value:"3", label: "Damaris María Amparo", age: "25", image: "https://www.attractivepartners.co.uk/wp-content/uploads/2017/06/profile.jpg", email: "bjesus@gmail.com", phone: "809-455-3344"},
                        {id:"4", name: "Danilo Miguel Gil Burgos", value:"4", label: "Danilo Miguel Gil Burgos", age: "29", image: "https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg", email: "dgil@gmail.com", phone: "809-232-3344"},
                        {id:"5", name: "Erickson Miguel Moronta Santos", value:"5", label: "Erickson Miguel Moronta Santos", age: "34", image: "https://www.morpht.com/sites/morpht/files/styles/landscape/public/dalibor-matura_1.jpg", email: "bjesus@gmail.com", phone: "809-232-3344"},
                        {id:"6", name: "Dayana Miguelina Mena Gil", value:"6", label: "Dayana Miguelina Mena Gil", age: "28", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOHBYH5MlqZjhBsNIZTm66VE7nCfsyuat9wUEi8wIgzlbVJ2E&s", email: "babreu@gmail.com", phone: "829-345-2288"},
                        {id:"7", name: "Jaqueline Inmaculada Ovalles Valentín", value:"7", label: "Jaqueline Inmaculada Ovalles Valentín", age: "25", image: "https://www.attractivepartners.co.uk/wp-content/uploads/2017/06/profile.jpg", email: "bjesus@gmail.com", phone: "809-455-3344"},
                        {id:"8", name: "Félix Blanco", value:"8", label: "Félix Blanco", age: "29", image: "https://www.evolutionsociety.org/userdata/news_picupload/pic_sid189-0-norm.jpg", email: "dgil@gmail.com", phone: "809-232-3344"}
                    ];
                }
                
            } catch (e) {
                console.log("Ocurrio un error al recibir la lista de pacientes: ", e);
                setLoading(false);
                setError(true);
            }

            if (!didCancel) {
                setPatients(_patients);
                setPatient(_patient);
                setLoading(false);
            }
        };

        fetchPatients();

        return () => {
            didCancel = true;
        };
    }, []);

    const searchPatient = async (value) => {
        if (value !== "") {
            if (filterByValue(patients, value).length === 0) {
                setAutoCompleteLoading(true);
                var patientsApi = await API.graphql(graphqlOperation(listPatients, {filter: { name:{ contains: value } }}));
                if (patientsApi.data.listPatients.items.length > 0) {
                    setAutoCompleteLoading(false);
                    setNewPatient(false);
                }else{
                    setAutoCompleteLoading(false);
                    setNewPatient(true);
                    setNewPatientName(value);
                }
            }
        }
    }

    const _createPatient = async () => {
        const cpatient = await API.graphql(graphqlOperation(createPatient, { input: cognitoPatient }));
        
        const _patient = patient;
        _patient.value = cpatient.data.createPatient.id;
        _patient.id = cpatient.data.createPatient.id;
        apiOptions.body.Username = _patient.username;
        apiOptions.body.attribute = 'custom:isondb';
        apiOptions.body.value = 'true'; 
        setPatient(_patient);
        const updateAttribite = await API.post('ApiForLambda', '/updateUserAttribute', apiOptions)

        return cpatient.data.createPatient;
    }

    const createConsultation = async (state, _patient, _reason) => {       
        setLoadingButton(true);
        if (_patient.id === 'to_create') {
            const patient = await _createPatient();
            _patient.id = patient.id;
        }
        const mhinput = {};
        mhinput.reason = reason === null || reason === "" ? "N/A" : reason;
        mhinput.medicalHistoryPatientId = _patient.id;
        mhinput.doctor = state.doctorusername;
        mhinput.secretary = state.secretary;
        mhinput.patientname = _patient.username;
        const cmh = await API.graphql(graphqlOperation(createMedicalHistory, {input: mhinput} )).catch( e => { console.log(e); setLoadingButton(false); throw new SyntaxError("Error GraphQL");});
        
        const input = { 
                medicalConsultationDoctorId: state.doctorid, 
                medicalConsultationPatientId: _patient.id, 
                doctorname: state.doctorusername, 
                secretary: state.secretary, 
                patientname: _patient.username,
                medicalConsultationMedicalHistoryId: cmh.data.createMedicalHistory.id,
                state: 'IN_PROCESS',
                startedAt: String(moment(new Date).format('YYYY-MM-DDTHH:mm:ss.SSS')),
            };
        
        API.graphql(graphqlOperation(createMedicalConsultation, {input: input}))
        .then((r) => {
            var consultationid = r.data.createMedicalConsultation.id
            setLoadingButton(false);
            window.location.href = "/consultations/process/"+ consultationid +"/"+ _patient.id;
        }).catch((err) => { 
            console.log("Ocurrio un error al crear la consulta medica: ",err);
            setLoadingButton(false);
        });
    }

    const firstList = (inputValue) => {
        return patients.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
    };

    const loadOptions = async (inputValue, callback) => {  
        try {
            const firstQuery = await firstList(inputValue);
            if (firstQuery.length > 0) {
                callback(firstQuery);
            }else{
                const _patients = await API.graphql(graphqlOperation(listPatients, {limit: 1000, filter: {name: { contains: inputValue}}}));
                
                const list = _patients.data.listPatients.items
                
                const secondQuery = [];
                if (list.length > 0) {
                    list.forEach(e => {
                        const pdata = {value: e.id, label: e.name, id: e.id, name: e.name, age: e.age, image: "https://asociaciondenutriologia.org/img/default_user.png", email: e.email, phone: e.phone, username: e.username};
                        secondQuery.push(pdata);
                    });
                    callback(secondQuery);
                }else{
                    apiOptions.body.filterBy = 'name';
                    apiOptions.body.value = inputValue;
                    const _cognitos = await API.post('ApiForLambda', '/findUser', apiOptions);
                    if (_cognitos.body.Users.length > 0) {
                        const users = _cognitos.body.Users;
                        const _patients_ = [];

                        await users.forEach(async u => {
                            if (u.UserStatus === "UNCONFIRMED") {
                                const isondb = u.Attributes.find(e => e.Name === 'custom:isondb');
                                if (isondb.Value === 'false') {
                                    const inputFromCognito = {};
                                    const input = {};
    
                                    u.Attributes.forEach(e => {
                                        inputFromCognito[e.Name] = e.Value;
                                    });
    
                                    input.name = inputFromCognito.name;
                                    input.username = u.Username;
                                    input.email = inputFromCognito.email;
                                    input.phone = inputFromCognito.phone_number;
                                    input.birthdate = inputFromCognito['custom:_birthdate'];
                                    input.sex = inputFromCognito.gender;
                                    input.approved_terms_conditions = false;
                                    input.code = inputFromCognito['custom:code'];
                                    const pdata = {value: 'to_create', label: input.name, id: 'to_create', name: input.name, age: null, email: input.email, phone: input.phone, username: u.Username, image: "https://asociaciondenutriologia.org/img/default_user.png"};
                                    setCognitoPatient(input);
                                    _patients_.push(pdata);
                                }
                            }
                        });
                        callback(_patients_);  

                    }else{
                        callback(null);
                    }
                }
            }   
        } catch (error) {
            console.log(error);
            callback(null);
        }
    };

    return { inputValue, setInputValue, loadOptions, createConsultation, loadingButton, patients, error, loading, setPatients, patient, setPatient, autoCompleteLoading, searchPatient, newPatientName, setNewPatientName, setReason, reason};
};

export default useConsultations;