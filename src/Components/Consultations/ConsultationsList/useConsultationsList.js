import React, { useState, useEffect, Fragment } from 'react';
import { listMedicalConsultations } from './../../../graphql/custom-queries';
import { API, graphqlOperation } from 'aws-amplify';
import { MDBIcon } from 'mdbreact';
import moment from 'moment';


const useConsultationsList = () => {
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
                        {createdAt: {gt: String(moment(today).format('YYYY-MM-DDTHH:mm:ss.SSS'))}}, 
                        {createdAt: {eq: String(moment(today).format('YYYY-MM-DDTHH:mm:ss.SSS'))}},
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
        console.log(items);
        const clist = items.filter(x => x.state === "DONE");
        const ilist = items.filter(x => x.state === "IN_PROCESS");
        const crows = [];
        const irows = [];

        var n = 0;
        clist.sort().forEach(e => { crows.push({ number: n + 1, name: "-", duration: "-", state: "-", phone: "-" }) });
        n = 0 ;
        ilist.sort().forEach(e => { irows.push({ number: n + 1, name: "-", action: "-" }) });


        const cdata = {
            columns: [
                {label: <MDBIcon size="2x" icon="check-circle" className="blue-text" />, field: 'number' },
                {label: <MDBIcon size="2x" icon="user-circle" className="blue-text" />, field: 'name' },
                {label: <MDBIcon size="2x" icon="clock" className="blue-text" />, field: 'duration' },
                {label: <MDBIcon size="2x" icon="columns" className="blue-text" />, field: 'state' },
                {label: <MDBIcon size="2x" icon="phone" className="blue-text" />, field: 'phone' }
            ],
            rows: crows
        };

        const idata = {
            columns: [
                {label: <MDBIcon size="2x" icon="times-circle" className="blue-text" />, field: 'number' },
                {label: "Nombre", field: 'name' },
                {label: 'Accion', field: 'actions' }
            ],
            rows: irows
        };
        console.log(idata);
        
        setCtable(cdata)
        setItable(idata)

    }

    return { loading, consultations, error, ctable, itable };
};

export default useConsultationsList;