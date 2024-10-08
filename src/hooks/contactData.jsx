// hooks/useData.js

import { wordpressGraphQlApiUrl } from '@/utils/variables';
import { useEffect, useState } from 'react';

export const ContactData = (initialData) => {





    const [dataContact, setDataContact] = useState(initialData);
    const [errorDataContact, setErrorDataContact] = useState(null);



    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await fetch(wordpressGraphQlApiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: ` {
  allContactInfo {
    nodes {
    title
    content
      contactInfoAcf {
        email
        facebook
        instagram
        phone
        pintrest
        snapchat
        tiktok
        whatsapp
      }
    }
  }
}`,
                    }),
                    next: { revalidate: 10 },
                },
                    {
                        cache: 'force-cache',
                        cache: 'no-store'
                    });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();


                setDataContact(data);
                //console.log(data)
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
