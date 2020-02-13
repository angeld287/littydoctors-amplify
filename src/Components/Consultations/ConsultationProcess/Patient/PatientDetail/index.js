import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";
import { API, graphqlOperation } from 'aws-amplify';

import UsePatientDetails from './usePatientDetails';
import { createPatient } from '../../../../../graphql/mutations';
import moment from 'moment';
import Swal from 'sweetalert2';

const PatientDetails = (
                      {
                        patientData: patientData,
                        childProps: childProps,
                        global: global,
                        setGlobalData: setGlobalData
                      }
                   ) => {

  const { loadingHistory, data } = UsePatientDetails(childProps, patientData, global, setGlobalData);
  const age = moment(new Date()).format('YYYY') - moment(patientData.birthdate).format('YYYY');

  return (
    <div>
      <MDBRow>
        <MDBCol md="4">
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage className="img-fluid" src="https://www.morpht.com/sites/morpht/files/styles/landscape/public/dalibor-matura_1.jpg" waves />
            <MDBCardBody>
              <MDBCardTitle>{patientData.name}</MDBCardTitle>
              <MDBCardText>
                {age} años, Email: {patientData.email}, Telefono: {patientData.phone}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="8">
          <MDBCard style={{ width: '100%' }}>
            <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Analisis pendientes</strong></h4>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <br/>
      <MDBRow>
        <MDBCol md="8">
          <MDBCard style={{ width: '100%' }}>
             <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Historial de Consultas</strong></h4>
            {!loadingHistory &&
              <MDBContainer>
                <MDBDataTable
                  striped
                  bordered
                  small
                  data={data}
                />
              </MDBContainer>
            }
            {loadingHistory &&
              <MDBContainer>
                <MDBBox display="flex" style={{marginBottom: 100}} justifyContent="center" className="mt-5">
                  <MDBSpinner small/>
                </MDBBox>
              </MDBContainer>
            }
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default PatientDetails;