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
  CInputRadio,
} from "@coreui/react";
import {
  Form,
  Row,
  Select,
  Col,
  Input,
  Modal,
  Radio,
  Button,
  Tabs,
  Table,
} from "antd";
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
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class Quarterly extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      statuss: 0,
      states: [],
      catPos: [],
      errors: {},
      tableRowsDetails: [],
      statusArray: [
        { id: "1", name: "Draft" },
        { id: "2", name: "Pending Approval" },
        { id: "3", name: "Need Clarification" },
        { id: "4", name: "Approved" },
        { id: "5", name: "Rejected" },
      ],
      divisionArray: [],
      detailsArray: [],
      detailLastId: 0,
      districtCategory: [],
      obj: {
        submission: "",
        financialYear: 0,
        typeofApproval: 0,
        number: 0,
        stateId: 0,
        numberOfDivDist: 0,
        districtCategoryId: 0,
        divsionId: 0,
        programType: 0,
        typeofPost: 0,
        categoryofPostion: 0,
        numberofNewPostion: 0,
        fmr: 0,
        numberofPostSanc: 0,
        numberofNewPost: 0,
        numberofOldSanc: 0,
        totalNoPostionApprov: 0,
        numberofPostVaccant: 0,
        nameofPost: "",
        totalBudgetAprrINR: 0,
        placeofPostId: 0,
        sacnctionPost: 0,
        divisionId: 0,
        districtId: 0,
        typeofFacilityOfficeId: 0,
      },
      errors: {},
      errorMsg: false,
      postMsg: false,
      postMsg1: false,
      stateSanction: 0,
      role: localStorage.getItem("access_role"),
      reserveOptions: ["A", "B"],
      checkedList: ["A"],
      placeOfPosition: 0,
      placeOfPositionArray: [
        { id: "1", name: "State" },
        { id: "2", name: "District" },
        { id: "3", name: "Division" },
      ],
      paramId: 0,
      tableRows: [],
      columns: [
        {
          title: " Advertisement ID Number",
          colSpan: 2,
          dataIndex: "id",
          key: "id",
          render: (text, object, i) => (
            <CFormGroup>
              <CInput placeholder={i + 1} type="number" readOnly />
            </CFormGroup>
          ),
        },
        {
          title: "Name of State",
          colSpan: 2,
          dataIndex: "stateId",
          key: "stateId",
          render: (text, data, i) => (
            <CFormGroup>
              <CSelect
                name="stateId"
                placeholder="Select"
                onChange={(e) => this.handleTablePlace(e, i)}
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
          ),
        },
        {
          title: "Name of District",
          dataIndex: "placeofPostId",
          colSpan: 2,
          key: "placeofPostId",
          render: (text, data, i) => (
            <CFormGroup>
              <CInput type="date" />
              <FormFeedback>{this.state.errors.fromDate}</FormFeedback>
            </CFormGroup>
          ),
        },
        {
          title: "Type of vacancy",
          dataIndex: "placeofPostId",
          colSpan: 2,
          key: "placeofPostId",
          render: (text, data, i) => (
            <CFormGroup>
              <CInput type="date" />
              <FormFeedback>{this.state.errors.fromDate}</FormFeedback>
            </CFormGroup>
          ),
        },
        {
          title: "Name of post",
          dataIndex: "placeofPostId",
          colSpan: 2,
          key: "placeofPostId",
          render: (text, data, i) => (
            <CFormGroup>
              <CInput />
              <FormFeedback>{this.state.errors.fromDate}</FormFeedback>
            </CFormGroup>
          ),
        },
        {
          title: "Number of vacancy",
          dataIndex: "placeofPostId",
          colSpan: 2,
          key: "placeofPostId",
          render: (text, data, i) => (
            <CFormGroup>
              <CInput />
              <FormFeedback>{this.state.errors.fromDate}</FormFeedback>
            </CFormGroup>
          ),
        },
        {
          title: "Status on the advertisment published",
          rowSpan: 2,
          dataIndex: "",
          key: "",
        },
        {
          title: "Date of Issues",
          dataIndex: "",
          key: "",
        },
        {
          title: "Closing Date",
          dataIndex: "",
          key: "",
        },
        {
          title: "Status on the corrigendum issued if any",
          rowSpan: 3,
          dataIndex: "",
          key: "",
        },
        {
          title: "Issued Yes/No",
          dataIndex: "",
          key: "",
        },
        {
          title: "If Yes how many times(in number)",
          dataIndex: "",
          key: "",
        },
        {
          title: "Date of issued",
          dataIndex: "",
          key: "",
        },
      ],
    };
  }
  showConfirm(value) {
    confirm({
      title:
        value == "submit" ? "Do you Want to Submit?" : "Do you Want to Print?",
      content: "Are you Sure",
      onOk() {
        value == "print" ? window.print() : console.log("ok");
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
    axios({
      url: `${process.env.REACT_APP_API_URL}CatgoryofPositions`,
      method: "GET",
    }).then((response) => {
      this.setState({ catPos: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Districts`,
      method: "GET",
    }).then((response) => {
      this.setState({ districtCategory: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Divisions`,
      method: "GET",
    }).then((response) => {
      this.setState({ divisionArray: response.data });
    });
  }
  handleRadio2 = (e) => {
    this.setState({
      obj: {
        ...this.state.obj,
        programType: e.target.value,
      },
    });
  };
  handleRadio3 = (e) => {
    this.setState({
      obj: {
        ...this.state.obj,
        typeofPost: e.target.value,
      },
    });
  };
  handleChange = (e) => {
    console.log(e.target.value);
    const { obj } = this.state;
    this.setState({
      obj: {
        ...this.state.obj,
        [e.target.name]: e.target.value,
        totalNoPostionApprov:
          Number(obj.numberofPostSanc) + Number(obj.numberofNewPostion),
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
    if (obj.submission == "")
      errors.submission = "Please pick date of submission.";
    if (obj.financialYear == 0)
      errors.financialYear = "Please enter the financial year.";
    if (obj.typeofApproval == "")
      errors.typeofApproval = "Please select Type of Approval.";
    if (obj.stateId == 0) errors.stateId = "Please select State.";
    if (obj.numberOfDivDist == "")
      errors.numberOfDivDist = "Please enter Division.";
    // if (obj.districtCategoryId == 0)
    //   errors.districtCategoryId = "Please select District.";
    if (obj.divsionId == "") errors.divsionId = "Please select Division.";
    if (obj.programType == 0)
      errors.programType = "Please select programe type.";
    if (obj.typeofPost == 0) errors.typeofPost = "Please select type of post.";
    if (obj.categoryofPostion == 0)
      errors.categoryofPostion = "Please select category of post.";
    if (obj.fmr == 0 || obj.fmr < 0) errors.fmr = "Please enter FMR number.";
    if (obj.numberofPostSanc == 0)
      errors.numberofPostSanc = "Please enter number of post sanction.";
    if (obj.numberofPostSanc < 0)
      errors.numberofPostSanc = "Please enter a valid number.";
    if (obj.numberofNewPost == 0 || obj.numberofNewPost < 0)
      errors.numberofNewPost = "Please enter number of new post.";
    if (obj.numberofOldSanc == 0 || obj.numberofOldSanc < 0)
      errors.numberofOldSanc = "Please enter number of old sanction.";
    if (obj.totalNoPostionApprov == 0 || obj.totalNoPostionApprov < 0)
      errors.totalNoPostionApprov =
        "Please enter total number of old position approve.";
    if (obj.numberofPostVaccant == 0 || obj.numberofPostVaccant < 0)
      errors.numberofPostVaccant = "Please enter number of post vacant.";
    if (obj.nameofPost == "") errors.nameofPost = "Please enter name of post.";
    if (
      obj.totalBudgetAprrINR == 0 ||
      obj.totalBudgetAprrINR < 0 ||
      obj.totalBudgetAprrINR.length > 10
    )
      errors.totalBudgetAprrINR = "Please enter total budget INR.";
    if (obj.numberofNewPostion == 0 || obj.numberofNewPostion < 0)
      errors.numberofNewPostion = "Please enter number of new position.";
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateNational();
    console.log(errors, "errors");
    if (Object.keys(errors).length == 0) {
      this.setState({
        errors: {},
      });
      fetch("http://5.9.111.198:13880/api/agencyRegistration", {
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
            submission: "",
            financialYear: 0,
            typeofApproval: 0,
            number: 0,
            stateId: 0,
            numberOfDivDist: 0,
            districtCategoryId: 0,
            divsionId: 0,
            programType: 0,
            typeofPost: 0,
            categoryofPostion: 0,
            fmr: 0,
            numberofPostSanc: 0,
            numberofNewPost: 0,
            numberofOldSanc: 0,
            totalNoPostionApprov: 0,
            numberofPostVaccant: 0,
            nameofPost: "",
            totalBudgetAprrINR: 0,
            placeofPostId: 0,
            sacnctionPost: 0,
            divisionId: 0,
            districtId: 0,
            typeofFacilityOfficeId: 0,
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
                  <h4>Recruitment Status Report (Quarterly)</h4>
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
                              <b>Reporting Priod</b>
                            </CLabel>
                          </Col>
                          <CRow>
                            <Col span={12}>
                              <span style={{ marginLeft: 12 }}>From</span>
                              <Col>
                                <CInput
                                  id="form"
                                  type="date"
                                  name="submission"
                                  onChange={this.handleChange}
                                  value={
                                    obj.submission == ""
                                      ? obj.submission || ""
                                      : obj.submission.split("T")[0] || ""
                                  }
                                  invalid={errors.submission ? true : false}
                                />
                                <FormFeedback>{errors.submission}</FormFeedback>
                              </Col>
                            </Col>
                            <Col span={12}>
                              <span style={{ marginLeft: 12 }}>To</span>
                              <Col>
                                <CInput
                                  id="form"
                                  type="date"
                                  name="submission"
                                  onChange={this.handleChange}
                                  value={
                                    obj.submission == ""
                                      ? obj.submission || ""
                                      : obj.submission.split("T")[0] || ""
                                  }
                                  invalid={errors.submission ? true : false}
                                />
                                <FormFeedback>{errors.submission}</FormFeedback>
                              </Col>
                            </Col>
                          </CRow>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Name of the HR Empanelment Agency</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              disabled
                              value={obj.reportingPriod || ""}
                              name="reportingPriod"
                              onChange={this.handleChange}
                            />
                            <FormFeedback>{errors.financialYear}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Address of HR Agency</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput />
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Contact Details of HR Agency</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.reportingPriod || ""}
                              name="reportingPriod"
                              onChange={this.handleChange}
                            />
                            <FormFeedback>{errors.reportingPriod}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Landline Number (STD Code plus Number)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.landlineNo || ""}
                              name="landlineNo"
                              onChange={this.handleChange}
                              invalid={errors.landlineNo ? true : false}
                            />
                            <FormFeedback>{errors.landlineNo}</FormFeedback>
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
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Name of the States</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="stateId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.stateId || ""}
                            >
                              <option value="0">-Select-</option>
                              {this.state.states &&
                                this.state.states.map((user) => (
                                  <option key={user.id} value={user.id}>
                                    {user.name}
                                  </option>
                                ))}
                            </CSelect>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Select the Type of Vacnacy</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="stateId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.stateId || ""}
                            >
                              <option value="0">-Select-</option>
                              {this.props.typeOfVacancyList &&
                                this.props.typeOfVacancyList.map((user) => (
                                  <option key={user.id} value={user.id}>
                                    {user.name}
                                  </option>
                                ))}
                            </CSelect>
                            <FormFeedback>{errors.reportingPriod}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th rowSpan={2}>Advertisement ID Number</th>
                          <th rowSpan={2}>Name of State</th>
                          <th rowSpan={2}>Name of District</th>
                          <th rowSpan={2}>Type of Vacancy</th>
                          <th rowSpan={2}>Name of Post</th>
                          <th rowSpan={2}>Number of Vacancy</th>
                          <th colSpan={2} style={{textAlign:'center'}}>
                            Status on the advertisement published
                          </th>
                          <th colSpan={3} style={{textAlign:'center'}}>
                            Status on the Corrigendum issued if any
                          </th>
                        </tr>
                        <tr>
                          <th>Dates of issued</th>
                          <th>Closing Date</th>
                          <th>Issued Yes/No</th>
                          <th>If yes, how many times (in Nos.)</th>
                          <th>Dates of issued</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <CFormGroup>
                              <CInput
                                // placeholder={i + 1}
                                type="number"
                                readOnly
                              />
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                              <CSelect
                                name="stateId"
                                placeholder="Select"
                                onChange={(e) => this.handleTablePlace(e)}
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
                                name="districtId"
                                placeholder="Select"
                                onChange={(e) => this.handleTablePlace(e)}
                                value={this.state.obj.stateId || ""}
                                disabled
                              >
                                <option value="0">-Select-</option>
                                {this.state.districtCategory &&
                                  this.state.districtCategory.map((user) => (
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
                                name="typeVacancyId"
                                placeholder="Select"
                                onChange={(e) => this.handleTablePlace(e)}
                                value={this.state.obj.stateId || ""}
                                disabled
                              >
                                <option value="0">-Select-</option>
                                {this.state.districtCategory &&
                                  this.state.districtCategory.map((user) => (
                                    <option key={user.id} value={user.id}>
                                      {user.name}
                                    </option>
                                  ))}
                              </CSelect>
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                              <CInput
                                name="nameofPost"
                                value={this.state.obj.nameofPost}
                              />
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                              <CInput
                                type="number"
                                name="noVacancy"
                                value={this.state.obj.noVacancy}
                              />
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                              <CInput
                                type="number"
                                name="noVacancy"
                                value={this.state.obj.noVacancy}
                              />
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                              <CInput
                                type="number"
                                name="noVacancy"
                                value={this.state.obj.noVacancy}
                              />
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                              <CInput
                                type="number"
                                name="noVacancy"
                                value={this.state.obj.noVacancy}
                              />
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                              <CInput
                                type="number"
                                name="noVacancy"
                                value={this.state.obj.noVacancy}
                              />
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                              <CInput
                                type="number"
                                name="noVacancy"
                                value={this.state.obj.noVacancy}
                              />
                            </CFormGroup>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th colSpan={3} style={{textAlign:'center'}}>
                            Status on the Corrigendum issued if any
                          </th>
                          <th colSpan={6} style={{textAlign:'center'}}>
                            Status on applications and selection (in numbers)
                          </th>
                        </tr>
                        <tr>
                          <th>Closing date changed(Yes / No)</th>
                          <th>If Yes, the new date of advertisement closing</th>
                          <th>Reasons for issuing Corrigendum</th>
                          <th>Received</th>
                          <th>Shortlisted</th>
                          <th>Selected</th>
                          <th>Offer Letter Issued</th>
                          <th>Joined</th>
                          <th>Nos. of Waitlist candidates</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th width="16.66%" rowSpan={2}>
                            Number of Vacancy after joining process completion
                          </th>
                          <th width="16.66%" rowSpan={2}>
                            Reason of vacancy after completing the process
                          </th>
                          <th width="16.66%" rowSpan={2}>
                            Total numbers of days to the process i.e. issuing
                            advertisement to completion of joining process
                          </th>
                          <th width="16.66%"style={{textAlign:'center'}} colSpan={3}>Status on Payment</th>
                        </tr>
                        <tr>
                          <th width="16.66%">Payment Done</th>
                          <th width="16.66%">In-Process</th>
                          <th width="16.66%">Bill not Submitted</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <CFormGroup>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                            </CFormGroup>
                          </td>
                          <td>
                            <CFormGroup>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                            </CFormGroup>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Any Feedback or remarks</b>
                            </CLabel>
                          </Col>
                          <Col>
                           <CInput />
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
                        >
                          {this.state.paramId ? "Update" : "Submit"}
                        </Button>
                      </Col>
                      <Col>
                        <Button htmlType="submit">Save</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Quarterly);
