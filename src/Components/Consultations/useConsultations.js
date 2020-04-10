import { useState, useEffect } from 'react';
import {listPatients} from './../../graphql/queries';
import { createMedicalConsultation, createMedicalHistory } from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { filterByValue } from '../../Functions/filterArray';
import moment from 'moment';


const useConsultations = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ patients, setPatients ] = useState([]);
    const [ patient, setPatient ] = useState({});
    const [ autoCompleteLoading, setAutoCompleteLoading ] = useState(false);
    const [ newPatient, setNewPatient ] = useState(false);
    const [ newPatientName, setNewPatientName ] = useState("");
    const [ reason, setReason ] = useState("");


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
                
                var patientsApi = await API.graphql(graphqlOperation(listPatients, {limit: 500}));
                
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

    const createConsultation = async (state, _patient, _reason) => {       
        setLoadingButton(true);
        const mhinput = {};
        mhinput.reason = reason === null || reason === "" ? "N/A" : reason;
        mhinput.medicalHistoryPatientId = _patient.id;
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
            window.location.href = "/consultations/"+ state.speciality +"/"+ consultationid +"/"+ _patient.id;
        }).catch((err) => { 
            console.log("Ocurrio un error al crear la consulta medica: ",err);
            setLoadingButton(false);
        });
    }

    return { createConsultation, loadingButton, patients, error, loading, setPatients, patient, setPatient, autoCompleteLoading, searchPatient, newPatientName, setNewPatientName, setReason, reason};
};

export default useConsultations;