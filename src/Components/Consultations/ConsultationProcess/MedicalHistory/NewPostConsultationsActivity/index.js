import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable, MDBModal } from "mdbreact";

import useNewPostConsultationsActivity from './useNewPostConsultationsActivity';
import NewMedicalPrescription from './NewMedicalPrescription';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const NewPostConsultationsActivity = () => {
  const { editObject, edit, toggle, table, loadingButton, editMedicalPrescription, removeMedicalPrescription, createMedicalPrescription, setPrescriptionMedication, modal, setModal, items, register, loading, handleSubmit, onSubmit, formState, api, setMedicalAnalysis, setSurgicalIntervention } = useNewPostConsultationsActivity();

  return (
    <MDBContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Prescripciones Medicas</strong></h6>
      <MDBBtn onClick={toggle} disabled={loadingButton} className="btn btn-primary btn-sm">
				crear receta medica
			</MDBBtn>
      <MDBRow className="mb-3">
        <MDBCol>
          <MDBDataTable
            striped bordered searchLabel="Buscar"
            responsiveSm={true} small hover entries={5}
            btn={true} data={table} noRecordsFoundLabel="No se han encontrado datos"
            entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
            paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
          />
          <MDBModal isOpen={modal} toggle={toggle} size="lg">
            <NewMedicalPrescription
              toggle={toggle}
              createMedicalPrescription={createMedicalPrescription}
              editMedicalPrescription={editMedicalPrescription}
              api={api}
              edit={edit}
              editObject={editObject}
            />
          </MDBModal>
        </MDBCol>
      </MDBRow>
      <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Analisis Medicos</strong></h6>
        <MDBRow className="mb-3">
          <MDBCol>
            <Autocomplete
              multiple
              id="medicalAnalysis"
              options={api.medicalanalysis}
              getOptionLabel={option => option.name}
              onChange={(event, newValue) => {setMedicalAnalysis(newValue)}}
              renderInput={params => (
                <TextField {...params} label="Seleccionar los Analisis Medicos" variant="outlined" fullWidth/>
              )}
            />
          </MDBCol>
        </MDBRow>
      <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Intervenciones Quirurgicas</strong></h6>
        <MDBRow className="mb-3">
          <MDBCol>
            <Autocomplete
              multiple
              id="surgicalIntervention"
              options={api.surgicalintervention}
              getOptionLabel={option => option.name}
              onChange={(event, newValue) => {setSurgicalIntervention(newValue)}}
              renderInput={params => (
                <TextField {...params} label="Seleccionar la(s) Intervencion(es) Quirurgica(s)" variant="outlined" fullWidth/>
              )}
            />
          </MDBCol>
        </MDBRow>
          <div className="text-center py-4 mt-3">
              {!loading && <MDBBtn className="btn btn-outline-blue" type="submit" disabled={formState.isSubmitting}>Agregar</MDBBtn>}
              {loading && <MDBSpinner small />}
					</div>
      </form>
    </MDBContainer>
  );
}

export default NewPostConsultationsActivity;