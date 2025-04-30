import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";
import { CopyrightOutlined, createFromIconfontCN  } from "@ant-design/icons";
import MetaData from "../../layout/MetaData";
import {Menu, Spin} from 'antd';
import { Footer } from "antd/lib/layout/layout";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
      <div>
        <MetaData title={sub.name}/>
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center h2 font-weight-bold p-3 mt-5 mb-5 display-4 jumbotron">
              <Spin/>
            </h4>
          ) : (
            <h4 className="text-center h2 font-weight-bold p-3 mt-5 mb-5">
              {products.length} Products in "{sub.name}"
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
 
       </div>
     </div>
  );
};

export default SubHome;
