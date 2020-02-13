import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import usePathologicalHistory from './usePathologicalHistory';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const PathologicalHistory = (
                      {
                        setPatientMedications: setPatientMedications,
                        setPatientAllergies: setPatientAllergies,
                        setPatientSurgicalInterventions: setPatientSurgicalInterventions,
                        api: api
                      } 
                   ) => {
      const { alcohol, setAlcoholValue, smoking, setSmokingValue, drugs, setDrugsValue, immunizations, setImmunizationsValue } = usePathologicalHistory();
  return (
    <MDBContainer>
      <MDBRow className="mb-3">
        <MDBCol>
          <Autocomplete
            multiple
            id="patientMedications"
            options={api.medications}
            getOptionLabel={option => option.name}
            onChange={(event, newValue) => {setPatientMedications(newValue)}}
            renderInput={params => (
              <TextField {...params} label="Medicaciones" variant="outlined" fullWidth/>
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
      </MDBRow>
    </MDBContainer>
  );
}

export default PathologicalHistory;