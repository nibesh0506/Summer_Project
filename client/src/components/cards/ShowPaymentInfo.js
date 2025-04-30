import React from "react";

const ShowPaymentInfo = ({ order }) => {
  // Check if the timestamp is valid
  console.log("Timestamp:", order.paymentIntent.created);

  // Calculate the amount in NPR without modifying the original value
  const amountInNPR = (order.paymentIntent.amount / 100).toLocaleString("en-NP", {
    style: "currency",
    currency: "NPR",
  });
// Convert timestamp to a Date object
let orderDate;
if (order.paymentIntent.payment_method_types[0].toLowerCase().includes("cash")) {
  // Timestamp is likely in milliseconds
  orderDate = new Date(order.paymentIntent.created);
} else {
  // Timestamp is likely in seconds, so multiply by 1000
  orderDate = new Date(order.paymentIntent.created * 1000);
}
console.log("Order Date:", orderDate);



  return (
    <div>
      <p>
        <span>Order Id: {order.paymentIntent.id}</span>
        {" | "}
        <span>
          Amount: {amountInNPR}
        </span>
        {" | "}
        <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
        {/* {" | "} */}
        <br/><br/>
        <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
        {" | "}
        <span>
          Ordered on:&nbsp;
          {orderDate.toLocaleString("en-NP", {
            timeZone: "Asia/Kathmandu",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
        &nbsp;
        <br/>
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
