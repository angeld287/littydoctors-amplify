import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateConsultingRoom } from '../../../../../../graphql/mutations';
import { Auth } from "aws-amplify";


const useCompany = () => {
    const [ secretary, setSecretary ] = useState("");
    const [ errorm, setErrorm ] = useState("");
    const [ userExist, setUserExist ] = useState(true);
    const [ NoSecretary, setNoSecretary ] = useState(true);
    const [ error, setError ] = useState(false);

    const AddSecretary = (company) => {
        if(secretary === "") {return;}
        Auth.signIn(secretary, 'FALSE_PASSWORD').then().catch(err => {
            setErrorm(err.message);
            const exist = (!(err.code === "UserNotFoundException")) && (err.code === "NotAuthorizedException");
            setUserExist(exist)

            // agregar secretaria al consultorio
            if(exist){
                const UpdateConsultingR = {
                    input:{
                        id: company.id,
                        secretary: secretary,
                    }
                }
                API.graphql(graphqlOperation(updateConsultingRoom, UpdateConsultingR)).then( data =>{ setNoSecretary(false)})
            }
        })
    
    }

    return { NoSecretary, error, userExist, setSecretary, secretary, AddSecretary };
};

export default useCompany;

