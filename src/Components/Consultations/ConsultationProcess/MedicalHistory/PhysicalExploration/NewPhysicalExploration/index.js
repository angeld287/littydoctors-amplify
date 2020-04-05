import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import usePhysicalExploration from '../usePhysicalExploration';

import TooltipButton from '../../../../../TooltipButton';

import Select from 'react-select';

const NewPhysicalExploration = ({
    global: global,
    setGlobalData: setGlobalData,
    actions: actions
}) => {
  //const { register, loading, handleSubmit, onSubmit, formState } = usePhysicalExploration(global, setGlobalData);
  const [ mm, setmm ] = useState("");
  const [ hg, sethg ] = useState("");
  const [ blood_pressure, setblood_pressure] = useState(mm + "/" + hg + " mm/Hg");
  
  var foo = new Array(500);
  
  const n = [];
  for(var i = 0; i < foo.length; i++){
    n.push({value: i, label: i});
  }

  const isDisable = !((mm === "" && hg === "") || (mm !== "" && hg !== ""))

  const addBtn = ( <MDBBtn className="btn btn-outline-blue" type="submit" disabled={actions.formState.isSubmitting || isDisable}><MDBIcon icon="plus" size="2x" /></MDBBtn>);

  return (
    <MDBContainer>
      <form onSubmit={actions.handleSubmit(actions.onSubmit)}>
          <div className="form-group">
            <label htmlFor="general_exploration">Exploracion General</label>
          </div>
          <textarea name="general_exploration" className="form-control" id="general_exploration" rows="7" ref={actions.register}></textarea>
          <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Signos Vitales</strong></h6>
          <MDBRow className="mb-3">
            <MDBCol>
              <input type="number" name="breathing" placeholder="Respiraciones por Minuto" autoComplete="off" className="form-control" ref={actions.register}/>
            </MDBCol>
            <MDBCol>
              <input type="number" name="pulse" placeholder="Pulso (Latidos por Segundo)" autoComplete="off" className="form-control" ref={actions.register}/>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <MDBRow>
                <MDBCol md="5">
                  <label htmlFor="blood_pressure">Presion de Sangre (mm/Hg):</label>
                  <input name="blood_pressure" hidden value={blood_pressure} onChange={e => {e.preventDefault(); setblood_pressure(e.target.value)}} ref={actions.register}/>
                </MDBCol>
                <MDBCol md="3">
                  <Select placeholder="mm" options={n} onChange={ (v) => {
                      setmm(v.value);
                      setblood_pressure(v.value + "/" + hg + " mm/Hg")
                      }}/>
                </MDBCol>
                <MDBCol md="0">
                  <h1>/</h1>
                </MDBCol>
                <MDBCol md="3">
                  <Select options={n} placeholder="Hg" onChange={ (v) => {
                      sethg(v.value);
                      setblood_pressure(mm + "/" + v.value + " mm/Hg")
                      }}/>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <input type="number" name="temperature" placeholder="Temperatura (°F)" autoComplete="off" className="form-control" ref={actions.register}/>
            </MDBCol>
          </MDBRow>
          <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Exploracion Regional</strong></h6>
          <MDBRow className="mb-3">
            <MDBCol>
              <input name="head" placeholder="Cabeza" autoComplete="off" className="form-control" ref={actions.register}/>
            </MDBCol>
            <MDBCol>
              <input name="neck" placeholder="Cuello" autoComplete="off" className="form-control" ref={actions.register}/>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <input name="thorax" placeholder="Torax" autoComplete="off" className="form-control" ref={actions.register}/>
            </MDBCol>
            <MDBCol>
              <input name="abdomen" placeholder="Abdomen" autoComplete="off" className="form-control" ref={actions.register}/>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <input name="members" placeholder="Miembro" autoComplete="off" className="form-control" ref={actions.register}/>
            </MDBCol>
            <MDBCol>
              <input name="genitals" placeholder="Genitales" autoComplete="off" className="form-control" ref={actions.register}/>
            </MDBCol>
          </MDBRow>
          <div className="form-group">
            <label htmlFor="others">Otro</label>
            <textarea name="others"  className="form-control" id="others" rows="3" ref={actions.register}></textarea>
          </div>
          <div className="text-center py-4 mt-3">
              {!actions.loading && <TooltipButton helperMessage={"Crear Exploracion Fisica"} component={addBtn} placement="top"/>}
              {actions.loading && <MDBSpinner small />}
					</div>
      </form>
    </MDBContainer>
  );
}

export default NewPhysicalExploration;