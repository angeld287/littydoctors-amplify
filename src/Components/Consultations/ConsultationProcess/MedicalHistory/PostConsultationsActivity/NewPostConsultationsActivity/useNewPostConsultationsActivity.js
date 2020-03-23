import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { listMedicalAnalysiss, listSurgicalInterventions, listMedicines } from '../../../../../../graphql/queries';
import { createPostConsultActMedAnalysis, createMedicalPrescription, createPostConsultActSurgicalInt, createPostConsultationsActivity,
        updateMedicalConsultation } from '../../../../../../graphql/mutations';
import { updateMedicalConsultationForPCAGlobal } from '../../../../../../graphql/custom-mutations';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

const useNewPostConsultationsActivity = (global, setGlobalData, setNew) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    let { consultation, patient } = useParams();
    const { register, handleSubmit, errors, formState } = useForm();

    const [ medicalAnalysis, setMedicalAnalysis ] = useState([]);
    const [ surgicalIntervention, setSurgicalIntervention ] = useState([]);
    const [ prescriptionMedication, setPrescriptionMedication ] = useState([]);
    const [ api, setApi ] = useState([]);

    const [ items, setItems ] = useState([]);
    const [ table, setTable ] = useState([]);
    const [ modal, setModal ] = useState(false);
    const [ editObject, setEditObject ] = useState({});

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
                global.medicalHistory.postConsultationActivities = {
                    notEmpty: true,
                    api: api,
                    medicalPrescriptions: {
                        items: [],
                        table: [],
                    },
                };
                setGlobalData(global);
                setLoadingButton(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        if (global.medicalHistory.postConsultationActivities.notEmpty !== true) {
            setLoadingButton(true);
            fetch();
        }else{
            const __items = global.medicalHistory.postConsultationActivities.medicalPrescriptions.items;
            const __table = global.medicalHistory.postConsultationActivities.medicalPrescriptions.table;
            setApi(global.medicalHistory.postConsultationActivities.api);
            setItems(__items);
            setTable(__table);
        }

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
                medicationName: item.medication.label,
                frequency: item.frequency.label,
                options: (<Fragment><MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeMedicalPrescription(item.medicalPrescriptionMedicationsId)}}><MDBIcon icon="trash" size="2x"/></MDBBtn><MDBBtn size="sm" onClick={(e) => {e.preventDefault(); openModalToEdit(item)}}><MDBIcon icon="edit" size="2x"/></MDBBtn></Fragment>)
            });
        });
        const _table = {
            columns: [{label: 'Medicamento', field: 'medicationName', sort: 'asc'}, {label: 'Frecuencia', field: 'frequency', sort: 'asc'}, {label: 'Opciones', field: 'options', sort: 'disabled'} ],
            rows: formated
        };

        setTable(_table);
        global.medicalHistory.postConsultationActivities.medicalPrescriptions = {
            table: _table,
            items: items
        };

        setGlobalData(global);
    };
    

    const _createMedicalPrescription = (o) => {
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

    const onSubmit = async (i) => {
            setLoading(true);

            const mpitems = [];
            const maitems = [];
            const siitems = [];
            const pca = await API.graphql(graphqlOperation(createPostConsultationsActivity, {input: {}} )).catch( e => { console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL"); });

            //createMedicalPrescription
            items.forEach(async (e) => {
                //enum State { INSERTED APPROVED CONFIRMED PRESENT IN_PROCESS FINISHED REJECTED CANCELED DONE NOT_DONE }
                const input = {};
                input.frequency = String
                input.duration = String
                input.comment = String
                input.postConsultationsActivityMedicalpresId = pca.data.createPostConsultationsActivity.id;
                input.medicalPrescriptionMedicationsId = e.medication.value;
                input.date = new Date();

                const pcama = await API.graphql(graphqlOperation(createMedicalPrescription, {input: input} )).catch( e => { console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL"); });
            });

            medicalAnalysis.forEach(async (e) => {
                //enum State { INSERTED APPROVED CONFIRMED PRESENT IN_PROCESS FINISHED REJECTED CANCELED DONE NOT_DONE }
                const input = {};

                input.state = 'INSERTED';
                input.date = new Date();
                input.postConsultActMedAnalysisPcActivitiesId = pca.data.createPostConsultationsActivity.id;
                input.postConsultActMedAnalysisMedicalAnalysisId = e.id;

                const pcama = await API.graphql(graphqlOperation(createPostConsultActMedAnalysis, {input: input} )).catch( e => { console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL"); });
            });

            surgicalIntervention.forEach(async (e) => {
                const input = {};

                input.state = 'INSERTED';
                input.date = new Date();
                input.postConsultActSurgicalIntPcActivitiesId = pca.data.createPostConsultationsActivity.id;
                input.postConsultActSurgicalIntSurgicalInterventionId = e.id;

                const pcsi = await API.graphql(graphqlOperation(createPostConsultActSurgicalInt, {input: input} )).catch( e => { console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL"); });
            });

            const mcinput = {};
            mcinput.medicalConsultationPostConsultationsActivityId = pca.data.createPostConsultationsActivity.id;
            mcinput.id = global.medicalConsultation.id;
            const mdco = await API.graphql(graphqlOperation(updateMedicalConsultationForPCAGlobal, {input: mcinput} )).catch( e => {console.log(e); setLoadingButton(false); throw new SyntaxError("Error GraphQL"); });

            global.medicalConsultation.postConsultationsActivity = mdco.data.updateMedicalConsultation.postConsultationsActivity;
            setGlobalData(global);
            setNew(false);
            setLoading(false);
    }

    return { editObject, edit, toggle, table, loadingButton, editMedicalPrescription, removeMedicalPrescription, _createMedicalPrescription, setPrescriptionMedication, modal, setModal, items, register, loading, handleSubmit, onSubmit, formState, api, setMedicalAnalysis, setSurgicalIntervention };
};

export default useNewPostConsultationsActivity;
