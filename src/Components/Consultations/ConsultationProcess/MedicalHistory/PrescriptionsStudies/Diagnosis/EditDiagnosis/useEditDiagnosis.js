import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { updateDiagnosis } from '../../../../../../../graphql/mutations';
import { } from '../../../../../../../graphql/custom-mutations';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

const useEditDiagnosis = (global, setGlobalData, _setEdit) => {
    const [ loading, setLoading ] = useState(false);
    const [ editLoading, setEditLoading ] = useState(false);
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
        setEditLoading(true);

        const dia = global.medicalConsultation.medicalHistory.diagnosis;
        di.id = dia.id;
        if(dia.commentary !== i.commentary){di.commentary = i.commentary;}
        if(dia.type.id !== type.value){di.diagnosisTypeId = type.value;}
        if(dia.evolution.id !== evolution.value){di.diagnosisEvolutionId = evolution.value;}
        if(dia.diagnosis.id !== diagnosis.value){di.diagnosisDiagnosisId = diagnosis.value;}
        
        const cdi = await API.graphql(graphqlOperation(updateDiagnosis, {input: di} )).catch( e => {console.log(e); setLoading(false); setEditLoading(false); throw new SyntaxError("Error GraphQL"); });

        global.medicalConsultation.medicalHistory.diagnosis = cdi.data.updateDiagnosis;
        setGlobalData(global);

        setTimeout(() => {  
            _setEdit(false);
            setLoading(false);
            setEditLoading(false);
        }, 2000);
    }

    return { fields, loading, editLoading, register, handleSubmit, errors, formState, onSubmit};
};

export default useEditDiagnosis;
