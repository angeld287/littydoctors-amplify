import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { listDiseases, listCategorys } from '../../../../../../../graphql/queries';
import { deleteFamilyDetailsDiseases, deleteFamilyHistory } from '../../../../../../../graphql/mutations';
import { createFamilyHistoryForGlobal, createFamilyDetailsDiseasesForGlobal, updateFamilyHistoryForGlobal, deleteFamilyDetailsDiseasesForGlobal } from '../../../../../../../graphql/custom-mutations';

import { MDBBtn, MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';
import useEditPatientHistory from '../useEditPatientHistory';
import { Loading } from 'aws-amplify-react';


const useFamilyHistory = (global, setGlobalData, setList, toggleFamily, familyActions) => {

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    const [ family, setFamily ] = useState([]);
	const [ familyTable, setFamilyTable ] = useState([]);
	const [ familyModal, setFamilyModal ] = useState(false);
	const [ familyEditObject, setFamilyEditObject ] = useState({});
	const [ api, setApi ] = useState({});
	const [ edit, setEdit ] = useState(false);
    
    useEffect(() => {
        let didCancel = false;
        let api = {};

        const fetch = async () => {            
            try {
				const _diseases = await API.graphql(graphqlOperation(listDiseases, {limit: 400}));
                const _category = await API.graphql(graphqlOperation(listCategorys, {filter: { module: { eq: "FamilyHistory"} }, limit: 400 }));    
                
                api = {
                    diseases: _diseases.data.listDiseases.items,
                    familytypes: _category.data.listCategorys.items,
                };

                setApi(api);
                setList();
                
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

    const createFamily = async (o) => {
        familyActions.setlb_family(true);
        const _items = global.patient.patientHistory.items[0].familyHistory.items;
        
        const input = {};

        input.alive = o.alive;
        if(o.comment !== ""){input.comment = o.comment;}
        input.patientHistoryFamilyHistoryId = global.patient.patientHistory.items[0].id;
        input.familyHistoryRelationshipId = o.relationship.value;

        const cfamilyh = await API.graphql(graphqlOperation(createFamilyHistoryForGlobal, {input: input} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); familyActions.setlb_family(false); });
        
        const _familyHistory = cfamilyh.data.createFamilyHistory;
        const _diseases = [];
        o.diseases.forEach(async (d) => {
            const input = {
                familyDetailsDiseasesFamilyId: cfamilyh.data.createFamilyHistory.id,
                familyDetailsDiseasesDiseasesId: d.value,
            };
            const phdiseases = await API.graphql(graphqlOperation(createFamilyDetailsDiseasesForGlobal, {input: input} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); familyActions.setlb_family(false);  });
            const _disease = phdiseases.data.createFamilyDetailsDiseases;
            _diseases.push(_disease);
        });

        _familyHistory.diseases = {
            items:_diseases
        };

        _items.push(_familyHistory);
        
        global.patient.patientHistory.items[0].familyHistory.items = _items;

        setGlobalData(global);
        
        setTimeout(() => {  
            setList();
            familyActions.setlb_family(false);   
        }, 2000);

    }

    const removeFamily = async (id) => {
        familyActions.setlb_family(true);
        const result = await Swal.fire({ title: '¿Desea eliminar el elemento?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Eliminar', cancelButtonText: 'Cancelar'});
        if (result.value) {
            const _items = global.patient.patientHistory.items[0].familyHistory.items;
            
            API.graphql(graphqlOperation(deleteFamilyHistory, {input: {id: id}} ));
            _items.splice(_items.findIndex(v => v.id === id), 1);

            global.patient.patientHistory.items[0].familyHistory.items = _items;

            setGlobalData(global);

            setTimeout(() => {  
                setList();
                familyActions.setlb_family(false);   
            }, 2000);
        }
    }

    const openFamilyModalToEdit = (o) => {
        setEdit(true);
        setFamilyModal(true);
        setFamilyEditObject(o);
    }

    const editFamily = async (o) => {
        familyActions.setlb_family(true);
        const objectToEdit = {}
        
        const _items = global.patient.patientHistory.items[0].familyHistory.items;
        objectToEdit.id = o.id;
        

        const item = _items[_items.findIndex(v => v.id === o.id)];
        const _diseases = item.diseases.items;
        
        if(o.comment !== item.comment){objectToEdit.comment = o.comment;}
        if(o.alive !== item.alive){objectToEdit.alive = o.alive;}

        if (o.diseases.items === undefined) {
            
            item.diseases.items.forEach( async (e) => {
                const diseasesIndex = o.diseases.findIndex(x => x.value === e.diseases.id);
				if(diseasesIndex === -1){
                    const deletedfd = await API.graphql(graphqlOperation(deleteFamilyDetailsDiseasesForGlobal, {input: {id: e.id}} ));
                    _diseases.splice(_diseases.findIndex(v => v.id === e.id), 1);
				}
            });

            o.diseases.forEach(async (e) => {
                const diseasesIndex = item.diseases.items.findIndex(x => x.diseases.id === e.value);
                if(diseasesIndex === -1){
                    const input = {
                        familyDetailsDiseasesFamilyId: item.id,
                        familyDetailsDiseasesDiseasesId: e.value,
                    };
                    
                    const phdiseases = await API.graphql(graphqlOperation(createFamilyDetailsDiseasesForGlobal, {input: input} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); familyActions.setlb_family(false);  });
                    const _disease = phdiseases.data.createFamilyDetailsDiseases;
                    _diseases.push(_disease);                    
                }
            });
        }

        if (o.relationship.value !== undefined) {
            if (o.relationship.value !== item.relationship.id) {
                objectToEdit.familyHistoryRelationshipId = o.relationship.value
            }
        }

        const ufamilyh = await API.graphql(graphqlOperation(updateFamilyHistoryForGlobal, {input: objectToEdit} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); familyActions.setlb_family(false); });

        _items.splice(_items.findIndex(v => v.id === o.id), 1);
        _items.push(ufamilyh.data.updateFamilyHistory);
        
        global.patient.patientHistory.items[0].familyHistory.items = _items;

        setGlobalData(global);
        
        setTimeout(() => {  
            setList();
            familyActions.setlb_family(false);   
        }, 2000);
    }

    return { api, createFamily, loading, editFamily };
    
};

export default useFamilyHistory;