import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
  MDBTableBody, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import Select from 'react-select';

import useViewDiagnosis from './useViewDiagnosis';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TooltipButton from '../../../../../../TooltipButton';

const ViewDiagnosis = ({
    global: global,
    setGlobalData: setGlobalData,
    setEdit: setEdit,
    editLoading: editLoading,
    api : api,
}) => {
  //const { register, loading, handleSubmit, onSubmit, formState } = usePhysicalExploration(global, setGlobalData);

  const editData = () => {
    setEdit(true);
  }

  const {  } = useViewDiagnosis(global, setGlobalData);

  const [ loading, setloading ] = useState(false);

  const diagnosis = global.medicalConsultation.medicalHistory.diagnosis;

  const typeS = api.type[api.type.findIndex(t => t.value === diagnosis.type.id)];
  const evolutionS = api.evolution[api.evolution.findIndex(t => t.value === diagnosis.evolution.id)];
  const diagnosisS = api.diseases[api.diseases.findIndex(t => t.value === diagnosis.diagnosis.id)];


  const editBtn = (<MDBBtn className="btn btn-outline-blue" disabled={false} onClick={editData}><MDBIcon size="2x" icon="edit" className="blue-text" /></MDBBtn>);
  return (
    <MDBContainer>
       <MDBRow className="p-3">
         <MDBRow className="mb-3" style={{width: '100%'}}>
           <MDBCol>
             <label htmlFor="evolution" className="mt-2" >Tipo de Diagnostico segun Evolucion</label>
             {!loading && <Select id="evolution" isDisabled={true} defaultValue={evolutionS} options={api.evolution} />}
             {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
           </MDBCol>
           <MDBCol>
             <label htmlFor="type" className="mt-2" >Tipo de Diagnostico segun Metodo</label>
             {!loading && <Select id="type" isDisabled={true} defaultValue={typeS} options={api.type} />}
             {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
           </MDBCol>
         </MDBRow>
         <MDBRow className="mb-3" style={{width: '100%'}}>
           <MDBCol>
             <label htmlFor="diagnosis" className="mt-2" >Diagnostico</label>
             {!loading && <Select id="diagnosis" isDisabled={true} options={api.diseases} defaultValue={diagnosisS} />}
             {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
           </MDBCol>
           <MDBCol>
           </MDBCol>
         </MDBRow>
           <div className="form-group">
             <label htmlFor="commentary">Comentario</label>
           </div>
           <textarea disabled defaultValue={diagnosis.commentary} name="commentary" className="form-control" id="commentary" rows="4"></textarea>
       </MDBRow>
       <div className="text-center py-4 mt-3">
           {!editLoading && <TooltipButton helperMessage={"Editar Actividad Post Consulta"} component={editBtn} placement="top"/>}
           {editLoading && <MDBSpinner small />}
			</div>
    </MDBContainer>
  );
}

export default ViewDiagnosis;