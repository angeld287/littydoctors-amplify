import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { listMedicines, listCategorys, listAllergys, listSurgicalInterventions, listDiseases } from '../../../../../../graphql/queries';

import {
        deleteFamilyHistory,
    } from '../../../../../../graphql/mutations';

import { updatePatientaddPatientHistory } from '../../../../../../graphql/custom-mutations';

import TooltipButton from '../../../../../TooltipButton';

import usePatientHistory from '../usePatientHistory';

import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

const useEditPatientHistory = (global, setGlobalData, setList) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ error, setError ] = useState(false);
    const { register, handleSubmit, errors, formState } = useForm();

	const [ patientMedications, setPatientMedications ] = useState([]);
	const [ patientAllergies, setPatientAllergies ] = useState([]);
	const [ patientSurgicalInterventions, setPatientSurgicalInterventions ] = useState([]);
	const [ edit, setEdit ] = useState(false);
	const [ api, setApi ] = useState([]);

	const [ family, setFamily ] = useState([]);
	const [ familyTable, setFamilyTable ] = useState([]);
	const [ familyModal, setFamilyModal ] = useState(false);
	const [ familyEditObject, setFamilyEditObject ] = useState({});
    const [ lb_family, setlb_family ] = useState(false);

    const [ nonPath, setNonPath ] = useState([]);
	const [ nonPathTable, setNonPathTable ] = useState([]);
	const [ nonPathModal, setNonPathModal ] = useState(false);
    const [ nonPathEditObject, setNonPathEditObject ] = useState({});
    const [ lb_nonpath, setlb_nonpath ] = useState(false);
    

    const [ medication, setMedication ] = useState([]);
	const [ medicationTable, setMedicationTable ] = useState([]);
	const [ medicationModal, setMedicationModal ] = useState(false);
    const [ medicationEditObject, setMedicationEditObject ] = useState({});
    const [ lb_med, setlb_med ] = useState(false);
    

    const { setData, setTest, test } = usePatientHistory();

    useEffect(() => {
        let didCancel = false;
		let api = {};

        const fetch = async () => {
            
            try {
                
                setApi(api);
                createdFamily();
                createdNonPath();
                createdMedication();
                global.patientHistory = {
                    notEmpty: true,
                    api: api,
                    family: {
                        items: [],
                        table: [],
                    },
                    nonPath: {
                        items: [],
                        table: [],
                    }
                };
                
                setGlobalData(global);
                setLoadingButton(false);
            } catch (error) {
                setError(true);
                setLoading(false);
                setLoadingButton(false);
            }
        };

        if(global.patientHistory.notEmpty !== true){
            setLoadingButton(true);
            fetch();
        }else{
            setApi(global.patientHistory.api);
            setFamily(global.patientHistory.family.items);
            setFamilyTable(global.patientHistory.family.table);
            setNonPath(global.patientHistory.nonPath.items);
            setNonPathTable(global.patientHistory.nonPath.table);
        }

        return () => {
            didCancel = true;
        };
    }, []);


    //funciones de datos no patologicos
    const toggleNonPath = () => {
        setNonPathModal(!nonPathModal)
        setEdit(false);
    }

    const createdNonPath = () => {
		var formated = [];
		nonPath.forEach((item) => {
			formated.push({
				type: item.type.label,
				frequency: item.frequency.label,
				options: (<Fragment><MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeNonPath(item.id)}}> <MDBIcon icon="trash" size="2x"/></MDBBtn><MDBBtn size="sm" onClick={(e) => {e.preventDefault(); openNonPathModalToEdit(item)}}><MDBIcon icon="edit" size="2x"/></MDBBtn></Fragment>)
			});
		});

        const _nonpath = {
			columns: [ { label: 'Tipo', field: 'type', sort: 'asc' }, { label: 'Frecuencia', field: 'frequency', sort: 'asc' }, { label: 'Opciones', field: 'options', sort: 'disabled' }],
			rows: formated
		};

        setNonPathTable(_nonpath);
        global.patientHistory.nonPath = {
            table: _nonpath,
            items: nonPath
        };

        setGlobalData(global);
	};

    const createNonPath = (o) => {
        const _items = nonPath;
        _items.push(o);        
        setNonPath(_items);
        createdNonPath();
    }

    const removeNonPath = async (id) => {
        const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
        if (result.value) {
            const _items = nonPath;
            _items.splice(_items.findIndex(v => v.id === id), 1);
            setNonPath(_items);
            createdNonPath();
        }
    }

    const openNonPathModalToEdit = (o) => {
        setEdit(true);
        setNonPathModal(true);
        setNonPathEditObject(o);
    }

    const editNonPath = (o) => {
        const _items = nonPath;

        _items.splice(_items.findIndex(v => v.id === o.id), 1);

        _items.push(o);
        setNonPath(_items);
        setEdit(false);
        createdNonPath();
    }

    //funciones de datos de antecedentes familiares
    const toggleFamily = () => {
        setFamilyModal(!familyModal)
        setEdit(false);
    }

    const createdFamily = () => {
		var formated = [];
		family.forEach((item) => {
            const delBtn = (<MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeFamily(item.id)}}> <MDBIcon icon="trash" size="2x"/></MDBBtn>);
            const editBtn = (<MDBBtn size="sm" onClick={(e) => {e.preventDefault(); openFamilyModalToEdit(item)}}><MDBIcon icon="edit" size="2x"/></MDBBtn>);
            
            var dItems = "";

            item.diseases.forEach((d) => {
                dItems = dItems+" - "+d.label;
            });
            
			formated.push({
				relationship: item.relationship.label,
				diseases: dItems,
				options: (<Fragment><TooltipButton helperMessage={"Editar"} component={editBtn} placement="top"/><TooltipButton helperMessage={"Borrar"} component={delBtn} placement="top"/></Fragment>)
			});
		});
        const familytable = {
			columns: [ { label: 'Parentesco', field: 'relationship', sort: 'asc' }, { label: 'Enfermedades', field: 'diseases', sort: 'asc' }, { label: 'Opciones', field: 'options', sort: 'disabled' }],
			rows: formated
		};
        setFamilyTable(familytable);
        global.patientHistory.family = {
            table: familytable,
            items: family
        };
        setGlobalData(global);
	};

    const createFamily = (o) => {
        const _items = family;
        _items.push(o);        
        setFamily(_items);
        createdFamily();
    }

    const removeFamily = async (id) => {
        setlb_family(true);
        const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
        if (result.value) {
            const _items = global.patient.patientHistory.familyHistory.items;
            
            API.graphql(graphqlOperation(deleteFamilyHistory, {input: {id: id}} ));
            _items.splice(_items.findIndex(v => v.id === id), 1);

            global.patient.patientHistory.familyHistory.items = _items;

            setGlobalData(global);
            
            setTimeout(() => {  
                setList();
                setlb_family(false);   
            }, 2000);
        }
    }

    const openFamilyModalToEdit = (o) => {
        setEdit(true);
        setFamilyModal(true);
        setFamilyEditObject(o);
    }

    const editFamily = (o) => {
        const _items = family;

        _items.splice(_items.findIndex(v => v.imedicalPrescriptionMedicationsId === o.medicalPrescriptionMedicationsId), 1);

        _items.push(o);
        setFamily(_items);
        setEdit(false);
        createdFamily();
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    const createMedication = (o) => {
        const _items = medication;
        _items.push(o);        
        setMedication(_items);
        createdMedication();
    }

    const removeMedication = async (id) => {
        const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
        if (result.value) {
            const _items = medication;
            _items.splice(_items.findIndex(v => v.id === id), 1);
            setMedication(_items);
            createdMedication();
        }
    }

    const openMedicationModalToEdit = (o) => {
        setEdit(true);
        setMedicationModal(true);
        setMedicationEditObject(o);
    }

    const editMedication = (o) => {
        const _items = medication;

        _items.splice(_items.findIndex(v => v.patientMedicationsMedicationsId === o.patientMedicationsMedicationsId), 1);

        _items.push(o);
        setMedication(_items);
        setEdit(false);
        createdMedication();
    }

    const nonPathActions = {
        createNonPath: createNonPath, 
        toggleNonPath: toggleNonPath, 
        nonPathModal: nonPathModal, 
        nonPathTable: nonPathTable, 
        removeNonPath: removeNonPath,
        editNonPath: editNonPath,
        nonPathEditObject: nonPathEditObject, 
        lb_nonpath: lb_nonpath,
        setlb_nonpath: setlb_nonpath,
        openNonPathModalToEdit: openNonPathModalToEdit,
    };

    const familyActions = {
        createFamily: createFamily, 
        toggleFamily: toggleFamily, 
        familyModal: familyModal,
        familyTable: familyTable,
        removeFamily: removeFamily, 
        editFamily: editFamily, 
        familyEditObject: familyEditObject,
        lb_family: lb_family,
        setlb_family: setlb_family,
        openFamilyModalToEdit: openFamilyModalToEdit
    };

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
                handleSubmit, 
                formState, 
                register, 
                errors, 

                api, 
                edit, 
                loadingButton, 

                setPatientAllergies, 
                setPatientMedications, 
                setPatientSurgicalInterventions, 
                
                nonPathActions,
                familyActions,
                medicationActions,
            };
    
};

export default useEditPatientHistory;