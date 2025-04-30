import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import SpinFC from "antd/lib/spin";
import "./categorylist.css";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-block btn-raised m-3 custom-button"
      >
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? (
            <h4 className="text-center">
              <SpinFC/>
            </h4>
          ) : (
            showCategories()
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
