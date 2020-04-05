import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable, MDBModal } from "mdbreact";

import usePathologicalHistory from './usePathologicalHistory';
import PatientMedications from './PatientMedications';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import TooltipButton from '../../../../../../TooltipButton';

const PathologicalHistory = (
                      {
                        setPatientMedications: setPatientMedications,
                        setPatientAllergies: setPatientAllergies,
                        setPatientSurgicalInterventions: setPatientSurgicalInterventions,
                        api: api,
                        medicationActions: medicationActions,
                      } 
                   ) => {
      const { alcohol, setAlcoholValue, smoking, setSmokingValue, drugs, setDrugsValue, immunizations, setImmunizationsValue } = usePathologicalHistory();

      const AddBtn = (<MDBBtn onClick={medicationActions.toggleMedication} disabled={medicationActions.loadingButton} className="btn btn-primary btn-sm">
                        <MDBIcon icon="plus" size="2x" />
                      </MDBBtn>);
  return (
    <MDBContainer>
      <MDBRow className="mb-3">
        <MDBCol>
          <Autocomplete
              multiple
              id="patientSurgicalInterventions"
              options={api.surgicalinterventions}
              getOptionLabel={option => option.name}
              onChange={(event, newValue) => {setPatientSurgicalInterventions(newValue)}}
              renderInput={params => (
                <TextField {...params} label="Intervenciones Quirurgicas" variant="outlined" fullWidth/>
              )}
          />
        </MDBCol>
        <MDBCol>
          <Autocomplete
            multiple
            id="patientAllegies"
            options={api.allergies}
            getOptionLabel={option => option.name}
            onChange={(event, newValue) => {setPatientAllergies(newValue)}}
            renderInput={params => (
              <TextField {...params} label="Alergias" variant="outlined" fullWidth/>
            )}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol>
            <br/>
            <MDBContainer>
              <TooltipButton helperMessage={"Agregar Medicamento"} component={AddBtn} placement="right"/>
              <MDBDataTable
                striped bordered searchLabel="Buscar"
                responsiveSm={true} small hover entries={5}
                btn={true} data={medicationActions.medicationTable} noRecordsFoundLabel="No se han encontrado datos"
                entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
                paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
              />
            </MDBContainer>
            <MDBModal isOpen={medicationActions.medicationModal} toggle={medicationActions.toggleMedication} size="lg">
              <PatientMedications
                toggleMedication={medicationActions.toggleMedication}
                api={api}
                createMedication={medicationActions.createMedication}
                editMedication={medicationActions.editMedication}
                edit={medicationActions.edit}
                medicationEditObject={medicationActions.medicationEditObject}
              />
            </MDBModal>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default PathologicalHistory;