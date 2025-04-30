import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import CategoryForm from "../../../components/forms/CategoryForm";
import { Form, Select } from "antd";
const { Option } = Select;

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

    const handleSubmit = (formData) => {
      setLoading(true);
    
      // Destructure name and parent from formData
      const { name, parent } = formData;
    
      updateSub(match.params.slug, { name, parent }, user.token)
        .then((res) => {
          setLoading(false);
          setName("");
          toast.success(`"${res.data.name}" is updated`);
          history.push("/admin/sub");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    };

  return (
    <div className="container-fluid">
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4 style={{ textAlign: "center", fontSize: "30px" }}>
              Update Sub Category
            </h4>
          )}
          <Form layout="vertical" className="p-4 shadow-sm bg-white rounded">
            <Form.Item label="Parent Category" required>
              <Select
                name="category"
                className="w-100"
                value={parent} // Set the value to parent
                onChange={(value) => setParent(value)} // Use setParent for onChange
              >
                <Option value="">Please select</Option>
                {categories.map((c) => ( // Map over categories to render options
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
