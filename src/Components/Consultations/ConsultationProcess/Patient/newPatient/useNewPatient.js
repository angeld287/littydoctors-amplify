import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useForm from 'react-hook-form';
import useConsultationProcess from '../../useConsultationProcess';

const useNewPatient = () => {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ name, setName ] = useState(null);
    const [ birthdate, setBirthdate ] = useState(new Date());
    const { register, handleSubmit, errors, formState } = useForm();
    const { setCreateNewPatient, createNewPatient } = useConsultationProcess ();

    return { birthdate, setBirthdate, register, handleSubmit, errors, formState, loading, setLoading, name, setName  };
};

export default useNewPatient;