// hooks/useData.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { frontendUrl } from '@/utils/variables';
import { useRouter } from 'next/router';

export const ContactData = (initialData) => {
    const [dataContact, setDataContact] = useState(initialData);
    const [errorDataContact, setErrorDataContact] = useState(null);

    const router = useRouter();
    const { query } = router;

 

    const lang = query.slug; // Assuming you have a dynamic route like /about/[slug]
    const slug = `contactInfo-${lang}`; 



    useEffect(() => {
        const fetchData = async () => {
            try {
              
                const resContact = await axios.get(`${frontendUrl}/api/contactInfo`, {
                    params: { slug },
                  });

                
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
