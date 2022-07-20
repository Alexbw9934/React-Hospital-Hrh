import React from "react";
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
  CSelect,
  CAlert,
} from "@coreui/react";
import axios from "axios";
import { Modal, Table, Space } from "antd";
import "../masters/style.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  retrieveData,
  retrieveState,
  retrieveBlockCategory,
  retrieveBlocks,
  retrieveDistrictCategory,
  retrieveDistricts,
  retrieveDivision,
  retrieveStateCategory,
  retrieveUrbanArea,
} from "../../actions/apiadd";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const config = localStorage.getItem("token");
const { confirm } = Modal;
class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: 0,
        name: "",
        blockCategoryId: 0,
        districtId: 0,
        districtCategoryId: 0,
        stateCategoryId: 0,
        stateId: 0,
        urbanAreaId: 0,
        divisionId: 0,
        blockId:0,
        status:0,
      },
      editValue: {
        id: 0,
        name: "",
        blockCategoryId: 0,
        districtId: 0,
        districtCategoryId: 0,
        stateCategoryId: 0,
        stateId: 0,
        urbanAreaId: 0,
        divisionId: 0,
        blockId:0,
        status:0,
      },
      edit: false,
      updateMsg: false,
      postMsg: false,
      deleteMsg: false,
      checkingMsg: false,
      errors:{},
    };
  }
  componentDidMount() {
    this.props.retrieveData();
    this.props.retrieveState();
    this.props.retrieveBlockCategory();
    this.props.retrieveBlocks();
    this.props.retrieveDistrictCategory();
    this.props.retrieveDistricts();
    this.props.retrieveDivision();
    this.props.retrieveStateCategory();
    this.props.retrieveUrbanArea();
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: '',
      },
    });
  };
  handleStatus = (e) => {
    console.log(e.target.value);
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: JSON.parse(e.target.value),
      },
    });
  };
  validate = () => {
    const { value } = this.state;
    let errors = {};
    if (value.name === "") errors.name = "Please enter the name.";
    if (value.blockId === 0) errors.blockId = "Select the Block.";
    if (value.urbanAreaId === 0) errors.urbanAreaId = "Select the Urban Area.";
    if (value.divisionId === 0) errors.divisionId = "Select the Division.";
    // if (value.blockCategoryId === 0)
    //   errors.blockCategoryId = "Select the Block Category.";
    // if (value.stateCategoryId === 0)
    //   errors.stateCategoryId = "Select the State Category.";
    if (value.stateId === 0) errors.stateId = "Select the State.";
    // if (value.districtCategoryId === 0)
    //   errors.districtCategoryId = "Select the District Category.";
    if (value.districtId === 0) errors.districtId = "Select the District.";
    return errors;
  };
  submitData = (e) => {
    e.preventDefault();
    const value = this.state;
    const errors = this.validate();
    let check = this.props.cityList.map((data) => {
      if( value.value.name === data.name ) return false;
    });
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
    if (check.includes(false)) {
      this.setState({
        checkingMsg: true,
      });   
    } else {
      this.setState({
        checkingMsg: false,
      }); 
      fetch("http://5.9.111.198:13880/api/Cities", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value.value),
      }).then((resp) => {
        this.setState({
          postMsg: true,
        });
        setTimeout( () => {
          this.setState({
            postMsg: false,
          });
      }, 5000);
        this.setState({
          value: {
            id: 0,
            name: "",
            blockCategoryId: 0,
            districtId: 0,
            districtCategoryId: 0,
            stateCategoryId: 0,
            stateId: 0,
            urbanAreaId: 0,
            divisionId: 0,
          },
        });
        this.props.retrieveData();
        console.log("result", resp);
      });
   
    }
  } else {
    this.setState({ errors });
  }
  };
  editForm = (id) => {
    console.log(id);
    this.setState({ edit: true,errors: {}, checkingMsg: false });
    axios.get(`http://5.9.111.198:13880/api/Cities/${id}`).then((res) => {
      console.log(res.data);
      let data = res.data;
      this.setState({ editValue: data });
    });
  };
  updateValidate = () => {
    let errors = {};
    if (this.state.editValue.name === "")
      errors.name = "Please enter the name.";
    // if (this.state.editValue.blockCategoryId === 0)
    //   errors.blockCategoryId = "Select the Block Category.";
    // if (this.state.editValue.stateCategoryId === 0)
    //   errors.stateCategoryId = "Select the State Category.";
    // if (this.state.editValue.districtCategoryId === 0)
    //   errors.districtCategoryId = "Select the District Category.";
    if (this.state.editValue.stateId === 0)
      errors.stateId = "Select the State.";
      if (this.state.editValue.blockId === 0)
      errors.blockId = "Select the Block.";
      if (this.state.editValue.divisionId === 0)
      errors.divisionId = "Select the Division.";
      if (this.state.editValue.urbanAreaId === 0)
      errors.urbanAreaId = "Select the Urban Area.";
      if (this.state.editValue.districtId === 0)
      errors.districtId = "Select the District.";
    return errors;
  };
  updateData = (e, id) => {
    e.preventDefault();
    const errors = this.updateValidate();
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
    fetch(`http://5.9.111.198:13880/api/Cities/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.editValue),
    }).then((resp) => {
      this.setState({
        updateMsg: true,
      });
      setTimeout( () => {
        this.setState({
          updateMsg: false,
        });
    }, 5000);
      console.log("result", resp);
      this.setState({
        editValue: {
          id: 0,
          name: "",
          blockCategoryId: 0,
          districtId: 0,
          districtCategoryId: 0,
          stateCategoryId: 0,
          stateId: 0,
          urbanAreaId: 0,
          divisionId: 0,
        },
        edit: false,
      });
      this.props.retrieveData();
    });
  } else {
    this.setState({ errors });
  }
  };
  updateChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      editValue: {
        ...this.state.editValue,
        [evt.target.name]: value,
      },
      errors: {
        ...this.state.errors,
        [evt.target.name]: '',
      },
    });
  };
  updateStatus = (e) => {
    console.log(e.target.value);
    this.setState({
      editValue: {
        ...this.state.editValue,
        [e.target.name]: JSON.parse(e.target.value),
      },
    });
  };
  showConfirm = (value, status) => {
    confirm({
      title:
        status.toString() === 0
          ? "Do you want to Activate ?"
          : "Do you want to Inactivate ?",
      content: "Are you Sure",
      onOk: () => {
        return this.changeStatus(value, status);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  changeStatus = (id, status) => {
    let operation = [
      {
        op: "replace",
        path: "/status",
        value: status=== 0 ? "1" : "0",
      },
    ];
    fetch(`http://5.9.111.198:13880/api/Cities/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      this.setState({
        checkingMsg:false,
      });
      console.log("result", resp);
      this.props.retrieveData();
    });
  };

  render() {
    const { errors, editValue } = this.state;
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  City
                </h4>
              </CCardHeader>
              <CCardBody>
                {this.state.checkingMsg ? (
                  <CAlert color="warning" className="d-flex align-items-center">
                    <CIcon
                      name="cilWarning"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>This City name is already exist</div>
                  </CAlert>
                ) : this.state.updateMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Updated Successfully</div>
                  </CAlert>
                ) : this.state.postMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Data save Successfully</div>
                  </CAlert>
                ) : this.state.deleteMsg ? (
                  <CAlert color="danger" className="d-flex align-items-center" id="delete">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Deleted Successfully</div>
                  </CAlert>
                ) : null}
                {this.state.edit ? (
                  <CForm
                    id="form1"
                    className="form-horizontal"
                    onSubmit={(e) => this.updateData(e, editValue.id)}
                  >
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">City Name </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="form"
                            name="name"
                            onChange={this.updateChange}
                            defaultValue={editValue.name || ""}
                            value={editValue.name || ""}
                            invalid={errors.name ? true : false}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input"> Urban Area </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="urbanAreaId"
                            name="urbanAreaId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.urbanAreaId || ""}
                            invalid={errors.urbanAreaId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.urbanList &&
                              this.props.urbanList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.urbanAreaId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                    <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State Category</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateCategoryId"
                            name="stateCategoryId"
                            placeholder="Select"
                            readOnly
                            // onChange={this.updateChange}
                            value={editValue.stateCategoryId || ""}
                            // invalid={errors.stateCategoryId ? true : false}
                          >
                            {/* <option value="0">-Select-</option> */}
                            {this.props.stateCategoryList &&
                              this.props.stateCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          {/* <FormFeedback>{errors.stateCategoryId}</FormFeedback> */}
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateId"
                            name="stateId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.stateId || ""}
                            invalid={errors.stateId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateList &&
                              this.props.stateList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.stateId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                    <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            {" "}
                            District Category{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="districtCategoryId"
                            name="districtCategoryId"
                            placeholder="Select"
                            readOnly
                            // onChange={this.updateChange}
                            value={editValue.districtCategoryId || ""}
                            // invalid={errors.districtCategoryId ? true : false}
                          >
                            {/* <option value="0">-Select-</option> */}
                            {this.props.districtCategoryList &&
                              this.props.districtCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          {/* <FormFeedback>{errors.districtCategoryId}</FormFeedback> */}
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input"> District</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="districtId"
                            name="districtId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.districtId || ""}
                            invalid={errors.districtId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.districtsList &&
                              this.props.districtsList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.districtId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                    <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            {" "}
                            Block Categories{" "}
                          </CLabel>
                        </CCol>
                        <CCol>
                          <CSelect
                            id="blockCategoryId"
                            name="blockCategoryId"
                            placeholder="Select"
                            readOnly
                            // onChange={this.updateChange}
                            value={editValue.blockCategoryId || ""}
                            // invalid={errors.blockCategoryId ? true : false}
                          >
                            {/* <option value="0">-Select-</option> */}
                            {this.props.blockCategoryList &&
                              this.props.blockCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          {/* <FormFeedback>{errors.blockCategoryId}</FormFeedback> */}
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input"> Block </CLabel>
                        </CCol>
                        <CCol>
                          <CSelect
                            id="blockId"
                            name="blockId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.blockId || ""}
                            invalid={errors.blockId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.blockList &&
                              this.props.blockList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.blockId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol sm="6">
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Division</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="divisionId"
                            name="divisionId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.divisionId || ""}
                            invalid={errors.divisionId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.divisionList &&
                              this.props.divisionList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.divisionId}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Status </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="status"
                          name="status"
                          placeholder="Select"
                          onChange={this.updateStatus}
                          value={editValue.status || ""}
                        >
                          <option value="0">Inactive</option>
                          <option value="1">Active</option>
                        </CSelect>
                      </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup>
                    <CCol sm="4">
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                    <CButton color="primary" type="submit">
                      Update
                    </CButton>
                    </CCol>
                    </CFormGroup>
                  </CForm>
                ) : (
                  <CForm
                    id="form"
                    className="form-horizontal"
                    onSubmit={this.submitData}
                  >
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">City Name </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="name"
                            name="name"
                            placeholder="City Name"
                            value={this.state.value.name}
                            onChange={this.handleChange}
                            invalid={errors.name ? true : false}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input"> Urban Area </CLabel>
                        </CCol>
                        <CCol>
                          <CSelect
                            id="urbanAreaId"
                            name="urbanAreaId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.urbanAreaId || ""}
                            invalid={errors.urbanAreaId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.urbanList &&
                              this.props.urbanList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.urbanAreaId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                    <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State Category</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateCategoryId"
                            name="stateCategoryId"
                            placeholder="Select"
                            readOnly
                            // onChange={this.handleChange}
                            value={this.state.value.stateCategoryId || ""}
                            // invalid={errors.stateCategoryId ? true : false}
                          >
                            {/* <option value="0">-Select-</option> */}
                            {this.props.stateCategoryList &&
                              this.props.stateCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          {/* <FormFeedback>{errors.stateCategoryId}</FormFeedback> */}
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateId"
                            name="stateId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.stateId || ""}
                            invalid={errors.stateId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateList &&
                              this.props.stateList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.stateId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                    <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            {" "}
                            District Category{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="districtCategoryId"
                            name="districtCategoryId"
                            placeholder="Select"
                            // onChange={this.handleChange}
                            readOnly
                            value={this.state.value.districtCategoryId || ""}
                            // invalid={errors.districtCategoryId ? true : false}
                          >
                            {/* <option value="0">-Select-</option> */}
                            {this.props.districtCategoryList &&
                              this.props.districtCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          {/* <FormFeedback>{errors.districtCategoryId}</FormFeedback> */}
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">District</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="districtId"
                            name="districtId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.districtId}
                            invalid={errors.districtId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.districtsList &&
                              this.props.districtsList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.districtId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            {" "}
                            Block Category{" "}
                          </CLabel>
                        </CCol>
                        <CCol>
                          <CSelect
                            id="blockCategoryId"
                            name="blockCategoryId"
                            placeholder="Select"
                            // onChange={this.handleChange}
                            value={this.state.value.blockCategoryId || ""}
                            // invalid={errors.blockCategoryId ? true : false}
                            readOnly
                          >
                            {/* <option value="0">-Select-</option> */}
                            {this.props.blockCategoryList &&
                              this.props.blockCategoryList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          {/* <FormFeedback>{errors.blockCategoryId}</FormFeedback> */}
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input"> Block </CLabel>
                        </CCol>
                        <CCol>
                          <CSelect
                            id="blockId"
                            name="blockId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.blockId || ""}
                            invalid={errors.blockId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.blockList &&
                              this.props.blockList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.blockId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol sm="6">
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Division</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="divisionId"
                            name="divisionId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.divisionId || ""}
                            invalid={errors.divisionId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.divisionList &&
                              this.props.divisionList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.divisionId}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Status </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="status"
                          name="status"
                          placeholder="Select"
                          onChange={this.handleStatus}
                          value={this.state.value.status || ""}
                        >
                          <option value="0">Inactive</option>
                          <option value="1">Active</option>
                        </CSelect>
                      </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup>
                      <CCol sm="4">
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton color="primary" type="submit">
                          Save
                        </CButton>
                      </CCol>
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
                  <h4>City List</h4>
                </CCardHeader>
                  <CCardBody>
                  <Table
                    dataSource={this.props.cityList.sort((a, b) =>
                      a.id < b.id ? 1 : -1
                    )}
                    rowKey={"id"}
                  >
                    <Table.Column
                      title="ID"
                      dataIndex="id"
                      key="id"
                      render={(text, obj, i) => <>{i + 1}</>}
                    ></Table.Column>
                    <Table.Column
                      title="City"
                      dataIndex="name"
                      key="name"
                    ></Table.Column>
                     <Table.Column 
                     title="Urban Area"
                     dataIndex="urbanAreaId"
                     key="urbanAreaId"
                     render={(text, user) => (
                      <>
                        {" "}
                        {this.props.urbanList
                          .filter((data) => data.id === user.urbanAreaId)
                          .map((id) => {
                            return id.name;
                          })}
                      </>
                    )}></Table.Column>
                    <Table.Column
                      title="State Category"
                      dataIndex="stateCategoryId"
                      key="stateCategoryId"
                      render={(text, user) => (
                        <>
                          {" "}
                          {this.props.stateCategoryList
                            .filter((data) => data.id === user.stateCategoryId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="State"
                      dataIndex="stateId"
                      key="stateId"
                      render={(text, user) => (
                        <>
                          {" "}
                          {this.props.stateList
                            .filter((data) => data.id === user.stateId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="District Category"
                      dataIndex="districtCategoryId"
                      key="districtCategoryId"
                      render={(text, user) => (
                        <>
                          {" "}
                          {this.props.districtCategoryList
                            .filter(
                              (data) => data.id === user.districtCategoryId
                            )
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="District"
                      dataIndex="districtId"
                      key="districtId"
                      render={(text, user) => (
                        <>
                          {" "}
                          {this.props.districtsList
                            .filter((data) => data.id === user.districtId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                       <Table.Column
                      title="Block Category"
                      dataIndex="blockCategoryId"
                      key="blockCategoryId"
                      render={(text, user) => (
                        <>
                          {this.props.blockCategoryList
                            .filter((data) => data.id === user.blockCategoryId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                       <Table.Column
                      title="Block"
                      dataIndex="blockCategoryId"
                      key="blockCategoryId"
                      render={(text, user) => (
                        <>
                          {this.props.blockList
                                  .filter((data) => data.id === user.blockId)
                                  .map((id) => {
                                    return id.name;
                                  })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Status"
                      dataIndex="status"
                      key="status"
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
                            onClick={() => this.editForm(user.id)}
                          >
                            Edit
                          </CButton>
                          {user.status.toString() === 1 ? (
                            <CButton
                              color="danger"
                              style={{ backgroundColor: "red" }}
                              onClick={() =>
                                this.showConfirm(user.id, user.status)
                              }
                            >
                              Inactivate
                            </CButton>
                          ) : (
                            <CButton
                              color="success"
                              style={{ backgroundColor: "green" }}
                              onClick={() =>
                                this.showConfirm(user.id, user.status)
                              }
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
            </CCol>
          </CRow>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cityList: state.apiadd.cityList,
    stateList: state.apiadd.stateList,
    stateCategoryList: state.apiadd.stateCategoryList,
    districtsList: state.apiadd.districtsList,
    districtCategoryList: state.apiadd.districtCategoryList,
    blockList: state.apiadd.blockList,
    blockCategoryList: state.apiadd.blockCategoryList,
    divisionList: state.apiadd.divisionList,
    urbanList: state.apiadd.urbanList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveState,
      retrieveData,
      retrieveBlockCategory,
      retrieveBlocks,
      retrieveDistrictCategory,
      retrieveDistricts,
      retrieveDivision,
      retrieveStateCategory,
      retrieveUrbanArea,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
