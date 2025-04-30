import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon, createCashOrderForUser } from "../functions/user";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import MetaData from "../layout/MetaData";
const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }

      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <div className="form-group">
        <textarea style={{marginLeft:'15px',textAlign:'center'}}
          id="address"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your detail address for fastest delivery"
          rows={4}
        ></textarea>
      </div>
      <button disabled={!address} style={{marginLeft:'250px',backgroundColor:'black'}}  className="btn btn-sm btn-success btn-outlined-success btn-raised mt-1" onClick={saveAddressToDb} >
        Save Address
      </button>
    </>
  );
  

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input style={{marginLeft:'10px'}}
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button style={{marginLeft:'270px',backgroundColor:'black'}}  onClick={applyDiscountCoupon} className="btn btn-sm btn-success btn-outlined-success btn-raised mt-2">
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // empty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <>
     <br/><br/><br/>
    <MetaData title="CheckOut"/>
    <div className="row">
      <div className="col-md-6">
        <h4 className="font-weight-bold p-3 mt-3">Delivery Address</h4>
        {showAddress()}
        <hr />
        <h4 className="font-weight-bold p-3 mt-4 mb-10">Got Coupon?</h4>
        <p style={{marginLeft:'15px',marginTop:'-10px'}}>Use the Coupon Code to get the exciting deal...</p>
        {showApplyCoupon()}
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4 className="font-weight-bold p-3 mt-3 mb-5">Order Summary</h4>
        <p className="font-weight-bold">Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p className="font-weight-bold">Cart Total: Rs.{total}</p>
        <hr />
        {totalAfterDiscount > 0 && (
          <p className="font-weight-bold text display-5">
            Discount Applied <br/>
            Total Payable Amount: Rs.{totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-sm btn-success btn-success btn-raised mt-2"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
                style={{color:'black'}}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-sm btn-success btn-outlined-success btn-raised mt-2"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>
            )}
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-sm btn-danger btn-outlined-danger btn-raised mt-2"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
