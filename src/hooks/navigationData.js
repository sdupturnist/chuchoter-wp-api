// hooks/useData.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { frontendUrl } from '@/utils/variables';


export const NavigationData = (initialData) => {
    const [dataNavigation, setDataNavigation] = useState(initialData);
    const [errorDataNavigation, setErrorDataNavigation] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
              
          
         const resNavigation = await axios.get(`${frontendUrl}/api/navigations`);
                
                // Assuming the API response structure is similar to your GraphQL response
                setDataNavigation(resNavigation.data);
            } catch (error) {
                setErrorDataNavigation(error.message);
            }
        };

        if (!initialData) {
            fetchData();
        }
    }, [initialData]);

    return { dataNavigation, errorDataNavigation };
};
