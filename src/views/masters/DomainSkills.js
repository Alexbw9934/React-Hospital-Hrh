import React, { useState, useEffect } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormGroup,
  CInput,
  CForm,
  CButton,
  CAlert,
  CLabel,
  CSelect,
} from "@coreui/react";
import axios from "axios";
import { Modal, Table, Space } from "antd";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import { setTimeout } from "core-js";
import "./style.css";
const { confirm } = Modal;
// const config=localStorage.getItem('token')
function DomainSkills() {
  const [data, setData] = useState({
    id: 0,
    name: "",
  });
  const [add, setAdd] = useState(false);
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState({ id: 0, name: "" });
  const [checkingMsg, setCheckingMsg] = useState(false);
  const [postMsg, setPostMsg] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    listApi();
  }, []);

  function listApi() {
    axios.get("http://5.9.111.198:13880/api/DomainSkills").then((res) => {
      console.log(res.data);
      let data = res.data;
      setList(data);
      // console.log("arraydata",users);
      // setUsers(res.data.slice(0, 10));
      // console.log(list);
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
      [evt.target.name]: "",
    });
  }
  function handleStatus(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: JSON.parse(value),
    });
  }
  const validate = () => {
    let errors = {};
    if (data.name == "") errors.name = "Please enter the name.";
    return errors;
  };
  function submitData(e) {
    e.preventDefault();
    console.log("DomainSkills", data);
    let check = list.map((index) => {
      if (data.name == index.name) return false;
    });
    const errors = validate();
    if (Object.keys(errors).length == 0) {
      setErrors({});
      if (check.includes(false)) {
        setCheckingMsg(true);
      } else {
        setCheckingMsg(false);
        fetch("http://5.9.111.198:13880/api/DomainSkills", {
          method: "POST",
          headers: {
            // "Authorization":`Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }).then((resp) => {
          console.log("result", resp);
          setPostMsg(true);
          setData({ name: "" });
          setTimeout(() => {
            setPostMsg(false);
          }, 5000);
          listApi();
        });
      }
    } else {
      setErrors(errors);
    }
  }
  function editForm(id) {
    console.log(id);
    setEdit(true);
    setAdd(true);
    setCheckingMsg(false);
    setErrors({});
    setEditValue({});
    axios.get(`http://5.9.111.198:13880/api/DomainSkills/${id}`).then((res) => {
      console.log(res.data);
      let data = res.data;
      setEditValue(data);
    });
  }
  const updateValidate = () => {
    let errors = {};
    if (editValue.name == "") errors.name = "Please enter the name.";
    return errors;
  };
  function updateData(e, id) {
    e.preventDefault();
    const errors = updateValidate();
    if (Object.keys(errors).length == 0) {
      setErrors({});
      fetch(`http://5.9.111.198:13880/api/DomainSkills/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(editValue),
      }).then((resp) => {
        console.log("result", resp);
        setEditValue({ name: "" });
        setEdit(false);
        setUpdateMsg(true);
        setTimeout(() => {
          setUpdateMsg(false);
        }, 5000);
        listApi();
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
      [evt.target.name]: "",
    });
  }
  function updateStatus(evt) {
    const value = evt.target.value;
    setEditValue({
      ...editValue,
      [evt.target.name]: JSON.parse(value),
    });
  }
  function showConfirm(value, status) {
    confirm({
      title:
        status.toString() == 0
          ? "Do you want to Activate ?"
          : "Do you want to Inactivate ?",
      content: "Are you Sure",
      onOk() {
        changeStatus(value, status);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  function changeStatus(id, status) {
    let operation = [
      {
        op: "replace",
        path: "/status",
        value: status.toString() == 0 ? "1" : "0",
      },
    ];
    fetch(`http://5.9.111.198:13880/api/DomainSkills/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      setCheckingMsg(false);
      setEdit(false);
      setEditValue({ name: "" });
      setData({ name: "" });
      listApi();
    });
  }
  return (
    <div>
      <CRow>
        <CCol xs="12" sm="12">
          {add ? (
            <CCard>
              <CCardHeader>
                <h4>Domain/Skill</h4>
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
                    onSubmit={(e) => updateData(e, editValue.id)}
                  >
                    <CFormGroup row>
                      <CCol md="2">
                        <CLabel htmlFor="text-input">
                          {" "}
                          <b>Domain/Skills</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          name="name"
                          onChange={updateChange}
                          defaultValue={editValue.name || ""}
                          value={editValue.name}
                          invalid={errors.name ? true : false}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    {/* <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Status </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="status"
                        name="status"
                        placeholder="Select"
                        onChange={updateStatus}
                        value={editValue.status || ""}
                      >
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup> */}
                    <CFormGroup>
                      <CCol sm="10"></CCol>
                      <CCol sm="8"></CCol>
                      <CCol></CCol>
                      <CButton color="primary" type="submit">
                        Update
                      </CButton>
                    </CFormGroup>
                  </CForm>
                ) : (
                  <CForm
                    id="form"
                    onSubmit={submitData}
                    className="form-horizontal"
                  >
                    <CFormGroup row>
                      <CCol md="2">
                        <CLabel htmlFor="text-input">
                          {" "}
                          <b>Domain/Skills</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="name"
                          name="name"
                          value={data.name}
                          placeholder="DomainSkill"
                          onChange={handleChange}
                          invalid={errors.name ? true : false}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    {/* <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Status </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="status"
                        name="status"
                        placeholder="Select"
                        onChange={handleStatus}
                        value={data.status || ""}
                      >
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup> */}
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
          ) : (
            <CCard>
              <CCardHeader>Domain/Skill List</CCardHeader>
              <CCardBody>
                <CButton color="primary" onClick={() => setAdd(true)}>
                  Add New
                </CButton>
                <Table
                  dataSource={list.sort((a, b) => (a.id < b.id ? 1 : -1))}
                  rowKey={"id"}
                >
                  <Table.Column
                    title="ID"
                    dataIndex="id"
                    key="id"
                    render={(text, obj, i) => <>{i + 1}</>}
                  ></Table.Column>
                  <Table.Column
                    title="Domain/Skill"
                    dataIndex="name"
                    key="name"
                  ></Table.Column>
                  <Table.Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status) => (
                      <>{status.toString() == 0 ? "Inactive" : "Active"}</>
                    )}
                  ></Table.Column>
                  <Table.Column
                    title="Action"
                    key="action"
                    render={(text, user) => (
                      <Space size="middle">
                        <CButton
                          color="primary"
                          style={{ backgroundColor: "#0D6EFD" }}
                          onClick={() => editForm(user.id)}
                        >
                          Edit
                        </CButton>
                        {user.status.toString() == 1 ? (
                          <CButton
                            color="danger"
                            style={{ backgroundColor: "red" }}
                            onClick={() => showConfirm(user.id, user.status)}
                          >
                            Inactivate
                          </CButton>
                        ) : (
                          <CButton
                            color="success"
                            style={{ backgroundColor: "green" }}
                            onClick={() => showConfirm(user.id, user.status)}
                          >
                            Activate
                          </CButton>
                        )}
                      </Space>
                    )}
                  ></Table.Column>
                </Table>
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </div>
  );
}

export default DomainSkills;
