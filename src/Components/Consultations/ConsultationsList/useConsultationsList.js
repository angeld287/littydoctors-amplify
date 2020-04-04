import React, { useState, useEffect, Fragment } from 'react';
import { listMedicalConsultations } from './../../../graphql/custom-queries';
import { API, graphqlOperation } from 'aws-amplify';
import { MDBIcon, MDBBtn } from 'mdbreact';
import moment from 'moment';


const useConsultationsList = (childProps) => {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ consultations, setConsultations ] = useState([]);
    const [ ctable, setCtable ] = useState([]);
    const [ itable, setItable ] = useState([]);


    useEffect(() => {
        let didCancel = false;

        const fetchConsultations = async () => {
            try {
                const today = new Date;
                const filetrLimit = {
                    filter: {
                      or: [
                        {startedAt: {gt: String(moment(today).format('YYYY-MM-DDT00:00:00.000'))}}, 
                        //{startedAt: {eq: String(moment(today).format('YYYY-MM-DDTHH:mm:ss.SSS'))}},
                      ]
                    },
                    limit: 400
                  };

                var _consultations = await API.graphql(graphqlOperation(listMedicalConsultations, filetrLimit));
                
                
            } catch (error) {
                setLoading(false);
                setError(true);
            }

            if (!didCancel) {
                setConsultations(_consultations.data.listMedicalConsultations.items);
                setLists(_consultations.data.listMedicalConsultations.items);
                setLoading(false);
            }
        };

        fetchConsultations();

        return () => {
            didCancel = true;
        };
    }, []);

    const setLists = (items) => {
        const clist = items.filter(x => x.state === "DONE");
        const ilist = items.filter(x => x.state === "IN_PROCESS");
        const crows = [];
        const irows = [];

        var n = 0;
        clist.sort().forEach(e => { n = n + 1; crows.push({ number: n, name: (<span>{e.patient.name}</span>), duration: (moment.utc(moment(moment(e.finalizedAt).format("HH:mm"),"HH:mm").diff(moment(moment(e.startedAt).format("HH:mm"),"HH:mm"))).format("HH:mm"))+"h" , state: e.state === "DONE" ? "TERMINADA" : "NO TERMINADA", phone: e.patient.phone }) });
        n = 0 ;
        ilist.sort().forEach(e => { n = n + 1; irows.push({ number: n, name: (<span>{e.patient.name}</span>), action: (<MDBBtn tag="a" size="sm" floating gradient="blue" onClick={ ev => {ev.preventDefault(); redirectToConsultation(e.id, e.patient.id);} }><MDBIcon icon="play-circle" /></MDBBtn>) }) });


        const cdata = {
            columns: [
                {label: <MDBIcon size="2x" icon="check-circle" className="blue-text" />, field: 'number', width: '10%' },
                {label: <MDBIcon size="2x" icon="user-circle" className="blue-text" />, field: 'name', width: '40%' },
                {label: <MDBIcon size="2x" icon="clock" className="blue-text" />, field: 'duration', width: '10%' },
                {label: <MDBIcon size="2x" icon="columns" className="blue-text" />, field: 'state', width: '20%' },
                {label: <MDBIcon size="2x" icon="phone" className="blue-text" />, field: 'phone', width: '20%' }
            ],
            rows: crows
        };

        const idata = {
            columns: [
                {label: <MDBIcon size="2x" icon="ban" className="blue-text" />, field: 'number', width: '10%' },
                {label: <MDBIcon size="2x" icon="user-circle" className="blue-text" />, field: 'name', width: '50%' },
                {field: 'actions', width: '40%' }
            ],
            rows: irows
        };
        setCtable(cdata)
        setItable(idata)

    }

    const redirectToConsultation = (consultation, patient) => {
        window.location.href = "/consultations/"+ childProps.state.speciality +"/"+consultation+"/"+patient;
    }

    return { loading, consultations, error, ctable, itable };
};

export default useConsultationsList;