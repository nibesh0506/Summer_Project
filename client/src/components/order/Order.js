import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, searchTerm, handleStatusChange }) => {
  // Function to filter orders based on search term
  const filteredOrders = orders.filter((order) => {
    const orderId = order.paymentIntent.id
      ? order.paymentIntent.id.toString()
      : ""; // Convert to string

    // Check if the order ID matches the search term
    return orderId.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const totalRevenue = orders.reduce((acc, order) => {
    // Only add the amount for non-cancelled orders
    if (order.orderStatus !== "Cancelled") {
      return acc + order.paymentIntent.amount / 100;
    }
    return acc;
  }, 0);

  const showOrderInTable = (order) => {
    const totalpaid = order.paymentIntent.amount / 100;
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Discount %</th>
            <th scope="col">Discount Amount</th>
            <th scope="col">Total Paid</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => {
            const originalPrice = p.product.price;
            const discountAmount = originalPrice * p.count - totalpaid;
            const discount = (discountAmount / (originalPrice * p.count)) * 100;
            return (
              <tr key={i}>
                <td>
                  <b>{p.product.title}</b>
                </td>
                <td>{originalPrice.toFixed(2)}</td>
                <td>{discount.toFixed(2)}</td>
                <td>{discountAmount.toFixed(2)}</td>
                <td>{totalpaid.toFixed(2)}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>{order.orderdBy.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <b>
        <div>Total Revenue: Rs. {totalRevenue.toFixed(2)}</div>
      </b>
      {filteredOrders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div style={{ marginTop: "10px" }} className="col-md-4">
                Delivery Status
              </div>

              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
