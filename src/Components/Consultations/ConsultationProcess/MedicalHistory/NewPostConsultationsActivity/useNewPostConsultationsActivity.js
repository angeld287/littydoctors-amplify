import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { listMedicalAnalysiss, listSurgicalInterventions, listMedicines } from '../../../../../graphql/queries';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

const useNewMedicalPrescription = () => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ modal, setModal ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    const [ editObject, setEditObject ] = useState({});
    let { consultation, patient } = useParams();
    const { register, handleSubmit, errors, formState } = useForm();


	const [ medicalAnalysis, setMedicalAnalysis ] = useState([]);
	const [ surgicalIntervention, setSurgicalIntervention ] = useState([]);
	const [ items, setItems ] = useState([]);
	const [ table, setTable ] = useState([]);
	const [ prescriptionMedication, setPrescriptionMedication ] = useState([]);
	const [ api, setApi ] = useState([]);



    useEffect(() => {
        let didCancel = false;
		let api = {};

        const fetch = async () => {
            try {
				const _medicalanalysis = await API.graphql(graphqlOperation(listMedicalAnalysiss, {limit: 400}));
				const _surgicalintervention = await API.graphql(graphqlOperation(listSurgicalInterventions, {limit: 400}));
				const _medications = await API.graphql(graphqlOperation(listMedicines, {limit: 400}));

                
                api = {
					medicalanalysis: _medicalanalysis.data.listMedicalAnalysiss.items,
					surgicalintervention: _surgicalintervention.data.listSurgicalInterventions.items,
                    prescriptionmedications: _medications.data.listMedicines.items
                };
                
                setApi(api);
                createdPrescriptions();
                /* API.graphql(graphqlOperation(createMedicalHistory, {input: input}))
                .then((r) => {
                    
                }).catch((err) => { 
                    console.log("Ocurrio un error: ",err); 
                    setError(true) 
                    setLoading(false);
                });  */
                setLoadingButton(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetch();

        return () => {
            didCancel = true;
        };
    }, []);

    const toggle = () => {
        setModal(!modal);
        setEdit(false);
    };

    const createdPrescriptions = () => {
		var formated = [];
		items.forEach((item) => {
			formated.push({
				medicationName: item.medicationName,
				frequency: item.frequency,
				options: (
					<Fragment>
						<MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeMedicalPrescription(item.medicalPrescriptionMedicationsId)}}>
							  <MDBIcon icon="trash" size="2x"/>
						</MDBBtn>
                        <MDBBtn size="sm" onClick={(e) => {e.preventDefault(); openModalToEdit(item)}}>
							  <MDBIcon icon="edit" size="2x"/>
						</MDBBtn>
					</Fragment>
				)
			});
		});
        const table = {
			columns: [
				{
					label: 'Medicamento',
					field: 'medicationName',
					sort: 'asc'
				},
				{
					label: 'Frecuencia',
					field: 'frequency',
					sort: 'asc'
				},
				{
					label: 'Opciones',
					field: 'options',
					sort: 'disabled'
				}
			],
			rows: formated
		};

        setTable(table);
	};
    

    const createMedicalPrescription = (o) => {
        const _items = items;
        _items.push(o);
        setItems(_items);
        createdPrescriptions();
    }

    const removeMedicalPrescription = async (id) => {
        const result = await Swal.fire({
			title: '¿Desea eliminar el elemento?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		});

        if (result.value) {
            const _items = items;
            _items.splice(_items.findIndex(v => v.imedicalPrescriptionMedicationsId === id), 1);
            setItems(_items);
            createdPrescriptions();
        }
    }

    const openModalToEdit = (o) => {
        setEdit(true);
        setModal(true);
        setEditObject(o);
    }

    const editMedicalPrescription = (o) => {

        const _items = items;

        _items.splice(_items.findIndex(v => v.imedicalPrescriptionMedicationsId === o.medicalPrescriptionMedicationsId), 1);

        _items.push(o);
        setItems(_items);
        setEdit(false);
        createdPrescriptions();
    }

    const onSubmit = (i) => {
            console.log(i);
            
    }

    return { editObject, edit, toggle, table, loadingButton, editMedicalPrescription, removeMedicalPrescription, createMedicalPrescription, setPrescriptionMedication, modal, setModal, items, register, loading, handleSubmit, onSubmit, formState, api, setMedicalAnalysis, setSurgicalIntervention };
};

export default useNewMedicalPrescription;