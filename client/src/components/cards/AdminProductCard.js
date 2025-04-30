import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PieChart from "./PieChart";

const { Meta } = Card;

const AdminProductCard = ({product, handleRemove }) => {
  return (
    <Card
      cover={
        <img
          alt="img"
          src={
            product.images && product.images.length
              ? product.images[0].url
              : laptop
          }
          style={{ height: "300px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${product.slug}`}>
          <EditOutlined className="text-primary" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(product.slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={product.title}
        description={`${product.description && product.description.substring(0, 40)}...`}
      />
      <br />
      <div>
        <p>Price: Rs. {product.price}</p>
        <PieChart available={product.quantity} sold={product.sold} />
      </div>
    </Card>
  );
};

export default AdminProductCard;
