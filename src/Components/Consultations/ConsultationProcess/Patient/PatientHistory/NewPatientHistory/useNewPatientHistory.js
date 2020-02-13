import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { listMedicines, listCategorys, listAllergys, listSurgicalInterventions, listDiseases } from '../../../../../../graphql/queries';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

const useNewPatientHistory = (global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(true);
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

    const [ nonPath, setNonPath ] = useState([]);
	const [ nonPathTable, setNonPathTable ] = useState([]);
	const [ nonPathModal, setNonPathModal ] = useState(false);
	const [ nonPathEditObject, setNonPathEditObject ] = useState({});



    useEffect(() => {
        let didCancel = false;
		let api = {};

        const fetch = async () => {
            try {
				const _medications = await API.graphql(graphqlOperation(listMedicines, {limit: 400}));
				const _allergies = await API.graphql(graphqlOperation(listAllergys, {limit: 400}));
				const _surgicalinterventions = await API.graphql(graphqlOperation(listSurgicalInterventions, {limit: 400}));
				const _diseases = await API.graphql(graphqlOperation(listDiseases, {limit: 400}));
				const _nonpath = await API.graphql(graphqlOperation(listCategorys, {filter: { or: [{module: {eq: "NonPathFrequency"}}, {module: {eq: "NonPathType"}}, {module: {eq: "FamilyHistory"}}]}} ));                

                api = {
					medications: _medications.data.listMedicines.items,
                    allergies: _allergies.data.listAllergys.items,
                    surgicalinterventions: _surgicalinterventions.data.listSurgicalInterventions.items,
                    diseases: _diseases.data.listDiseases.items,
                    nonpathfrequencies: _nonpath.data.listCategorys.items.filter(x => x.module === "NonPathFrequency"),
                    nonpathtypes: _nonpath.data.listCategorys.items.filter(x => x.module === "NonPathType"),
                    familytypes: _nonpath.data.listCategorys.items.filter(x => x.module === "FamilyHistory"),
                };

                
                setApi(api);
                setLoadingButton(false);
            } catch (error) {
                setError(true);
                setLoading(false);
                setLoadingButton(false);
            }
        };

        fetch();

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
        const nonpath = {
			columns: [ { label: 'Tipo', field: 'type', sort: 'asc' }, { label: 'Frecuencia', field: 'frequency', sort: 'asc' }, { label: 'Opciones', field: 'options', sort: 'disabled' }],
			rows: formated
		};
        setNonPathTable(nonpath);
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
			formated.push({
				relationship: item.relationship.label,
				frequency: item.comment,
				options: (<Fragment><MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeFamily(item.id)}}> <MDBIcon icon="trash" size="2x"/></MDBBtn><MDBBtn size="sm" onClick={(e) => {e.preventDefault(); openFamilyModalToEdit(item)}}><MDBIcon icon="edit" size="2x"/></MDBBtn></Fragment>)
			});
		});
        const familytable = {
			columns: [ { label: 'Parentesco', field: 'relationship', sort: 'asc' }, { label: 'Frecuencia', field: 'frequency', sort: 'asc' }, { label: 'Opciones', field: 'options', sort: 'disabled' }],
			rows: formated
		};
        setFamilyTable(familytable);
	};

    const createFamily = (o) => {
        const _items = family;
        _items.push(o);        
        setFamily(_items);
        createdFamily();
    }

    const removeFamily = async (id) => {
        const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
        if (result.value) {
            const _items = family;
            _items.splice(_items.findIndex(v => v.id === id), 1);
            setFamily(_items);
            createdFamily();
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

    const onSubmit = (i) => {        
        /* global.patient.patientHistory = {
            pathologicalHistory : { patientMedications: patientMedications, patientAllergies: patientAllergies, surgicalInterventions: patientSurgicalInterventions },
            familyHistory : { },
            nonPathologicalHistory : { } 
        }; */
        //setGlobalData(global);  
        //console.log(global);     
    }

    return { createNonPath, loadingButton, onSubmit, setPatientAllergies, setPatientMedications, api, handleSubmit, formState, register, editNonPath,
             setPatientSurgicalInterventions, errors, nonPathTable, nonPathModal, toggleNonPath, edit, nonPathEditObject, toggleFamily, familyModal,
             familyTable, createFamily, removeFamily, editFamily, familyEditObject };
    
};

export default useNewPatientHistory;