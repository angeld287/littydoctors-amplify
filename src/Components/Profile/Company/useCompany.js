import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listConsultingRooms } from '../../../graphql/custom-queries';


const useCompany = () => {
    const [ activeItemVerticalPills, setActiveItemVerticalPills ] = useState("1");
    const [ doctorname, setDoctorname ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ subscriptionData, setSubscriptionData ] = useState([]);
    const [ company, setCompany ] = useState({});
    const [ listModules, setListModules ] = useState([]);

    useEffect(() => {
        let didCancel = false;

        const fetchCompany = async () => {
            var companyApi = [];

            try {
                companyApi = await API.graphql(graphqlOperation(listConsultingRooms));

            } catch (error) {
                console.log(error);
                
                setLoading(false);
                setError(true);
            }

            if (!didCancel) {
                if(companyApi.data.listConsultingRooms.items[0] === undefined) {window.location.href = "/subscribe";}
                setDoctorname(companyApi.data.listConsultingRooms.items[0].doctor.username);
                const spe = companyApi.data.listConsultingRooms.items[0].doctor.specialities.items;
                const subespe = companyApi.data.listConsultingRooms.items[0].doctor.subspecialities.items;
                const subespesec = companyApi.data.listConsultingRooms.items[0].doctor.subspecialitiessec.items;
                
                const company = {
                    id: companyApi.data.listConsultingRooms.items[0].id,
                    doctorname: companyApi.data.listConsultingRooms.items[0].doctor.name,
                    doctorusername: companyApi.data.listConsultingRooms.items[0].doctor.username,
                    specialities: spe,
                    subspecialities: subespe,
                    subspecialitiessec: subespesec,
                    image: companyApi.data.listConsultingRooms.items[0].doctor.image,
                    email: companyApi.data.listConsultingRooms.items[0].doctor.email,
                    location: companyApi.data.listConsultingRooms.items[0].location.name,
                    secretary: companyApi.data.listConsultingRooms.items[0].secretary,
                    sex: companyApi.data.listConsultingRooms.items[0].doctor.sex,
                };
                
                setCompany(company);
                setSubscriptionData(null);
                
                setLoading(false);
            }
        };

        fetchCompany();

        return () => {
            didCancel = true;
        };
    }, []);

    const toggleVerticalPills = tab => () => {
        if (activeItemVerticalPills !== tab) {
          setActiveItemVerticalPills(tab)
        }
      }

    return { doctorname, error, loading, activeItemVerticalPills, setActiveItemVerticalPills, subscriptionData, toggleVerticalPills, company};
};

export default useCompany;

