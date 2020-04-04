import React, { useState } from 'react';

import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { API, graphqlOperation } from 'aws-amplify';

import UsePatientDetails from './usePatientDetails';
import { updateMedicalHistory } from '../../../../../graphql/mutations';
import moment from 'moment';
import Swal from 'sweetalert2';

import TooltipButton from '../../../../TooltipButton';

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


  const { loadingHistory, data, lastMC, loading, analysis, loadingAnal } = UsePatientDetails(childProps, patientData, global, setGlobalData);
  const age = moment(new Date()).format('YYYY') - moment(patientData.birthdate).format('YYYY');

  const marital_status =  patientData.marital_status === "MARRIED" ? (patientData.sex === 'MAN' ? 'Casado' : 'Casada') :
                          patientData.marital_status === "SINGLE" ? (patientData.sex === 'MAN' ? 'Soltero' : 'Soltera') :
                          patientData.marital_status === "DIVORCED" ? (patientData.sex === 'MAN' ? 'Divorciado' : 'Divorciada') :
                          patientData.marital_status === "WIDOWED" ? (patientData.sex === 'MAN' ? 'Viudo' : 'Viuda') : "N/A";

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

  if (loading) return (<MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-5"><MDBSpinner big/></MDBBox></MDBContainer>)

  const editBtn = (<MDBBtn className="btn btn-outline-blue" onClick={EditingReason} disabled={reason === ""}><MDBIcon icon="edit" size="2x" /></MDBBtn>);
  const addBtn = (<MDBBtn className="btn btn-outline-blue" onClick={addReason} disabled={reason === "N/A"  && reason === ""}><MDBIcon icon="plus" size="2x" /></MDBBtn>);
  const saveBtn = (<MDBBtn className="btn btn-outline-blue" onClick={saveReason} disabled={reason === ""}><MDBIcon icon="save" size="2x" /></MDBBtn>);
  const cancelBtn = (<MDBBtn className="btn btn-outline-blue" onClick={ e => {e.preventDefault(); setEdit(false);}} disabled={reason === ""}><MDBIcon icon="times" size="2x" /></MDBBtn>);

  const Buttons = (
    <div>
      {withoutReason && <TooltipButton component={addBtn} helperMessage={"Agregar Motivo"} placement="top"/>}
      {(!withoutReason && !edit) && <TooltipButton component={editBtn} helperMessage={"Editar Motivo"} placement="top"/>}
      {(!withoutReason && edit) && <TooltipButton component={saveBtn} helperMessage={"Guardar Motivo"} placement="top"/>}
      {(!withoutReason && edit) && <TooltipButton component={cancelBtn} helperMessage={"Cancelar Edicion"} placement="top"/>}
    </div>
  );

  const location = String(patientData.address);
  const locationUrl = location.split(' ').join('%20');
  const mapUrl = "https://maps.google.com/maps?q="+locationUrl+"&t=&z=15&ie=UTF8&iwloc=&output=embed";


  const userPicture = patientData.sex === "MAN" ? "https://icons-for-free.com/iconfiles/png/512/boy+guy+man+icon-1320166733913205010.png" :
                      "https://i.ya-webdesign.com/images/girl-avatar-png.png";

  return (
    <div>
      <MDBRow>
        <MDBCol md="4">
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage className="img-fluid" src={userPicture} waves />
            <MDBCardBody>
              <MDBCardTitle>{patientData.name}</MDBCardTitle>
              <MDBCardText>
                {patientData.username}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="8">
          <MDBCard style={{ width: '100%' }}>
            <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Motivo de Consulta Medica</strong></h4>
            <div style={{marginRight: 30, marginLeft: 30}}>
              <MDBInput style={{overflowY:'scroll'}} type="textarea" label="Describa la razon de consulta" value={reason} rows="6" 
                onChange={ e => 
                    {
                      e.preventDefault(); 
                      if (!withoutReason && !edit) {
                        return false;
                      }else{
                        setReason(e.target.value)
                      }
                    }
                  }
              />
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
        <MDBCol md="8">
          <div id="map-container" className="rounded z-depth-1-half map-container" style={{ height: "400px" }}>
            <iframe
              src={mapUrl}
              title="This is a unique title"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
            />
          </div>
        </MDBCol>
        <MDBCol md="3" className="m-1">
          <MDBCard style={{ width: "100%" }}> 
            <MDBListGroup style={{ width: "22rem" }}>
              <MDBListGroupItem>Email: {patientData.email}</MDBListGroupItem>
              <MDBListGroupItem>Telefono: {patientData.phone}</MDBListGroupItem>
              <MDBListGroupItem>Edad: {age} años</MDBListGroupItem>
              <MDBListGroupItem>Sexo: {patientData.sex === 'MAN' ? 'Hombre' : 'Mujer'}</MDBListGroupItem>
              <MDBListGroupItem>Cedula: {patientData.id_card}</MDBListGroupItem>
              <MDBListGroupItem>Religion: {patientData.religion.name}</MDBListGroupItem>
              <MDBListGroupItem>Estado Civil: {marital_status}</MDBListGroupItem>
            </MDBListGroup>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <br/>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard style={{ width: '100%' }}>
             <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Historial de Consultas</strong></h4>
            {!loadingHistory &&
              <MDBContainer style={{marginBottom: 20}}>
                <MDBTable scrollY>
                  <MDBTableHead columns={data.columns} />
                  <MDBTableBody rows={data.rows} />
                </MDBTable>
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
                <MDBContainer style={{marginBottom: 20}}>
                  <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Analisis pendientes</strong> {loadingAnal &&  <MDBSpinner small/>} </h4>
                  <MDBTable scrollY>
                    <MDBTableHead columns={analysis.columns} />
                    <MDBTableBody rows={analysis.rows} />
                  </MDBTable>
                </MDBContainer>
            </MDBCard>
          </MDBCol>
      </MDBRow>
    </div>
  );
}

export default PatientDetails;