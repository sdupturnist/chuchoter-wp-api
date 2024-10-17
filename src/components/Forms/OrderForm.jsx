"use client";

import React, { useState, useEffect } from "react";
import { transalateText } from "@/utils/variables";
import { useRouter } from "next/navigation";
import { useLanguageContext } from "@/context/LanguageContext";
import { useSiteContext } from "@/context/siteContext";

export default function OrderForm({ totalAmountOrder, items }) {
  const router = useRouter();

  const { language } = useLanguageContext();
  const { siteTransalations } = useSiteContext();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [instructions, setInstructions] = useState("");
  // const [deliveryDate, setDeliveryDate] = useState('');
  // const [deliveryTime, setDeliveryTime] = useState('');
  const [giftItem, setGiftItem] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverCity, setReceiverCity] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [sendProgress, setSendProgress] = useState(false);
  const [successLabel, setSuccessLabel] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(true);
  const [status, setStatus] = useState("");

  const orderItems = items
    .map((item) => `ID: ${item.id},  Quantity: ${item.quantity}`)
    .join(" | "); // You can use any delimiter you prefer, such as ', ', ' | ', or '\n'

  // Create a variable to hold the formatted list of items
  const itemListMail = items
    .map(
      (item) =>
        `<div>
                <p><strong>ID:</strong> ${item.id}</p>
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Price:</strong> ${
                  item?.price != null
                    ? Math.round(item?.price * 100) / 100
                    : undefined
                } QR</p>
                <p><strong>Total:</strong> ${(
                  item.price * item.quantity
                ).toFixed(2)} QR</p>
                <hr> <!-- Horizontal rule for separation -->
              </div>`
    )
    .join(""); // No additional separators here; <hr> tag provides separation

  async function sendOrder() {
    // try {
    //     const response = await fetch(wordpressGraphQlApiUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             query: `
    //     mutation {
    //       createOrder(
    //         data: {
    //           orderEmail: "${email}",
    //           orderCity: "${city}",
    //           orderAdditionalInstructions: "${instructions}",
    //           orderGift: ${giftItem},
    //           ReceiverName: "${receiverName}",
    //           ReceiverPhone: "${receiverPhone}",
    //           ReceiverCity: "${receiverCity}",
    //           OrderFullName: "${receiverName}",
    //           orderItems: "${orderItems}",
    //           orderPhone: "${phone}",
    //           OrderAddress: "${address}",
    //           ReceiverAddress: "${receiverAddress}",
    //           TotalAmount: "${totalAmountOrder}"
    //         }
    //       ) {
    //         data {
    //           id
    //           attributes {
    //             orderEmail
    //             orderCity
    //             orderAdditionalInstructions
    //             orderGift
    //             ReceiverName
    //             ReceiverPhone
    //             ReceiverCity
    //             OrderFullName
    //             orderItems
    //             orderPhone
    //             OrderAddress
    //             ReceiverAddress
    //             TotalAmount
    //           }
    //         }
    //       }
    //     }
    //   `,
    //         }),
    //     });

    //     if (!response.ok) {
    //         const errorText = await response.text();
    //         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    //     }

    //     const { data } = await response.json();

    //     // Assuming you want to use `data` for further processing
    //     let headerPost = data;

    //     setSendProgress(true);

    //   //  console.log(headerPost);
    // } catch (error) {
    //     console.error('Error during fetch:', error);
    //     // Optionally, update the UI to reflect the error state
    // }

    try {
      const res = await fetch("/api/orderSendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          address,
          city,
          instructions,
          giftItem,
          receiverName,
          receiverPhone,
          receiverAddress,
          receiverCity,
          itemListMail,
          totalAmountOrder,
        }),
      });

      if (res.ok) {
        setStatus("Email sent successfully!");
      } else {
        setStatus("Failed to send email");
      }
    } catch (error) {
      setStatus("An error occurred");
      console.log(error);
    }
  }

  useEffect(() => {}, [
    fullname,
    email,
    phone,
    address,
    city,
    instructions,
    giftItem,
    receiverName,
    receiverPhone,
    receiverAddress,
    receiverCity,
  ]);

  // Validate form
  const validateForm = () => {
    let errors = {};

    if (!fullname) {
      errors.fullname = `${transalateText(
        siteTransalations?.orderFormTranslations?.full_name,
        language
      )} ${language === "en" ? "is required." : "مطلوب"}`;
    }

    if (!email) {
      errors.email = `${transalateText(
        siteTransalations?.orderFormTranslations?.email,
        language
      )}  ${language === "en" ? "is required." : "مطلوب"}`;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = `${transalateText(
        siteTransalations?.orderFormTranslations?.email,
        language
      )}  ${language === "en" ? "is invalid." : "غير صالح"}`;
    }

    if (!phone) {
      errors.phone = `${transalateText(
        siteTransalations?.orderFormTranslations?.phone,
        language
      )}  ${language === "en" ? "is required." : "مطلوب"}`;
    }
    if (!address) {
      errors.address = `${transalateText(
        siteTransalations?.orderFormTranslations?.address,
        language
      )}  ${language === "en" ? "is required." : "مطلوب"}`;
    }
    if (!city) {
      errors.city = `${transalateText(
        siteTransalations?.orderFormTranslations?.city,
        language
      )} ${language === "en" ? "is required." : "مطلوب"}`;
    }
    // if (!deliveryDate) {
    //     errors.deliveryDate = 'Date is required.';
    // }
    // if (!deliveryTime) {
    //     errors.deliveryTime = 'Time is required.';
    // }

    if (giftItem == true) {
      if (!receiverName) {
        errors.receiverName = `${transalateText(
          siteTransalations?.orderFormTranslations?.receiver_name,
          language
        )}  ${language === "en" ? "is required." : "مطلوب"}`;
      }
      if (!receiverAddress) {
        errors.receiverAddress = `${transalateText(
          siteTransalations?.orderFormTranslations?.receiver_address,
          language
        )}  ${language === "en" ? "is required." : "مطلوب"}`;
      }
      if (!receiverPhone) {
        errors.receiverPhone = `${transalateText(
          siteTransalations?.orderFormTranslations?.receiver_phone,
          language
        )}  ${language === "en" ? "is required." : "مطلوب"}`;
      }
      if (!receiverCity) {
        errors.receiverCity = `${transalateText(
          siteTransalations?.orderFormTranslations?.receiver_city,
          language
        )}  ${language === "en" ? "is required." : "مطلوب"}`;
      }
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  //VALIDATE LIVE
  const changeValidate = () => {
    validateForm();
  };

  // Submit
  const submitEmail = () => {
    validateForm();
    if (isFormValid) {
      sendOrder();

      setButtonLabel(false);
      setSendProgress(true);
      setIsFormValid(false);

      setTimeout(() => {
        setSuccessLabel(true);
        setSendProgress(false);
        router.push("/order-success");
        localStorage.removeItem("cartItems");
      }, 3000);
      setTimeout(() => {
        setSuccessLabel(false);
        setButtonLabel(true);
        setFullname("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCity("");
        setInstructions("");
        // setDeliveryDate('')
        //setDeliveryTime('')
        setGiftItem(false);
        setReceiverName("");
        setReceiverPhone("");
        setReceiverAddress("");
        setReceiverCity("");
      }, 4000);
    }
  };

  return (
    <>
      <div className="w-full grid gap-[16px]">
        <div className="grid gap-[16px]">
          <h2 className="uppercase text-[18px] font-semibold tracking-[1%] sm:mb-[10px] mb-[10px]">
            {transalateText(
              siteTransalations?.orderFormTranslations
                ?.additional_information_title,
              language
            )}
          </h2>

          <div className="sm:flex grid gap-[16px]">
            {/* <div className='w-full'> */}
            {/* <input  placeholder:text-black*/}
            {/* autocomplete="off" */}
            {/* type="date" */}
            {/* placeholder="Date" */}
            {/* className="input  placeholder:text-black border-black w-full text-black rounded-[6px] min-h-[55px] text-[14px]" */}
            {/* value={deliveryDate} */}
            {/* onChange={(e) => setDeliveryDate(e.target.value)} */}
            {/* name="deliveryDate" */}
            {/* required */}
            {/* /> */}
            {/* {errors.deliveryDate && <p className='text-red-500 text-[14px] py-2'>{errors.deliveryDate}</p>} */}
            {/* </div> */}

            {/* <div className='w-full'> */}
            {/* <input  placeholder:text-black*/}
            {/* autocomplete="off" */}
            {/* type="time" */}
            {/* placeholder="Time" */}
            {/* className="input  placeholder:text-black border-black w-full text-black rounded-[6px] min-h-[55px] text-[14px]" */}
            {/* value={deliveryTime} */}
            {/* onChange={(e) => setDeliveryTime(e.target.value)} */}
            {/* name="deliveryTime" */}
            {/* required */}
            {/* /> */}
            {/* {errors.deliveryTime && <p className='text-red-500 text-[14px] py-2'>{errors.deliveryTime}</p>} */}
            {/* </div> */}
          </div>
          <div>
            <input
              autocomplete="off"
              type="text"
              placeholder={transalateText(
                siteTransalations?.orderFormTranslations?.full_name,
                language
              )}
              className="input  placeholder:text-black border-black w-full text-black rounded-[6px] min-h-[55px] text-[14px]"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              name="fullname"
              required
            />
            {errors.fullname && (
              <p className="text-red-500 text-[14px] py-2">{errors.fullname}</p>
            )}
          </div>
          <div className="sm:flex grid gap-[16px]">
            <div className="w-full">
              <input
                autocomplete="off"
                type="number"
                placeholder={transalateText(
                  siteTransalations?.orderFormTranslations?.phone,
                  language
                )}
                className="input  placeholder:text-black border-black w-full text-black rounded-[6px] min-h-[55px] text-[14px]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-[14px] py-2">{errors.phone}</p>
              )}
            </div>

            <div className="w-full">
              <input
                autocomplete="off"
                type="email"
                placeholder={transalateText(
                  siteTransalations?.orderFormTranslations?.email,
                  language
                )}
                className="input  placeholder:text-black border-black w-full text-black rounded-[6px] min-h-[55px] text-[14px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-[14px] py-2">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <input
              autocomplete="off"
              className="input  placeholder:text-black border-black w-full text-black rounded-[6px]  min-h-[55px] text-[14px]"
              placeholder={transalateText(
                siteTransalations?.orderFormTranslations?.address,
                language
              )}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="address"
            />
            {errors.address && (
              <p className="text-red-500 text-[14px]  py-2">{errors.address}</p>
            )}
          </div>
          <div>
            <input
              autocomplete="off"
              type="text"
              placeholder={transalateText(
                siteTransalations?.orderFormTranslations?.city,
                language
              )}
              className="input  placeholder:text-black border-black w-full text-black rounded-[6px] min-h-[55px] text-[14px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name="fullname"
              required
            />
            {errors.city && (
              <p className="text-red-500 text-[14px]  py-2">{errors.city}</p>
            )}
          </div>
          <div>
            <input
              autocomplete="off"
              className="input  placeholder:text-black border-black w-full text-black rounded-[6px]  min-h-[55px] text-[14px]"
              placeholder={transalateText(
                siteTransalations?.orderFormTranslations
                  ?.additional_instructions,
                language
              )}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              name="instructions"
            />
            {errors.instructions && (
              <p className="text-red-500 text-[14px]  py-2">
                {errors.instructions}
              </p>
            )}
          </div>
          <div className="flex items-center gap-[10px] uppercase text-[14px] tracking-[0.5px]">
            <input
              autocomplete="off"
              type="checkbox"
              onChange={(e) => setGiftItem(!giftItem)}
              className={`checkbox checkbox-xs mb-1 border-black [--chkbg:theme(colors.black)] [--chkfg:white] checked:border-black-100 rounded-[4px]`}
            />
            {transalateText(
              siteTransalations?.orderFormTranslations?.is_gift,
              language
            )}
          </div>
        </div>
        {giftItem && (
          <div className="w-full grid gap-[16px] mt-[10px]">
            <h2 className="uppercase text-[18px] font-semibold tracking-[1%] sm:mb-[10px] mb-[10px]">
              {transalateText(
                siteTransalations?.orderFormTranslations
                  ?.receiver_information_title,
                language
              )}
            </h2>

            <div>
              <input
                autocomplete="off"
                type="text"
                placeholder={transalateText(
                  siteTransalations?.orderFormTranslations?.receiver_name,
                  language
                )}
                className="input  placeholder:text-black border-black w-full text-black rounded-[6px] min-h-[55px] text-[14px]"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                name="receiverName"
                required
              />
              {errors.receiverName && (
                <p className="text-red-500 text-[14px] py-2">
                  {errors.receiverName}
                </p>
              )}
            </div>
            <div>
              <input
                autocomplete="off"
                type="number"
                placeholder={transalateText(
                  siteTransalations?.orderFormTranslations?.receiver_phone,
                  language
                )}
                className="input  placeholder:text-black border-black w-full text-black rounded-[6px] min-h-[55px] text-[14px]"
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                name="receiverPhone"
                required
              />
              {errors.receiverPhone && (
                <p className="text-red-500 text-[14px] py-2">
                  {errors.receiverPhone}
                </p>
              )}
            </div>
            <div>
              <input
                autocomplete="off"
                className="input  placeholder:text-black border-black w-full text-black rounded-[6px]  min-h-[55px] text-[14px]"
                placeholder={transalateText(
                  siteTransalations?.orderFormTranslations?.receiver_address,
                  language
                )}
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                name="receiverAddress"
              />
              {errors.receiverAddress && (
                <p className="text-red-500 text-[14px] py-2">
                  {errors.receiverAddress}
                </p>
              )}
            </div>
            <div>
              <input
                autocomplete="off"
                type="text"
                placeholder={transalateText(
                  siteTransalations?.orderFormTranslations?.receiver_city,
                  language
                )}
                className="input  placeholder:text-black border-black w-full text-black rounded-[6px] min-h-[55px] text-[14px]"
                value={receiverCity}
                onChange={(e) => setReceiverCity(e.target.value)}
                name="receiverCity"
                required
              />
              {errors.receiverCity && (
                <p className="text-red-500 text-[14px] py-2">
                  {errors.receiverCity}
                </p>
              )}
            </div>
          </div>
        )}
        <div>
          <button
            title="Submit"
            aria-label="Submit"
            type="submit"
            className="btn rounded-[6px] w-full min-h-[55px]"
            onClick={submitEmail}>
            <span className={buttonLabel == false ? "hidden" : ""}>
              {transalateText(
                siteTransalations?.orderFormTranslations?.action,
                language
              )}
            </span>
            <span className={successLabel == false ? "hidden" : ""}></span>
            <span
              className={`${
                sendProgress == false ? "hidden" : ""
              } flex gap-2 justify-center`}>
              <span className="loading loading-spinner loading-xs "></span>
              <span className="ml-3 pt-[5px]">
                {" "}
                {transalateText(
                  siteTransalations?.generalTranslations?.submitting,
                  language
                )}
                ...
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
