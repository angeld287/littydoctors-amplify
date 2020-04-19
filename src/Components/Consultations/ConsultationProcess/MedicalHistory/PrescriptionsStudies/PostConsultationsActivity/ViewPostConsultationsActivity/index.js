import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
  MDBTableBody, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import Select from 'react-select';

import useViewPostConsultationsActivity from './useViewPostConsultationsActivity';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TooltipButton from '../../../../../../TooltipButton';

const ViewPostConsultationsActivity = ({
    global: global,
    setGlobalData: setGlobalData,
    setEdit: setEdit,
    editLoading: editLoading,
    api : api,
}) => {
  //const { register, loading, handleSubmit, onSubmit, formState } = usePhysicalExploration(global, setGlobalData);

  const editData = () => {
    setEdit(true);
  }

  const { table, printLoading, printPrescriptionPDF } = useViewPostConsultationsActivity(global, setGlobalData);

  const [ loading, setloading ] = useState([]);
  const [ medicalanalysis, setMedicalanalysis ] = useState([]);
  const [ surgicalinterventions, setSurgicalinterventions ] = useState([]);
  const [ maoptions, setmaoptions ] = useState([]);
  const [ sioptions, setsioptions ] = useState([]);

  const medicalConsultation = global.medicalConsultation.postConsultationsActivity;

  useEffect(() => {
    setloading(true);
    setViewObjects();
    setOptions();
    setloading(false);
  }, []);

  const setViewObjects = () =>{
    const _a = [];
    const _s = [];

    medicalConsultation.medicalAnalysis.items.forEach( e => {
        _a.push({value: e.medicalAnalysis.id, label: e.medicalAnalysis.name})
    });

    medicalConsultation.surgicalIntervention.items.forEach( e => {
        _s.push({value: e.surgicalIntervention.id, label: e.surgicalIntervention.name})
    });

    setMedicalanalysis(_a);
    setSurgicalinterventions(_s);
  }

  const setOptions = () =>{
    const _a = [];
    const _s = [];

    if (api.medicalanalysis !== undefined) {
      api.medicalanalysis.forEach( e => {
          _a.push({value: e.id, label: e.name})
      });
    }

    if (api.surgicalintervention !== undefined) {
      api.surgicalintervention.forEach( e => {
          _s.push({value: e.id, label: e.name})
      });
    }

    setmaoptions(_a);
    setsioptions(_s);   
  }

  const editBtn = (<MDBBtn className="btn btn-outline-blue" disabled={false} onClick={editData}><MDBIcon size="2x" icon="edit" className="blue-text" /></MDBBtn>);
  return (
    <MDBContainer>
          <MDBRow className="mb-3">
            <MDBCol className="">
              <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Prescripciones Medicas</strong></h6>
              <MDBContainer>
                  <MDBTable>
                    <MDBTableHead columns={table.columns} />
                    <MDBTableBody rows={table.rows} />
                  </MDBTable>
                  <div className="text-left mt-2">
                    {!printLoading && <MDBBtn className="btn btn-outline-red" disabled={false} onClick={printPrescriptionPDF}><MDBIcon size="2x" icon="print" className="red-text" /></MDBBtn>}
                    {printLoading && <MDBSpinner small />}
                  </div>
              </MDBContainer>
            </MDBCol>
            <MDBCol>
              {
                medicalanalysis.length !== 0 &&
                <MDBRow className="mt-5 mb-3">
                  <label htmlFor="medicalanalysis" className="mt-2 mr-4" >Analisis Medicos</label>
                  {!loading && <Select isDisabled={true} isMulti id="medicalanalysis" options={maoptions} defaultValue={medicalanalysis}/>}
                  {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
                </MDBRow>
              }
              {
                surgicalinterventions.length !== 0 &&
                <MDBRow className="mb-3">
                  <label htmlFor="surgicalinterventions" className="mt-2 mr-4" >Intervenciones Quirurgicas</label>
                  {!loading && <Select isDisabled={true} isMulti id="surgicalinterventions" options={sioptions} defaultValue={surgicalinterventions}/>}
                  {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
                </MDBRow>
              }
            </MDBCol>
          </MDBRow>
          <div className="text-center py-4 mt-3">
              {!editLoading && <TooltipButton helperMessage={"Editar Actividad Post Consulta"} component={editBtn} placement="top"/>}
              {editLoading && <MDBSpinner small />}
					</div>
    </MDBContainer>
  );
}

export default ViewPostConsultationsActivity;