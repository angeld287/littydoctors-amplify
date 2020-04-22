import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import useForm from 'react-hook-form';
import { listMedicalAnalysiss, listSurgicalInterventions, listMedicines } from '../../../../../../../graphql/queries';
import { createPostConsultActMedAnalysis, createMedicalPrescription, createPostConsultActSurgicalInt, createPostConsultationsActivity,
        updateMedicalConsultation } from '../../../../../../../graphql/mutations';
import { updateMedicalConsultationForPCAGlobal } from '../../../../../../../graphql/custom-mutations';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

import { Template } from '../../../../../../Reports/Prescriptions/Template_1';

import moment from 'moment';

import jspdf from 'jspdf';

const useViewPostConsultationsActivity = (global, setGlobalData, setNew) => {
    const [ loading, setLoading ] = useState(false);
    const [ printLoading, setprintLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    let { consultation, patient } = useParams();
    const { register, handleSubmit, errors, formState } = useForm();

    const [ medicalAnalysis, setMedicalAnalysis ] = useState([]);
    const [ surgicalIntervention, setSurgicalIntervention ] = useState([]);
    const [ prescriptionMedication, setPrescriptionMedication ] = useState([]);
    const [ api, setApi ] = useState([]);

    const [ items, setItems ] = useState(global.medicalConsultation.postConsultationsActivity.medicalpres.items);
    const [ table, setTable ] = useState([]);
    const [ modal, setModal ] = useState(false);
    const [ editObject, setEditObject ] = useState({});

    useEffect(() => {
        createdPrescriptions();
    }, []);

    const toggle = () => {
        setModal(!modal);
        setEdit(false);
    };

    const printPrescriptionPDF = () => {    
        setprintLoading(true);
        const string = renderToString(<Template/>);
        var doc = new jspdf();
        doc.fromHTML(string);
        doc.save(moment(new Date()).format('YYMMDDHHmmSS')+"_Receta_Medica_"+(global.patient.name).replace(" ","_")+".pdf");
        setprintLoading(false);
    }

    const createdPrescriptions = () => {
        var formated = [];
        var mn = 0;
        items.forEach((item) => {
            mn = mn + 1;
            formated.push({
                number: mn,
                medicationName: item.medications.name,
                frequency: item.frequency === null ? "N/A" : item.frequency,
            });
        });
        const _table = {
            columns: [{label:  <MDBIcon size="2x" icon="notes-medical" className="blue-text" />, field: 'number', sort: 'disabled'}, {label: 'Medicamento', field: 'medicationName', sort: 'asc'}, {label: 'Frecuencia', field: 'frequency', sort: 'asc'} ],
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


    return { editObject, edit, toggle, table, printLoading, printPrescriptionPDF, removeMedicalPrescription, _createMedicalPrescription, setPrescriptionMedication, modal, setModal, items, register, loading, handleSubmit, formState, api, setMedicalAnalysis, setSurgicalIntervention };
};

export default useViewPostConsultationsActivity;
