import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    author,
    ISBN ,
    shipping,
    color,
    brand,
    quantity,
    sold,
    brandNew ,
    age
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Owner{" "}
        <span className="label label-default label-pill pull-xs-right">
          {product?.seller?.name}
        </span>
      </li>
      <li className="list-group-item">
        ISBN{" "}(Book number)
        <span className="label label-default label-pill pull-xs-right">
          {ISBN}
        </span>
      </li>
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>
      <li className="list-group-item">
        Author{" "}
        <span className="label label-default label-pill pull-xs-right">
          {author}
        </span>
      </li>
     
<li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      

   
      {/* <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li> */}

      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      

      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
      
      
    </ul>
  );
};

export default ProductListItems;