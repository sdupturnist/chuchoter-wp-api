// hooks/useData.js

import { frontendUrl } from '@/utils/variables';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const CategoryData = (initialData) => {
    const [dataCategory, setDataCategory] = useState(initialData);
    const [errorDataCategory, setErrorDataCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch category data from the mainCategories API
                const resCategory = await axios.get(`${frontendUrl}/api/mainCategories`);
                
                // Save data to localStorage
                localStorage.setItem('categoryData', JSON.stringify(resCategory.data));

                setDataCategory(resCategory.data);

            } catch (error) {
                if (error.response) {
                    setErrorDataCategory(error.response.data.message);
                } else {
                    setErrorDataCategory(error.message);
                }
            }
        };

        // if (!initialData) {
        //     // Try to get data from localStorage
        //     const storedData = localStorage.getItem('categoryData');
            
        //     if (storedData) {
        //         setDataCategory(JSON.parse(storedData));
        //     } else {
        //         fetchData();
        //     }
        // } else {
        //     setDataCategory(initialData);
        // }
        fetchData();
        setDataCategory(initialData);


    }, [initialData]);

    return { dataCategory, errorDataCategory };
};
