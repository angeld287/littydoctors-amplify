import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { deletePostConsultActSurgicalInt, createPostConsultActSurgicalInt, createPostConsultActMedAnalysis, deletePostConsultActMedAnalysis,
         createMedicalPrescription, deleteMedicalPrescription, updateMedicalPrescription } from '../../../../../../graphql/mutations';
import { updateMedicalConsultationForPCAGlobal } from '../../../../../../graphql/custom-mutations';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';

const useEditPostConsultationsActivity = (global, setGlobalData, _setEdit) => {
    const [ loading, setLoading ] = useState(false);
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ editLoading, setEditLoading ] = useState(false);
    const [ addloadb, setAddloadb ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    let { consultation, patient } = useParams();
    const { register, handleSubmit, errors, formState } = useForm();

    const [ medicalanalysis, setMedicalanalysis ] = useState([]);
    const [ surgicalinterventions, setSurgicalinterventions ] = useState([]);
    const [ prescriptionMedication, setPrescriptionMedication ] = useState([]);
    const [ api, setApi ] = useState([]);

    const [ items, setItems ] = useState(global.medicalConsultation.postConsultationsActivity.medicalpres.items);
    const [ table, setTable ] = useState([]);
    const [ modal, setModal ] = useState(false);
    const [ editObject, setEditObject ] = useState({});

  const postConsultationsActivity = global.medicalConsultation.postConsultationsActivity;


    useEffect(() => {
        let didCancel = false;
        
        createdPrescriptions();

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
        const _items = items.sort((a,b) => { return new Date(b.createdAt) - new Date(a.createdAt)});
        _items.forEach((item) => {
            formated.push({
                medicationName: item.medications.name,
                frequency: item.frequency === null ? "N/A" : item.frequency,
                options: (<Fragment><MDBBtn color="red" size="sm" onClick={(e) => {e.preventDefault(); removeMedicalPrescription(item.id)}}><MDBIcon icon="trash" size="2x"/></MDBBtn><MDBBtn size="sm" onClick={(e) => {e.preventDefault(); openModalToEdit(item)}}><MDBIcon icon="edit" size="2x"/></MDBBtn></Fragment>)
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
    

    const _createMedicalPrescription = async (o) => {
        setAddloadb(true);
        const _items = items;
        const input = {};
        input.frequency = o.frequency.value;
        input.duration = o.duration;
        input.comment = o.comment;
        input.postConsultationsActivityMedicalpresId = postConsultationsActivity.id;
        input.medicalPrescriptionMedicationsId = o.medication.value;
        input.date = new Date();

        const presc = await API.graphql(graphqlOperation(createMedicalPrescription, {input: input} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); });

        const _patientMedications = presc.data.createMedicalPrescription;
        _items.push(_patientMedications);
        global.medicalConsultation.postConsultationsActivity.medicalpres.items = _items;
        setGlobalData(global);
        
        setTimeout(() => {  
            createdPrescriptions()
            setAddloadb(false);   
        }, 2000);
    }

    const removeMedicalPrescription = async (id) => {
        setAddloadb(true);
        const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
        if (result.value) {
            const _items = items;
            
            API.graphql(graphqlOperation(deleteMedicalPrescription, {input: {id: id}} )).catch( e => { console.log(e); setAddloadb(false); throw new SyntaxError("Error GraphQL");  });
            _items.splice(_items.findIndex(v => v.id === id), 1);
    
            global.medicalConsultation.postConsultationsActivity.medicalpres.items = _items;
    
            setGlobalData(global);
            
            setTimeout(() => {  
                createdPrescriptions();
                setAddloadb(false);   
            }, 2000);
        }
    }

    const openModalToEdit = (o) => {
        setEdit(true);
        setModal(true);
        setEditObject(o);
    }

    const setViewObjects = () =>{
        const _a = [];
        const _s = [];
    
        postConsultationsActivity.medicalAnalysis.items.forEach( e => {
            _a.push({value: e.medicalAnalysis.id, label: e.medicalAnalysis.name})
        });
    
        postConsultationsActivity.surgicalIntervention.items.forEach( e => {
            _s.push({value: e.surgicalIntervention.id, label: e.surgicalIntervention.name})
        });
    
        setMedicalanalysis(_a);
        setSurgicalinterventions(_s);
      }

    const editMedicalPrescription = async (o) => {
        setEditLoading(true);
        setAddloadb(true);
        const objectToEdit = {}
        
        const _items = global.medicalConsultation.postConsultationsActivity.medicalpres.items;
        objectToEdit.id = o.id;
        
        const item = _items[_items.findIndex(v => v.id === o.id)];
        
        if(item.frequency !== o.frequency.value){objectToEdit.frequency = o.frequency.value}
        if(item.duration !== o.duration){objectToEdit.duration = o.duration}
        if(item.comment !== o.comment){objectToEdit.comment = o.comment}
        if(item.medicalPrescriptionMedicationsId !== o.medication.value){objectToEdit.medicalPrescriptionMedicationsId = o.medication.value}

        const medications = await API.graphql(graphqlOperation(updateMedicalPrescription, {input: objectToEdit} )).catch( e => { console.log(e); setEditLoading(false); setAddloadb(false); throw new SyntaxError("Error GraphQL");  });

        _items.splice(_items.findIndex(v => v.id === o.id), 1);
        _items.push(medications.data.updateMedicalPrescription);
        
        global.medicalConsultation.postConsultationsActivity.medicalpres.items = _items;

        setGlobalData(global);
        
        setTimeout(() => {  
            createdPrescriptions();
            setEditLoading(false);
            setAddloadb(false);
        }, 2000);

    }

    const editPCActivities = () => {
        setEditLoading(true);
        const _itemsS = postConsultationsActivity.surgicalIntervention.items;
        const _itemsA = postConsultationsActivity.medicalAnalysis.items;
          
        _itemsS.forEach( async (e) => {
            const sIndex = surgicalinterventions === null ? -1 : surgicalinterventions.findIndex(x => x.value === e.surgicalIntervention.id);
            if(sIndex === -1){
                const deletedS = await API.graphql(graphqlOperation(deletePostConsultActSurgicalInt, {input: {id: e.id}} )).catch( e => { console.log(e); setEditLoading(false);  throw new SyntaxError("Error GraphQL"); });
                _itemsS.splice(_itemsS.findIndex(v => v.id === e.id), 1);
            }
        });
        if (surgicalinterventions !== null) {
            surgicalinterventions.forEach(async (e) => {
                const sIndex = _itemsS.findIndex(x => x.surgicalIntervention.id === e.value);
                if(sIndex === -1){
                    const input = {
                        postConsultActSurgicalIntPcActivitiesId: postConsultationsActivity.id,
                        postConsultActSurgicalIntSurgicalInterventionId: e.value,
                        state: 'INSERTED',
                        date: new Date()
                    };
                    const surgery = await API.graphql(graphqlOperation(createPostConsultActSurgicalInt, {input: input} )).catch( e => { console.log(e); setEditLoading(false);  throw new SyntaxError("Error GraphQL"); });
                    const _surgicalIntervention = surgery.data.createPostConsultActSurgicalInt;
                    _itemsS.push(_surgicalIntervention);                    
                }
            });
        }
        global.medicalConsultation.postConsultationsActivity.surgicalIntervention.items = _itemsS;

        _itemsA.forEach( async (e) => {
            const aIndex = medicalanalysis === null ? -1 : medicalanalysis.findIndex(x => x.value === e.medicalAnalysis.id);
            if(aIndex === -1){
                const deletedS = await API.graphql(graphqlOperation(deletePostConsultActMedAnalysis, {input: {id: e.id}} )).catch( e => { console.log(e); setEditLoading(false);  throw new SyntaxError("Error GraphQL"); });
                _itemsA.splice(_itemsA.findIndex(v => v.id === e.id), 1);
            }
        });

        if (medicalanalysis !== null) {
            medicalanalysis.forEach(async (e) => {
                const aIndex = _itemsA.findIndex(x => x.medicalAnalysis.id === e.value);
                if(aIndex === -1){
                    const input = {
                        postConsultActMedAnalysisPcActivitiesId: postConsultationsActivity.id,
                        postConsultActMedAnalysisMedicalAnalysisId: e.value,
                        state: 'INSERTED',
                        date: new Date()
                    };
                    const surgery = await API.graphql(graphqlOperation(createPostConsultActMedAnalysis, {input: input} )).catch( e => { console.log(e); setEditLoading(false);  throw new SyntaxError("Error GraphQL"); });
                    const _surgicalIntervention = surgery.data.createPostConsultActMedAnalysis;
                    _itemsA.push(_surgicalIntervention);                    
                }
            });
        }
        
        global.medicalConsultation.postConsultationsActivity.medicalAnalysis.items = _itemsA;

        setTimeout(() => {  
            _setEdit(false)
            setEditLoading(false); 
        }, 2000);
        
    }    

    return { editPCActivities, editObject, edit, toggle, table, loadingButton, editMedicalPrescription, removeMedicalPrescription, _createMedicalPrescription, 
            setPrescriptionMedication, modal, setModal, items, register, loading, handleSubmit, formState, api, setViewObjects, 
            medicalanalysis, surgicalinterventions, setSurgicalinterventions, setMedicalanalysis, editLoading, addloadb};
};

export default useEditPostConsultationsActivity;
