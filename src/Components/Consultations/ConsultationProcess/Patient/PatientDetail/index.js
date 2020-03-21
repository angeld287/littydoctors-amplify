import React, { useState, useEffect, Fragment } from 'react';

import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";
import { API, graphqlOperation } from 'aws-amplify';

import UsePatientDetails from './usePatientDetails';
import { updateMedicalHistory } from '../../../../../graphql/mutations';
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

  const [ loadingButton, setLoadingButton ] = useState(false);
  const [ withoutReason, setWithoutReason ] = useState(global.medicalConsultation.medicalHistory.reason === "N/A");
  const [ reason, setReason ] = useState(global.medicalConsultation.medicalHistory.reason);
  const [ edit, setEdit ] = useState(false);


  const { loadingHistory, data } = UsePatientDetails(childProps, patientData, global, setGlobalData);
  const age = moment(new Date()).format('YYYY') - moment(patientData.birthdate).format('YYYY');


  const EditingReason = () => {  
    setEdit(true);
  }

  const updateReason = async () => {
    setLoadingButton(true);
    const medicalHistory = global.medicalConsultation.medicalHistory;
    const input = {};
    input.reason = reason;
    input.id = medicalHistory.id;
    const cmh = await API.graphql(graphqlOperation(updateMedicalHistory, {input: input} )).catch( e => {console.log(e); setLoadingButton(false); throw new SyntaxError("Error GraphQL"); });
    global.medicalConsultation.medicalHistory = cmh.data.updateMedicalHistory;
    setGlobalData(global);
    setLoadingButton(false);
  }

  const saveReason = () => {
    updateReason();
    setEdit(false);
  }

  const addReason = () => {
    updateReason();
    setWithoutReason(false);
  }

  const Buttons = (
    <div>
      {withoutReason &&<MDBBtn className="btn btn-outline-blue" onClick={addReason} disabled={reason === "N/A"  && reason === ""}><MDBIcon icon="plus" size="2x" /></MDBBtn>}
      {(!withoutReason && !edit) &&<MDBBtn className="btn btn-outline-blue" onClick={EditingReason} disabled={reason === ""}><MDBIcon icon="edit" size="2x" /></MDBBtn>}
      {(!withoutReason && edit) &&<MDBBtn className="btn btn-outline-blue" onClick={saveReason} disabled={reason === ""}><MDBIcon icon="save" size="2x" /></MDBBtn>}
    </div>
  );

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
            <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Razon de Consulta Medica</strong></h4>
            <div style={{marginRight: 30, marginLeft: 30}}>
              <MDBInput type="textarea" label="Describa la razon de consulta" value={reason} disabled={!withoutReason && !edit} rows="6" onChange={ e => {e.preventDefault(); setReason(e.target.value)}}/>
            </div>
            <div className="text-center mt-1">
                  {!loadingButton && 
                      Buttons
                  }
                  {loadingButton && <MDBSpinner small />}
			    	</div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <br/>
      <MDBRow>
        <MDBCol md="6">
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
        <MDBCol md="6">
          <MDBCard style={{ width: '100%' }}>
            <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Analisis pendientes</strong></h4>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default PatientDetails;