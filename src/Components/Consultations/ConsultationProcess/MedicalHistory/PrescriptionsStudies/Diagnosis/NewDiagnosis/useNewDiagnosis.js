import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { createDiagnosis } from '../../../../../../../graphql/mutations';
import { updateMedicalHistoryDiForGlobal } from '../../../../../../../graphql/custom-mutations';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

const useNewPostConsultationsActivity = (global, setGlobalData, setNew) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const { register, handleSubmit, errors, formState } = useForm();

    const [ type, setType ] = useState([]);
    const [ evolution, setEvolution ] = useState([]);
    const [ diagnosis, setDiagnosis ] = useState([]);

    const fields = {
        type: {
            type, setType
        },
        evolution: {
            evolution, setEvolution
        },
        diagnosis:{
            diagnosis, setDiagnosis
        },
      }


    const onSubmit = async (i) => {
        const di = {};
        const dimh = {};
        if(type.length === 0){
            Swal.fire('Tipo de Diagnostico Requerido', 'Debe colocar el tipo de diagnostico. En caso no tener tipo, seleccionar la opcion "Indefinido"', 'error');
            return
        }

        if(evolution.length === 0){
            Swal.fire('Tipo de Diagnostico Requerido', 'Debe colocar el tipo de diagnostico. En caso no tener tipo, seleccionar la opcion "Indefinido"', 'error');
            return
        }

        if(diagnosis.length === 0){
            Swal.fire('Campo Diagnostico Requerido', 'Debe colocar el diagnostico. En caso no tener ningun diagnostico, seleccionar la opcion "Indefinido"', 'error');
            return
        }

        setLoading(true);

        if (i.commentary !== "") {di.commentary = i.commentary} 
        di.diagnosisTypeId = type.value;
        di.diagnosisEvolutionId = evolution.value;
        di.diagnosisDiagnosisId = diagnosis.value;
        const cdi = await API.graphql(graphqlOperation(createDiagnosis, {input: di} )).catch( e => {console.log(e); setLoadingButton(false); throw new SyntaxError("Error GraphQL"); });

        dimh.id = global.medicalConsultation.medicalHistory.id;
        dimh.medicalHistoryDiagnosisId = cdi.data.createDiagnosis.id;

        const udimh = await API.graphql(graphqlOperation(updateMedicalHistoryDiForGlobal, {input: dimh} )).catch( e => {console.log(e); setLoadingButton(false); throw new SyntaxError("Error GraphQL"); });

        global.medicalConsultation.medicalHistory.diagnosis = udimh.data.updateMedicalHistory.diagnosis;
        setGlobalData(global);

        setTimeout(() => {  
            setNew(false);
            setLoading(false);
        }, 2000);
    }

    return { fields, loadingButton, register, loading, handleSubmit, onSubmit, formState};
};

export default useNewPostConsultationsActivity;
