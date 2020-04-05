import { useState, useEffect } from 'react';

import { listCategorys } from '../../../../../../../graphql/queries';
import { createNonPathologicalHistoryForGlobal, updateNonPathologicalHistoryForGlobal} from '../../../../../../../graphql/custom-mutations';

import { API, graphqlOperation } from 'aws-amplify';


const useNonPathologicalHistory = (global, setGlobalData, setList, toggleNonPath, nonPathActions) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError] = useState(false);
    const [ api, setApi ] = useState({});


    useEffect(() => {
        let didCancel = false;
        let api = {};

        const fetch = async () => {            
            try {

				const _nonpath = await API.graphql(graphqlOperation(listCategorys, {filter: { or: [{module: {eq: "NonPathFrequency"}}, {module: {eq: "NonPathType"}}]}, limit: 400} )); 

                api = {
                    nonpathfrequencies: _nonpath.data.listCategorys.items.filter(x => x.module === "NonPathFrequency"),
                    nonpathtypes: _nonpath.data.listCategorys.items.filter(x => x.module === "NonPathType"),
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

    const createNonPath = async (o) => {

        nonPathActions.setlb_nonpath(true);
        const _items = global.patient.patientHistory.nonPathologicalHistory.items;
        
        const input = {};

        input.active = o.active;
        input.frequency = o.frequency.label;
        if(o.comment !== ""){input.comment = o.comment;}
        input.patientHistoryNonPathologicalHistoryId = global.patient.patientHistory.id;
        input.nonPathologicalHistoryTypeId = o.type.value;

        const cnonpath = await API.graphql(graphqlOperation(createNonPathologicalHistoryForGlobal, {input: input} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); nonPathActions.setlb_nonpath(false); });
        
        const _nonpathHistory = cnonpath.data.createNonPathologicalHistory;
        _items.push(_nonpathHistory);
        global.patient.patientHistory.nonPathologicalHistory.items = _items;
        setGlobalData(global);
        
        setTimeout(() => {  
            setList();
            nonPathActions.setlb_nonpath(false);   
        }, 2000);
    }

    const editNonPath = async (o) => {
        nonPathActions.setlb_nonpath(true);
        const objectToEdit = {}
        
        const _items = global.patient.patientHistory.nonPathologicalHistory.items;
        objectToEdit.id = o.id;
        
        const item = _items[_items.findIndex(v => v.id === o.id)];
        
        if(o.comment !== item.comment){objectToEdit.comment = o.comment;}
        if(o.active !== item.active){objectToEdit.active = o.active;}
        if(o.frequency.label !== item.frequency){objectToEdit.frequency = o.frequency.label;}

        if (o.type.value !== undefined) {
            if (o.type.value !== item.type.id) {
                objectToEdit.nonPathologicalHistoryTypeId = o.type.value
            }
        }

        const unonPath = await API.graphql(graphqlOperation(updateNonPathologicalHistoryForGlobal, {input: objectToEdit} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); nonPathActions.setlb_nonpath(false); });

        _items.splice(_items.findIndex(v => v.id === o.id), 1);
        _items.push(unonPath.data.updateNonPathologicalHistory);
        
        global.patient.patientHistory.nonPathologicalHistory.items = _items;

        setGlobalData(global);
        
        setTimeout(() => {  
            setList();
            nonPathActions.setlb_nonpath(false);   
        }, 2000);
    }


    return { editNonPath, createNonPath, api, loading };
    
};

export default useNonPathologicalHistory;