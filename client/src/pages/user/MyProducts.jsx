import React, { useEffect, useState } from "react";

import {  removeProduct  , find} from "../../functions/product";
import ProductCard from "./ProductCard.jsx";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { AddNotification } from "../../../functions/notification";
import UserNav from "../../components/nav/UserNav";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState("approved")
  // redux
 
const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
  setLoading(true);
  find(user?.token)
    .then((res) => {
      if (Array.isArray(res)) {
        setProducts(res);
      } else {
        setProducts([]); // Set products to an empty array if the response is not an array
      }
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
};
const handleRemove = async (slug) => {
  console.log(slug)
    
    if (window.confirm("Delete?")) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then(async (res) => {
          loadAllProducts();
          
          toast.success(`${res.data.title} is deleted`);
        })
        
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });

       
    }
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products?.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <ProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;