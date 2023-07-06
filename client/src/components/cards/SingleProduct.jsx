import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import ProductListItems from "./ProductListItems.jsx";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import ModalImage from "react-modal-image";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { showAverage } from "../../functions/rating";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Button, message } from "antd";

import moment from "moment";

const { TabPane } = Tabs;

const SingleProduct = ({ product, loadSingleProduct , onStarClick , star}) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();


  const { title, images, author, _id } = product;

  const handleAddToCart = (e) => {
  if (product.quantity < 1) {
    return setTooltip("Sorry! product is empty");
  }

  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      // Product already exists in the cart, display a message or handle it as desired
      dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
      return;
    }

    cart.push({
      ...product,
      count: 1,
    });

    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));
    setTooltip("Added");

    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });

    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  }
};


  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images.map((i) => (
              <img src={i.url} key={i.public_id} />
            ))}
          </Carousel>
        ) : (
          <Card cover={<img src="img" className="mb-3 card-image" />} />
        )}

        <Tabs type="card">
          
          <TabPane tab="More" key="2">
            Please be carefully when you buy product check properly compare the price online and buy. Happy !! shopping
          </TabPane>
         
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? "Out of Stock" : "Add To Cart"}
              </a>
            </Tooltip>,
            
           
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>

      
    </>
  );
};

export default SingleProduct;
