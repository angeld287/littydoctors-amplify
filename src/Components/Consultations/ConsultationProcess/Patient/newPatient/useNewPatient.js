import { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import useConsultationProcess from '../../useConsultationProcess';
import { listReligions } from '../../../../../graphql/queries';

import { API, graphqlOperation } from 'aws-amplify';

const useNewPatient = () => {
    const [ _loading, _setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ name, setName ] = useState(null);
    const [ birthdate, setBirthdate ] = useState(new Date());
    const [ api, setApi ] = useState ("");
    const [ religion, setreligion ] = useState ("");
    const [ address, setaddress ] = useState ("");
    const [ age, setAge ] = useState (0);
    const [ monthAge, setMonthAge ] = useState (0);
    const [ id_card, setid_card ] = useState ("");
    const [ marital_status, setmarital_status ] = useState ("");
    const [ sex, setsex ] = useState ("");
    const { setCreateNewPatient, createNewPatient } = useConsultationProcess ();
    const { register, handleSubmit, errors, formState } = useForm();

    const [ location, setlocation ] = useState ("");


    const fields = {
        religion: {
            religion, setreligion
        },
        marital_status: {
            marital_status, setmarital_status
        },
        sex:{
            sex, setsex
        },
        religion:{
            religion, setreligion
        },
        address:{
            address, setaddress
        },
        location:{
            location, setlocation
        }
      }

      const handle = location => {
        console.log("data");
        
        //setlocation(location);
      };

      const handleSelect = location => {
        setlocation(location);
      };
    
      const handleChange = location => {
        setlocation(location);
      };

      useEffect(() => {
        let didCancel = false;
        var api = {};

        const fetch = async () => {
            
            try {

                const _religions = await API.graphql(graphqlOperation(listReligions, {limit: 400}));

                const _religions_ = [];
                _religions.data.listReligions.items.forEach(e => {
                    var i = {value: e.id, label: e.name};
                    _religions_.push(i);
                }); 
                
                
                api = {
                    religions: _religions_,
                    sexs: [{value: 'MALE', label: 'Hombre'}, {value: 'FEMALE', label: 'Mujer'}],
                    maritalstatus: [{value: 'MARRIED', label: 'Casado(a)'}, {value: 'SINGLE', label: 'Soltero(a)'}, {value: 'DIVORCED', label: 'Divorciado(a)'}, {value: 'WIDOWED', label: 'Viudo(a)'}],
                };

                setApi(api);
                _setLoading(false);

            } catch (err) {
                console.log("Ha ocurrido un error al intentar traer las listas", err);
                
                _setLoading(false);
                setError(true);
            }

            if (!didCancel) {
                _setLoading(false);
            }
        };

        fetch();

        return () => {
            didCancel = true;
        };
    }, []);



    return { monthAge, setMonthAge, age, setAge, birthdate, setBirthdate, register, handleSubmit, errors, formState, _loading, _setLoading, name, setName, fields, api, handleSelect, handleChange };
};

export default useNewPatient;