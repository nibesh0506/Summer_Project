import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SweetAlert from "react-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./AllProduct.css"; // Import the CSS file
import { Spin } from "antd";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(""); // State for search input
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    setShowDeleteModal(true);
    setDeleteSlug(slug);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleConfirmDelete = () => {
    removeProduct(deleteSlug, user.token)
      .then((res) => {
        loadAllProducts();
        setShowDeleteModal(false);
        toast.error(`${res.data.title} is deleted`);
      })
      .catch((err) => {
        setShowDeleteModal(false);
        if (err.response.status === 400) toast.error(err.response.data);
        console.log(err);
      });
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search)
  );

  return (
    <div className="container-fluid">
      <br/><br/><br/>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger"><Spin/></h4>
          ) : (
            <>
              <h4>All Products</h4>
              <input
                type="text"
                placeholder="Search products"
                value={search}
                onChange={handleSearchChange}
                className="form-control mb-4 search-box"
              />
              <div className="row">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="col-md-4 pb-3">
                    <AdminProductCard
                      product={product}
                      handleRemove={handleRemove}
                    />
                  </div>
                ))}
              </div>
              <SweetAlert
                show={showDeleteModal}
                title="Delete Product"
                text="Are you sure you want to delete this product?"
                showCancelButton
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowDeleteModal(false)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
