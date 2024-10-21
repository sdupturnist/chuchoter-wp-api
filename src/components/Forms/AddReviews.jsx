"use client";

import React, { useState, useEffect } from "react";
import {
  transalateText,
  wordpressGraphQlApiUrl,
  wordpressRestApiUrl,
  wordpressRestApiUrlWoocommerceProductsReviewCountUpdate,
} from "@/utils/variables";
import { useModalContext } from "@/context/modalContext";
import { useLanguageContext } from "@/context/LanguageContext";
import { useSiteContext } from "@/context/siteContext";

const ReviewForm = ({ productId, productName, productReviewCount }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("5"); // Assuming rating is a string initially
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [sendProgress, setSendProgress] = useState(false);
  const [successLabel, setSuccessLabel] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(true);
  const [status, setStatus] = useState("");
  const [existingReviews, setExistingReviews] = useState([]);
  const { language } = useLanguageContext();
  const { setShowModal } = useModalContext();
  const { siteTransalations } = useSiteContext();

  const todayDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });


 


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data to be sent
    const requestData = {
      title: String(productName), // Title for the review
      content: comment,           // Content of the review
      meta: {
        name: name,              // ACF field for name (ensure it's the correct field name/key)
        email: email,            // ACF field for email
        rating: rating,          // ACF field for rating
        product_id: productId.toString(),   // ACF field for product ID
      },
    };
  

    try {
      // Submit the review
      const response = await fetch(`${wordpressRestApiUrl}product-reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FkbWluLmNodWNob3RlcnFhdGFyLmNvbSIsImlhdCI6MTcyOTUwNDY3NywibmJmIjoxNzI5NTA0Njc3LCJleHAiOjE3MzAxMDk0NzcsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.l51rRbO9BRGoi9NVnfN99f3Um8Mwl7glo66ByXQ9y5M`, // Replace with JWT or Basic Auth
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        setSuccessLabel(true);
        setSendProgress(false);
        console.log('Review submitted successfully');
      } else {
        const errorResponse = await response.json();
        console.error("Failed to submit review", response.status, errorResponse);
      }


      const responseUpdateCount = await fetch(wordpressRestApiUrlWoocommerceProductsReviewCountUpdate, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FkbWluLmNodWNob3RlcnFhdGFyLmNvbSIsImlhdCI6MTcyOTUwNDY3NywibmJmIjoxNzI5NTA0Njc3LCJleHAiOjE3MzAxMDk0NzcsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.l51rRbO9BRGoi9NVnfN99f3Um8Mwl7glo66ByXQ9y5M`, // Replace with JWT or Basic Auth
        },
        body: JSON.stringify({
          id: productId,  
          user_reviews: "Updated reviews content",  // ACF field value
          meta_key: "_product_review_count",  // Custom post meta key
          meta_value: parseInt(productReviewCount) + 1  // Increment productReviewCount by 1 and ensure it's a number
        }),
    });
    
    if (responseUpdateCount.ok) {
        console.log('Review count updated successfully');
    } else {
        const errorResponse = await responseUpdateCount.json();
        console.error("Failed to update review count", responseUpdateCount.status, errorResponse);
    }
    
  

      


      // Send email notification
      const emailResponse = await fetch("/api/reviewSendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, name, rating, comment, todayDate }),
      });
  
      if (emailResponse.ok) {
        setStatus("Email sent successfully!");
      } else {
        const emailErrorResponse = await emailResponse.json();
        console.error("Failed to send email", emailErrorResponse);
        setStatus("Failed to send email");
      }
  
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setTimeout(() => {
        setSuccessLabel(false);
        setButtonLabel(true);
        setName("");
        setEmail("");
        setComment("");
        setShowModal(false);
      }, 1000);
    }
  };

  
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full grid gap-[16px]">
        <h2 className="uppercase text-[18px] font-semibold tracking-[1%] mb-[10px]">
         {transalateText(
            siteTransalations?.generalTranslations?.ratings_review_popup_heading,
            language
          )}
        </h2>

        <div className="rating rating-lg mb-3 gap-[10px] flex">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="1"
            checked={rating === "1"}
            onChange={() => setRating("1")}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="2"
            checked={rating === "2"}
            onChange={() => setRating("2")}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="3"
            checked={rating === "3"}
            onChange={() => setRating("3")}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="4"
            checked={rating === "4"}
            onChange={() => setRating("4")}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="5"
            checked={rating === "5"}
            onChange={() => setRating("5")}
          />
        </div>
        <input
          type="text"
          placeholder={transalateText(
            siteTransalations?.generalTranslations?.full_name,
            language
          )}
          className="input  placeholder:text-black border-black w-full text-black rounded-[6px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
        />

        <input
          type="email"
          placeholder={transalateText(
            siteTransalations?.generalTranslations?.email,
            language
          )}
          className="input  placeholder:text-black border-black w-full text-black rounded-[6px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />

        <textarea
          className="textarea  placeholder:text-black border-black textarea-bordered w-full text-black rounded-[6px]"
          placeholder={transalateText(
            siteTransalations?.generalTranslations?.review_comment,
            language
          )}
          value={comment}
          rows={5}
          onChange={(e) => setComment(e.target.value)}
          name="comment"></textarea>

        <div>
          <button
            title="Submit"
            aria-label="Submit"
            type="submit"
            className="btn btn-neutral bg-black rounded-[6px] w-full">
            <span className={buttonLabel === false ? "hidden" : ""}>
              {transalateText(
                siteTransalations?.generalTranslations?.submit,
                language
              )}
            </span>
            <span className={successLabel === false ? "hidden" : ""}>
              Done! Submitted
            </span>
            <span
              className={`${
                sendProgress === false ? "hidden" : ""
              } flex gap-2 justify-center`}>
              <span className="loading loading-spinner loading-xs"></span>
              <span className="ml-3 leading-[20px]">Submitting...</span>
            </span>
          </button>

          {successLabel && (
            <div
              role="alert"
              className="alert alert-success mt-7 rounded-md text-white">
              <svg
                xmlns="http:www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {transalateText(
                  siteTransalations?.generalTranslations?.review_success,
                  language
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
