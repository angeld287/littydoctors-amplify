import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import useMedicalHistory from './useMedicalHistory';
import NewMedicalHistory from './NewMedicalHistory';

const MedicalHistory = ({childProps: childProps, patientData: patientData, global: global, setGlobalData: setGlobalData}) => {
  const { loading, error } = useMedicalHistory(childProps, patientData, global, setGlobalData);

    if (loading) {
      return (
        <MDBContainer>
          <MDBBox display="flex" justifyContent="center" className="mt-5">
            <MDBSpinner big/>
          </MDBBox>
        </MDBContainer>
      );
    }

    if (error) return <h2 className="text-center font-weight-bold pt-6 pb-2 mb-2">Ha ocurrido un error</h2>;

  return (
    <div>
        <h3 className="font-weight-bold pl-0 my-4">
          <strong>Antecedentes</strong>
        </h3>

        {global.patient.patientHistory === null &&
        ( 
          <div>
            <NewMedicalHistory/>
          </div>
        )}
        {global.patient.patientHistory !== null &&
        (
          <div>
            <h5 className="font-weight-bold pl-0 my-4">
              <strong>Personales Patológicos</strong>
            </h5>
            <MDBRow>
              <MDBCol>
                <MDBInput label="Cardiovasculares" type="checkbox" id="checkbox" />
                <MDBInput label="Pulmonares" type="checkbox" id="checkbox"/>
                <MDBInput label="Renales" type="checkbox" id="checkbox"/>
                <MDBInput label="Quirúrgicos" type="checkbox" id="checkbox"/>
              </MDBCol>
              <MDBCol>
                <MDBInput label="Digestivos" type="checkbox" id="checkbox"/>
                <MDBInput label="Alérgicos" type="checkbox" id="checkbox"/>
                <MDBInput label="Transfusiones" type="checkbox" id="checkbox"/>
                <MDBInput label="Diabetes" type="checkbox" id="checkbox"/>
              </MDBCol>
            </MDBRow>
            <MDBInput label="Medicamentos" className="mt-4" />
            <MDBInput label="Especifique" className="mt-4" />
            
            <br/>
            <h5 className="font-weight-bold pl-0 my-4">
              <strong>Personales No Patológicos</strong>
            </h5>
            <br/>
            <h5 className="font-weight-bold pl-0 my-4">
              <strong>Familiares</strong>
            </h5>
            <MDBInput type="checkbox" label="Padre Vivo" className="mt-4" />
            <MDBInput label="Enfermedades que padece" className="mt-4" />
            <br/>
            <MDBInput type="checkbox" label="Madre Viva" className="mt-4" />
            <MDBInput label="Enfermedades que padece" className="mt-4" />
          </div>
        )}
    </div>
  );
}

export default MedicalHistory;