import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../../functions/user';
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo.jsx";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./History.css"; // Import CSS file for custom styles

const History = ({ history }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user?.token).then((res) => {
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <div className="table-container">
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Author</th>
            <th scope="col">ISBN</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td>
                <b>{p?.product?.title}</b>
              </td>
              <td>{p?.product?.price}</td>
              <td>{p?.product?.author}</td>
              <td>{p?.product?.ISBN}</td>
              <td>{p?.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
      </div>
    ));

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col text-center">
            <h4 className="mb-4">
              {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
            </h4>
            {showEachOrders()}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
