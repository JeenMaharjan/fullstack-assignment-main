import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeCheckout from "../components/StripeCheckout.jsx";

import "../stripe.css";


// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  
   
 
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      {/* <button onClick={checkout.show({amount : 1000  })}>Pay with Khalti</button> */}
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;