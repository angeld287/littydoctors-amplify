import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import usePhysicalExploration from '../usePhysicalExploration';

const ViewPhysicalExploration = ({
    global: global,
    setEdit: setEdit,
    editLoading: editLoading,
}) => {
  //const { register, loading, handleSubmit, onSubmit, formState } = usePhysicalExploration(global, setGlobalData);

  const editData = () => {
    setEdit(true);
  }
  const physicalexploration = global.medicalConsultation.medicalHistory.physicalExploration;

  const vs = physicalexploration.vitalsign;
  const re = physicalexploration.regionalExploration;

  return (
    <MDBContainer>
          <div className="form-group">
            <label htmlFor="general_exploration">Exploracion General</label>
          </div>
          <textarea value={physicalexploration.general_exploration === null ? "" : physicalexploration.general_exploration} disabled name="general_exploration" className="form-control" id="general_exploration" rows="7" ></textarea>
          <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Signos Vitales</strong></h6>
          <MDBRow className="mb-3">
            <MDBCol>
              <input value={vs.breathing === null ? "" : vs.breathing} disabled name="breathing" placeholder="Respiracion" autoComplete="off" className="form-control" />
            </MDBCol>
            <MDBCol>
              <input value={vs.pulse === null ? "" : vs.pulse} disabled name="pulse" placeholder="Pulso" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <input value={vs.blood_pressure === null ? "" : vs.blood_pressure} disabled name="blood_pressure" placeholder="Presion de Sangre" autoComplete="off" className="form-control" />
            </MDBCol>
            <MDBCol>
              <input value={vs.temperature === null ? "" : vs.temperature} disabled name="temperature" placeholder="Temperatura" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Exploracion Regional</strong></h6>
          <MDBRow className="mb-3">
            <MDBCol>
              <input value={re.head === null ? "" : re.head} disabled name="head" placeholder="Cabeza" autoComplete="off" className="form-control" />
            </MDBCol>
            <MDBCol>
              <input value={re.neck === null ? "" : re.neck} disabled name="neck" placeholder="Cuello" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <input value={re.thorax === null ? "" : re.thorax} disabled name="thorax" placeholder="Torax" autoComplete="off" className="form-control" />
            </MDBCol>
            <MDBCol>
              <input value={re.abdomen === null ? "" : re.abdomen} disabled name="abdomen" placeholder="Abdomen" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <input value={re.members === null ? "" : re.members} disabled name="members" placeholder="Miembro" autoComplete="off" className="form-control" />
            </MDBCol>
            <MDBCol>
              <input value={re.genitals === null ? "" : re.genitals} disabled name="genitals" placeholder="Genitales" autoComplete="off" className="form-control" />
            </MDBCol>
          </MDBRow>
          <div className="form-group">
            <label htmlFor="others">Otro</label>
            <textarea value={re.others === null ? "" : re.others} disabled name="others"  className="form-control" id="others" rows="3" ></textarea>
          </div>
          <div className="text-center py-4 mt-3">
              {!editLoading && <MDBBtn className="btn btn-outline-blue" disabled={false} onClick={editData}><MDBIcon icon="edit" size="2x" /></MDBBtn>}
              {editLoading && <MDBSpinner small />}
					</div>
    </MDBContainer>
  );
}

export default ViewPhysicalExploration;