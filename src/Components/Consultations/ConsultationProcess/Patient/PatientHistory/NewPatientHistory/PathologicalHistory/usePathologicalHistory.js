import { useState } from 'react';

const usePathologicalHistory = () => {
    const [ alcohol, setAlcohol ] = useState(false);
    const [ smoking, setSmoking ] = useState(false);
    const [ drugs, setDrugs ] = useState(false);
    const [ immunizations, setImmunizations ] = useState(false);

    const setAlcoholValue = () => {setAlcohol(!alcohol)}
    const setSmokingValue = () => {setSmoking(!smoking)}
    const setDrugsValue = () => {setDrugs(!drugs)}
    const setImmunizationsValue = () => {setImmunizations(!immunizations)}

    return { alcohol, setAlcoholValue, smoking, setSmokingValue, drugs, setDrugsValue, immunizations, setImmunizationsValue };
    
};

export default usePathologicalHistory;