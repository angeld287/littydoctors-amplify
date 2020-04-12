import React,{ useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';
import { listFields } from '../../../../../../../graphql/queries';
import { createMedicalAnalysisResults } from '../../../../../../../graphql/mutations';
import { MDBIcon, MDBBtn, MDBSpinner, MDBInputGroup } from 'mdbreact';
import moment from 'moment';

const useAnalysisResults = (results, global, setResultLoading, toggleResult, setAnalysisList) => {
    
    const { register, handleSubmit, errors, formState } = useForm();

    const [ loading, setLoading ] = useState(true);
    const [ loadingAdd, setLoadingAdd ] = useState(false);
    const [ _error, setError ] = useState(false);
    const [ fieldsForm, setFieldsForm ] = useState();

    useEffect(() => {
        let didCancel = false;

        const fetch = async () => {
            const object = {};
            const _fieldsList = global.global.pendingAnalysisFields;
            const filter = {
                filter: {
                    modules: {contains: results.medicalAnalysis.id}
                },
                limit: 400
            };
            const fieldsList = await API.graphql(graphqlOperation(listFields, filter)).catch((err) => { console.log("Ocurrio un error: ",err); setLoading(false); });   
            object[results.medicalAnalysis.id] = {
                id: results.medicalAnalysis.id,
                fields: fieldsList.data.listFields.items
            };
            
            _fieldsList.push(object);
            
            global.global.pendingAnalysisFields = _fieldsList;

            global.setGlobalData(global.global)

            _setFieldsForm(object[results.medicalAnalysis.id].fields);

            setLoading(false);
            if (!didCancel) {
                setLoading(false);
            }
        };

        if (global.global.pendingAnalysisFields.length !== 0) {
            const id = results.medicalAnalysis.id;
            const items = global.global.pendingAnalysisFields;

            const index = items.findIndex(s => {
                if (s[id] !== undefined) {
                    return s[id].id === id;
                }else{
                    return false;
                }
            });

            if (index === -1) {
                fetch();
            }else{
                _setFieldsForm(items[index][id].fields);
            }
        }else{
            fetch();
        }
        

        return () => {
            didCancel = true;
        };
    }, []);

    const _setFieldsForm = (fields) => {
        const fieldsList = (fields !== null)?([].concat(fields)
        .map((item,i)=> 
            <div key={i} className="input-group mt-2">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon">
                        {item.name}
                    </span>
                </div>
                <input type="number" name={item.id} ref={register} className="form-control" placeholder={item.name} aria-describedby="basic-addon" />
            </div>    
        )):(<div></div>)

        setFieldsForm(fieldsList);
        setLoading(false);
    }

    const addResultData = (input) => {
        setLoadingAdd(true);
        const items = global.global.pendingAnalysis;
        const item = items[items.findIndex(i => i.id === results.id)];
        const resutlsArray = []

        Object.keys(input).forEach(
            async (e) => {
                const i = {
                    value: input[e],
                    postConsultActMedAnalysisResultsId: results.id,
                    medicalAnalysisResultsFieldId: e,
                }
                const pcama = await API.graphql(graphqlOperation(createMedicalAnalysisResults, {input: i} )).catch( e => {console.log(e); setLoadingAdd(false); throw new SyntaxError("Error GraphQL"); });
                resutlsArray.push(pcama.data.createMedicalAnalysisResults)
            }
        );
        item.results.items = resutlsArray;

        items.splice(items.findIndex(v => v.id === item.id), 1);
        items.push(item);
        global.global.pendingAnalysis = items;
        global.setGlobalData(global.global);

        setTimeout(() => {  
            setAnalysisList(items);
            setLoadingAdd(false);
            toggleResult();
        }, 2000);
        
    }


    return { register, handleSubmit, errors, formState, loading, _error, fieldsForm, addResultData, loadingAdd };
};

export default useAnalysisResults;