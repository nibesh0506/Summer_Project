import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = ({ order }) => {
  const printRef = useRef();
  let orderDate;
  if (order.paymentIntent.payment_method_types[0].toLowerCase().includes("cash")) {
    // Timestamp is likely in milliseconds
    orderDate = new Date(order.paymentIntent.created);
  } else {
    // Timestamp is likely in seconds, so multiply by 1000
    orderDate = new Date(order.paymentIntent.created * 1000);
  } // Ensure the timestamp is in milliseconds
  const [loading, setLoading] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const generatePDF = () => {
    setLoading(true); // Set loading state to true when generating PDF
    const input = printRef.current;

    input.style.display = 'block'; // Temporarily show the element

    html2canvas(input, {
      useCORS: true,
      onclone: (document) => {
        // Ensure all resources are loaded in the cloned document
        // eslint-disable-next-line no-unused-expressions
        document.fonts.ready;
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
      input.style.display = 'none'; // Hide the element again
      setLoading(false); // Reset loading state
      setShowInvoice(false); // Hide the invoice
    }).catch(error => {
      console.error("Error generating PDF: ", error);
      input.style.display = 'none'; // Hide the element in case of error
      setLoading(false); // Reset loading state
      setShowInvoice(false); // Hide the invoice
    });
  };

  return (
    <div>
      <div ref={printRef} style={{ padding: "20px", fontFamily: "Arial", display: showInvoice ? 'block' : 'none' }}>
        <h4 style={{ textAlign: "center" }}>Subhekshya Trade and Suppliers</h4>
        <h5>Order Summary</h5>
        <p>
          <span>Order Id: {order.paymentIntent.id}</span>
          <br />
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
        </p>
        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Discount %</th>
              <th>Discount Amount</th>
              <th>Total Paid</th>
              <th>Brand</th>
              <th>Color</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((p, i) => {
              const originalPrice = p.product.price;
              const totalpaid = order.paymentIntent.amount / 100;
              const discountAmount = originalPrice * p.count - totalpaid;
              const discount = (discountAmount / (originalPrice * p.count)) * 100;

              return (
                <tr key={i}>
                  <td><b>{p.product.title}</b></td>
                  <td>{originalPrice.toFixed(2)}</td>
                  <td>{discount.toFixed(2)}</td>
                  <td>{discountAmount.toFixed(2)}</td>
                  <td>{totalpaid.toFixed(2)}</td>
                  <td>{p.product.brand}</td>
                  <td>{p.color}</td>
                  <td>{p.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br/><br/>
        <h4 style={{ textAlign: "center" }}>Thanks for shopping with us🎉!</h4>
        <br/>
        <h5 style={{ textAlign: "left" }}>Subhekshya Trade and Suppliers</h5>
        <h5 style={{ textAlign: "left" }}>Dhangadhi-1 , Kailali</h5>
        <h5 style={{ textAlign: "left" }}>+977 9848421017</h5>
      </div>
      {loading && <div>Loading...</div>}
      {!loading && !showInvoice && <button onClick={() => setShowInvoice(true)}>See & Download Invoice</button>}
      {!loading && showInvoice && <button onClick={generatePDF} disabled={loading}>See & Download Invoice</button>}
    </div>
  );
};

export default Invoice;
