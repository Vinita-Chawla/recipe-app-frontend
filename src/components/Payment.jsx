import { useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

function Payment() {
  let elements = useElements();
  let stripe = useStripe();
  const [card, setCard] = useState();

  const [searchParams] = useSearchParams();
  const price = searchParams.get("price");
  const interval = searchParams.get("interval");
  const plan = searchParams.get("plan");

  let auth = localStorage.getItem("user");
  let user = JSON.parse(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (elements && !card) {
      const cardElement = elements.create("card", {
        style: {
          base: {
            iconColor: "#674188",
            color: "#674188",
            fontWeight: "500",
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
              color: "#674188",
            },
            "::placeholder": {
              color: "#674188",
            },
          },
          invalid: {
            iconColor: "#FF0000",
            color: "#FF0000",
          },
        },
      });
      setCard(cardElement);

      if (cardElement) {
        cardElement.mount(".purchasecard");
      }
    }
  }, [elements, card]);

  const purchaseNow = async () => {
    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: card,
      });

      console.log("payment", paymentMethod);

      const headers = {
        "Authorization": `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        "Content-Type":"application/json"
    }

      const response = await axios.post("https://recipe-app-backend-orcin.vercel.app/", {
        id: paymentMethod.id,
        amount: price,
        interval: interval,
        plan: plan,
        name: user.name,
        email: user.email,
      }, {headers});

      console.log("response", response);

      if (response.data) {
        let formdata = new FormData();
        formdata.append("premium", true);

        const headers = {
          "Authorization": `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
          "Content-Type":"application/json"
      }

        let response = await axios.post(
          `https://recipe-app-backend-orcin.vercel.app/auth/updateUser/${user._id}`,formdata,{headers}
        );
        console.log("response.data", response.data);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      }

      
      toast.success("Subscription Successfull!")
      setTimeout(() => {
        navigate("/success");
      }, 1000);

    } catch (error) {
      console.error("Error during purchase:", error.message);
      toast.error("Subscription Failed!")
      setTimeout(() => {
        navigate("/cancel");
      }, 1000);
    }
  };

  return (
    <div className="mt-[10rem]">
      <div className="w-[95%] md:w-[50%] m-auto flex gap-[1rem] flex-col">
        <div className=" shadow-lg shadow-indigo-300/40 bg-[#FFF] rounded-[4px] px-[1rem] py-[2rem] flex gap-[1.5rem] flex-col">
          <p className="text-[1.2rem] font-semibold text-[#674188]">Name : <span className="font-medium">{user.name}</span></p>
          <p className="text-[1.2rem] font-semibold text-[#674188]">Email : <span className="font-medium">{user.email}</span></p>
        <p className="text-[1.2rem] font-semibold text-[#674188]">Current Plan:</p>
        <div className="bg-[#C8A1E0] px-[2rem] py-[1rem] flex justify-between items-center rounded">
        <p className="text-[1.2rem] font-semibold text-[#FFF] capitalize">{interval}</p> 
        <button className="bg-[#FFF] rounded px-[2rem] py-[0.5rem] text-[#674188] font-semibold">${price}</button>
        </div>
        </div>

        <div className="bg-[#FFF] shadow-lg shadow-indigo-300/40 rounded-[4px] px-[1rem] py-[1.5rem] ">
          <div className="purchasecard"></div>
        </div>

        <button
        className="rounded text-[1.1rem] mt-[2rem] px-[1rem] py-[1rem] bg-[#674188] text-white"
        onClick={purchaseNow}>Pay ${price}</button>

      </div>
    </div>
  );
}

export default Payment;
