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
import { FormFeedback } from "reactstrap";
import axios from "axios";
import { Modal, Checkbox, Row } from "antd";
import "../masters/style.css";
import {
  retrieveStateCategory,
  retrieveState,
  retrieveDistricts,
  retrieveDivision,
  retrieveData,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import Select from "react-select";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        userName: "",
        email: "",
        password: "",
        newPassword: "",
        roleId: 0,
        stateId: 0,
        divisionId: 0,
        districtId: 0,
        name: "",
        designation: "",
        mobileNo: "",
        makerStateId: "",
        checkerStateId: "",
        makerDivisionId: "",
        checkerDivisionId: "",
        makerDistrictId: "",
        checkerDistrictId: "",
        makerCityId: "",
        checkerCityId: "",
        userActive: true,
      },
      errors: {},
      stateCategory: [],
      editValue: {
        id: 0,
        name: "",
        stateCategoryId: 0,
        status: 0,
      },
      edit: false,
      updateMsg: false,
      postMsg: false,
      deleteMsg: false,
      checkingMsg: false,
      users: [],
    };
  }
  componentDidMount() {
    this.props.retrieveState();
    this.props.retrieveStateCategory();
    this.props.retrieveData();
    this.props.retrieveDistricts();
    this.props.retrieveDivision();
  }
  handleChange = (e) => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value,
        newPassword: this.state.value.password,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  validate = () => {
    const { value } = this.state;
    const pattern = /^[0-9]$/;
    let pass =
    /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,20}$/;
    let errors = {};
    if (value.name == "") errors.name = "This field is required.";
    if (value.email == "") errors.email = "This field is required.";
    if (value.password == "") errors.password = "This field is required.";
    else if (!pass.test(value.password))
      errors.password =
        "Password must contain at least 6 characters long, one lowercase, one uppercase, one number , one special character and no whitespaces";
    return errors;
  };
  submitData = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length == 0) {
      this.setState({
        errors: {},
      });
      let check = this.props.stateList.map((data) => {
        if (this.state.value.name == data.name) return false;
      });
      // if (check.includes(false)) {
      //   this.setState({
      //     checkingMsg: true,
      //   });
      // } else {
      //   this.setState({
      //     checkingMsg: false,
      //   });
      fetch(`${process.env.REACT_APP_API_URL}Users/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.value),
      })
        .then((response) => {
          if (response.status == 201) {
            console.log("SUCCESSS");
            return response.json();
          } else if (response.status == 404) {
            console.log("error", response);
            // throw new Error(`Error! status: ${response.status}`);
          }
        })
        .then((resp) => {
          this.setState({
            postMsg: true,
          });
          setTimeout(() => {
            this.setState({
              postMsg: false,
            });
          }, 5000);
          this.setState({
            value: {
              userName: "",
              email: "",
              password: "",
              newPassword: "",
              roleId: 0,
              stateId: 0,
              divisionId: 0,
              districtId: 0,
              name: "",
              designation: "",
              mobileNo: "",
              makerStateId: "",
              checkerStateId: "",
              makerDivisionId: "",
              checkerDivisionId: "",
              makerDistrictId: "",
              checkerDistrictId: "",
              makerCityId: "",
              checkerCityId: "",
              userActive: true,
            },
          });
          console.log("result", resp);
        });
      // }
    } else {
      this.setState({ errors });
    }
  };
  render() {
    const { errors, editValue } = this.state;
    let optionState = this.props.stateList.map(function (data) {
      return { value: data.id, label: data.name };
    });
    let optionDivision = this.props.divisionList.map(function (data) {
      return { value: data.id, label: data.name };
    });
    let optionDistict = this.props.districtsList.map(function (data) {
      return { value: data.id, label: data.name };
    });
    let optionCity = this.props.cityList.map(function (data) {
      return { value: data.id, label: data.name };
    });
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>{/* <h4>State</h4> */}</CCardHeader>
              <CCardBody>
                {this.state.checkingMsg ? (
                  <CAlert color="warning" className="d-flex align-items-center">
                    <CIcon
                      name="cilWarning"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>This name is already exist</div>
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
                <CForm onSubmit={this.submitData}>
                  <Row gutter={24}>
                    <div
                      className="btn btn-primary btn-block"
                      style={{ margin: "20px", textAlign: "left" }}
                    >
                      Role
                    </div>
                  </Row>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Role</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="roleId"
                          name="roleId"
                          placeholder="Select"
                          onChange={this.handleChange}
                          value={this.state.value.roleId || ""}
                          invalid={errors.roleId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          <option value="1">National</option>
                          <option value="2">State</option>
                          <option value="3">Division</option>
                          <option value="4">Distrct</option>
                        </CSelect>
                        <FormFeedback>{errors.roleId}</FormFeedback>
                      </CCol>
                    </CCol>
                    <CCol></CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>State</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="stateId"
                          name="stateId"
                          disabled={this.state.value.roleId == 1 ? true : false}
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
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Division</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          disabled={this.state.value.roleId == 3 ? false : true}
                          id="divisionId"
                          name="divisionId"
                          placeholder="Select"
                          onChange={this.handleChange}
                          value={this.state.value.divisionId || ""}
                          invalid={errors.districtId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.divisionList &&
                            this.props.divisionList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.role}</FormFeedback>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>District</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="districtId"
                          disabled={this.state.value.roleId == 4 ? false : true}
                          name="districtId"
                          placeholder="Select"
                          onChange={this.handleChange}
                          value={this.state.value.districtId || ""}
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
                        <FormFeedback>{errors.role}</FormFeedback>
                      </CCol>
                    </CCol>
                    <CCol></CCol>
                  </CFormGroup>
                  <Row gutter={24}>
                    <div
                      className="btn btn-primary btn-block"
                      style={{ margin: "20px", textAlign: "left" }}
                    >
                      User Details
                    </div>
                  </Row>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Username</b>{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="userName"
                          name="userName"
                          placeholder="userName"
                          value={this.state.value.userName || ""}
                          onChange={this.handleChange}
                          invalid={errors.userName ? true : false}
                        />
                        <FormFeedback>{errors.userName}</FormFeedback>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          {" "}
                          <b>Password</b>{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={this.state.value.password || ""}
                          onChange={this.handleChange}
                          invalid={errors.password ? true : false}
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Name</b>{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="name"
                          name="name"
                          placeholder="Name"
                          value={this.state.value.name || ""}
                          onChange={this.handleChange}
                          invalid={errors.name ? true : false}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          {" "}
                          <b>Designation</b>{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="designation"
                          name="designation"
                          placeholder="Designation"
                          value={this.state.value.designation || ""}
                          onChange={this.handleChange}
                          invalid={errors.designation ? true : false}
                        />
                        <FormFeedback>{errors.designation}</FormFeedback>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Email</b>{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          value={this.state.value.email || ""}
                          onChange={this.handleChange}
                          invalid={errors.email ? true : false}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          {" "}
                          <b>Mobile Number</b>{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="mobileNo"
                          name="mobileNo"
                          placeholder="Mobile No"
                          value={this.state.value.mobileNo || ""}
                          onChange={this.handleChange}
                          invalid={errors.mobileNo ? true : false}
                        />
                        <FormFeedback>{errors.mobileNo}</FormFeedback>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <Row gutter={24}>
                    <div
                      className="btn btn-primary btn-block"
                      style={{ margin: "20px", textAlign: "left" }}
                    >
                      Selection of Maker and Checker
                    </div>
                  </Row>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Maker of States</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="makerStateId"
                          name="makerStateId"
                          onChange={(selected) => {
                            let value = Array.from(
                              selected,
                              (option) => option.value
                            );
                            this.setState({
                              value: {
                                ...this.state.value,
                                makerStateId: value.toString(),
                                makerState: selected,
                              },
                            });
                          }}
                          value={this.state.value.makerState || ""}
                          isMulti
                          options={optionState}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.makerStateId}
                        </span>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Checker of States</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="checkerStateId"
                          name="checkerStateId"
                          onChange={(selected) => {
                            let value = Array.from(
                              selected,
                              (option) => option.value
                            );
                            this.setState({
                              value: {
                                ...this.state.value,
                                checkerStateId: value.toString(),
                                checkerState: selected,
                              },
                            });
                          }}
                          value={this.state.value.checkerState || ""}
                          isMulti
                          options={optionState}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.checkerStateId}
                        </span>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Maker of Divisions</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="makerDivisionId"
                          name="makerDivisionId"
                          onChange={(selected) => {
                            let value = Array.from(
                              selected,
                              (option) => option.value
                            );
                            this.setState({
                              value: {
                                ...this.state.value,
                                makerDivisionId: value.toString(),
                                makerDivision: selected,
                              },
                            });
                          }}
                          value={this.state.value.makerDivision || ""}
                          isMulti
                          options={optionDivision}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.makerDivisionId}
                        </span>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Checker of Divisions</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="checkerDivisionId"
                          name="checkerDivisionId"
                          onChange={(selected) => {
                            let value = Array.from(
                              selected,
                              (option) => option.value
                            );
                            this.setState({
                              value: {
                                ...this.state.value,
                                checkerDivisionId: value.toString(),
                                checkerDivision: selected,
                              },
                            });
                          }}
                          value={this.state.value.checkerDivision || ""}
                          isMulti
                          options={optionDivision}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.typeofFacilitiesId}
                        </span>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Maker of Districts</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="makerDistrictId"
                          name="makerDistrictId"
                          onChange={(selected) => {
                            let value = Array.from(
                              selected,
                              (option) => option.value
                            );
                            this.setState({
                              value: {
                                ...this.state.value,
                                makerDistrictId: value.toString(),
                                makerDistrict: selected,
                              },
                            });
                          }}
                          value={this.state.value.makerDistrict || ""}
                          isMulti
                          options={optionDistict}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.makerDistrictId}
                        </span>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Checker of Districts</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="checkerDistrictId"
                          name="checkerDistrictId"
                          onChange={(selected) => {
                            let value = Array.from(
                              selected,
                              (option) => option.value
                            );
                            this.setState({
                              value: {
                                ...this.state.value,
                                checkerDistrictId: value.toString(),
                                checkerDistrict: selected,
                              },
                            });
                          }}
                          value={this.state.value.checkerDistrict || ""}
                          isMulti
                          options={optionDistict}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.checkerDistrictId}
                        </span>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Maker of Cities</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="makerCityId"
                          name="makerCityId"
                          onChange={(selected) => {
                            let value = Array.from(
                              selected,
                              (option) => option.value
                            );
                            this.setState({
                              value: {
                                ...this.state.value,
                                makerCityId: value.toString(),
                                makerCity: selected,
                              },
                            });
                          }}
                          value={this.state.value.makerCity || ""}
                          isMulti
                          options={optionCity}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.typeofFacilitiesId}
                        </span>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          <b>Checker of Cities</b>
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="checkerCityId"
                          name="checkerCityId"
                          onChange={(selected) => {
                            let value = Array.from(
                              selected,
                              (option) => option.value
                            );
                            this.setState({
                              value: {
                                ...this.state.value,
                                checkerCityId: value.toString(),
                                checkerCity: selected,
                              },
                            });
                          }}
                          value={this.state.value.checkerCity || ""}
                          isMulti
                          options={optionCity}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.checkerCityId}
                        </span>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <h5>User Active</h5>
                        <Checkbox
                          onChange={(e) =>
                            this.setState({
                              value: {
                                ...this.state.value,
                                userActive: e.target.checked,
                              },
                            })
                          }
                        >
                          Active?
                        </Checkbox>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  {/* end */}
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
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stateCategoryList: state.apiadd.stateCategoryList,
    stateList: state.apiadd.stateList,
    districtsList: state.apiadd.districtsList,
    divisionList: state.apiadd.divisionList,
    cityList: state.apiadd.cityList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveStateCategory,
      retrieveState,
      retrieveDistricts,
      retrieveDivision,
      retrieveData,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
