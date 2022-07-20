import React, { useState, useEffect } from "react";
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
  CSelect,
  CInputCheckbox,
} from "@coreui/react";
import axios from "axios";
import { Modal, Table, Space, Checkbox } from "antd";
import "./style.css";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import { setTimeout } from "core-js";
import { connect, useDispatch } from "react-redux";
import {
  prorammToTypeofPost,
  retrieveFmr,
  retrievePost,
  retrieveSubTypeofPost,
  subToFmr,
  typeToSubType,
} from "../../actions/masterapi";
import { retrieveProgramType } from "../../actions/apiadd";
import { bindActionCreators } from "redux";
const { confirm } = Modal;
// const config=localStorage.getItem('token')
function CategoryofPost(props) {
  const [data, setData] = useState({
    id: 0,
  categoryName:'',
  programTypeId:0,
    fmrId: 0,
    typeofPostId: 0,
    subTypeofPost: 0,
    masterStatus: 0,
    showkey:false,
  });
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState({
    id: 0,
    categoryName:'',
    programTypeId:0,
    fmrId: 0,
    typeofPostId: 0,
    subTypeofPost: 0,
    masterStatus: 0,
    showkey:false,
  });
  const [checkingMsg, setCheckingMsg] = useState(false);
  const [postMsg, setPostMsg] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    listApi();
    dispatch(retrieveProgramType());
    dispatch(retrievePost());
    dispatch(retrieveSubTypeofPost());
    dispatch(retrieveFmr());
  }, [checkingMsg, postMsg, updateMsg,checkStatus]);

  function listApi() {
    axios.get(`${process.env.REACT_APP_API_URL}CatgoryofPositions`).then((res) => {
      let data = res.data;
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
  function handleStatus(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: JSON.parse(value),
    });
  }
  const validate = () => {
    let errors = {};
    if (data.fmr === 0) errors.name = "This field is required.";
    if (data.typeofPostId === 0) errors.typeofPostId = "This field is required.";
    if (data.programTypeId === 0)
      errors.programTypeId = "This field is required.";
    if (data.subTypeofPost === 0)
      errors.subTypeofPost = "This field is required.";

    return errors;
  };
  function submitData(e) {
    e.preventDefault();
    let check = list.map((index) => {
      if (data.categoryName === index.categoryName) return false;
    });
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setErrors({});
      if (check.includes(false)) {
        setCheckingMsg(true);
      } else {
        setCheckingMsg(false);
        fetch(`${process.env.REACT_APP_API_URL}CatgoryofPositions`, {
          method: "POST",
          headers: {
            // "Authorization":`Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }).then((resp) => {
          setPostMsg(true);
          setData({ name: "" });
          setTimeout(() => {
            setPostMsg(false);
          }, 5000);
          console.log("result", resp);
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
    axios.get(`${process.env.REACT_APP_API_URL}CatgoryofPositions/${id}`).then((res) => {
      console.log(res.data);
      let data = res.data;
      setEditValue(data);
    });
  }
  const updateValidate = () => {
    let errors = {};
    if (editValue.name === "") errors.name = "Please enter the name.";
    return errors;
  };
  function updateData(e, id) {
    e.preventDefault();
    const errors = updateValidate();
    if (Object.keys(errors).length === 0) {
      setErrors({});
      fetch(`${process.env.REACT_APP_API_URL}CatgoryofPositions/${id}`, {
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
        status.toString() === 0
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
        path: "/masterStatus",
        value: status.toString() === 0 ? "1" : "0",
      },
    ];
    fetch(`${process.env.REACT_APP_API_URL}CatgoryofPositions/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      console.log("result", resp);
      setCheckStatus(true);
      setTimeout(()=>{
        setCheckStatus(false);
      },[5000]);
      setEdit(false);
      setCheckingMsg(false);
      setEditValue({ name: "" });
      setErrors({});
      setData({ name: "" });
    });
  }
  useEffect(() => {
    if (data.programTypeId != 0) {
      dispatch(prorammToTypeofPost(data.programTypeId));
    }
  }, [data.programTypeId]);
  useEffect(() => {
    if (data.typeofPostId != 0) {
      dispatch(typeToSubType(data.typeofPostId));
    }
  }, [data.typeofPostId]);
  useEffect(() => {
    if (editValue.typeofPostId != 0) {
      dispatch(typeToSubType(editValue.typeofPostId));
    }
  }, [editValue.typeofPostId]);
  useEffect(() => {
    if (editValue.programTypeId != 0) {
      dispatch(prorammToTypeofPost(editValue.programTypeId));
    }
  }, [editValue.programTypeId]);
  useEffect(() => {
    if (data.subTypeofPost != 0) {
      dispatch(subToFmr(data.subTypeofPost));
    }
  }, [data.subTypeofPost]);
  useEffect(() => {
    if (editValue.subTypeofPost != 0) {
      dispatch(subToFmr(editValue.subTypeofPost));
    }
  }, [editValue.subTypeofPost]);
  return (
    <div>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              <h4>Category of Post</h4>
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
                      <CLabel htmlFor="text-input">
                        {" "}
                        <b>Category of Post</b>
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CInput
                        id="categoryName"
                        name="categoryName"
                        type="text"
                        onChange={updateChange}
                        value={editValue.categoryName}
                        invalid={errors.name ? true : false}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">
                        <b>FMR Code</b>{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="fmrId"
                        name="fmrId"
                        placeholder="Select"
                        onChange={updateChange}
                        value={editValue.fmrId || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.subToFmrOption &&
                          props.subToFmrOption.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.fmr}
                            </option>
                          ))}
                      </CSelect>
                      <FormFeedback>{errors.fmrId}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">
                        <b>Sub Type of Post</b>{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="subTypeofPost"
                        name="subTypeofPost"
                        placeholder="Select"
                        onChange={updateChange}
                        readOnly
                        value={editValue.subTypeofPost || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.typeToSub &&
                          props.typeToSub.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                      </CSelect>
                      <FormFeedback>{errors.subTypeofPost}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">
                        <b>Type of Post</b>{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="typeofPostId"
                        name="typeofPostId"
                        placeholder="Select"
                        onChange={updateChange}
                        readOnly
                        value={editValue.typeofPostId || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.optionTypeofPost &&
                          props.optionTypeofPost.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                      </CSelect>
                      <FormFeedback>{errors.typeofPostId}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">
                        <b>Program Type</b>{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="programTypeId"
                        name="programTypeId"
                        placeholder="Select"
                        onChange={updateChange}
                        readOnly
                        value={editValue.programTypeId || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.programTypeList &&
                          props.programTypeList.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                      </CSelect>
                      <FormFeedback>{errors.programTypeId}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">
                        <b>Status</b>{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="status"
                        name="masterStatus"
                        placeholder="Select"
                        onChange={updateStatus}
                        readOnly
                        value={editValue.masterStatus || ""}
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" sm="12">
                      <Checkbox
                        id="showkey"
                        name="showkey"
                        placeholder="Select"
                        onChange={(e)=>setData({...editValue,showkey:e.target.checked})}
                        value={editValue.showkey || ""}
                      ><b>Show in the Key Deliverables tab</b></Checkbox>
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
                <CForm
                  id="form"
                  className="form-horizontal"
                  onSubmit={submitData}
                >
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">
                        {" "}
                        <b>Category of Post</b>
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CInput
                        id="categoryName"
                        name="categoryName"
                        type="text"
                        // placeholder="Caste"
                        onChange={handleChange}
                        value={data.categoryName || ""}
                        invalid={errors.name ? true : false}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">
                        <b>FMR Code</b>{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="fmrId"
                        name="fmrId"
                        placeholder="Select"
                        onChange={handleChange}
                        value={data.fmrId || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.subToFmrOption &&
                          props.subToFmrOption.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.fmr}
                            </option>
                          ))}
                      </CSelect>
                      <FormFeedback>{errors.fmrId}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">
                        <b>Sub Type of Post</b>{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="subTypeofPost"
                        name="subTypeofPost"
                        placeholder="Select"
                        // readOnly
                        onChange={handleChange}
                        value={data.subTypeofPost || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.typeToSub &&
                          props.typeToSub.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                      </CSelect>
                      <FormFeedback>{errors.subTypeofPost}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">
                        <b>Type of Post</b>{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="typeofPostId"
                        name="typeofPostId"
                        placeholder="Select"
                        onChange={handleChange}
                        // readOnly
                        value={data.typeofPostId || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.optionTypeofPost &&
                          props.optionTypeofPost.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                      </CSelect>
                      <FormFeedback>{errors.typeofPostId}</FormFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel htmlFor="text-input">
                        <b>Program Type</b>{" "}
                      </CLabel>
                    </CCol>
                    <CCol xs="12" sm="12">
                      <CSelect
                        id="programTypeId"
                        name="programTypeId"
                        placeholder="Select"
                        // readOnly
                        onChange={handleChange}
                        value={data.programTypeId || ""}
                      >
                        <option value="0">-Select-</option>
                        {props.programTypeList &&
                          props.programTypeList.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                      </CSelect>
                      <FormFeedback>{errors.positionCategoryId}</FormFeedback>
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
                  <CFormGroup row>
                    <CCol xs="12" sm="12">
                      <Checkbox
                        id="showkey"
                        name="showkey"
                        placeholder="Select"
                        onChange={(e)=>setData({...data,showkey:e.target.checked})}
                      ><b>Show in the Key Deliverables tab</b></Checkbox>
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
              <CCardHeader>Category of Post List</CCardHeader>
              <CCardBody>
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
                    title="Category of Post"
                    dataIndex="categoryName"
                    key="categoryName"
                  ></Table.Column>
                  <Table.Column
                    title="Program Type"
                    dataIndex="programTypeId"
                    key="programTypeId"
                    render={(text, user) => (
                      <>
                        {props.programTypeList
                          .filter((data) => data.id === user.programTypeId)
                          .map((id) => {
                            return id.name;
                          })}
                      </>
                    )}
                  ></Table.Column>
                  <Table.Column
                    title="Type of Post"
                    dataIndex="typeofPostId"
                    key="typeofPostId"
                    render={(text, user) => (
                      <>
                        {props.postList
                          .filter((data) => data.id === user.typeofPostId)
                          .map((id) => {
                            return id.name;
                          })}
                      </>
                    )}
                  ></Table.Column>
                  <Table.Column
                    title="Sub Type of Post"
                    dataIndex="subTypeofPost"
                    key="subTypeofPost"
                    render={(text, user) => (
                      <>
                        {props.subTypeofPostList
                          .filter((data) => data.id === user.subTypeofPost)
                          .map((id) => {
                            return id.name;
                          })}
                      </>
                    )}
                  ></Table.Column>
                    <Table.Column
                    title="FMR Code"
                    dataIndex="fmrId"
                    key="fmrId"
                    render={(text, user) => (
                      <>
                        {props.fmrList
                          .filter((data) => data.id === user.fmrId)
                          .map((id) => {
                            return id.fmr;
                          })}
                      </>
                    )}
                  ></Table.Column>
                  <Table.Column
                    title="Status"
                    dataIndex="masterStatus"
                    key="masterStatus"
                    render={(status) => (
                      <>{status.toString() === 0 ? "Inactive" : "Active"}</>
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
                        {user.masterStatus.toString() === 1 ? (
                          <CButton
                            color="danger"
                            style={{ backgroundColor: "red" }}
                            onClick={() => showConfirm(user.id, user.masterStatus)}
                          >
                            Inactivate
                          </CButton>
                        ) : (
                          <CButton
                            color="success"
                            style={{ backgroundColor: "green" }}
                            onClick={() => showConfirm(user.id, user.masterStatus)}
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
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    programTypeList: state.apiadd.programTypeList,
    optionTypeofPost: state.masterapi.optionTypeofPost,
    postList: state.masterapi.postList,
    subTypeofPostList: state.masterapi.subTypeofPostList,
    typeToSub: state.masterapi.typeToSub,
    fmrList:state.masterapi.fmrList,
    subToFmrOption:state.masterapi.subToFmrOption
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveProgramType,
      prorammToTypeofPost,
      retrievePost,
      retrieveSubTypeofPost,
      typeToSubType,
      retrieveFmr,
      subToFmr
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CategoryofPost);
