// hooks/useData.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { frontendUrl } from '@/utils/variables';

export const ContactData = (initialData) => {
    const [dataContact, setDataContact] = useState(initialData);
    const [errorDataContact, setErrorDataContact] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resContact = await axios.get(`${frontendUrl}/api/contactInfo`);
                
                // Assuming the API response structure is similar to your GraphQL response
                setDataContact(resContact.data);
            } catch (error) {
                setErrorDataContact(error.message);
            }
        };

        if (!initialData) {
            fetchData();
        }
    }, [initialData]);

    return { dataContact, errorDataContact };
};
