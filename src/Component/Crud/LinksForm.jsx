
import React, { useState, useEffect } from "react";
import { db } from "../../Config/MyFirebase";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LinksForm = (props) => {
  const initialStateValues = {
    email: "",
    name: "",
    telefono: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const validateEmail=(email)=>{
    return /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email);
  }
  const validateNumber=(telefono)=>{
    return /^([0-9]+){9}$/.test(telefono)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(values.email))
    {
      return toast("invalid email", {type: "warning", autoClose: 4000 });
    }
    if (values.name==="") {
      return toast("invalid name", {type: "warning", autoClose: 4000 });
    }
    if (!validateNumber(values.telefono))
    {
      return toast("invalid telefono", {type: "warning", autoClose: 4000 });
    }
    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("contacts").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border border-aqua">
      <div>
          <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">email</i>
        </div>
        <input
          type="email"
          className="form-control"
          value={values.email}
          name="email"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">person</i>
        </div>
        <input
          type="text"
          className="form-control"
          value={values.name}
          name="name"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">phone</i>
        </div>
        <input
          type="number"
          value={values.telefono}
          name="telefono"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div onClick={handleSubmit}>
        <button type="submit"className="btn btn-primary btn-block" variant="flat">
          {props.currentId === "" ? "Save" : "Update"}
        </button>        
      </div>
      </div>
    </form>
  );
};

export default LinksForm;