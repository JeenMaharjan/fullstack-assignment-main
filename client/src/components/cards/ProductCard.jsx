import React, { useState } from 'react'
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import book from "./book.jpg"
import _ from "lodash";
import { useDispatch } from 'react-redux';
import { showAverage } from '../../functions/rating';
const { Meta } = Card;
function ProductCard({product}) {
  const [tooltip, setTooltip] = useState("Click to add");
const { title, author,  price,   images , _id } = product;
  const dispatch = useDispatch();

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
      // toast.error("Product is already in the cart");
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
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}

     
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            alt={images.name}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${_id}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          author={`${author && author.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
}

export default ProductCard