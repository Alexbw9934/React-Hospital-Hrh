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
import Select from "react-select";
import { setTimeout } from "core-js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { retrieveFinancialYear } from "../../actions/apiadd";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
function ReportingPeriod(props) {
  const [data, setData] = useState({
    id: 0,
    finacialYearId: "",
    firstFY:"",
    lastFY:''
  });
  const [errors, setErrors] = useState({});
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState({
    id: 0,
    finacialYearId: "",
    lastFY:'',
    firstFY:'',
    finacial: [],
  });
  const [checkingMsg, setCheckingMsg] = useState(false);
  const [postMsg, setPostMsg] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(false);

  useEffect(() => {
    listApi();
    props.retrieveFinancialYear();
  }, [postMsg, updateMsg, checkingMsg]);

  const listApi = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}ReportingPeriods`)
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        console.log(data, "listing");
        setList(data);
      });
  };
  function handleChange(selected) {
    let value = Array.from(selected, (option) => option.value);
    let arr = props.financialYearList.filter((d) => value.includes(d.id));
    let latest = {};
    let oldest = {};
    if (arr.length > 0) {
      latest = arr.reduce(function (r, a) {
        return r.toDate > a.toDate ? r : a;
      });
      oldest = arr.reduce(function (r, a) {
        return r.fromDate < a.fromDate ? r : a;
      });
    }
    setData({
      ...data,
      finacialYearId: value.toString(),
      financial: selected,
      // lastFY: new Date(Math.max(...arr.map(e => new Date(e.toDate)))).getFullYear(),
      // firstFY: new Date(Math.min(...arr.map(e => new Date(e.fromDate)))).getFullYear(),
      lastFY: latest.id,
      firstFY: oldest.id,
    });
  }
  function handleChange2(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }
  const validate = () => {
    let errors = {};
    if (data.name === "") errors.name = "This field is required.";
    if (data.finacial === "") errors.finacial = "This field is required.";
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
    console.log(errors, "errors");
    if (Object.keys(errors).length === 0) {
      setErrors({});
      fetch(`${process.env.REACT_APP_API_URL}ReportingPeriods`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }).then((resp) => {
        console.log("result", resp);
        setPostMsg(true);
        setData({ name: "", finacialYearId: "", finacial: "" });
        setTimeout(() => {
          setPostMsg(false);
        }, 5000);
      });
    } else {
      setErrors(errors);
    }
  }
  function editForm(id, e) {
    e.preventDefault();
    console.log("!!!!!!");
    setEdit(true);
    setCheckingMsg(false);
    setErrors({});
    axios
      .get(`${process.env.REACT_APP_API_URL}ReportingPeriods/${id}`)
      .then((res) => {
        console.log(res.data, "edit value");
        let obj = {};
        let data = res.data;
        data.finacial=[];
        let arr = data.finacialYearId.split(",");
        props.financialYearList.map((d, i) => {
          arr.map((s, i) => {
            if (s == d.id) {
              obj = {
                ...obj,
                value: d.id,
                label: d.name,
              };
              data.finacial.push(obj);
            }
          });
        });
        data.firstFY = data.finacial[0].value;
        data.lastFY = data.finacial[data.finacial.length - 1].value;
        console.log(data, "editvalue");
        setEditValue(data);
      });
  }
  function updateChange2(evt) {
    const value = evt.target.value;
    setEditValue({
      ...editValue,
      [evt.target.name]: value,
    });
  }
  function updateChange(selected) {
    console.log("@@@@@", selected);
    let value = Array.from(selected, (option) => option.value);
    let arr = props.financialYearList.filter((d) => value.includes(d.id));
    let latest = {};
    let oldest = {};
    if (arr.length > 0) {
      latest = arr.reduce(function (r, a) {
        return r.toDate > a.toDate ? r : a;
      });
      oldest = arr.reduce(function (r, a) {
        return r.fromDate < a.fromDate ? r : a;
      });
    }
    setEditValue({
      ...editValue,
      finacialYearId: value.toString(),
      finacial: selected,
      lastFY: latest.id,
      firstFY: oldest.id,
    });
  }
  const updateValidate = () => {
    let errors = {};
    if (editValue.fromDate === "") errors.fromDate = "Please pick date.";
    if (editValue.toDate === "") errors.toDate = "Please pick date.";
    if (Date.parse(editValue.toDate) <= Date.parse(editValue.fromDate)) {
      errors.fromDate = "To date should be greater than From date.";
      errors.toDate = "To date should be greater than From date.";
    }
    return errors;
  };
  function updateData(e, id) {
    e.preventDefault();
    const errors = updateValidate();
    if (Object.keys(errors).length === 0) {
      setErrors({});
      fetch(`${process.env.REACT_APP_API_URL}ReportingPeriods/${id}`, {
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
  function showConfirm(value, status, e) {
    confirm({
      title:
        status === 0
          ? "Do you want to Activate ?"
          : "Do you want to Inactivate ?",
      content: "Are you Sure",
      onOk() {
        changeStatus(value, status, e);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  function changeStatus(id, status, e) {
    e.preventDefault();
    let operation = [
      {
        op: "replace",
        path: "/masterStatus",
        value: status === 0 ? "1" : "0",
      },
    ];
    fetch(`${process.env.REACT_APP_API_URL}ReportingPeriods/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      setEdit(false);
      setCheckingMsg(false);
    });
  }
  let obj = {};
  const options = props.financialYearList.map((data) => {
    obj = {
      ...obj,
      value: data.id,
      label: data.name,
    };
    return obj;
  });
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
      title: "Financial Year",
      dataIndex: "finacialYearId",
      key: "finacialYearId",
      render: (text, user) => (
        <>
          {props.financialYearList &&
            props.financialYearList
              .filter((obj) =>
                user.finacialYearId.split(",").includes(obj.id.toString())
              )
              .map((data, i, row) => {
                return i + 1 === row.length ? data.name : `${data.name}, `;
              })}
        </>
      ),
    },
    {
      title: "Status",
      key: "masterStatus",
      render: (text, record) => (
        <Space size="middle">
          {record.masterStatus.toString() === 0 ? "Inactive" : "Active"}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <CButton onClick={(e) => editForm(record.id, e)}>Edit</CButton>
          {record.masterStatus.toString() === 1 ? (
            <CButton
              color="danger"
              style={{ backgroundColor: "red" }}
              onClick={(e) => showConfirm(record.id, record.masterStatus, e)}
            >
              Inactivate
            </CButton>
          ) : (
            <CButton
              color="success"
              style={{ backgroundColor: "green" }}
              onClick={(e) => showConfirm(record.id, record.masterStatus, e)}
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
              <h4>Reporting Period</h4>
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
                        onChange={updateChange2}
                        value={editValue.name || ""}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <Select
                        id="finacialYearId"
                        name="finacialYearId"
                        placeholder="Select Multiple"
                        onChange={updateChange}
                        value={editValue.finacial}
                        isMulti
                        options={options}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">First Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        name="firstFY"
                        disabled
                        value={editValue.firstFY || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.financialYearList.map((data) => {
                          return (
                            <option value={data.id} key={data.id}>
                              {data.name}
                            </option>
                          );
                        })}
                      </CSelect>

                      <FormFeedback>{errors.toDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Last Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        name="firstFY"
                        disabled
                        value={editValue.lastFY || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.financialYearList.map((data) => {
                          console.log("*&^%", editValue.lastFY)
                          return (
                            <option value={data.id} key={data.id}>
                              {data.name}
                            </option>
                          );
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
                        id="masterStatus"
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
                <CForm onSubmit={(e) => submitData(e)}>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CInput
                        id="name"
                        name="name"
                        onChange={handleChange2}
                        value={data.name || ""}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <Select
                        id="finacialYearId"
                        name="finacialYearId"
                        placeholder="Select Multiple"
                        onChange={handleChange}
                        value={data.finacial}
                        isMulti
                        options={options}
                      />
                      <span
                        className="invalid-feedback"
                        style={{
                          display: data.isValid ? "none" : "block",
                        }}
                      >
                        {errors.typeofFacilitiesId}
                      </span>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">First Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        name="firstFY"
                        value={data.firstFY || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.financialYearList.map((data) => {
                          return (
                            <option value={data.id} key={data.id}>
                              {data.name}
                            </option>
                          );
                        })}
                      </CSelect>
                      <FormFeedback>{errors.toDate}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">Last Financial Year</CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect name="lastFY" value={data.lastFY || ""}>
                        <option value="0">-Select-</option>
                        {props.financialYearList.map((data) => {
                          return (
                            <option value={data.id} key={data.id}>
                              {data.name}
                            </option>
                          );
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
                        readOnly
                        value={data.masterStatus || ""}
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
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
              <CCardHeader>Reporting Period List</CCardHeader>
              <CCardBody>
                <Table
                  dataSource={list.sort((a, b) => (a.id > b.id ? 1 : -1))}
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
const mapStateToProps = (state) => {
  return {
    financialYearList: state.apiadd.financialYearList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveFinancialYear,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ReportingPeriod);
