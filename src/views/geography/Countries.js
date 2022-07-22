import React, { useEffect, useState } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
  CButton,
  CAlert,
} from "@coreui/react";
import axios from "axios";
import { Modal } from "antd";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import { setTimeout } from "core-js";
const { confirm } = Modal;
const config = localStorage.getItem("token");
function Countries() {
  // const [name, setName] = useState("");
  // const [countryCode, setCountryCode] = useState("");
  const [data, setData] = useState({name:'',countryCode:''});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState({name:'',countryCode:''});
  const [checkingMsg, setCheckingMsg] = useState(false);
  const [postMsg, setPostMsg] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get("countries", {
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        let data = res.data;
        console.log(data);
        // setName("");
        // setCountryCode("");
         setUsers(data);
        setLoading(false);
      });
  }
  
  function handleChange(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
    setErrors({
      ...errors,
      [evt.target.name]: ''
    });
  }
  const validate = () => {
    let errors = {};
    if (data.name == "") errors.name = "Please enter the name.";
    if (data.countryCode == "") errors.countryCode = "Please enter the Country code.";
    return errors;
  };
  function submitData(e) {
    e.preventDefault();
    let check = users.map((index) => {
      if (data.name == index.name) return false;
    });
    const errors = validate();
    if (Object.keys(errors).length == 0) {
      setErrors({});
      if (check.includes(false)) {
        setCheckingMsg(true);
      } else {
        setCheckingMsg(false);
    // console.log({ name, countryCode });
    // let data = { name, countryCode };
    fetch("http://5.9.111.198:13880/api/countries", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      console.log("result", resp);
      setPostMsg(true);
      setData({name:'',countryCode:''})
      setTimeout(() => {
        setPostMsg(false);
      }, 5000);
      getData();
    });
  }
} else {
  setErrors(errors);
}
  }
  function editForm(id) {
    console.log(id);
    setEdit(true);
    setCheckingMsg(false);
    setErrors({});
    setEditValue({});
    axios.get(`http://5.9.111.198:13880/api/countries/${id}`).then((res) => {
      console.log("#####", res.data);
      let data = res.data;
      setEditValue(data);
    });
  }
  const updateValidate = () => {
    let errors = {};
    if (editValue.name == "") errors.name = "Please enter the name.";
    if (editValue.countryCode == "") errors.countryCode = "Please enter the Country code.";
    return errors;
  };
  function updateData(e, id) {
    e.preventDefault();
    const errors = updateValidate();
    if (Object.keys(errors).length == 0) {
      setErrors({});
    fetch(`http://5.9.111.198:13880/api/countries/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(editValue),
    }).then((resp) => {
      setEdit(false);
      setUpdateMsg(true);
      setTimeout(() => {
        setUpdateMsg(false);
      }, 5000);
      getData();
    });
  } else {
    setErrors(errors);
  }
  }
  function updateChange(evt) {
    const value = evt.target.value;
    setEditValue({
      ...editValue,
      [evt.target.name]: value,
    });
    setErrors({
      ...errors,
      [evt.target.name]: '',
    });
  }
  function showConfirm(value) {
    confirm({
      title: "Do you Want to delete ?",
      content: "Are you Sure",
      onOk() {
        deleteForm(value);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  function deleteForm(id) {
    fetch(`http://5.9.111.198:13880/api/countries/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      console.log("result", resp);
      getData();
      setEdit(false);
      setCheckingMsg(false);
      setDeleteMsg(true);
      setTimeout(() => {
        setDeleteMsg(false);
      }, 5000);
      setEditValue({ name: "" ,countryCode:''});
      setErrors({});
      setData({name:'',countryCode:''})
    });
  }
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                  <h4>
                    Countries
                  </h4>
                </CCardHeader>
                <CCardBody>
                {checkingMsg ? (
                <CAlert color="warning" className="d-flex align-items-center">
                  <CIcon
                    name="cilWarning"
                    className="flex-shrink-0 me-2"
                    width={24}
                    height={24}
                  />
                  <div>This name is already exist</div>
                </CAlert>
              ) : updateMsg ? (
                <CAlert color="success" className="d-flex align-items-center">
                  <CIcon
                    name="cilCheckCircle"
                    className="flex-shrink-0 me-2"
                    width={24}
                    height={24}
                  />
                  <div>Updated Successfully</div>
                </CAlert>
              ) : postMsg ? (
                <CAlert color="success" className="d-flex align-items-center">
                  <CIcon
                    name="cilCheckCircle"
                    className="flex-shrink-0 me-2"
                    width={24}
                    height={24}
                  />
                  <div>Data save Successfully</div>
                </CAlert>
              ) : deleteMsg ? (
                <CAlert
                  color="danger"
                  className="d-flex align-items-center"
                  id="delete"
                >
                  <CIcon
                    name="cilCheckCircle"
                    className="flex-shrink-0 me-2"
                    width={24}
                    height={24}
                  />
                  <div>Deleted Successfully</div>
                </CAlert>
              ) : null}
                  {edit ? (
                    <CForm
                      id="form1"
                      className="form-horizontal"
                      onSubmit={(e) => updateData(e, editValue.id)}
                    >
                      <CFormGroup row>
                        <CCol md="2">
                          <CLabel htmlFor="text-input"> Name </CLabel>
                        </CCol>
                        <CCol xs="12" sm="8">
                          <CInput
                            id="name"
                            name="name"
                            onChange={updateChange}
                            defaultValue={editValue.name || ""}
                            value={editValue.name}
                            invalid={errors.name ? true : false}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="2">
                          <CLabel htmlFor="text-input"> Country Code </CLabel>
                        </CCol>
                        <CCol xs="12" sm="8">
                          <CInput
                            id="countryCode"
                            name="countryCode"
                            placeholder="Country Code"
                            onChange={updateChange}
                            defaultValue={editValue.countryCode || ""}
                            value={editValue.countryCode}
                            invalid={errors.countryCode ? true : false}
                            />
                            <FormFeedback>{errors.countryCode}</FormFeedback>
                        </CCol>
                      </CFormGroup>
                      <CButton color="primary" type="submit">
                        Update
                      </CButton>
                    </CForm>
                  ) : (
                    <CForm
                      id="form"
                      className="form-horizontal"
                      onSubmit={submitData}
                    >
                      <CFormGroup row>
                        <CCol md="2">
                          <CLabel htmlFor="text-input"> Name </CLabel>
                        </CCol>
                        <CCol xs="12" sm="8">
                          <CInput
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            onChange={handleChange}
                            invalid={errors.name ? true : false}
                            />
                            <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="2">
                          <CLabel htmlFor="text-input"> CountryCode </CLabel>
                        </CCol>
                        <CCol xs="12" sm="8">
                          <CInput
                            id="countryCode"
                            name="countryCode"
                            placeholder="Country Code"
                            value={data.countryCode}
                            onChange={handleChange}
                            invalid={errors.countryCode ? true : false}
                            />
                            <FormFeedback>{errors.countryCode}</FormFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup>
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton color="primary" type="submit">
                          Save
                        </CButton>
                      </CFormGroup>
                    </CForm>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <div>
            <CRow>
              <CCol xs="12" sm="12">
                <CCard>
                  <CCardHeader>
                    <h4>Countries List</h4>
                  </CCardHeader>
                  <CCard>
                    <CCardBody>
                      <table className="table striped bordered">
                        <tr>
                          {/* <th className="th-sm"></th> */}
                          <th className="th-sm">
                            <b>ID</b>
                          </th>
                          <th className="th-sm">
                            <b>Name</b>
                          </th>
                          <th className="th-sm">
                            <b>Countries List Code</b>
                          </th>
                          <th colSpan="2">
                            <b>Action</b>
                          </th>
                        </tr>
                        {users.length > 0 ? (
                          users.map((user, index) => {
                            return (
                              <tr key={index}>
                                {/* <th scope="row"></th> */}
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.countryCode}</td>
                                <td>
                                  <CButton
                                    color="primary"
                                    style={{ backgroundColor: "#0D6EFD" }}
                                    onClick={() => editForm(user.id)}
                                  >
                                    Edit
                                  </CButton>
                                </td>
                                <td>
                                  <CButton
                                    color="danger"
                                    style={{ backgroundColor: "red" }}
                                    onClick={() => showConfirm(user.id)}
                                  >
                                    Inactivate
                                  </CButton>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="0">Loading...</td>
                          </tr>
                        )}
                        {/* <tfoot>
                      <th  className="th-sm">
                        <b></b>
                      </th>
                      <th  className="th-sm">
                        <b>ID</b>
                      </th>
                      <th className="th-sm">
                        <b>Name</b>
                      </th>
                      <th className="th-sm">
                        <b>CountriesCode</b>
                      </th>
                     </tfoot> */}
                      </table>
                    </CCardBody>
                  </CCard>
                </CCard>
              </CCol>
            </CRow>
          </div>
        </div>
      )}
    </>
  );
}

export default Countries;
