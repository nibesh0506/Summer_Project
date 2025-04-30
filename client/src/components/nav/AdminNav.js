import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaBoxes, FaTags, FaGift } from "react-icons/fa";

const AdminNav = () => (
  <nav className="d-flex flex-column p-3 bg-light" style={{ height: "100vh" }}>
    <h2 className="text-center">Admin</h2>
    <ul className="nav flex-column mt-4">
      <li className="nav-item mb-2">
        <Link to="/admin/dashboard" className="nav-link text-dark d-flex align-items-center">
          <FaTachometerAlt className="me-2" />&nbsp;
          Dashboard
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/admin/product" className="nav-link text-dark d-flex align-items-center">
          <FaBox className="me-2" />&nbsp;
          Product
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/admin/products" className="nav-link text-dark d-flex align-items-center">
          <FaBoxes className="me-2" />&nbsp;
          Products
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/admin/category" className="nav-link text-dark d-flex align-items-center">
          <FaTags className="me-2" />&nbsp;
          Category
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/admin/sub" className="nav-link text-dark d-flex align-items-center">
          <FaTags className="me-2" />&nbsp;
          Sub Category
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/admin/coupon" className="nav-link text-dark d-flex align-items-center">
          <FaGift className="me-2" />&nbsp;
          Coupon
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/admin/password" className="nav-link text-dark d-flex align-items-center">
          <FaBoxes className="me-2" />&nbsp;
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
