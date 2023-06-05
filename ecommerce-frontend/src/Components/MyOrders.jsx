import React, { useEffect, useState } from 'react';
import { userRequest } from '../redux/requestMethod';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import Loading from './Loading';
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getUserOrder = async () => {
      const res = await userRequest.get(`/orders/user`);
      setOrders(res.data);
      setLoading(false);
    };
    getUserOrder();
  }, []);

  return (
    <div className="my-orders-container">
      {loading ? (
        <Loading size={100} />
      ) : (
        <table id="table">
          <thead>
            <tr>
              <th id="th">ID</th>
              <th id="th">STATUS</th>
              <th id="th">DATE</th>
              <th id="th">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className={order.isPaid ? 'is-paid' : 'td'} >
                  <Link to={`/orders/${order._id}`}>{order._id}</Link>
                </td>
                <td className={order.isPaid ? 'is-paid' : 'td'} >{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                <td className={order.isPaid ? 'is-paid' : 'td'} >{Moment().subtract(order.createdAt).calendar()}</td>
                <td className={order.isPaid ? 'is-paid' : 'td'} >${order.total?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
