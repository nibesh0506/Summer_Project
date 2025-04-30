import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { Spin } from "antd";
import Swal from "sweetalert2";
import "./CreateCouponPage.css";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(null);
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => {
    getCoupons().then((res) => {
      const currentDate = new Date();
      const filteredCoupons = res.data.filter((coupon) => {
        const expiryDate = new Date(coupon.expiry);
        if (expiryDate < currentDate) {
          // Delete expired coupon from the database
          removeCoupon(coupon._id, user.token).then(() => {
            toast.warning(`Expired coupon "${coupon.name}" has been deleted.`);
          });
          return false; // Do not include expired coupons in the display
        }
        return true; // Include non-expired coupons in the display
      });
      setCoupons(filteredCoupons);
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons();
        setName("");
        setDiscount("");
        setExpiry(null);
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log("create coupon err", err);
        setLoading(false);
      });
  };

  const handleRemove = (couponId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeCoupon(couponId, user.token)
          .then((res) => {
            loadAllCoupons();
            setLoading(false);
            Swal.fire(
              "Deleted!",
              `Coupon "${res.data.name}" has been deleted.`,
              "success"
            );
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    });
  };

  return (
    <>
      <br /><br /><br />
      <div className="create-coupon-page">
        <AdminNav />
        <div className="create-coupon-form-container">

          {loading ? (
            <h4 className="text-danger">
              <Spin />
            </h4>
          ) : (
            <h4>Coupon</h4>
          )}

          <form onSubmit={handleSubmit} className="create-coupon-form">
            <div className="form-group">
              <label className="font-weight-bold">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="font-weight-bold">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="font-weight-bold">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={expiry}
                onChange={(date) => setExpiry(date)}
                minDate={new Date()} // Prevent selecting past dates
                required
              />
            </div>
            <button style={{ color: 'black' }} className="btn btn-success btn-raised">Save</button>
          </form>
        </div>

        <div className="coupon-table-container">
          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className="text-danger pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreateCouponPage;
