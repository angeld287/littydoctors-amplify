import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox, MDBModal,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import useNewPatientHistory from './useNewPatientHistory';
import NonPathologicalHistory from './NonPathologicalHistory';
import PathologicalHistory from './PathologicalHistory';
import FamilyHistory from './FamilyHistory';



const NewPatientHistory = ({
    global: global,
    setGlobalData: setGlobalData
}) => {
  const { nonPathModal, toggleNonPath, api, setPatientMedications, setPatientSurgicalInterventions, register, onSubmit, setPatientAllergies, nonPathTable,
          loadingButton, handleSubmit, formState, errors, edit, nonPathEditObject, createNonPath, editNonPath, toggleFamily, familyModal,
          familyTable, createFamily, removeFamily, editFamily, familyEditObject } = useNewPatientHistory(global, setGlobalData);

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
                  <MDBBtn onClick={toggleNonPath} disabled={loadingButton} className="btn btn-primary btn-sm">
                      Crear Antecedente No Patológicos
                  </MDBBtn>
                  <MDBDataTable
                    striped bordered searchLabel="Buscar"
                    responsiveSm={true} small hover entries={5}
                    btn={true} data={nonPathTable} noRecordsFoundLabel="No se han encontrado datos"
                    entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
                    paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
                  />
                </MDBContainer>
                <MDBModal isOpen={nonPathModal} toggle={toggleNonPath} size="lg">
                  <NonPathologicalHistory
                    toggleNonPath={toggleNonPath}
                    api={api}
                    createNonPath={createNonPath}
                    editNonPath={editNonPath}
                    edit={edit}
                    nonPathEditObject={nonPathEditObject}
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
                  <MDBBtn onClick={toggleFamily} disabled={loadingButton} className="btn btn-primary btn-sm">
                      Crear Antecedente Familiares
                  </MDBBtn>
                  <MDBDataTable
                    striped bordered searchLabel="Buscar"
                    responsiveSm={true} small hover entries={5}
                    btn={true} data={familyTable} noRecordsFoundLabel="No se han encontrado datos"
                    entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
                    paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
                  />
                </MDBContainer>
                <MDBModal isOpen={familyModal} toggle={toggleFamily} size="lg">
                  <FamilyHistory 
                    toggleFamily={toggleFamily}
                    api={api}
                    createFamily={createFamily}
                    editFamily={editFamily}
                    edit={edit}
                    familyEditObject={familyEditObject}
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