import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm.jsx";
import UserNav from "../../../components/nav/UserNav";

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

const ProductUpdate = ({  history , match }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  // router
const { slug } = match.params;

   useEffect(() => {
    loadProduct();
   
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("single product", p);
      // 1 load single proudct
      setValues({ ...values, ...p.data });

     
  
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

   

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push("/user/myproducts");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };
  
 const handleChange = (e) => {
  
    setValues({ ...values, [e.target.name]: e.target.value });

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
            <h4>Product update</h4>
          )}

          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;