import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import { listFields } from '../../../../../graphql/queries';
import {MDBRow, MDBCol} from 'mdbreact';
import { createPhysicalExplorationForGlobal, updatePhysicalExplorationForGlobal } from '../../../../../graphql/custom-mutations';
import {    createRegionalExploration, 
            updateMedicalHistory,
            createVitalSign,
            updateVitalSign,
            updateRegionalExploration,
            createOthersFields,
            updateOthersFields,
        } from '../../../../../graphql/mutations';

const usePhysicalExploration = (childProps, patientData, global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    let { consultation, patient } = useParams();
    const [ fieldsForm, setFieldsForm ] = useState();
    const { register, handleSubmit, errors, formState } = useForm();

  const medicalHistory = global.medicalConsultation.medicalHistory;
  const [ _new, setNew ] = useState(medicalHistory.physicalExploration === null);
  const [ _edit, setEdit ] = useState(false);
  const [ editLoading, setEditLoading ] = useState(false);

  const physicalexploration = global.medicalConsultation.medicalHistory.physicalExploration;

  const vs = physicalexploration === null ? null : physicalexploration.vitalsign;
  const re = physicalexploration === null ? null : physicalexploration.regionalExploration;

  //fields
  const [ general_exploration, setgeneral_exploration ] = useState(
            physicalexploration === null ? "" :
            (physicalexploration.general_exploration === null ? "" :  physicalexploration.general_exploration)
        );

  //vs
  const [ breathing, setbreathing ] = useState(vs === null ? "0" : (vs.breathing === null ? "0" : vs.breathing));
  const [ pulse, setpulse ] = useState(vs === null ? "0" : (vs.pulse === null ? "0" : vs.pulse));
  const [ blood_pressure, setblood_pressure ] = useState(vs === null ? "0" : (vs.blood_pressure === null ? "0" : vs.blood_pressure));
  const [ temperature, settemperature ] = useState(vs === null ? "0" : (vs.temperature === null ? "0" : vs.temperature));

  //re
  const [ head, sethead ] = useState(re === null ? "" : (re.head === null ? "" : re.head));
  const [ neck, setneck ] = useState(re === null ? "" : (re.neck === null ? "" : re.neck));
  const [ thorax, setthorax ] = useState(re === null ? "" : (re.thorax === null ? "" : re.thorax));
  const [ abdomen, setabdomen ] = useState(re === null ? "" : (re.abdomen === null ? "" : re.abdomen));
  const [ members, setmembers ] = useState(re === null ? "" : (re.members === null ? "" : re.members));
  const [ genitals, setgenitals ] = useState(re === null ? "" : (re.genitals === null ? "" : re.genitals));
  const [ others, setothers ] = useState(re === null ? "" : (re.others === null ? "" : re.others));


  const fields = {
    general_exploration: {
        general_exploration, setgeneral_exploration
    },
    breathing: {
        breathing, setbreathing
    },
    pulse:{
        pulse, setpulse
    },
    blood_pressure:{
        blood_pressure, setblood_pressure
    },
    temperature:{
        temperature, settemperature
    },
    head:{
        head, sethead
    },
    neck:{
        neck, setneck
    },
    thorax:{
        thorax, setthorax
    },
    abdomen:{
        abdomen, setabdomen
    },
    members:{
        members, setmembers
    },
    genitals:{
        genitals, setgenitals
    },
    others:{
        others, setothers
    }
  }


    useEffect(() => {
        let didCancel = false;

        const fetch = async () => {
            try {
                
                const ss = childProps.state.subspecialities.length > 0 ? childProps.state.subspecialities[0].subspeciality.id : "none";
                const sss = childProps.state.sssec.length > 0 ? childProps.state.sssec[0].subspecialitysec.id : "none";
                
                const filter = {
                    filter: {
                        and:[
                            {
                                or: [
                                    {modules: {contains: childProps.state.specialities[0].speciality.id}},
                                    {modules: {contains: ss}},
                                    {modules: {contains: sss}},
                                ]
                            },
                            {deleted: {eq: false}}
                        ]
                    },
                    limit: 400
                };
                const fieldsList = await API.graphql(graphqlOperation(listFields, filter)).catch((err) => { console.log("Ocurrio un error: ",err); setLoading(false); });   

                
                global.regionalExplorationFields = fieldsList.data.listFields.items;
                global.regionalExplorationFieldsLoaded = true;

                setGlobalData(global)

                _setFieldsForm(fieldsList.data.listFields.items, global.medicalConsultation.medicalHistory.physicalExploration === null ? [] : global.medicalConsultation.medicalHistory.physicalExploration.regionalExploration.others.items);

                setLoading(false);
                if (!didCancel) {
                    setLoading(false);
                }
                
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        
        if (!global.regionalExplorationFieldsLoaded) {
            setLoading(true);
            fetch();
            setLoading(false);
        }else{
            _setFieldsForm(global.regionalExplorationFields, global.medicalConsultation.medicalHistory.physicalExploration === null ? [] : global.medicalConsultation.medicalHistory.physicalExploration.regionalExploration.others.items);
        }
        return () => {
            didCancel = true;
        };
    }, []);

    const sortAlph = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (b.name > a.name) {
            return 1;
        }
        return 0;
    }

    const _setFieldsForm = (_fields, df) => {
        const fields = _fields.sort(sortAlph);
        const fields_number = fields.length % 2 === 1 ? fields.length + 1 : fields.length;
        const fieldsListLeft = (fields !== null)?([].concat(fields.slice(0, (fields_number/2))).map((item,i)=><div key={i} className="input-group mt-2"><div className="input-group-prepend"><span className="input-group-text" id="basic-addon">{item.name}</span></div>
                <input disabled={!_edit && !_new} defaultValue={df.findIndex(f => f.field.id === item.id) !== -1 ? df[df.findIndex(f => f.field.id === item.id)].value : ""} name={item.id} ref={register} className="form-control" placeholder={item.name} aria-describedby="basic-addon" /></div>)):(<div></div>)

        const fieldsListRigth = (fields !== null)?([].concat(fields.slice((fields_number/2), (fields.length))).map((item,i)=><div key={i} className="input-group mt-2"><div className="input-group-prepend"><span className="input-group-text" id="basic-addon">{item.name}</span></div>
                <input disabled={!_edit && !_new} defaultValue={df.findIndex(f => f.field.id === item.id) !== -1 ? df[df.findIndex(f => f.field.id === item.id)].value : ""} name={item.id} ref={register} className="form-control" placeholder={item.name} aria-describedby="basic-addon" /></div>)):(<div></div>)

        const fieldsList = (<MDBRow className="mb-3"><MDBCol>{fieldsListLeft}</MDBCol><MDBCol>{fieldsListRigth}</MDBCol></MDBRow>);

        setFieldsForm(fieldsList);
        setLoading(false);
    }

    const _setFieldsFormDisable = (_fields, df) => {
        const fields = _fields.sort(sortAlph);
        const fields_number = fields.length % 2 === 1 ? fields.length + 1 : fields.length;
        const fieldsListLeft = (fields !== null)?([].concat(fields.slice(0, (fields_number/2))).map((item,i)=><div key={i} className="input-group mt-2"><div className="input-group-prepend"><span className="input-group-text" id="basic-addon">{item.name}</span></div>
                <input disabled={true} defaultValue={df.findIndex(f => f.field.id === item.id) !== -1 ? df[df.findIndex(f => f.field.id === item.id)].value : ""} name={item.id} ref={register} className="form-control" placeholder={item.name} aria-describedby="basic-addon" /></div>)):(<div></div>)

        const fieldsListRigth = (fields !== null)?([].concat(fields.slice((fields_number/2), (fields.length))).map((item,i)=><div key={i} className="input-group mt-2"><div className="input-group-prepend"><span className="input-group-text" id="basic-addon">{item.name}</span></div>
                <input disabled={true} defaultValue={df.findIndex(f => f.field.id === item.id) !== -1 ? df[df.findIndex(f => f.field.id === item.id)].value : ""} name={item.id} ref={register} className="form-control" placeholder={item.name} aria-describedby="basic-addon" /></div>)):(<div></div>)

        const fieldsList = (<MDBRow className="mb-3"><MDBCol>{fieldsListLeft}</MDBCol><MDBCol>{fieldsListRigth}</MDBCol></MDBRow>);

        setFieldsForm(fieldsList);
        //setLoading(false);
    }

    const onSubmit = (i) => {
        setLoading(true);
        createsPhysicalExploration(i);
    }

    const setEditData = () => {
        setgeneral_exploration(physicalexploration.general_exploration !== null ? physicalexploration.general_exploration : "");
        setbreathing(vs.breathing !== null ? vs.breathing : "");
        setpulse(vs.pulse !== null ? vs.pulse : "");
        setblood_pressure(vs.blood_pressure !== null ? vs.blood_pressure : "");
        settemperature(vs.temperature !== null ? vs.temperature : "");

        sethead(re.head !== null ? re.head : "");
        setneck(re.neck !== null ? re.neck : "");
        setthorax(re.thorax !== null ? re.thorax : "");
        setabdomen(re.abdomen !== null ? re.abdomen : "");
        setmembers(re.members !== null ? re.members : "");
        setgenitals(re.genitals !== null ? re.genitals : "");
        setothers(re.others !== null ? re.others : "");
    }

    const setEditDataFromCreate = (o) => {
        setgeneral_exploration(o.general_exploration !== null ? o.general_exploration : "");
        setbreathing(o.breathing !== null ? o.breathing : "");
        setpulse(o.pulse !== null ? o.pulse : "");
        setblood_pressure(o.blood_pressure !== null ? o.blood_pressure : "");
        settemperature(o.temperature !== null ? o.temperature : "");

        sethead(o.head !== null ? o.head : "");
        setneck(o.neck !== null ? o.neck : "");
        setthorax(o.thorax !== null ? o.thorax : "");
        setabdomen(o.abdomen !== null ? o.abdomen : "");
        setmembers(o.members !== null ? o.members : "");
        setgenitals(o.genitals !== null ? o.genitals : "");
        setothers(o.others !== null ? o.others : "");
    }


    const createsPhysicalExploration = async (o) => {
        //const _items = global.medicalConsultation.medicalHistory.familyHistory.items;
        const fixed_fields = ['general_exploration', 'breathing', 'pulse', 'blood_pressure', 'temperature', 'head', 'neck', 'thorax', 'abdomen', 'members', 'genitals'];


        const vsinput = {
            doctor: childProps.state.doctorusername,
            secretary: childProps.state.secretary,
            patient: global.patient.username
        }
        const reinput = {
            doctor: childProps.state.doctorusername,
            secretary: childProps.state.secretary,
            patient: global.patient.username
        };
        const peinput = {
            doctor: childProps.state.doctorusername,
            secretary: childProps.state.secretary,
            patient: global.patient.username
        };
        const mhinput = {};

        //signos vitales
        if(o.blood_pressure !== ""){vsinput.blood_pressure = o.blood_pressure}else{vsinput.blood_pressure = '0/0 mm/Hg'}
        if(o.breathing !== ""){vsinput.breathing = o.breathing}else{vsinput.breathing = 0}
        if(o.pulse !== ""){vsinput.pulse = o.pulse}else{vsinput.pulse = 0}
        if(o.temperature !== ""){vsinput.temperature = o.temperature}else{vsinput.temperature = 0}
        const cvs = await API.graphql(graphqlOperation(createVitalSign, {input: vsinput} )).catch( e => { console.log(e); setLoading(false);  throw new SyntaxError("Error GraphQL"); });


        //exploracion regional
        if(o.head !== ""){reinput.head = o.head}else{reinput.head = 'N/A'}
        if(o.neck !== ""){reinput.neck = o.neck}else{reinput.neck = 'N/A'}
        if(o.thorax !== ""){reinput.thorax = o.thorax}else{reinput.thorax = 'N/A'}
        if(o.abdomen !== ""){reinput.abdomen = o.abdomen}else{reinput.abdomen = 'N/A'}
        if(o.members !== ""){reinput.members = o.members}else{reinput.members = 'N/A'}
        if(o.genitals !== ""){reinput.genitals = o.genitals}else{reinput.genitals = 'N/A'}
        
        const crx = await API.graphql(graphqlOperation(createRegionalExploration, {input: reinput} )).catch( e => { console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL"); });
        const dfer = [];
        
        Object.keys(o).forEach(
            async (e) => {
                if (fixed_fields.findIndex(v => v === e) === -1) {
                    const i = {
                        value: o[e] === "" ? "N/A" : o[e],
                        regionalExplorationOthersId: crx.data.createRegionalExploration.id,
                        othersFieldsFieldId: e,
                    }
    
                    const pcama = await API.graphql(graphqlOperation(createOthersFields, {input: i} )).catch( e => {console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL"); });
                    dfer.push(pcama.data.createOthersFields);
                }
            }
        );

        //exploracion fisica
        if(o.general_exploration !== ""){peinput.general_exploration = o.general_exploration}
        peinput.physicalExplorationVitalsignId = cvs.data.createVitalSign.id;
        peinput.physicalExplorationRegionalExplorationId = crx.data.createRegionalExploration.id;

        const cpe = await API.graphql(graphqlOperation(createPhysicalExplorationForGlobal, {input: peinput} )).catch( e => {  console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL"); });
        
        mhinput.id = global.medicalConsultation.medicalHistory.id
        mhinput.medicalHistoryPhysicalExplorationId = cpe.data.createPhysicalExploration.id;
        const updatemh = await API.graphql(graphqlOperation(updateMedicalHistory, {input: mhinput} )).catch( e => { console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL");  });
        _setFieldsFormDisable(global.regionalExplorationFields, dfer);
        global.medicalConsultation.medicalHistory.physicalExploration = cpe.data.createPhysicalExploration;

        setGlobalData(global);
        setEditDataFromCreate(o);
        setTimeout(() => {  
            setNew(false);
            setLoading(false);
        }, 2000);

    }

    const editPhysicalExploration = async (o) => {
        
        setEditLoading(true);
        const fixed_fields = ['general_exploration', 'breathing', 'pulse', 'blood_pressure', 'temperature', 'head', 'neck', 'thorax', 'abdomen', 'members', 'genitals'];
        const vsinput = {}
        const reinput = {};
        const peinput = {};

        //signos vitales
        vsinput.id = vs.id;
        if(o.blood_pressure !== ""){vsinput.blood_pressure = o.blood_pressure}
        if(o.breathing !== ""){vsinput.breathing = o.breathing}
        if(o.pulse !== ""){vsinput.pulse = o.pulse}
        if(o.temperature !== ""){vsinput.temperature = o.temperature}

        const uvs = await API.graphql(graphqlOperation(updateVitalSign, {input: vsinput} )).catch( e => { console.log(e); setEditLoading(false); throw new SyntaxError("Error GraphQL"); });


        //exploracion regional
        reinput.id = re.id;
        if(o.head !== ""){reinput.head = o.head}
        if(o.neck !== ""){reinput.neck = o.neck}
        if(o.thorax !== ""){reinput.thorax = o.thorax}
        if(o.abdomen !== ""){reinput.abdomen = o.abdomen}
        if(o.members !== ""){reinput.members = o.members}
        if(o.genitals !== ""){reinput.genitals = o.genitals}
        const urx = await API.graphql(graphqlOperation(updateRegionalExploration, {input: reinput} )).catch( e => { console.log(e); setEditLoading(false); throw new SyntaxError("Error GraphQL"); });

        const df = global.medicalConsultation.medicalHistory.physicalExploration === null ? [] : global.medicalConsultation.medicalHistory.physicalExploration.regionalExploration.others.items;
        const dfer = [];
        Object.keys(o).forEach(
            async (e) => {

                if (fixed_fields.findIndex(v => v === e) === -1) {
                    const f = df[df.findIndex(f => f.field.id === e)];
                    if (f === undefined) {
                        const i = {
                            value: o[e] === "" ? "N/A" : o[e],
                            regionalExplorationOthersId: urx.data.updateRegionalExploration.id,
                            othersFieldsFieldId: e,
                        }
        
                        const pcama = await API.graphql(graphqlOperation(createOthersFields, {input: i} )).catch( e => {console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL"); });
                        dfer.push(pcama.data.createOthersFields);

                    }else{
                        if (f.value !== o[e]) {
                            const i = {
                                id: f.id,
                                value: o[e] === "" ? "N/A" : o[e]
                            }
                            const pcama = await API.graphql(graphqlOperation(updateOthersFields, {input: i} )).catch( e => {console.log(e); setLoading(false); throw new SyntaxError("Error GraphQL"); });
                            
                            dfer.push(pcama.data.updateOthersFields);
                        }else{
                            dfer.push(f);
                        }
                    }
                }

            }
        );

        //exploracion fisica
        peinput.id = physicalexploration.id;
        if(o.general_exploration !== ""){peinput.general_exploration = o.general_exploration}

        const upe = await API.graphql(graphqlOperation(updatePhysicalExplorationForGlobal, {input: peinput} )).catch( e => { console.log(e); setEditLoading(false); throw new SyntaxError("Error GraphQL"); });
        _setFieldsFormDisable(global.regionalExplorationFields, dfer);

        global.medicalConsultation.medicalHistory.physicalExploration = upe.data.updatePhysicalExploration;
        setGlobalData(global);
        
        setTimeout(() => {  
            setEdit(false);
            setEditLoading(false);
        }, 2000);
    }

    const actions = {
        onSubmit: onSubmit,
        loading: loading,
        error: error,
        register: register,
        handleSubmit: handleSubmit,
        formState: formState,
        setLoading: setLoading,
        editPhysicalExploration: editPhysicalExploration,
    }

    return { _setFieldsForm, fieldsForm, actions, errors, _new, _edit, setEdit, editLoading, fields, editPhysicalExploration, setEditData, loading};
};

export default usePhysicalExploration;