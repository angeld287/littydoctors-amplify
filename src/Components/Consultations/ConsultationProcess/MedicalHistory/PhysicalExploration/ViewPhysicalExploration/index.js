import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBModal, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBModalBody, MDBModalHeader, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import ChartsPage from '../../../../../Reports/graphics/ChartsPage';
import moment from 'moment';
import { API, graphqlOperation } from 'aws-amplify';

import { listMedicalConsultationsForVSHG } from '../../../../../../graphql/custom-queries';

import TooltipButton from '../../../../../TooltipButton';

const ViewPhysicalExploration = ({
    global: global,
    setEdit: setEdit,
    editLoading: editLoading,
    fieldsForm: fieldsForm,
    setFieldsForm: setFieldsForm
}) => {
  const [ topRigth, setTopRigth ] = useState(false);
  const [ bottomRigth, setBottomRigth ] = useState(false);
  const [ topLeft, setTopLeft ] = useState(false);
  const [ bottomLeft, setBottomLeft ] = useState(false);
  const [ state, setState ] = useState({});

  const _state = {
    dataLine: {
      labels: [],
      datasets: [
        {
          label: "",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    }
  };

  const _datasets = {
    label: "",
    fill: true,
    lineTension: 0.3,
    backgroundColor: "rgba(184, 185, 210, .3)",
    borderColor: "rgb(35, 26, 136)",
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: "rgb(35, 26, 136)",
    pointBackgroundColor: "rgb(255, 255, 255)",
    pointBorderWidth: 10,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "rgb(0, 0, 0)",
    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: []
  };


  const editData = () => {
    setEdit(true);
  }

  const getHistoryVitalsSigns = (field) => {
    const items = global.consultationsHistoryData.medicalHistoryItems.sort((a,b) => { return new Date(a.startedAt) - new Date(b.startedAt)});
    items.forEach(e => {
      _state.dataLine.labels.push(moment(e.startedAt).format('DD/MM/YY'));
      if (field === "blood_pressure") {
        const blood_pressure = e.medicalHistory.physicalExploration === null ? '0/0 mm/Hg' : e.medicalHistory.physicalExploration.vitalsign.blood_pressure;
          const mm = blood_pressure.match(/((.*?)\/[0-9]{1,3})/) !== null ? blood_pressure.match(/((.*?)\/[0-9]{1,3})/)[2] : 0;
          const hg = blood_pressure.match(/([0-9]{1,3}\/(.*?) m)/) !== null ? blood_pressure.match(/([0-9]{1,3}\/(.*?) m)/)[2] : 0;
          _state.dataLine.datasets[0].data.push(mm);
          _state.dataLine.datasets[0].label = "Presion de S. (mm)";
          _state.dataLine.datasets[1] = _datasets;
          _state.dataLine.datasets[1].data.push(hg);
          _state.dataLine.datasets[1].label = "Presion de S. (Hg)";

      }else{
          _state.dataLine.datasets[0].label = "Signos Vitales - "+field;
          _state.dataLine.datasets[0].data.push(e.medicalHistory.physicalExploration === null ? 0 : e.medicalHistory.physicalExploration.vitalsign[field]);
      }
    });
    setState(_state);
  }

  const _topLeft = () => {getHistoryVitalsSigns("breathing");setTopLeft(!topLeft)}
  const _topRigth = () => {getHistoryVitalsSigns("pulse");setTopRigth(!topRigth)}
  const _bottomLeft = () => {getHistoryVitalsSigns("blood_pressure");setBottomLeft(!bottomLeft)}
  const _bottomRigth = () => {getHistoryVitalsSigns("temperature");setBottomRigth(!bottomRigth)}

  const physicalexploration = global.medicalConsultation.medicalHistory.physicalExploration;

  const vs = physicalexploration.vitalsign;
  const re = physicalexploration.regionalExploration;

  const editBtn = (<MDBBtn className="btn btn-outline-blue" disabled={false} onClick={editData}><MDBIcon size="lg" icon="edit" /></MDBBtn>);
  const graphicB = (<a className="fb-ic mr-3 pt-1" onClick={_topLeft}><MDBIcon className="btn-outline-blue ml-2 p-1" icon="chart-line" size="lg" /></a>);
  const graphicP = (<a className="fb-ic mr-3 pt-1" onClick={_topRigth}><MDBIcon className="btn-outline-blue ml-2 p-1" icon="chart-line" size="lg" /></a>);
  const graphicBl = (<a className="fb-ic mr-3 pt-1" onClick={_bottomLeft}><MDBIcon className="btn-outline-blue ml-2 p-1" icon="chart-line" size="lg" /></a>);
  const graphicT = (<a className="fb-ic mr-3 pt-1" onClick={_bottomRigth}><MDBIcon className="btn-outline-blue ml-2 p-1" icon="chart-line" size="lg" /></a>);
  
  return (
    <MDBContainer>
          <div className="form-group">
            <label htmlFor="general_exploration">Exploracion General</label>
          </div>
          <textarea value={physicalexploration.general_exploration === null ? "" : physicalexploration.general_exploration} disabled name="general_exploration" className="form-control" id="general_exploration" rows="7" ></textarea>
          <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Signos Vitales</strong></h6>
          <MDBRow className="mb-3">
            <MDBCol md="6">
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2">
                  <span className="input-group-text" id="basic-addon">Respiraciones por Min</span>
                </div>
                <input disabled={true} defaultValue={vs.breathing === null ? "N/A" : vs.breathing} className="form-control" aria-describedby="basic-addon" />
                <div className="input-group-prepend">
                  <TooltipButton helperMessage={"Ver Historico"} component={graphicB} placement="left"/>
                </div>
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2">
                  <span className="input-group-text" id="basic-addon">Pulso (Latidos/Seg)</span>
                </div>
                <input disabled={true} defaultValue={vs.pulse === null ? "N/A" : vs.pulse} className="form-control" aria-describedby="basic-addon" />
                <div className="input-group-prepend">
                  <TooltipButton helperMessage={"Ver Historico"} component={graphicP} placement="left"/>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol md="6">
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2">
                  <span className="input-group-text" id="basic-addon">Presion de Sangre</span>
                </div>
                <input disabled={true} defaultValue={vs.blood_pressure === null ? "N/A" : vs.blood_pressure} className="form-control" aria-describedby="basic-addon" />
                <div className="input-group-prepend">
                  <TooltipButton helperMessage={"Ver Historico"} component={graphicBl} placement="left"/>
                </div>
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2">
                  <span className="input-group-text" id="basic-addon">Temperatura (°F).</span>
                </div>
                <input disabled={true} defaultValue={vs.temperature === null ? "N/A" : vs.temperature} className="form-control" aria-describedby="basic-addon" />
                <div className="input-group-prepend">
                  <TooltipButton helperMessage={"Ver Historico"} component={graphicT} placement="left"/>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
          <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Exploracion Regional</strong></h6>
          <MDBRow className="mb-3">
            <MDBCol>
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2"><span className="input-group-text" id="basic-addon">Cabeza</span></div>
                <input disabled={true} defaultValue={re.head === null ? "N/A" : re.head} className="form-control" aria-describedby="basic-addon" />
              </div>
            </MDBCol>
            <MDBCol>
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2"><span className="input-group-text" id="basic-addon">Cuello</span></div>
                <input disabled={true} defaultValue={re.neck === null ? "N/A" : re.neck} className="form-control" aria-describedby="basic-addon" />
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2"><span className="input-group-text" id="basic-addon">Torax</span></div>
                <input disabled={true} defaultValue={re.thorax === null ? "N/A" : re.thorax} className="form-control" aria-describedby="basic-addon" />
              </div>
            </MDBCol>
            <MDBCol>
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2"><span className="input-group-text" id="basic-addon">Abdomen</span></div>
                <input disabled={true} defaultValue={re.abdomen === null ? "N/A" : re.abdomen} className="form-control" aria-describedby="basic-addon" />
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBCol>
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2"><span className="input-group-text" id="basic-addon">Miembro</span></div>
                <input disabled={true} defaultValue={re.members === null ? "N/A" : re.members} className="form-control" aria-describedby="basic-addon" />
              </div>
            </MDBCol>
            <MDBCol>
              <div className="input-group mt-2">
                <div className="input-group-prepend mr-2"><span className="input-group-text" id="basic-addon">Genitales</span></div>
                <input disabled={true} defaultValue={re.genitals === null ? "N/A" : re.genitals} className="form-control" aria-describedby="basic-addon" />
              </div>
            </MDBCol>
          </MDBRow>
          <div className="form-group">
            <label htmlFor="others">Exploracion Regional por Especialidad</label>
            <MDBCard>
              <MDBContainer className="m-1">{fieldsForm}</MDBContainer>
            </MDBCard>
          </div>
          <div className="text-center py-4 mt-3">
              {!editLoading && <TooltipButton helperMessage={"Editar Exploracion Fisica"} component={editBtn} placement="top"/>}
              {editLoading && <MDBSpinner small />}
					</div>
          <MDBModal isOpen={topLeft} toggle={_topLeft} side position="top-left"><MDBModalHeader toggle={_topLeft}><p>Historico Respiraciones por Min</p></MDBModalHeader><ChartsPage state={state} options={{ responsive: true, /* scales: { yAxes: [ { ticks: { min: 0 } } ] }  */}} /></MDBModal>
          <MDBModal isOpen={topRigth} toggle={_topRigth} side position="top-right"><MDBModalHeader toggle={_topRigth}><p>Historico Pulso (Latidos/Seg)</p></MDBModalHeader><ChartsPage state={state} options={{ responsive: true, /* scales: { yAxes: [ { ticks: { min: 0 } } ] }  */}}/></MDBModal>
          <MDBModal isOpen={bottomLeft} toggle={_bottomLeft} side position="bottom-left"><MDBModalHeader toggle={_bottomLeft}><p>Historico Presion de Sangre</p></MDBModalHeader><ChartsPage state={state} options={{ responsive: true, /* scales: { yAxes: [ { ticks: { min: 0 } } ] }  */}}/></MDBModal>
          <MDBModal isOpen={bottomRigth} toggle={_bottomRigth} side position="bottom-right"><MDBModalHeader toggle={_bottomRigth}><p>Historico Temperatura</p></MDBModalHeader><ChartsPage state={state} options={{ responsive: true, /* scales: { yAxes: [ { ticks: { min: 0 } } ] }  */}}/></MDBModal>
    </MDBContainer>
  );
}

export default ViewPhysicalExploration;