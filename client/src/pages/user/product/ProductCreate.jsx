import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import ProductCreateForm from "../../../components/forms/ProductCreateForm.jsx";
import UserNav from "../../../components/nav/UserNav";

import { LoadingOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import FileUpload from "../../../components/forms/FileUpload.jsx";
import { createProduct } from "../../../functions/product.js";

/**
 * EASY WAY TO RE-POPULATE SUBS IF USER SELECT ANOTHER CATEGORY??
 if (product.category._id === e.target.value) {
  loadProduct();
} else {
  setArrayOfSubIds([]);
}
 */

const initialState = {
  title: "",
  author: "",
  price: "",
  ISBN: "",
  shipping: "",
  quantity: "",
  images: [
    
  ],
 
};

const ProductCreate = ({match}) => {
  const [values, setValues] = useState(initialState);

 const [loading, setLoading] = useState(false);

 const { user } = useSelector((state) => ({ ...state }));




    
   

  const handleSubmit = async (e) => {
   
     e.preventDefault();
    createProduct({...values , seller : user._id} , user.token)
      .then(async (res) => {
        console.log(res);
      
      
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
   
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
    
  };

   
 const generateISBN = () => {
    let isbn = "978";
    for (let i = 0; i < 9; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      isbn += randomDigit;
    }
    return isbn;
  };

  const handleGenerateISBN = () => {
    const generatedISBN = generateISBN();
    console.log('Generated ISBN:', generatedISBN);
    // Update the state with the generated ISBN
    setValues({ ...values, ISBN: generatedISBN });
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
         
             <UserNav/> 
          
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}
          <hr />

          {/* {JSON.stringify(values.images)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
              loading= {loading}
            />
          </div>
            <button className= "btn btn-outline-info" onClick={handleGenerateISBN}>Generate ISBN</button>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;