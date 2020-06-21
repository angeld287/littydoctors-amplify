import React, { useState } from 'react';

import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox, MDBBtnGroup,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBFileInput, MDBListGroup, MDBListGroupItem, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { API, graphqlOperation } from 'aws-amplify';

import UsePatientDetails from './usePatientDetails';
import { updateMedicalHistory } from '../../../../../graphql/mutations';
import moment from 'moment';
import Swal from 'sweetalert2';

import AnalysisResults from './AnalysisResults/Add';
import EditAnalysisResults from './AnalysisResults/Edit';

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


  const { setDate, setAnalysisList, loadingHistory, data, loadingPDF, editResultModal, setEditResultModal, loading, analysis, loadingAnal, completeResultModal, setCompleteResultModal, setResultLoading, setEditResultLoading, analysisToEdit, PDFModal, setPDFModal, setPdfFile, putPdfonStorage } = UsePatientDetails(childProps, patientData, global, setGlobalData);

  const calcAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
  }

  const age = calcAge(patientData.birthdate);

  const marital_status =  patientData.marital_status === "MARRIED" ? (patientData.sex === 'MALE' ? 'Casado' : 'Casada') :
                          patientData.marital_status === "SINGLE" ? (patientData.sex === 'MALE' ? 'Soltero' : 'Soltera') :
                          patientData.marital_status === "DIVORCED" ? (patientData.sex === 'MALE' ? 'Divorciado' : 'Divorciada') :
                          patientData.marital_status === "WIDOWED" ? (patientData.sex === 'MALE' ? 'Viudo' : 'Viuda') : "N/A";

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
  const shared = patientData.approved_terms_conditions === "true" || (patientData.owner === childProps.state.doctorusername);
  const location = shared ? String(patientData.address) : "Republica Dominicana";
  const locationUrl = location.split(' ').join('%20');
  const z = shared ? 15 : 7;
  const mapUrl = "https://maps.google.com/maps?q="+locationUrl+"&t=&z="+z+"&ie=UTF8&iwloc=&output=embed";

  const toggleResult = () => {
    setCompleteResultModal(false)
  }

  const toggleEditResult = () => {
    setEditResultModal(false)
  }

  const togglePDF = () => {
    setPDFModal(false);
  }

  const userPicture = patientData.sex === "MALE" ? "https://icons-for-free.com/iconfiles/png/512/boy+guy+man+icon-1320166733913205010.png" :
                      "https://i.ya-webdesign.com/images/girl-avatar-png.png";

  const completeResultData = (<MDBModal isOpen={completeResultModal} toggle={toggleResult}>
                                <MDBModalHeader toggle={toggleResult}>Agregar Datos de Resultados</MDBModalHeader>
                                <MDBModalBody>
                                  <AnalysisResults setAnalysisList={setAnalysisList} setResultLoading={setResultLoading} result={analysisToEdit} global={{global: global, setGlobalData: setGlobalData}} toggleResult={toggleResult}/>
                                </MDBModalBody>
                              </MDBModal>);

  const editResultData = (<MDBModal isOpen={editResultModal} toggle={toggleEditResult}>
                                <MDBModalHeader toggle={toggleEditResult}>Agregar Datos de Resultados</MDBModalHeader>
                                <MDBModalBody>
                                  <EditAnalysisResults setAnalysisList={setAnalysisList} setResultLoading={setEditResultLoading} result={analysisToEdit} global={{global: global, setGlobalData: setGlobalData}} toggleResult={toggleEditResult}/>
                                </MDBModalBody>
                              </MDBModal>);

const addPDF = (<MDBModal isOpen={PDFModal} toggle={togglePDF}>
                  <MDBModalHeader toggle={togglePDF}>Agregar PDF de Resultados</MDBModalHeader>
                  <MDBModalBody>
                    {!loadingPDF && 
                      <div>
                          <MDBFileInput className="mb-3" accept='application/pdf' getValue={(e) => setPdfFile(e)}/>
                          <MDBBtnGroup disabled><label>Fecha de Analisis: </label> <input className="ml-4" type="date" onChange={e => setDate(moment(e.target.value).format('YYYY-MM-DD'))}></input></MDBBtnGroup>
                      </div>}
                    {loadingPDF && <MDBContainer><MDBBox display="flex" justifyContent="center" className="mt-3"><MDBSpinner big/></MDBBox></MDBContainer>}
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={togglePDF}>Cancelar</MDBBtn>
                    <MDBBtn color="primary" onClick={putPdfonStorage}>Guardar</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>);

  const patientDataList = (<MDBCard style={{ width: "100%" }}> 
                            <MDBListGroup style={{ width: "22rem" }}>
                              <MDBListGroupItem>Email: {shared ? patientData.email : "dato no compartido"}</MDBListGroupItem>
                              <MDBListGroupItem>Telefono: { shared ? patientData.phone : "dato no compartido"}</MDBListGroupItem>
                              <MDBListGroupItem>Edad: {age} años</MDBListGroupItem>
                              <MDBListGroupItem>Sexo: {patientData.sex === 'MALE' ? 'Hombre' : 'Mujer'}</MDBListGroupItem>
                              <MDBListGroupItem>Cedula: { shared ? (patientData.id_card) : "dato no compartido"}</MDBListGroupItem>
                              <MDBListGroupItem>Religion: {shared ? (patientData.religion === null ? "N/A" : patientData.religion.name) : "dato no compartido"}</MDBListGroupItem>
                              <MDBListGroupItem>Estado Civil: {shared ? marital_status : "dato no compartido"}</MDBListGroupItem>
                            </MDBListGroup>
                          </MDBCard>);


  return (
    <div>
      {editResultData}
      {completeResultData}
      {addPDF}
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
          <MDBCard style={{ width: '100%' }}>
            <MDBContainer style={{marginBottom: 20 }}>
              <h4 className="text-center font-weight-bold pt-4 pb-2 mb-2"><strong>Analisis pendientes</strong> {(loadingPDF || loadingAnal) &&  <MDBSpinner small/>} </h4>
              <MDBTable scrollY maxHeight="300px">
                <MDBTableHead columns={analysis.columns} />
                <MDBTableBody rows={analysis.rows} />
              </MDBTable>
            </MDBContainer>
          </MDBCard>
        </MDBCol>
        <MDBCol md="3" className="m-1">
          {shared && patientDataList}
          {!shared && <TooltipButton component={patientDataList} helperMessage={"Para poder ver los datos no compartidos, el paciente debe iniciar sesion en la plataforma y aprobar los terminos y condiciones"} placement="left"/>}
        </MDBCol>
      </MDBRow>
      <br/>
      <MDBRow>
        <MDBCol md="12">
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
      </MDBRow>
      <MDBRow className="mt-4">
          <MDBCol md="12">
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
      </MDBRow>
    </div>
  );
}

export default PatientDetails;