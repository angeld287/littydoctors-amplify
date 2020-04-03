import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBModal, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable } from "mdbreact";

import Select from 'react-select';

import useEditPostConsultationsActivity from './useEditPostConsultationsActivity';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import EditMedicalPrescription from './EditMedicalPrescription';

const EditPostConsultationsActivity = ({
      global: global,
      setGlobalData: setGlobalData,
      setEdit: _setEdit,
      api : api,
  }) => {
  //const { register, loading, handleSubmit, onSubmit, formState } = usePhysicalExploration(global, setGlobalData);

  const { table, editPCActivities, toggle, _createMedicalPrescription, editMedicalPrescription, edit, editObject, modal, setViewObjects, setMedicalanalysis, 
          setSurgicalinterventions, medicalanalysis, surgicalinterventions, editLoading, addloadb } = useEditPostConsultationsActivity(global, setGlobalData, _setEdit);

  const [ loading, setloading ] = useState([]);

  const [ maoptions, setmaoptions ] = useState([]);
  const [ sioptions, setsioptions ] = useState([]);



  useEffect(() => {
      let didCancel = false;
      setloading(true);
      setViewObjects();
      setOptions();
      setloading(false);

      return () => {
          didCancel = true;
      };

  }, []);



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

  return (
    <MDBContainer>
          <h6 className="text-center font-weight-bold pt-5 pb-3 mb-2"><strong>Prescripciones Medicas</strong></h6>
          <MDBBtn onClick={toggle} disabled={loading || addloadb} className="btn btn-primary btn-sm">
            {!addloadb && <MDBIcon size="2x" icon="plus" />}
            {addloadb && <MDBSpinner small />}
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
                <EditMedicalPrescription
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
          <MDBRow className="mb-3">
            <MDBCol>
              <label htmlFor="medicalanalysis" className="mt-2" >Analisis Medicos</label>
              {!loading && <Select isMulti id="medicalanalysis" options={maoptions} defaultValue={medicalanalysis} onChange={ (v) => { setMedicalanalysis(v) }}/>}
              {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
            </MDBCol>
            <MDBCol>
              <label htmlFor="surgicalinterventions" className="mt-2" >Intervenciones Quirurgicas</label>
              {!loading && <Select isMulti id="surgicalinterventions" options={sioptions} defaultValue={surgicalinterventions} onChange={ (v) => { setSurgicalinterventions(v) }}/>}
              {loading && <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>}
            </MDBCol>
          </MDBRow>
          <div className="text-center py-4 mt-3">
              {!editLoading && <MDBBtn className="btn btn-outline-blue" disabled={false} onClick={editPCActivities}><MDBIcon size="2x" icon="save" className="blue-text" /></MDBBtn>}
              {!editLoading && <MDBBtn className="btn btn-outline-blue" disabled={false} onClick={e => {e.preventDefault(); _setEdit(false);}}><MDBIcon size="2x" icon="times" className="blue-text" /></MDBBtn>}
              {editLoading && <MDBSpinner small />}
					</div>
    </MDBContainer>
  );
}

export default EditPostConsultationsActivity;