// Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import MetaData from "../layout/MetaData";
import { logout } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th style={{textAlign:'center'}} scope="col" className=" font-weight-bold ">
            Image
          </th>
          <th style={{textAlign:'center'}} scope="col" className=" font-weight-bold ">
            Title
          </th>
          <th style={{textAlign:'center'}} scope="col" className=" font-weight-bold ">
            Price
          </th>
          <th style={{textAlign:'center'}} scope="col" className=" font-weight-bold ">
            Brand
          </th>
          <th style={{textAlign:'center'}} scope="col" className=" font-weight-bold ">
            Color
          </th>
          <th style={{textAlign:'center'}} scope="col" className=" font-weight-bold ">
            Count
          </th>
          <th style={{textAlign:'center'}} scope="col" className=" font-weight-bold ">
            Shipping
          </th>
          <th style={{textAlign:'center'}} scope="col" className=" font-weight-bold ">
            Remove
          </th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <>
      <MetaData title="Cart" />
      <div className="container-fluid pt-2">
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-8">
            <h4 style={{textAlign:'center',fontSize:'40px'}} className=" font-weight-bold p-2 mt-4  mb-5">Cart</h4>

            {!cart.length ? (
              <p>
                No products in cart. <Link to="/shop">Continue Shopping.</Link>
              </p>
            ) : (
              showCartItems()
            )}
          </div>
          <div className="col-md-4">
            <h4 style={{fontSize:'40px'}} className=" font-weight-bold p-2 mt-4  mb-5">Order Summary</h4>
            <hr />
            <p className=" font-weight-bold ">Products</p>
            {cart.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = Rs.{c.price * c.count}
                </p>
              </div>
            ))}
            <hr />
            Total: <b>Rs.{getTotal()}</b>
            <hr />
            {user ? (
              <>
                <div className="row">
                <button
  onClick={saveOrderToDb}
  style={{
    backgroundColor: "lightblue",
    color: "black",
    borderRadius: "15px",
    padding: "10px 20px",
    fontSize: "16px",
    marginRight: "10px",
    marginTop: "10px",
  }}
  disabled={!cart.length}
>
  Pay with Card
</button>
<button
  onClick={saveCashOrderToDb}
  style={{
    backgroundColor: "black",
    color: "white",
    borderRadius: "15px",
    padding: "10px 20px",
    fontSize: "16px",
    marginTop: "10px",
  }}
  disabled={!cart.length}
>
  Pay Cash on Delivery
</button>

                </div>
              </>
            ) : (
              <button style={{fontSize:'16px'}} className="btn btn-sm btn-primary mt-2">
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                >
                  Please Login to Checkout
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
