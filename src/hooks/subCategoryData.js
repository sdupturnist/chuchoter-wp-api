// hooks/useData.js

import { frontendUrl } from '@/utils/variables';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const SubCategoryData = (initialData) => {
    const [dataSubCategory, setDataSubCategory] = useState(initialData);
    const [errorDataSubCategory, setErrorDataSubCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch SubCategory data from the mainCategories API
                const resSubCategory = await axios.get(`${frontendUrl}/api/subCategories`);
                
                // Save data to localStorage
                localStorage.setItem('SubCategoryData', JSON.stringify(resSubCategory.data));

                setDataSubCategory(resSubCategory.data);

            } catch (error) {
                if (error.response) {
                    setErrorDataSubCategory(error.response.data.message);
                } else {
                    setErrorDataSubCategory(error.message);
                }
            }
        };

        // if (!initialData) {
        //     // Try to get data from localStorage
        //     const storedData = localStorage.getItem('SubCategoryData');
            
        //     if (storedData) {
        //         setDataSubCategory(JSON.parse(storedData));
        //     } else {
        //         fetchData();
        //     }
        // } else {
        //     setDataSubCategory(initialData);
        // }
        fetchData();
        setDataSubCategory(initialData);


    }, [initialData]);

    return { dataSubCategory, errorDataSubCategory };
};
