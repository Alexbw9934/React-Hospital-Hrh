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
import { Modal, Table, Tag, Space, Button } from "antd";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import { format } from "date-fns";
import moment from "moment";
import { setTimeout } from "core-js";
const { confirm } = Modal;
function FinancialYear() {
  const [data, setData] = useState({
    id: 0,
    name:'',
    fromDate: "",
    toDate: "",
  });
  const [errors, setErrors] = useState({});
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState({
    id: 0,
    name:'',
    fromDate: "",
    toDate: "",
  });
  const [checkingMsg, setCheckingMsg] = useState(false);
  const [postMsg, setPostMsg] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(false);

  useEffect(() => {
    listApi();
  }, [list]);

  const listApi = async()=> {
    await axios.get("http://5.9.111.198:13880/api/FinancialYears").then((res) => {
      console.log(res.data);
      let data = res.data;
      console.log(data, "listing");
      setList(data);
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
  const validate = () => {
    let errors = {};
    if (data.name == "") errors.name = "Please enter name.";
    if (data.fromDate == "") errors.fromDate = "Please pick date.";
    if (data.toDate == "") errors.toDate = "Please pick date.";
    if (Date.parse(data.toDate) <= Date.parse(data.fromDate)) {
      errors.fromDate = "To date should be greater than From date.";
      errors.toDate = "To date should be greater than From date.";
    }
    return errors;
  };
  function handleStatus(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: JSON.parse(value),
    });
  }
  function submitData(e) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length == 0) {
      setErrors({});
      fetch("http://5.9.111.198:13880/api/FinancialYears", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }).then((resp) => {
        console.log("result", resp);
        setPostMsg(true);
        setData({ fromDate: "", toDate: "" });
        setTimeout(() => {
          setPostMsg(false);
        }, 5000);
        // listApi();
      });
    } else {
      setErrors(errors);
    }
  }
  function editForm(id) {
    console.log(id);
    setEdit(true);
    setCheckingMsg(false);
    setErrors({});
    axios
      .get(`http://5.9.111.198:13880/api/FinancialYears/${id}`)
      .then((res) => {
        console.log(res.data, "edit value");
        let data = res.data;
        data.fromDate = data.fromDate.split("T")[0];
        data.toDate = data.toDate.split("T")[0];
        setEditValue(data);
      });
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
  const updateValidate = () => {
    let errors = {};
    if (editValue.name == "") errors.name = "Please enter name.";
    if (editValue.fromDate == "") errors.fromDate = "Please pick date.";
    if (editValue.toDate == "") errors.toDate = "Please pick date.";
    if (Date.parse(editValue.toDate) <= Date.parse(editValue.fromDate)) {
      errors.fromDate = "To date should be greater than From date.";
      errors.toDate = "To date should be greater than From date.";
    }
    return errors;
  };
  function updateData(e, id) {
    e.preventDefault();
    const errors = updateValidate();
    if (Object.keys(errors).length == 0) {
      setErrors({});
      fetch(`http://5.9.111.198:13880/api/FinancialYears/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(editValue),
      }).then((resp) => {
        console.log("result", resp);
        setEditValue({});
        setEdit(false);
        setUpdateMsg(true);
        setTimeout(() => {
          setUpdateMsg(false);
        }, 5000);
        // listApi();
      });
    } else {
      setErrors(errors);
    }
  }
  function updateStatus(evt) {
    const value = evt.target.value;
    setEditValue({
      ...editValue,
      [evt.target.name]: JSON.parse(value),
    });
  }
  function showConfirm(value, status,e) {
    confirm({
      title:
        status == 0
          ? "Do you want to Activate ?"
          : "Do you want to Inactivate ?",
      content: "Are you Sure",
      onOk() {
        changeStatus(value, status,e);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  function changeStatus(id, status,e) {
    console.log('$$$$$$$$$$$$$$');
    e.preventDefault()
    let operation = [
      {
        op: "replace",
        path: "/masterStatus",
        value: status == 0 ? "1" : "0",
      },
    ];
    fetch(`http://5.9.111.198:13880/api/FinancialYears/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      setEdit(false);
      setCheckingMsg(false);
      // listApi();
    });
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, object, index) => <a>{index + 1}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "From Date",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (text) => <a>{text.split("T")[0]}</a>,
    },
    {
      title: "To Date",
      dataIndex: "toDate",
      key: "toDate",
      render: (text) => <a>{text.split("T")[0]}</a>,
    },
    {
      title: "Status",
      key: "masterStatus",
      render: (text, record) => (
        <Space size="middle">
          {record.masterStatus.toString() == 0 ? "Inactive" : "Active"}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <CButton onClick={(e) => editForm(record.id, e)}>Edit</CButton>
          {record.masterStatus.toString() == 1 ? (
            <CButton
              color="danger"
              style={{ backgroundColor: "red" }}
              onClick={(e) => showConfirm(record.id, record.masterStatus,e)}
            >
              Inactivate
            </CButton>
          ) : (
            <CButton
              color="success"
              style={{ backgroundColor:  "green" }}
              onClick={(e) => showConfirm(record.id, record.masterStatus,e)}
            >
              Activate
            </CButton>
          )}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              <h4>
                Financial Year
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
                <CForm onSubmit={(e) => updateData(e, editValue.id)}>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CInput
                        id="name"
                        name="name"
                        onChange={updateChange}
                        value={editValue.name || ""}
                        invalid={errors.name ? true : false}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">From Date</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CInput
                        id="fromDate"
                        name="fromDate"
                        type="date"
                        onChange={updateChange}
                        value={editValue.fromDate ||''}
                        invalid={errors.fromDate ? true : false}
                      />
                      <FormFeedback>{errors.fromDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">To Date</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CInput
                        id="toDate"
                        name="toDate"
                        type="date"
                        onChange={updateChange}
                        value={editValue.toDate ||''}
                        invalid={errors.toDate ? true : false}
                      />
                      <FormFeedback>{errors.toDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Previous Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                    <CSelect
                      name="prevFY"
                      placeholder="Select"
                      onChange={updateChange}
                      value={editValue.prevFY|| ""}>
                        <option value="0">-Select-</option>
                        {list.map((d,i)=>{
                          return(
                            <option value={d.id} key={i}>{d.name}</option>
                          )
                        })}

                     </CSelect>
                      <FormFeedback>{errors.toDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Next Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                     <CSelect
                      name="nextFY"
                      placeholder="Select"
                      onChange={updateChange}
                      value={editValue.nextFY|| ""}>
                        <option value="0">-Select-</option>
                        {list.map((d,i)=>{
                          return(
                            <option value={d.id} key={i}>{d.name}</option>
                          )
                        })}
                     </CSelect>
                      <FormFeedback>{errors.toDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Status </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="status"
                        name="masterStatus"
                        placeholder="Select"
                        onChange={updateStatus}
                        value={editValue.masterStatus || ""}
                      >
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
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
                <CForm onSubmit={submitData}>
                   <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CInput
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={data.name || ""}
                        invalid={errors.name ? true : false}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">From Date</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CInput
                        id="fromDate"
                        name="fromDate"
                        type="date"
                        onChange={handleChange}
                        value={data.fromDate || ""}
                        invalid={errors.fromDate ? true : false}
                      />
                      <FormFeedback>{errors.fromDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">To Date</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CInput
                        id="toDate"
                        name="toDate"
                        type="date"
                        min={new Date(data.fromDate)}
                        onChange={handleChange}
                        value={data.toDate || ""}
                        invalid={errors.toDate ? true : false}
                      />
                      <FormFeedback>{errors.toDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Previous Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                    <CSelect
                      name="prevFY"
                      placeholder="Select"
                      onChange={handleChange}
                      value={data.prevFY|| ""}>
                        <option value="0">-Select-</option>
                        {list.map((d,i)=>{
                          return(
                            <option value={d.id} key={i}>{d.name}</option>
                          )
                        })}

                     </CSelect>
                      <FormFeedback>{errors.toDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Next Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                     <CSelect
                      name="nextFY"
                      placeholder="Select"
                      onChange={handleChange}
                      value={data.nextFY|| ""}>
                        <option value="0">-Select-</option>
                        {list.map((d,i)=>{
                          return(
                            <option value={d.id} key={i}>{d.name}</option>
                          )
                        })}
                     </CSelect>
                      <FormFeedback>{errors.toDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Status </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="status"
                        name="masterStatus"
                        placeholder="Select"
                        onChange={handleStatus}
                        value={data.masterStatus|| ""}
                      >
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                      </CSelect>
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
            <CCard>
              <CCardHeader>Financial Year List</CCardHeader>
              <CCardBody>
                <Table
                  dataSource={list.sort((a, b) => (a.id > b.id) ? 1 : -1)}
                  rowKey={"id"}
                  columns={columns}
                />
              </CCardBody>
            </CCard>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default FinancialYear;
