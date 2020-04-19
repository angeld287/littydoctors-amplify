import React, { Component, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable, MDBModal } from "mdbreact";

import useNewPostConsultationsActivity from './useNewPostConsultationsActivity';
import NewMedicalPrescription from './NewMedicalPrescription';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import TooltipButton from '../../../../../../TooltipButton';

const NewPostConsultationsActivity = ({
    global: global,
    setGlobalData: setGlobalData,
    setNew: setNew,
    api : api,
}) => {
  const { editObject, edit, toggle, table, loadingButton, editMedicalPrescription, removeMedicalPrescription, _createMedicalPrescription, setPrescriptionMedication, modal, setModal, items, register, loading, handleSubmit, onSubmit, formState, setMedicalAnalysis, setSurgicalIntervention } = useNewPostConsultationsActivity(global, setGlobalData, setNew);
  
  useEffect(() => {
      let didCancel = false;

      return () => {
          didCancel = true;
      };

  }, []);

  const addBtn = (<MDBBtn className="btn btn-outline-blue" type="submit" disabled={formState.isSubmitting}><MDBIcon size="2x" icon="plus" className="blue-text" /></MDBBtn>);

  return (
    <MDBContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Prescripciones Medicas</strong></h6>
      <MDBBtn onClick={toggle} disabled={loadingButton} className="btn btn-primary btn-sm">
        <MDBIcon size="2x" icon="plus" />
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
              createMedicalPrescription={_createMedicalPrescription}
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
              {!loading && <TooltipButton helperMessage={"Crear Actividades Post Consulta"} component={addBtn} placement="top"/>}
              {loading && <MDBSpinner small />}
					</div>
      </form>
    </MDBContainer>
  );
}

export default NewPostConsultationsActivity;