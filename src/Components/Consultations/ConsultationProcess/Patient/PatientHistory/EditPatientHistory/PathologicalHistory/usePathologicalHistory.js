import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';

import { API, graphqlOperation } from 'aws-amplify';

import TooltipButton from '../../../../../../TooltipButton';

import { listMedicines, listCategorys, listAllergys, listSurgicalInterventions, listDiseases } from '../../../../../../../graphql/queries';
import { createPatientMedications } from '../../../../../../../graphql/mutations';

import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput, MDBIcon, MDBSpinner, MDBBox,
    MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBDatePicker, MDBDataTable, MDBModal } from "mdbreact";

import { deletePatientMedications, updatePatientMedications } from '../../../../../../../graphql/mutations';

const usePathologicalHistory = (setGlobalData, global) => {

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    const [ api, setApi ] = useState(false);

    const [ medication, setMedication ] = useState([]);
	const [ medicationTable, setMedicationTable ] = useState([]);
	const [ medicationModal, setMedicationModal ] = useState(false);
    const [ medicationEditObject, setMedicationEditObject ] = useState({});
    const [ lb_med, setlb_med ] = useState(false);

    useEffect(() => {
        let didCancel = false;
        let api = {};

        const fetch = async () => {            
            try {
				const _surgicalInterventions = await API.graphql(graphqlOperation(listSurgicalInterventions, {limit: 400}));
				const _allergies = await API.graphql(graphqlOperation(listAllergys, {limit: 400}));                
				const _medications = await API.graphql(graphqlOperation(listMedicines, {limit: 400}));                

                api = {
                    medications: _medications.data.listMedicines.items,
                    allergies: _allergies.data.listAllergys.items,
                    surgicalinterventions: _surgicalInterventions.data.listSurgicalInterventions.items,
                };

                setApi(api);
                //setList();
                
                setGlobalData(global);
                setLoading(false);

            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        setLoading(true);
        fetch();

        return () => {
            didCancel = true;
        };

    }, []);


    //funciones de medicamentos
    const toggleMedication = () => {
        setMedicationModal(!medicationModal)
        setEdit(false);
    }

    const createdMedication = () => {
		var formated = [];
		medication.forEach((item) => {
			formated.push({
				medication: item.medication.label,
				drug_concentration: item.drug_concentration,
				options: (<Fragment><MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeMedication(item.id)}}><MDBIcon icon="trash" size="2x"/></MDBBtn><MDBBtn size="sm" onClick={(e) => {e.preventDefault(); openMedicationModalToEdit(item)}}><MDBIcon icon="edit" size="2x"/></MDBBtn></Fragment>)
			});
		});
        const medicationtable = {
			columns: [ { label: 'Medicamento', field: 'medication', sort: 'asc' }, { label: 'Concentracion', field: 'drug_concentration', sort: 'asc' }, { label: 'Opciones', field: 'options', sort: 'disabled' }],
			rows: formated
		};
        setMedicationTable(medicationtable);
        global.patientHistory.medication = {
            table: medicationtable,
            items: medication
        };
        setGlobalData(global);
	};

    const createMedication = async (o) => {

        setlb_med(true);
        const _items = global.patient.patientHistory.pathologicalHistory.patientMedications.items;
        
        const input = {
            patientMedicationsPathologicalHistoryId: global.patient.patientHistory.pathologicalHistory.id,
            patientMedicationsMedicationsId: o.medication.value,
            drug_concentration: o.drug_concentration
        };
        const medications = await API.graphql(graphqlOperation(createPatientMedications, {input: input} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); });

        const _patientMedications = medications.data.createPatientMedications;
        _items.push(_patientMedications);
        global.patient.patientHistory.pathologicalHistory.patientMedications.items = _items;
        setGlobalData(global);
        
        setTimeout(() => {  
            setMedicationsList()
            setlb_med(false);   
        }, 2000);
    }

    const openMedicationModalToEdit = (o) => {
        setEdit(true);
        setMedicationModal(true);
        setMedicationEditObject(o);
    }


    const editMedication = async (o) => {
        medicationActions.setlb_med(true);
        const objectToEdit = {}
        
        const _items = global.patient.patientHistory.pathologicalHistory.patientMedications.items;
        objectToEdit.id = o.id;
        
        const item = _items[_items.findIndex(v => v.id === o.id)];
        
        if(o.drug_concentration !== item.drug_concentration){objectToEdit.drug_concentration = o.drug_concentration;}
        if(o.medication.value !== item.medications.id){objectToEdit.patientMedicationsMedicationsId = o.medication.value;}

        const medications = await API.graphql(graphqlOperation(updatePatientMedications, {input: objectToEdit} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); medicationActions.setlb_med(false); });

        _items.splice(_items.findIndex(v => v.id === o.id), 1);
        _items.push(medications.data.updatePatientMedications);
        
        global.patient.patientHistory.pathologicalHistory.patientMedications.items = _items;

        setGlobalData(global);
        
        setTimeout(() => {  
            setMedicationsList();
            medicationActions.setlb_med(false);
        }, 2000);
    }

    const setMedicationsList = () => {
      const data = global.patient.patientHistory.pathologicalHistory.patientMedications;
          var formated = [];
          const items = data.items.sort((a,b) => { return new Date(b.createdAt) - new Date(a.createdAt)});
            items.forEach((item) => {
                const delBtn = (<MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeMedication(item.id) }}> <MDBIcon icon="trash" size="2x"/></MDBBtn>);
                const editBtn = (<MDBBtn size="sm" onClick={(e) => {e.preventDefault(); openMedicationModalToEdit(item) }}><MDBIcon icon="edit" size="2x"/></MDBBtn>);
                
              formated.push({
                  name: item.medications.name,
                  drug_concentration: item.drug_concentration,
                  options: (<Fragment><TooltipButton helperMessage={"Borrar"} component={delBtn} placement="top"/><TooltipButton helperMessage={"Editar"} component={editBtn} placement="top"/></Fragment>)
              });
            });

      const medicationstable = {
              columns: [ { label: 'Medicamento', field: 'name', sort: 'asc' }, { label: 'Concentracion', field: 'drug_concentration', sort: 'asc' }, { label: 'Opciones', field: 'options', sort: 'disabled' }],
              rows: formated
          };

      setMedicationTable(medicationstable);
    };

    const removeMedication = async (id) => {
          const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
          if (result.value) {
              medicationActions.setlb_med(true);
              const _items = global.patient.patientHistory.pathologicalHistory.patientMedications.items;
              
              API.graphql(graphqlOperation(deletePatientMedications, {input: {id: id}} ));
              _items.splice(_items.findIndex(v => v.id === id), 1);
    
              global.patient.patientHistory.pathologicalHistory.patientMedications.items = _items;
    
              setGlobalData(global);
              
              setTimeout(() => {  
                  setMedicationsList();
                  medicationActions.setlb_med(false);   
              }, 2000);
          }
      }
    
    const medicationActions = {
        createMedication: createMedication, 
        toggleMedication: toggleMedication, 
        medicationModal: medicationModal,
        medicationTable: medicationTable, 
        removeMedication: removeMedication, 
        editMedication: editMedication, 
        medicationEditObject: medicationEditObject,
        lb_med: lb_med,
        setlb_med: setlb_med,
        openMedicationModalToEdit: openMedicationModalToEdit,

    };

    return { 
                api, 
                edit, 
                loadingButton, 
                loading,
                medicationActions,
                medicationTable,
                setMedicationsList,
     };
    
};

export default usePathologicalHistory;