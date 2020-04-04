import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import Select from 'react-select';

import TooltipButton from '../../../../../TooltipButton';

const EditPhysicalExploration = ({
    editPhysicalExploration: editPhysicalExploration,
    fields: fields,
    editLoading: editLoading,
    setEditData: setEditData,
    setEdit: setEdit,
}) => {
  
  const [ mm, setmm ] = useState(0);
  const [ hg, sethg ] = useState(0);
  const [ blood_pressure, setblood_pressure] = useState(fields.blood_pressure.blood_pressure);

  var foo = new Array(500);
  
  const n = [];
  for(var i = 0; i < foo.length; i++){
    n.push({value: i, label: i});
  }

  useEffect(() => {
      let didCancel = false;

      const fetch = async () => {   
          setEditData();
          const mm = fields.blood_pressure.blood_pressure.match(/((.*?)\/[0-9]{1,3})/) !== null ? fields.blood_pressure.blood_pressure.match(/((.*?)\/[0-9]{1,3})/)[2] : 0;
          const hg = fields.blood_pressure.blood_pressure.match(/([0-9]{1,3}\/(.*?) m)/) !== null ? fields.blood_pressure.blood_pressure.match(/([0-9]{1,3}\/(.*?) m)/)[2] : 0;
          setmm(mm);
          sethg(hg);
      };

      fetch();

      return () => {
          didCancel = true;
      };
  }, []);

  
  const imm = n.findIndex(v => v.value.toString() === mm);
  const ihg = n.findIndex(v => v.value.toString() === hg);

  const savebtn = (<MDBBtn className="btn btn-outline-blue" onClick={editPhysicalExploration} ><MDBIcon icon="save" size="2x" /></MDBBtn>);
  const cancelbtn = (<MDBBtn className="btn btn-outline-blue" onClick={e => {setEdit(false)}} ><MDBIcon icon="times" size="2x" /></MDBBtn>);

  return (
    <MDBContainer>
          <div className="form-group">
            <label htmlFor="general_exploration">Exploracion General</label>
          </div>
          <textarea value={fields.general_exploration.general_exploration} onChange={e => {
              e.preventDefault();
              fields.general_exploration.setgeneral_exploration(e.target.value)
            }} 
          name="general_exploration" className="form-control" id="general_exploration" rows="7" ></textarea>
          
          <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Signos Vitales</strong></h6>
          <MDBRow className="mb-3">
            <MDBCol>
              <input type="number" value={fields.breathing.breathing} onChange={e => {
                  e.preventDefault();
                  fields.breathing.setbreathing(e.target.value)
                }}
                name="breathing" placeholder="Respiracion por Minuto" autoComplete="off" className="form-control" />
            </MDBCol>
            <MDBCol>
              <input type="number" value={fields.pulse.pulse} onChange={e => {
                  e.preventDefault();
                  fields.pulse.setpulse(e.target.value)
                }}name="pulse" placeholder="Pulso (Latidos por Segundo)" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <MDBRow>
                <MDBCol md="5">
                  <label htmlFor="blood_pressure">Presion de Sangre (mm/Hg):</label>
                </MDBCol>
                <MDBCol md="3">
                  <Select placeholder="mm" defaultValue={n[imm]} options={n} onChange={ (v) => {
                      setmm(v.value);
                      fields.blood_pressure.setblood_pressure(v.value + "/" + hg + " mm/Hg")
                      }}/>
                </MDBCol>
                <MDBCol md="0">
                  <h1>/</h1>
                </MDBCol>
                <MDBCol md="3">
                  <Select options={n} defaultValue={n[ihg]} placeholder="Hg" onChange={ (v) => {
                      sethg(v.value);
                      fields.blood_pressure.setblood_pressure(mm + "/" + v.value + " mm/Hg")
                      }}/>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <input type="number" value={fields.temperature.temperature} onChange={e => {
                  e.preventDefault();
                  fields.temperature.settemperature(e.target.value)
                }}name="temperature" placeholder="Temperatura (°F)" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Exploracion Regional</strong></h6>
          <MDBRow className="mb-3">
            <MDBCol>
              <input value={fields.head.head} onChange={e => {
                  e.preventDefault();
                  fields.head.sethead(e.target.value)
                }}name="head" placeholder="Cabeza" autoComplete="off" className="form-control" />
            </MDBCol>
            <MDBCol>
              <input value={fields.neck.neck} onChange={e => {
                  e.preventDefault();
                  fields.neck.setneck(e.target.value)
                }}name="neck" placeholder="Cuello" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <input value={fields.thorax.thorax} onChange={e => {
                  e.preventDefault();
                  fields.thorax.setthorax(e.target.value)
                }}name="thorax" placeholder="Torax" autoComplete="off" className="form-control" />
            </MDBCol>
            <MDBCol>
              <input value={fields.abdomen.abdomen} onChange={e => {
                  e.preventDefault();
                  fields.abdomen.setabdomen(e.target.value)
                }}name="abdomen" placeholder="Abdomen" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <input value={fields.members.members} onChange={e => {
                  e.preventDefault();
                  fields.members.setmembers(e.target.value)
                }}name="members" placeholder="Miembro" autoComplete="off" className="form-control" />
            </MDBCol>
            <MDBCol>
              <input value={fields.genitals.genitals} onChange={e => {
                  e.preventDefault();
                  fields.genitals.setgenitals(e.target.value)
                }}name="genitals" placeholder="Genitales" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <div className="form-group">
            <label htmlFor="others">Otro</label>
            <textarea value={fields.others.others} onChange={e => {
                e.preventDefault();
                fields.others.setothers(e.target.value)
              }}name="others"  className="form-control" id="others" rows="3" ></textarea>
          </div>
          <div className="text-center py-4 mt-3">
              {!editLoading && <TooltipButton helperMessage={"Guardar Cambios"} component={savebtn} placement="top"/>}
              {!editLoading && <TooltipButton helperMessage={"Cancelar Cambios"} component={cancelbtn} placement="top"/>}
              {editLoading && <MDBSpinner small />}
					</div>
    </MDBContainer>
  );
}

export default EditPhysicalExploration;