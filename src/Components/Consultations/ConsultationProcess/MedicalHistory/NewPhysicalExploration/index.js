import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import useNewPhysicalExploration from './useNewPhysicalExploration';



const NewPhysicalExploration = () => {
  const { register, loading, handleSubmit, onSubmit, formState } = useNewPhysicalExploration();

  return (
    <MDBContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="general_exploration">Exploracion General</label>
        <textarea name="general_exploration" className="form-control" id="general_exploration" rows="7" ref={register}></textarea>
      </div>
      <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Signos Vitales</strong></h6>
      <MDBRow className="mb-3">
        <MDBCol>
          <input name="breathing" placeholder="Respiracion" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
        <MDBCol>
          <input name="pulse" placeholder="Pulso" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol>
          <input name="blood_pressure" placeholder="Presion de Sangre" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
        <MDBCol>
          <input name="temperature" placeholder="Temperatura" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
      </MDBRow>
      <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Exploracion Regional</strong></h6>
       <MDBRow className="mb-3">
        <MDBCol>
          <input name="head" placeholder="Cabeza" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
        <MDBCol>
          <input name="neck" placeholder="Cuello" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol>
          <input name="thorax" placeholder="Torax" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
        <MDBCol>
          <input name="abdomen" placeholder="Abdomen" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol>
          <input name="members" placeholder="Miembro" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
        <MDBCol>
          <input name="genitals" placeholder="Genitales" autoComplete="off" className="form-control" ref={register}/>
        </MDBCol>
      </MDBRow>
      <div className="form-group">
        <label htmlFor="others">Otro</label>
        <textarea name="others"  className="form-control" id="others" rows="3" ref={register}></textarea>
      </div>
          <div className="text-center py-4 mt-3">
              {!loading && <MDBBtn className="btn btn-outline-blue" type="submit" disabled={formState.isSubmitting}>Agregar</MDBBtn>}
              {loading && <MDBSpinner small />}
					</div>
      </form>
    </MDBContainer>
  );
}

export default NewPhysicalExploration;