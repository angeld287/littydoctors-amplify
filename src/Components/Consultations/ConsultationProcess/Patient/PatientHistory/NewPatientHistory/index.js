import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox, MDBModal,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import useNewPatientHistory from './useNewPatientHistory';
import NonPathologicalHistory from './NonPathologicalHistory';
import PathologicalHistory from './PathologicalHistory';
import FamilyHistory from './FamilyHistory';



const NewPatientHistory = ({
    global: global,
    setGlobalData: setGlobalData,
    setHasPatientHistory:  setHasPatientHistory,
    setPatientHistory: setPatientHistory,
}) => {
  const { 
    onSubmit, 
    handleSubmit, 
    formState, 
    register, 
    errors, 
    api, 
    edit, 
    loadingButton, 
    setPatientAllergies, 
    setPatientMedications, 
    setPatientSurgicalInterventions, 
    nonPathActions,
    familyActions,
    medicationActions,
  } = useNewPatientHistory(global, setGlobalData, setHasPatientHistory, setPatientHistory);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className="font-weight-bold pl-0 my-4">
          <strong>Personales Patológicos</strong>
        </h5>
          <MDBRow>
            <MDBCol md="12">
              <MDBCard>
                <br/>
                <PathologicalHistory
                  setPatientMedications={setPatientMedications}
                  setPatientAllergies={setPatientAllergies}
                  setPatientSurgicalInterventions={setPatientSurgicalInterventions}
                  api={api}
                  register={register}
                  errors={errors}
                  medicationActions={medicationActions}
                />
              </MDBCard>
            </MDBCol>
          </MDBRow>
        <br/>
        <h5 className="font-weight-bold pl-0 my-4">
          <strong>Personales No Patológicos</strong>
        </h5>
          <MDBRow>
            <MDBCol md="12">
              <MDBCard>
                <br/>
                <MDBContainer>
                  <MDBBtn onClick={nonPathActions.toggleNonPath} disabled={loadingButton} className="btn btn-primary btn-sm">
                      Crear Antecedente No Patológicos
                  </MDBBtn>
                  <MDBDataTable
                    striped bordered searchLabel="Buscar"
                    responsiveSm={true} small hover entries={5}
                    btn={true} data={nonPathActions.nonPathTable} noRecordsFoundLabel="No se han encontrado datos"
                    entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
                    paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
                  />
                </MDBContainer>
                <MDBModal isOpen={nonPathActions.nonPathModal} toggle={nonPathActions.toggleNonPath} size="lg">
                  <NonPathologicalHistory
                    toggleNonPath={nonPathActions.toggleNonPath}
                    api={api}
                    createNonPath={nonPathActions.createNonPath}
                    editNonPath={nonPathActions.editNonPath}
                    edit={edit}
                    nonPathEditObject={nonPathActions.nonPathEditObject}
                  />
                </MDBModal>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        <br/>
        <h5 className="font-weight-bold pl-0 my-4">
          <strong>Familiares</strong>
        </h5>
        <MDBRow>
            <MDBCol md="12">
              <MDBCard>
                <br/>
                <MDBContainer>
                  <MDBBtn onClick={familyActions.toggleFamily} disabled={loadingButton} className="btn btn-primary btn-sm">
                      Crear Antecedente Familiares
                  </MDBBtn>
                  <MDBDataTable
                    striped bordered searchLabel="Buscar"
                    responsiveSm={true} small hover entries={5}
                    btn={true} data={familyActions.familyTable} noRecordsFoundLabel="No se han encontrado datos"
                    entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
                    paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
                  />
                </MDBContainer>
                <MDBModal isOpen={familyActions.familyModal} toggle={familyActions.toggleFamily} size="lg">
                  <FamilyHistory 
                    toggleFamily={familyActions.toggleFamily}
                    api={api}
                    createFamily={familyActions.createFamily}
                    editFamily={familyActions.editFamily}
                    edit={edit}
                    familyEditObject={familyActions.familyEditObject}
                  />
                </MDBModal>
              </MDBCard>
            </MDBCol>
        </MDBRow>
        <br/>
        <div className="text-center py-4 mt-3">
                  {!loadingButton && <MDBBtn className="btn btn-outline-blue" type="submit" disabled={formState.isSubmitting}>Agregar</MDBBtn>}
                  {loadingButton && <MDBSpinner small />}
				</div>
      </form>
  );
}

export default NewPatientHistory;