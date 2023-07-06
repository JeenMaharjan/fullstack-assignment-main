import React from "react";
import { Card } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product  , handleRemove}) => {
  // destructure
  const { title, author,    images , _id } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : "laptop"}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/user/product/${_id}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(_id)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        author={`${author && author.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;