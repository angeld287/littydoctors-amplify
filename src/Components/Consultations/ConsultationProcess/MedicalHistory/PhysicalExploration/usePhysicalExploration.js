import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import useForm from 'react-hook-form';
import {    createPhysicalExploration, 
            updatePhysicalExploration,
            updateMedicalHistory,
            createVitalSign,
            updateVitalSign,
            createRegionalExploration,
            updateRegionalExploration,
        } from '../../../../../graphql/mutations';

const usePhysicalExploration = (global, setGlobalData) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    let { consultation, patient } = useParams();
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
                /* API.graphql(graphqlOperation(createMedicalHistory, {input: input}))
                .then((r) => {
                    
                }).catch((err) => { 
                    console.log("Ocurrio un error: ",err); 
                    setError(true) 
                    setLoading(false);
                });  */
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        setLoading(true);
        fetch();
        setLoading(false);
        return () => {
            didCancel = true;
        };
    }, []);
    

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
        
        const vsinput = {}
        const reinput = {};
        const peinput = {};
        const mhinput = {};

        //signos vitales
        if(o.blood_pressure !== ""){vsinput.blood_pressure = o.blood_pressure}
        if(o.breathing !== ""){vsinput.breathing = o.breathing}
        if(o.pulse !== ""){vsinput.pulse = o.pulse}
        if(o.temperature !== ""){vsinput.temperature = o.temperature}
        const cvs = await API.graphql(graphqlOperation(createVitalSign, {input: vsinput} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); setLoading(false); });


        //exploracion regional
        if(o.head !== ""){reinput.head = o.head}
        if(o.neck !== ""){reinput.neck = o.neck}
        if(o.thorax !== ""){reinput.thorax = o.thorax}
        if(o.abdomen !== ""){reinput.abdomen = o.abdomen}
        if(o.members !== ""){reinput.members = o.members}
        if(o.genitals !== ""){reinput.genitals = o.genitals}
        if(o.others !== ""){reinput.others = o.others}
        const crx = await API.graphql(graphqlOperation(createRegionalExploration, {input: reinput} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); setLoading(false); });

        //exploracion fisica
        if(o.general_exploration !== ""){peinput.general_exploration = o.general_exploration}
        peinput.physicalExplorationVitalsignId = cvs.data.createVitalSign.id;
        peinput.physicalExplorationRegionalExplorationId = crx.data.createRegionalExploration.id;

        const cpe = await API.graphql(graphqlOperation(createPhysicalExploration, {input: peinput} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); setLoading(false); });
        
        mhinput.id = global.medicalConsultation.medicalHistory.id
        mhinput.medicalHistoryPhysicalExplorationId = cpe.data.createPhysicalExploration.id;
        const updatemh = await API.graphql(graphqlOperation(updateMedicalHistory, {input: mhinput} )).catch( e => { throw new SyntaxError("Error GraphQL"); console.log(e); setLoading(false); });

        global.medicalConsultation.medicalHistory.physicalExploration = cpe.data.createPhysicalExploration;

        setGlobalData(global);
        setEditDataFromCreate(o);
        setTimeout(() => {  
            setNew(false);
            setLoading(false);
        }, 2000);

    }

    const editPhysicalExploration = async () => {
        setEditLoading(true);
        const vsinput = {}
        const reinput = {};
        const peinput = {};

        //signos vitales
        vsinput.id = vs.id;
        if(blood_pressure !== ""){vsinput.blood_pressure = blood_pressure}
        if(breathing !== ""){vsinput.breathing = breathing}
        if(pulse !== ""){vsinput.pulse = pulse}
        if(temperature !== ""){vsinput.temperature = temperature}
        const uvs = await API.graphql(graphqlOperation(updateVitalSign, {input: vsinput} )).catch( e => { console.log(e); setEditLoading(false); throw new SyntaxError("Error GraphQL"); });


        //exploracion regional
        reinput.id = re.id;
        if(head !== ""){reinput.head = head}
        if(neck !== ""){reinput.neck = neck}
        if(thorax !== ""){reinput.thorax = thorax}
        if(abdomen !== ""){reinput.abdomen = abdomen}
        if(members !== ""){reinput.members = members}
        if(genitals !== ""){reinput.genitals = genitals}
        if(others !== ""){reinput.others = others}
        const urx = await API.graphql(graphqlOperation(updateRegionalExploration, {input: reinput} )).catch( e => { console.log(e); setEditLoading(false); throw new SyntaxError("Error GraphQL"); });

        //exploracion fisica
        peinput.id = physicalexploration.id;
        if(general_exploration !== ""){peinput.general_exploration = general_exploration}

        const upe = await API.graphql(graphqlOperation(updatePhysicalExploration, {input: peinput} )).catch( e => { console.log(e); setEditLoading(false); throw new SyntaxError("Error GraphQL"); });
    
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
    }

    return { actions, errors, _new, _edit, setEdit, editLoading, fields, editPhysicalExploration, setEditData, loading};
};

export default usePhysicalExploration;