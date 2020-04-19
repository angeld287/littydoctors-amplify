import React, { useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable, MDBModal } from "mdbreact";

import useNewDiagnosis from './useNewDiagnosis';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';

import TooltipButton from '../../../../../../TooltipButton';

const NewDiagnosis = ({
    global: global,
    setGlobalData: setGlobalData,
    setNew: setNew,
    api : api,
}) => {
  const { fields, loading, handleSubmit, onSubmit, formState, register} = useNewDiagnosis(global, setGlobalData, setNew);
  
  useEffect(() => {
      let didCancel = false;

      return () => {
          didCancel = true;
      };

  }, []);

  const addBtn = (<MDBBtn className="btn btn-outline-blue" type="submit" disabled={formState.isSubmitting}><MDBIcon size="2x" icon="plus" className="blue-text" /></MDBBtn>);

  return (
    <MDBContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
          <MDBRow className="p-3">
            <MDBRow className="mb-3" style={{width: '100%'}}>
              <MDBCol>
                <label htmlFor="evolution" className="mt-2" >Tipo de Diagnostico segun Evolucion</label>
                {!loading && <Select id="evolution" options={api.evolution} onChange={ (v) => { fields.evolution.setEvolution(v) }}/>}
                {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
              </MDBCol>
              <MDBCol>
                <label htmlFor="type" className="mt-2" >Tipo de Diagnostico segun Metodo</label>
                {!loading && <Select id="type" options={api.type} onChange={ (v) => { fields.type.setType(v) }}/>}
                {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3" style={{width: '100%'}}>
              <MDBCol>
                <label htmlFor="diagnosis" className="mt-2" >Diagnostico</label>
                {!loading && <Select id="diagnosis" options={api.diseases} onChange={ (v) => { fields.diagnosis.setDiagnosis(v) }}/>}
                {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
              </MDBCol>
              <MDBCol>
              </MDBCol>
            </MDBRow>
            <MDBContainer>
              <div className="form-group">
                <label htmlFor="commentary">Comentario</label>
              </div>
              <textarea name="commentary" className="form-control" id="commentary" rows="4" ref={register}></textarea>
            </MDBContainer>
          </MDBRow>
          <div className="text-center py-4 mt-3">
              {!loading && <TooltipButton helperMessage={"Crear Diagnostico"} component={addBtn} placement="top"/>}
              {loading && <MDBSpinner small />}
					</div>
      </form>
    </MDBContainer>
  );
}

export default NewDiagnosis;