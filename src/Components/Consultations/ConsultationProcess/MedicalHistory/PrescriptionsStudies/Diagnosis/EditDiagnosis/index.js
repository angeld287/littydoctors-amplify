import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBModal, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import Select from 'react-select';

import useEditDiagnosis from './useEditDiagnosis';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TooltipButton from '../../../../../../TooltipButton';

const EditDiagnosis = ({
      global: global,
      setGlobalData: setGlobalData,
      setEdit: _setEdit,
      api : api,
  }) => {

  const { fields, editLoading, loading, register, handleSubmit, errors, formState, onSubmit } = useEditDiagnosis(global, setGlobalData, _setEdit);


  const diagnosis = global.medicalConsultation.medicalHistory.diagnosis;

  const typeS = api.type[api.type.findIndex(t => t.value === diagnosis.type.id)];
  const evolutionS = api.evolution[api.evolution.findIndex(t => t.value === diagnosis.evolution.id)];
  const diagnosisS = api.diseases[api.diseases.findIndex(t => t.value === diagnosis.diagnosis.id)];

  useEffect(() => {
      let didCancel = false;
      fields.type.setType(typeS);
      fields.evolution.setEvolution(evolutionS);
      fields.diagnosis.setDiagnosis(diagnosisS);

      return () => {
          didCancel = true;
      };

  }, []);


  const saveBtn = (<MDBBtn className="btn btn-outline-blue" disabled={false} type="submit"><MDBIcon size="2x" icon="save" className="blue-text" /></MDBBtn>);
  const cancelBtn = (<MDBBtn className="btn btn-outline-blue" disabled={false} onClick={e => {e.preventDefault(); _setEdit(false);}}><MDBIcon size="2x" icon="times" className="blue-text" /></MDBBtn>);

  return (
    <MDBContainer>
       <form onSubmit={handleSubmit(onSubmit)}>
          <MDBRow className="p-3">
            <MDBRow className="mb-3" style={{width: '100%'}}>
              <MDBCol>
                <label htmlFor="evolution" className="mt-2" >Tipo de Diagnostico segun Evolucion</label>
                {!loading && <Select id="evolution" defaultValue={evolutionS} options={api.evolution} onChange={ (v) => { fields.evolution.setEvolution(v) }} />}
                {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
              </MDBCol>
              <MDBCol>
                <label htmlFor="type" className="mt-2" >Tipo de Diagnostico segun Metodo</label>
                {!loading && <Select id="type" defaultValue={typeS} options={api.type} onChange={ (v) => { fields.type.setType(v) }}/>}
                {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3" style={{width: '100%'}}>
              <MDBCol>
                <label htmlFor="diagnosis" className="mt-2" >Diagnostico</label>
                {!loading && <Select id="diagnosis" options={api.diseases} defaultValue={diagnosisS} onChange={ (v) => { fields.diagnosis.setDiagnosis(v) }}/>}
                {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
              </MDBCol>
              <MDBCol>
              </MDBCol>
            </MDBRow>
              <div className="form-group">
                <label htmlFor="commentary">Comentario</label>
              </div>
              <textarea defaultValue={diagnosis.commentary} ref={register} name="commentary" className="form-control" id="commentary" rows="4"></textarea>
          </MDBRow>
          <div className="text-center py-4 mt-3">
              {!editLoading && <TooltipButton helperMessage={"Guardar Cambios"} component={saveBtn} placement="top"/>}
              {!editLoading && <TooltipButton helperMessage={"Cancelar Cambios"} component={cancelBtn} placement="top"/>}
              {editLoading && <MDBSpinner small />}
					</div>
        </form>
    </MDBContainer>
  );
}

export default EditDiagnosis;