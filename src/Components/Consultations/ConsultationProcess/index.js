import React, { useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBSpinner } from "mdbreact";
import moment from 'moment';


import useConsultations from '../useConsultations';
import useConsultationProcess from './useConsultationProcess';
import PatientDetails from './Patient/PatientDetail';
import NewPatient from './Patient/newPatient';
import PhysicalExploration from './MedicalHistory/PhysicalExploration';
import NewPatientHistory from './Patient/PatientHistory/NewPatientHistory';
import PatientHistory from './Patient/PatientHistory';
import PostConsultationsActivity from './MedicalHistory/PostConsultationsActivity';


const ConsultationProcess = ({childProps:childProps}) => {
  const { consultationObject, error, loading, swapFormActive, handleNextPrevClick, handleSubmission, calculateAutofocus, selectedDate, setSelectedDate, setCreateNewPatient, patientData,
          formActivePanelChanged, setFormActivePanelChanged, formActivePanel, setFormActivePanel, createNewPatient, createNewPatientName, setGlobalData, global,
          setHasPatientHistory, hasPatientHistory, patientHistory, setPatientHistory, _reason, loadingButton } = useConsultationProcess();

  const { createConsultation } = useConsultations();

  if (loading) {
      return (
        <MDBContainer>
          <MDBBox display="flex" justifyContent="center" className="mt-5">
            <MDBSpinner big/>
          </MDBBox>
        </MDBContainer>
      );
    }

  if (error) return <h2 className="text-center font-weight-bold pt-10 pb-2 mb-2">Ha ocurrido un error</h2>;

  const cnpmessage = "Debe Crear Paciente";

  return (
    <MDBContainer>
        <h2 className="text-center font-weight-bold pt-4 pb-5 mb-2"><strong>Historia Clinica</strong></h2>
        <MDBStepper icon>
          <MDBStep icon="user" stepName={createNewPatient ? cnpmessage: "Paciente"} onClick={swapFormActive(1)}></MDBStep>
          <MDBStep icon="folder-open" stepName={createNewPatient ? cnpmessage: "Antecedentes"} onClick={swapFormActive(2)}></MDBStep>
          <MDBStep icon="stethoscope" stepName={createNewPatient ? cnpmessage: "Examen Medico"} onClick={swapFormActive(3)}></MDBStep>
          <MDBStep icon="prescription-bottle-alt" stepName={createNewPatient ? cnpmessage: "Prescripciones y Estudios"} onClick={swapFormActive(4)}></MDBStep>
        </MDBStepper>
          <MDBRow>
            {formActivePanel === 1 &&
              (<MDBCol md="12">
                <h3 className="font-weight-bold pl-0 my-4">
                  <strong>Paciente</strong>
                </h3>
                <MDBCol>
                  {!createNewPatient &&
                    (
                      <PatientDetails
                        patientData={patientData}
                        childProps={childProps}
                        global={global}
                        setGlobalData={setGlobalData}
                      />
                    )
                  }
                  {createNewPatient &&
                    (
                      <NewPatient 
                        createConsultation={createConsultation} 
                        setCreateNewPatient={setCreateNewPatient} 
                        name={createNewPatientName}
                        reason={_reason}
                        childProps={childProps}
                      />
                    )
                  }
                </MDBCol>
                <br/>
                <MDBBtn color="mdb-color" rounded className="float-right" onClick={handleNextPrevClick(2)}>Siguiente</MDBBtn>
              </MDBCol>)}

            {formActivePanel === 2 &&
              <MDBCol md="12">
                  {global.patient.patientHistory.items.length === 0 && 
                    <NewPatientHistory patientData={patientData} childProps={childProps} global={global} setGlobalData={setGlobalData} setHasPatientHistory={setHasPatientHistory} setPatientHistory={setPatientHistory}/>}
                  {global.patient.patientHistory.items.length !== 0 && 
                    <PatientHistory patientData={patientData} childProps={childProps} global={global} setGlobalData={setGlobalData} patientHistory={patientHistory}/>}
                <br/>
                <MDBBtn color="mdb-color" rounded className="float-left" onClick={handleNextPrevClick(1)}>Anterior</MDBBtn>
                <MDBBtn color="mdb-color" rounded className="float-right" onClick={handleNextPrevClick(3)}>Siguiente</MDBBtn>
              </MDBCol>
            }

            {formActivePanel == 3 &&
            (<MDBCol md="12">
              <h3 className="font-weight-bold pl-0 my-4"><strong>Exploracion Fisica</strong></h3>
                <PhysicalExploration
                  patientData={patientData}
                  childProps={childProps}
                  global={global}
                  setGlobalData={setGlobalData}
                />
              <br/>
              <MDBBtn color="mdb-color" rounded className="float-left" onClick={handleNextPrevClick(2)}>Anterior</MDBBtn>
              <MDBBtn color="mdb-color" rounded className="float-right" onClick={handleNextPrevClick(4)}>Siguiente</MDBBtn>
            </MDBCol>)}

            {formActivePanel == 4 &&
            (<MDBCol md="12">
              <h3 className="font-weight-bold pl-0 my-4"><strong>Prescripciones y Estudios</strong></h3>
                <PostConsultationsActivity
                  patientData={patientData}
                  childProps={childProps}
                  global={global}
                  setGlobalData={setGlobalData}
                />
              <br/>
              <MDBBtn color="mdb-color" rounded className="float-left" onClick={handleNextPrevClick(3)}>Anterior</MDBBtn>
              <MDBBtn color="success" rounded className="float-right" onClick={handleSubmission}>
                { !loadingButton && "Finalizar"}
                { loadingButton && <MDBSpinner small/>}
              </MDBBtn>
            </MDBCol>)}
          </MDBRow>
      </MDBContainer>
    );
}

export default ConsultationProcess;