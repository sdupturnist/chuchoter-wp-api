
'use client'

import React, { useState, useEffect } from 'react';
import { wordpressGraphQlApiUrl, wordpressRestApiUrl } from '@/utils/variables';
import { useModalContext } from '@/context/modalContext';
import { useLanguageContext } from '@/context/LanguageContext'
import { generalTranslations, contactFormTranslations } from '@/utils/transalations';

const ReviewForm = ({ productId, productName }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('5'); // Assuming rating is a string initially
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [sendProgress, setSendProgress] = useState(false);
  const [successLabel, setSuccessLabel] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(true);
  const [status, setStatus] = useState('');
  const [existingReviews, setExistingReviews] = useState([]);
  const { language } = useLanguageContext();
  const { setShowModal } = useModalContext();

  const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });


  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await fetch(`${wordpressRestApiUrl}product-reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RlbW8uY2h1Y2hvdGVycWF0YXIuY29tIiwiaWF0IjoxNzI4NDcyNzE1LCJuYmYiOjE3Mjg0NzI3MTUsImV4cCI6MTcyOTA3NzUxNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.53wfSeR3-Bb5Sw9Id3rRlJXvnH2SjA2eTgvlPh_MWSI`, // Replace with JWT or Basic Auth
      },
      body: JSON.stringify({
        title: String(productName), // Assuming name corresponds to the title
        content: comment, // Assuming comment corresponds to the content
        acf: {
          name: name, // ACF field for name
          email: email, // ACF field for email
          rating: rating, // ACF field for rating
          product_id: String(productId) // ACF field for product ID
        }
      }),
    });

    if (response.ok) {
      // Handle successful submission
      setSuccessLabel(true);
      setSendProgress(false);
      //console.log('Review submitted successfully');
    } else {
      // Handle error
      console.error('Failed to submit review');
    }



    const res = await fetch('/api/reviewSendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, name, rating, comment, todayDate })
    });

    if (res.ok) {
      setStatus('Email sent successfully!');
    } else {
      setStatus('Failed to send email');
    }

    setTimeout(() => {
      setSuccessLabel(false);
      setButtonLabel(true);
      setName('');
      setEmail('');
      setComment('');
      setShowModal(false);
    }, 1000);




  }


  return (
    <form onSubmit={handleSubmit}>


      <div className="w-full grid gap-[16px]">
        <h2 className='uppercase text-[18px] font-semibold tracking-[1%] mb-[10px]'>Ratings & Review</h2>

        <div className="rating rating-lg mb-3 gap-[10px] flex">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="1"
            checked={rating === '1'}
            onChange={() => setRating('1')}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="2"
            checked={rating === '2'}
            onChange={() => setRating('2')}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="3"
            checked={rating === '3'}
            onChange={() => setRating('3')}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="4"
            checked={rating === '4'}
            onChange={() => setRating('4')}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="5"
            checked={rating === '5'}
            onChange={() => setRating('5')}
          />
        </div>
        <input
          type="text"
          placeholder={contactFormTranslations.full_name[language]}
          className="input  placeholder:text-black border-black w-full text-black rounded-[6px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
        />

        <input
          type="email"
          placeholder={contactFormTranslations.email[language]}
          className="input  placeholder:text-black border-black w-full text-black rounded-[6px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />

        <textarea
          className="textarea  placeholder:text-black border-black textarea-bordered w-full text-black rounded-[6px]"
          placeholder={generalTranslations.review_comment[language]}
          value={comment}
          rows={5}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
        ></textarea>

        <div>
          <button
            title="Submit"
            aria-label="Submit"
            type="submit"
            className="btn btn-neutral bg-black rounded-[6px] w-full"
          >
            <span className={buttonLabel === false ? "hidden" : ""}>
         {generalTranslations.submit[language]}
            </span>
            <span className={successLabel === false ? "hidden" : ""}>
              Done! Submitted
            </span>
            <span className={`${sendProgress === false ? "hidden" : ""} flex gap-2 justify-center`}>
              <span className="loading loading-spinner loading-xs"></span>
              <span className='ml-3 leading-[20px]'>
                Submitting...
              </span>
            </span>
          </button>

          {successLabel && (
            <div role="alert" className="alert alert-success mt-7 rounded-md text-white">
              <svg
                xmlns="http:www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{generalTranslations.review_success[language]}</span>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;

