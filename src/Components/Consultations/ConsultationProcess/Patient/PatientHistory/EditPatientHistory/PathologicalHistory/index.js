import React, { useState, Fragment, useEffect } from 'react';

import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable, MDBModal } from "mdbreact";

import Select from 'react-select';

import { createPatientAllergies, deletePatientAllergies, createPathologicalHistorySurgicalInt, deletePathologicalHistorySurgicalInt } from '../../../../../../../graphql/mutations'; 

import Swal from 'sweetalert2';
import { API, graphqlOperation } from 'aws-amplify';

import usePathologicalHistory from './usePathologicalHistory';
import PatientMedications from './PatientMedications';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


import TooltipButton from '../../../../../../TooltipButton';

const PathologicalHistory = (
                      {
                        global: global,
                        editP: editP,
                        setPatientMedications: setPatientMedications,
                        setGlobalData: setGlobalData
                      } 
                   ) => {

      const { api, 
              medicationActions, 
              edit, 
              loadingButton, 
              loading,
              medicationTable,
              setMedicationsList,

            } = usePathologicalHistory(setGlobalData, global);

  const [ allergiesToEdit, setAllergiesToEdit ] = useState([]);
  const [ surgicalInterventionsToEdit, setSurgicalInterventionsToEdit ] = useState([]);
  const [ medicationsToEdit, setMedicationsToEdit ] = useState([]);
  const [ lb_editpath, setLb_editpath ] = useState(false);



  useEffect(() => {       
      setEditObjects();
      setMedicationsList();
  }, []);

  const _surgicalInterventions = [];
  if (api.surgicalinterventions !== undefined) {
    api.surgicalinterventions.forEach(element => {
      var item = {value: element.id, label: element.name};
      _surgicalInterventions.push(item);
    });
  }

  const _allergies = [];
  if (api.allergies !== undefined) {
    api.allergies.forEach(element => {
      var item = {value: element.id, label: element.name};
      _allergies.push(item);
    });
  }

  const setEditObjects = () =>{
    const _a = [];
    const _s = [];
    const _m = [];

    global.patient.patientHistory.items[0].pathologicalHistory.patientAllergies.items.forEach( e => {
        _a.push({value: e.allergies.id, label: e.allergies.name})
    });

    global.patient.patientHistory.items[0].pathologicalHistory.surgicalInterventions.items.forEach( e => {
        _s.push({value: e.surgicalIntervention.id, label: e.surgicalIntervention.name})
    });

    global.patient.patientHistory.items[0].pathologicalHistory.patientMedications.items.forEach( e => {
        _m.push({value: e.medications.id, label: e.medications.name})
    });

    setAllergiesToEdit(_a);
    setSurgicalInterventionsToEdit(_s);
    setMedicationsToEdit(_m);
  }



  const editPathological = async () => {
      setLb_editpath(true);
      const objectToEdit = {}
      
      const _itemsS = global.patient.patientHistory.items[0].pathologicalHistory.surgicalInterventions.items;
      const _itemsA = global.patient.patientHistory.items[0].pathologicalHistory.patientAllergies.items;
      const _id = global.patient.patientHistory.items[0].pathologicalHistory.id;

      if (surgicalInterventionsToEdit !== null) {
          
          _itemsS.forEach( async (e) => {
              const sIndex = surgicalInterventionsToEdit.findIndex(x => x.value === e.surgicalIntervention.id);
              if(sIndex === -1){
                  const deletedS = await API.graphql(graphqlOperation(deletePathologicalHistorySurgicalInt, {input: {id: e.id}} ));
                  _itemsS.splice(_itemsS.findIndex(v => v.id === e.id), 1);
              }
          });

          surgicalInterventionsToEdit.forEach(async (e) => {
              const sIndex = _itemsS.findIndex(x => x.surgicalIntervention.id === e.value);
              if(sIndex === -1){
                  const input = {
                      pathologicalHistorySurgicalIntPathologicalHistoryId: global.patient.patientHistory.items[0].pathologicalHistory.id,
                      pathologicalHistorySurgicalIntSurgicalInterventionId: e.value
                  };
                  const surgery = await API.graphql(graphqlOperation(createPathologicalHistorySurgicalInt, {input: input} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); setLb_editpath(false);  });
                  const _surgicalIntervention = surgery.data.createPathologicalHistorySurgicalInt;
                  _itemsS.push(_surgicalIntervention);                    
              }
          });

          global.patient.patientHistory.items[0].pathologicalHistory.surgicalInterventions.items = _itemsS;

      }else{
          Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Favor completar el campo Intervenciones Quirurgicas',
                  showConfirmButton: false,
                  timer: 1500
          });
          setLb_editpath(false);
          return
      }

      if (allergiesToEdit !== null) {
            
          _itemsA.forEach( async (e) => {
              const aIndex = allergiesToEdit.findIndex(x => x.value === e.allergies.id);
              if(aIndex === -1){
                  const deletedfd = await API.graphql(graphqlOperation(deletePatientAllergies, {input: {id: e.id}} ));
                  _itemsA.splice(_itemsA.findIndex(v => v.id === e.id), 1);
              }
          });

          allergiesToEdit.forEach(async (e) => {
              const aIndex = _itemsA.findIndex(x => x.allergies.id === e.value);
              if(aIndex === -1){
                  const input = {
                      patientAllergiesPathologicalHistoryId: global.patient.patientHistory.items[0].pathologicalHistory.id,
                      patientAllergiesAllergiesId: e.value
                  };
                    
                  const phallergies = await API.graphql(graphqlOperation(createPatientAllergies, {input: input} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); setLb_editpath(false);  });
                  const _allergie = phallergies.data.createPatientAllergies;
                  _itemsA.push(_allergie);                    
              }
          });
      }else{
          Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Favor completar el campo Alergias',
                  showConfirmButton: false,
                  timer: 1500
          });
          setLb_editpath(false);
          return
      }

      /* const ufamilyh = await API.graphql(graphqlOperation(updateFamilyHistoryForGlobal, {input: objectToEdit} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); familyActions.setlb_family(false); });

      _items.splice(_items.findIndex(v => v.id === o.id), 1);
      _items.push(ufamilyh.data.updateFamilyHistory);
      
      global.patient.patientHistory.familyHistory.items = _items;

      setGlobalData(global); */
      
      setTimeout(() => {  
          setMedicationsList();
          setLb_editpath(false);
          editP();
      }, 2000);
  }

  if (loading) {
    return (
      <MDBContainer>
        <MDBBox display="flex" justifyContent="center" className="mt-5 mb-2">
          <MDBSpinner big />
        </MDBBox>
      </MDBContainer>
    );
  }

  const mdBtn = (<MDBBtn onClick={medicationActions.toggleMedication} disabled={medicationActions.loadingButton} className="btn btn-primary btn-sm">
                  {!medicationActions.lb_med && <MDBIcon icon="plus" size="2x" />}
                  {medicationActions.lb_med && 
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  }
                </MDBBtn>);

  const saveBtn = (<MDBBtn onClick={editPathological} disabled={lb_editpath} className="btn btn-primary btn-sm">
                  {!lb_editpath && <MDBIcon icon="save" size="2x"/>}
                  {lb_editpath && 
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  }
                </MDBBtn>);

  const cancelBtn = ( <MDBBtn onClick={editP} disabled={lb_editpath} className="btn btn-primary btn-sm">
                    <MDBIcon icon="times" size="2x"/>
                  </MDBBtn>);
  
  return (
    <MDBContainer>
      <MDBRow className="mb-3">
        <MDBCol>
            <label htmlFor="diseases" className="mt-2" >Medicamentos</label>
            <br/>
            <MDBContainer>
              
              <TooltipButton helperMessage={"Agregar Medicamento"} component={mdBtn} placement="right"/>
              <MDBDataTable
                striped bordered searchLabel="Buscar"
                responsiveSm={true} small hover entries={5}
                btn={true} data={medicationTable} noRecordsFoundLabel="No se han encontrado datos"
                entriesLabel="Cantidad" entriesOptions={[ 5, 10 ]} infoLabel={[ '', '-', 'de', 'registros' ]}
                paginationLabel={[ 'Anterior', 'Siguiente' ]} noBottomColumns={true}
              />
            </MDBContainer>
            <MDBModal isOpen={medicationActions.medicationModal} toggle={medicationActions.toggleMedication} size="lg">
              <PatientMedications
                toggleMedication={medicationActions.toggleMedication}
                api={api}
                createMedication={medicationActions.createMedication}
                editMedication={medicationActions.editMedication}
                edit={edit}
                medicationEditObject={medicationActions.medicationEditObject}
              />
            </MDBModal>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol>
          <label htmlFor="diseases" className="mt-2" >Intervenciones Quirurgicas</label>
          {!loading && <Select isMulti id="surgincalinterventions" options={_surgicalInterventions} defaultValue={surgicalInterventionsToEdit} onChange={ (v) => {setSurgicalInterventionsToEdit(v)}}/>}
          {loading && 
              <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>
          }
        </MDBCol>
        <MDBCol>
          <label htmlFor="diseases" className="mt-2" >Alergias</label>
          {!loading && <Select isMulti id="allergies" options={_allergies} defaultValue={allergiesToEdit} onChange={ (v) => {setAllergiesToEdit(v)}}/>}
          {loading && 
              <div style={{marginLeft: 10}} className="spinner-border spinner-border-sm" role="status"></div>
          }
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <TooltipButton helperMessage={"Guardar Cambios"} component={saveBtn} placement="top"/>
        <TooltipButton helperMessage={"Cancelar Cambios"} component={cancelBtn} placement="top"/>
      </MDBRow>
    </MDBContainer>
  );
}

export default PathologicalHistory;