import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard.jsx";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import Star from "../components/forms/Star.jsx";
import { Fade } from "react-reveal";
import LoadingCard from "../cards/LoadingCard.jsx";
import { fetchProductsByFilter, getProductsByCount } from "../functions/product.js";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);

  const [ok, setOk] = useState(false);
  const [status, setStatus] = useState("approved");
  const [star, setStar] = useState("");

 let { search } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  const { text } = search;
  

 const loadAllProducts = () => {
    getProductsByCount(100, { status }).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };
useEffect(() => {
    loadAllProducts();
    // fetch categories
   
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);



    const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setPrice(value);
    
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
const handleStarClick = (num ) => {
  dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    
    fetchProducts({ stars: num });
}


 useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 500);
    return () => clearTimeout(delayed);
  }, [text]);





  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );





  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <Fade>
            <h4>Filter</h4>
            <hr />
          </Fade>
          <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]} mode="inline">
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="1500"
                />
              </div>
            </SubMenu>

           
            

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            
          </Menu>
        </div>

        <div className="col-md-9 pt-3">
          {loading ? (
             <LoadingCard count={3} />
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
