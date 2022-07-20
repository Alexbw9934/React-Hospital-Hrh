import React, { Component } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CAlert,
  CFormGroup,
  CSelect,
  CInput,
  CForm,
  CLabel,
} from "@coreui/react";
import { Row, Col, Modal, Button, Table, Space } from "antd";
import axios from "axios";
import {
  retrieveTypeOfFacility,
  retrieveFinancialYear,
  addHR,
} from "../../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class AgencyRegistration extends Component {
  constructor() {
    super();
    this.state = {
      states: [],
      obj: {
        nameHrAgency: "",
        contactNumber: 0,
        stateId: 0,
        landLineNumber: 0,
        statusOfState: 0,
        faxNumber: 0,
        emailIdContactPerson: "",
        empanelmentStatusId: 0,
        emailIdAgency: "",
        headOfficeAddress: "",
        url: "",
        newDateEndContract: "",
        nameContactPersonAgency: "",
        designation: "",
        additionalInfo: "",
      },
      errors: {},
      errorMsg: false,
      postMsg: false,
      postMsg1: false,
      stateSanction: 0,
      role: localStorage.getItem("access_role"),
      paramId: 0,
      value: 0,
      tableRows: [
        {
          id: 0,
          fromDate: "",
          toDate: "",
          address: "",
          // agencyRegistrationId: 0,
          // stateId: 0,
        },
      ],
    };
  }
  removeClick = (i) => {
    let tableRows = [...this.state.tableRows];
    tableRows.splice(i, 1);
    this.setState({ tableRows });
  };
  showConfirm(value) {
    confirm({
      title:
        value === "submit" ? "Do you Want to Submit?" : "Do you Want to Print?",
      content: "Are you Sure",
      onOk() {
        value === "print" ? window.print() : console.log("ok");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  componentDidMount() {
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      this.setState({ states: response.data });
    });
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      // console.log(this.props.history.location.state.value,'valuesssss')
      let value = this.props.history.location.state.value;
      this.setState({ paramId: paramId, value: value });
      axios({
        url: `${process.env.REACT_APP_API_URL}AgencyRegistrations/${paramId}`,
        method: "GET",
      }).then((response) => {
        console.log(response.data);
        this.setState({ obj: response.data });
      });
    }
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      obj: {
        ...this.state.obj,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  validateNational = () => {
    const { obj } = this.state;
    let errors = {};
    if (obj.nameHrAgency === "")
      errors.nameHrAgency = "Please enter the of HR agency.";
    if (obj.contactNumber === 0 || obj.contactNumber < 0)
      errors.contactNumber = "Please enter the contact number.";
    if (obj.landLineNumber === 0 || obj.landLineNumber < 0)
      errors.landLineNumber = "Please enter the landline number.";
    if (obj.stateId === 0) errors.stateId = "Please select State.";
    if (obj.faxNumber === 0 || obj.faxNumber < 0)
      errors.faxNumber = "Please enter fax number.";
    if (obj.emailIdContactPerson === "")
      errors.emailIdContactPerson = "Please enter email id.";
    if (obj.empanelmentStatusId === 0)
      errors.empanelmentStatusId = "Please select empanelment contract renew.";
    if (obj.emailIdAgency === "")
      errors.emailIdAgency = "Please enter email id.";
    if (obj.newDateEndContract === "")
      errors.newDateEndContract = "Please pick date.";
    if (obj.url === "") errors.url = "Please enter URL.";
    if (obj.nameContactPersonAgency === "")
      errors.nameContactPersonAgency =
        "Please enter name of contact person agency.";
    if (obj.headOfficeAddress === "")
      errors.headOfficeAddress = "Please enter head office address.";
    if (obj.designation === "") errors.designation = "Please enter designation.";
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateNational();
    console.log(errors, "errors");
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
      fetch("http://5.9.111.198:13880/api/AgencyRegistrations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.obj),
      }).then((resp) => {
        console.log("result", resp);
        this.setState({
          obj: {
            nameHrAgency: "",
            contactNumber: 0,
            stateId: 0,
            landLineNumber: 0,
            statusOfState: 0,
            faxNumber: 0,
            emailIdContactPerson: "",
            empanelmentStatusId: 0,
            emailIdAgency: "",
            headOfficeAddress: "",
            url: "",
            newDateEndContract: "",
            nameContactPersonAgency: "",
            designation: "",
            additionalInfo: "",
          },
          postMsg: true,
        });
        setTimeout(() => {
          this.setState({ postMsg: false });
        }, 10000);
      });
    } else {
      this.setState({ errors });
    }
  };
  validationState = () => {
    let errors = {};
    this.state.tableRows.map((obj) => {
      if (obj.fromDate === "") errors.fromDate = "Please pick date.";
      if (obj.toDate === "") errors.toDate = "Please pick date.";
      if (obj.address === "") errors.address = "Please enter date.";
    });
    return errors;
  };
  handleTable = (e, i) => {
    console.log(e, i);
    const { name, value } = e.target;
    let tableRows = [...this.state.tableRows];
    tableRows[i] = {
      ...tableRows[i],
      [name]: value,
      agencyRegistrationId: this.state.obj.id,
      stateId: this.state.obj.stateId,
    };
    this.setState({
      tableRows,
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  tableSubmit = (e) => {
    e.preventDefault();
    const errors = this.validationState();
    console.log(errors, "errors");
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
      this.state.tableRows.map((data, i) => {
        fetch(
          "http://5.9.111.198:13880/api/StatewiseDetailAgencyRegistrationTabs",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${config}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        ).then((resp) => {
          console.log("result", resp);
          this.setState({
            tableRows: [
              {
                id: 0,
                fromDate: "",
                toDate: "",
                address: "",
                // agencyRegistrationId: 0,
                // stateId: 0,
              },
            ],
            postMsg1: true,
          });
          setTimeout(() => {
            this.setState({ postMsg1: false });
          }, 10000);
        });
      });
    } else {
      this.setState({ errors });
    }
  };
  render() {
    const { obj, role, errors } = this.state;
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <h4>Agency Registration</h4>
                </div>
              </CCardHeader>
              <CCard>
                {this.state.postMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    {this.props.history.location.state ? (
                      <div>Updated Successfully</div>
                    ) : (
                      <div>Data save Successfully</div>
                    )}
                  </CAlert>
                ) : null}
                <CCardBody>
                  <CForm onSubmit={this.handleSubmit}>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Name of the HR Agency/Organisation</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              id="form"
                              name="nameHrAgency"
                              disabled
                              onChange={this.handleChange}
                              value={obj.nameHrAgency || ""}
                              invalid={errors.nameHrAgency ? true : false}
                            />
                            <FormFeedback>{errors.nameHrAgency}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Contact Number of the contact person agency</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              type="number"
                              value={obj.contactNumber || ""}
                              name="contactNumber"
                              onChange={this.handleChange}
                              invalid={errors.contactNumber ? true : false}
                            />
                            <FormFeedback>{errors.contactNumber}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Landline Number</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.landLineNumber || ""}
                              name="landLineNumber"
                              onChange={this.handleChange}
                              invalid={errors.landLineNumber ? true : false}
                            />
                            <FormFeedback>{errors.landLineNumber}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Fax No</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.faxNumber || ""}
                              name="faxNumber"
                              onChange={this.handleChange}
                              invalid={errors.faxNumber ? true : false}
                            />
                            <FormFeedback>{errors.faxNumber}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Email id(Agency)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="email"
                              value={obj.emailIdAgency || ""}
                              name="emailIdAgency"
                              onChange={this.handleChange}
                              invalid={errors.emailIdAgency ? true : false}
                            />
                            <FormFeedback>{errors.emailIdAgency}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Email id (Contact person)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="email"
                              value={obj.emailIdContactPerson || ""}
                              name="emailIdContactPerson"
                              onChange={this.handleChange}
                              invalid={
                                errors.emailIdContactPerson ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.emailIdContactPerson}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>URL</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.url || ""}
                              name="url"
                              onChange={this.handleChange}
                              invalid={errors.url ? true : false}
                            />
                            <FormFeedback>{errors.url}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Head office address</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              name="headOfficeAddress"
                              value={obj.headOfficeAddress || ""}
                              onChange={this.handleChange}
                              invalid={errors.headOfficeAddress ? true : false}
                            />
                            <FormFeedback>
                              {errors.headOfficeAddress}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Name of the contact person of agency</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.nameContactPersonAgency || ""}
                              name="nameContactPersonAgency"
                              onChange={this.handleChange}
                              invalid={
                                errors.nameContactPersonAgency ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.nameContactPersonAgency}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Designation of contact person of the agency</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.designation || ""}
                              name="designation"
                              onChange={this.handleChange}
                              invalid={errors.designation ? true : false}
                            />
                            <FormFeedback>{errors.designation}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Additional Information (if any)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.additionalInfo || ""}
                              name="additionalInfo"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="center"
                          disabled={this.state.value === 0 ? false : true}
                        >
                          {this.state.paramId ? "Update" : "Submit"}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          htmlType="submit"
                          disabled={this.state.value === 1 ? false : true}
                        >
                          Save
                        </Button>
                      </Col>
                      <Col>
                        <Button type="secondary">Edit</Button>
                      </Col>
                      <Col>
                        <Button>Download</Button>
                      </Col>
                      <Col>
                        <Button>Print</Button>
                      </Col>
                    </Row>
                  </CForm>
                </CCardBody>
                <CCardBody>
                  <CCardHeader>
                    <h5>State wise Empanelment Details </h5>
                  </CCardHeader>
                  <CForm onSubmit={this.tableSubmit}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Empanelled State/UT</th>
                          <th>Empanelment Status</th>
                          <th>Empanelment Form</th>
                          <th>Empanelment To</th>
                          <th>New Date of Contract Renewal</th>
                          <th>Office Address</th>
                          <th>Contact Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.tableRows.map((data, i) => {
                          return (
                            <tr>
                              <td>
                                <CFormGroup>
                                  <CSelect
                                    name="stateId"
                                    placeholder="Select"
                                    onChange={(e) => this.handleTable(e, i)}
                                    value={this.state.obj.stateId || ""}
                                    disabled
                                  >
                                    <option value="0">-Select-</option>
                                    {this.state.states &&
                                      this.state.states.map((user) => (
                                        <option key={user.id} value={user.id}>
                                          {user.name}
                                        </option>
                                      ))}
                                  </CSelect>
                                </CFormGroup>
                              </td>
                              <td>
                                <CFormGroup>
                                  <CSelect
                                    name="stateId"
                                    placeholder="Select"
                                    onChange={(e) => this.handleTable(e, i)}
                                    value={this.state.obj.stateId || ""}
                                  >
                                    <option value="0">-Select-</option>
                                    {/* {this.state.states &&
                                  this.state.states.map((user) => (
                                    <option key={user.id} value={user.id}>
                                      {user.name}
                                    </option>
                                  ))} */}
                                  </CSelect>
                                </CFormGroup>
                              </td>
                              <td>
                                <CFormGroup>
                                  <CInput
                                    type="date"
                                    name="toDate"
                                    placeholder="Select"
                                    onChange={(e) => this.handleTable(e, i)}
                                    value={data.toDate || ""}
                                    invalid={
                                      this.state.errors.toDate ? true : false
                                    }
                                  />
                                  <FormFeedback>
                                    {this.state.errors.toDate}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              <td>
                                <CFormGroup>
                                  <CInput
                                    type="date"
                                    name="toDate"
                                    placeholder="Select"
                                    onChange={(e) => this.handleTable(e, i)}
                                    value={data.toDate || ""}
                                    invalid={
                                      this.state.errors.toDate ? true : false
                                    }
                                  />
                                  <FormFeedback>
                                    {this.state.errors.toDate}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              <td>
                                <CFormGroup>
                                  <CInput
                                    type="date"
                                    name="newDate"
                                    placeholder="Select"
                                    onChange={(e) => this.handleTable(e, i)}
                                    value={data.newDate || ""}
                                    invalid={
                                      this.state.errors.toDate ? true : false
                                    }
                                  />
                                  <FormFeedback>
                                    {this.state.errors.toDate}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              <td>
                                <CFormGroup>
                                  <CInput
                                    name="address"
                                    onChange={(e) => this.handleTable(e, i)}
                                    value={data.address || ""}
                                    invalid={
                                      this.state.errors.address ? true : false
                                    }
                                  />
                                  <FormFeedback>
                                    {this.state.errors.address}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              <td>
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    name="contact"
                                    onChange={(e) => this.handleTable(e, i)}
                                    value={data.contact || ""}
                                    invalid={
                                      this.state.errors.address ? true : false
                                    }
                                  />
                                  <FormFeedback>
                                    {this.state.errors.address}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              {i === 0 ? null : (
                                <td>
                                  <CIcon
                                    name="cilXCircle"
                                    className="flex-shrink-0 me-2"
                                    width={20}
                                    height={20}
                                    onClick={() => this.removeClick(i)}
                                  />
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <Row>
                      <Button
                        color="primary"
                        style={{ marginTop: 0, marginBottom: 10 }}
                        onClick={() =>
                          this.setState({
                            tableRows: [
                              ...this.state.tableRows,
                              {
                                id: 0,
                                fromDate: "",
                                toDate: "",
                                address: "",
                                agencyRegistrationId: 0,
                                stateId: 0,
                              },
                            ],
                          })
                        }
                      >
                        Add Line
                      </Button>
                    </Row>
                    <Space>
                      <Col>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="center"
                          disabled={this.state.value === 1 ? false : true}
                        >
                          submit
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          htmlType="submit"
                          disabled={this.state.value === 1 ? false : true}
                        >
                          Save
                        </Button>
                      </Col>
                    </Space>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    typeFacilityList: state.apiadd.typeFacilityList,
    financialYearList: state.apiadd.financialYearList,
    hrList: state.apiadd.hrList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      addHR,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AgencyRegistration);
