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
} from "antd";
import axios from "axios";
import {
  retrieveTypeOfFacility,
  retrieveFinancialYear,
  addHR,
  retrievePlaceOfPost,
} from "../../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import isEqual from "lodash/isEqual";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class ContractualStaff extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      statuss: 0,
      states: [],
      catPos: [],
      errors: {},
      divisionArray: [],
      detailsArray: [],
      detailLastId: 0,
      districtCategory: [],
      obj: {
        submissionDate: "",
        financialYearId: 0,
        reporting: '',
        stateId:0,
        programTypeId:0,
        typeofPostId:0,
        placeOfPostId:0,
        typeOfFacilityOfficeId:0,
        fmr:0,
        categoryofPostionId:0,
        nameofPost:'',
        totalNoPositionApprov:0,
        numberofPersonPlace:0,
        numberofNewRecrt:0,
        totalNoPositionPlace:0,
        totalNumberofVactPos:0,
        breakupVacantPosition:0,
        numberofPosRecutUnder:0,
        totalAmountAprovINR:0,
        totalUnspentAmt:0,
        totalAmountRecevINR:0,
        totalAmtAllotINR:0,
        totalExpenINR:0,
        totalBalAmtINR:0,
      },
      errors: {},
      errorMsg: false,
      postMsg: false,
      postMsg1: false,
      stateSanction: 0,
      role: localStorage.getItem("access_role"),
      paramId: 0,
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
    this.props.retrievePlaceOfPost();
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
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
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({paramId:paramId})
    axios({
      url: `${process.env.REACT_APP_API_URL}ContractualStaffs/${paramId}`,
      method: "GET",
    }).then((response) => {
      console.log(response.data)
      this.setState({ obj: response.data });
    });
  }
  }
  handleRadio2 = (e) => {
    this.setState({
      obj: {
        ...this.state.obj,
        programTypeId: e.target.value,
      },
      errors: {
        ...this.state.errors,
        programTypeId: "",
      },
    });
  };
  handleRadio3 = (e) => {
    this.setState({
      obj: {
        ...this.state.obj,
        typeofPostId: e.target.value,
      },
      errors: {
        ...this.state.errors,
        typeofPostId: "",
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
    if (obj.submissionDate == "")
      errors.submissionDate = "Please pick date of submission.";
    if (obj.financialYearId == 0)
      errors.financialYearId = "Please enter the financial year.";
    if (obj.reporting == "")
      errors.reporting = "Please enter reporting priod.";
    if (obj.stateId == 0) errors.stateId = "Please select State.";
    if (obj.programTypeId == 0)
      errors.programTypeId = "Please enter program type.";
    if (obj.typeofPostId == 0) errors.typeofPostId = "Please select type of post.";
    if (obj.placeOfPostId == 0)
      errors.placeOfPostId = "Please select place of Post.";
    if (obj.typeOfFacilityOfficeId == 0) errors.typeOfFacilityOfficeId = "Please select type of Facility Office.";
    if (obj.categoryofPostionId == 0)
      errors.categoryofPostionId = "Please select category of postion.";
    if (obj.fmr == 0 || obj.fmr < 0) errors.fmr = "Please enter FMR number.";
    if (obj.numberofPersonPlace == 0)
      errors.numberofPersonPlace = "Please enter number of person in place.";
    if (obj.numberofPersonPlace < 0)
      errors.numberofPersonPlace = "Please enter a valid number.";
    if (obj.numberofNewRecrt == 0 || obj.numberofNewRecrt < 0)
      errors.numberofNewRecrt = "Please enter number of new recruitment.";
    if (obj.totalNoPositionPlace == 0 || obj.totalNoPositionPlace < 0)
      errors.totalNoPositionPlace = "Please enter total number of position in place.";
    if (obj.totalNumberofVactPos == 0 || obj.totalNumberofVactPos < 0)
      errors.totalNumberofVactPos =
        "Please enter total number of vacant position.";
    if (obj.numberofPostVaccant == 0 || obj.numberofPostVaccant < 0)
      errors.numberofPostVaccant = "Please enter number of post vacant.";
    if (obj.nameofPost == "") errors.nameofPost = "Please enter name of post.";
    if (
      obj.totalNoPositionApprov == 0 ||
      obj.totalNoPositionApprov < 0
    )
      errors.totalNoPositionApprov = "Please enter total position approved INR.";
      if (
        obj.totalAmountAprovINR == 0 ||
        obj.totalAmountAprovINR < 0 ||
        obj.totalAmountAprovINR.length > 10
      )
        errors.totalAmountAprovINR = "Please enter total amount approved INR.";
    if (obj.breakupVacantPosition == 0 || obj.breakupVacantPosition < 0)
      errors.breakupVacantPosition = "Please enter break up vacant position.";
      if (obj.numberofPosRecutUnder == 0 || obj.numberofPosRecutUnder < 0)
      errors.numberofPosRecutUnder = "Please enter number of post recruitment is under process.";
      if (obj.totalUnspentAmt == 0 || obj.totalUnspentAmt < 0 || obj.totalUnspentAmt.length > 10)
      errors.totalUnspentAmt = "Please enter total unspent amount.";
      if (obj.totalAmountRecevINR == 0 || obj.totalAmountRecevINR < 0 || obj.totalAmountRecevINR.length > 10)
      errors.totalAmountRecevINR = "Please enter total amount received in INR.";
      if (obj.totalAmtAllotINR == 0 || obj.totalAmtAllotINR < 0 || obj.totalAmtAllotINR.length > 10)
      errors.totalAmtAllotINR = "Please enter total amount alot in INR.";
      if (obj.totalExpenINR == 0 || obj.totalExpenINR < 0 || obj.totalExpenINR.length >10 )
      errors.totalExpenINR = "Please enter total expenditure done in INR.";
      if (obj.totalBalAmtINR == 0 || obj.totalBalAmtINR < 0 ||obj.totalBalAmtINR.length > 10)
      errors.totalBalAmtINR = "Please enter total balance amount in INR.";
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
      if(this.state.paramId !=0){
        fetch(`http://5.9.111.198:13880/api/ContractualStaffs/${this.state.paramId}`, {
        method: "PUT",
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
            submissionDate: "",
            financialYearId: 0,
            reporting: '',
            stateId:0,
            programTypeId:0,
            typeofPostId:0,
            placeOfPostId:0,
            typeOfFacilityOfficeId:0,
            fmr:0,
            categoryofPostionId:0,
            nameofPost:'',
            totalNoPositionApprov:0,
            numberofPersonPlace:0,
            numberofNewRecrt:0,
            totalNoPositionPlace:0,
            totalNumberofVactPos:0,
            breakupVacantPosition:0,
            numberofPosRecutUnder:0,
            totalAmountAprovINR:0,
            totalUnspentAmt:0,
            totalAmountRecevINR:0,
            totalAmtAllotINR:0,
            totalExpenINR:0,
            totalBalAmtINR:0,
          },
          postMsg: true,
          paramId:0,
        });
        setTimeout(() => {
          this.setState({ postMsg: false });
        }, 10000);
      });
      }else{
      fetch("http://5.9.111.198:13880/api/ContractualStaffs", {
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
            submissionDate: "",
            financialYearId: 0,
            reporting: '',
            stateId:0,
            programTypeId:0,
            typeofPostId:0,
            placeOfPostId:0,
            typeOfFacilityOfficeId:0,
            fmr:0,
            categoryofPostionId:0,
            nameofPost:'',
            totalNoPositionApprov:0,
            numberofPersonPlace:0,
            numberofNewRecrt:0,
            totalNoPositionPlace:0,
            totalNumberofVactPos:0,
            breakupVacantPosition:0,
            numberofPosRecutUnder:0,
            totalAmountAprovINR:0,
            totalUnspentAmt:0,
            totalAmountRecevINR:0,
            totalAmtAllotINR:0,
            totalExpenINR:0,
            totalBalAmtINR:0,
          },
          postMsg: true,
        });
        setTimeout(() => {
          this.setState({ postMsg: false });
        }, 10000);
      });
    }
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
                  <h4>Contractual Staff</h4>
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
                              <b>Date of submission</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              id="form"
                              name="submissionDate"
                              type="date"
                              placeholder="Date"
                              onChange={this.handleChange}
                              value={
                                obj.submissionDate == ""
                                  ? obj.submissionDate || ""
                                  : obj.submissionDate.split("T")[0] || ""
                              }
                              invalid={errors.submissionDate ? true : false}
                            />
                            <FormFeedback>{errors.submissionDate}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="financialYearId"
                              value={obj.financialYearId || ""}
                              invalid={errors.financialYearId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.financialYearList &&
                                this.props.financialYearList.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                        {/* {`${
                                          item.fromDate.split("T")[0]
                                        } -From Date  `}
                                        {`${
                                          item.toDate.split("T")[0]
                                        } -To Date`} */}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect>
                            <FormFeedback>{errors.financialYearId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Reporting period</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.reporting || ""}
                              name="reporting"
                              onChange={this.handleChange}
                              invalid={errors.reporting ? true : false}
                            />
                            <FormFeedback>{errors.reporting}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> State/UT</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="stateId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.stateId || ""}
                              invalid={errors.stateId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.states &&
                                this.state.states.map((user) => (
                                  <option key={user.id} value={user.id}>
                                    {user.name}
                                  </option>
                                ))}
                            </CSelect>
                            <FormFeedback>{errors.stateId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Program Type</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              value={obj.programTypeId==0?obj.programTypeId:obj.programTypeId.toString() || ''}
                              onChange={this.handleRadio2}
                              name="programTypeId"
                            >
                              <Radio value="1">NHM</Radio>
                              <Radio value="2">NUHM</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display:
                                  errors.programTypeId == "" ? "none" : "block",
                              }}
                            >
                              {errors.programTypeId}
                            </span>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Type of Post</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              value={obj.typeofPostId==0?obj.typeofPostId:obj.typeofPostId.toString() || ""}
                              onChange={this.handleRadio3 }
                              name="typeofPostId"
                            >
                              <Radio value="1">SD</Radio>
                              <Radio value="2">PM</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display:
                                  errors.typeofPostId == "" ? "none" : "block",
                              }}
                            >
                              {errors.typeofPostId}
                            </span>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Place of Post</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="placeOfPostId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.placeOfPostId || ""}
                              invalid={errors.placeOfPostId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.placeOfPostList &&
                                this.props.placeOfPostList.map((user) => (
                                  <option key={user.id} value={user.id}>
                                    {user.name}
                                  </option>
                                ))}
                            </CSelect>
                            <FormFeedback>{errors.placeOfPostId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Type of Office / facility</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="typeOfFacilityOfficeId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.typeOfFacilityOfficeId || ""}
                              invalid={
                                errors.typeOfFacilityOfficeId ? true : false
                              }
                            >
                              <option value="0">-Select-</option>
                              {this.props.typeFacilityList &&
                                this.props.typeFacilityList.map((item, i) => (
                                  <option key={item.id} value={item.id}>
                                    {item.facilityType}
                                  </option>
                                ))}
                            </CSelect>
                            <FormFeedback>
                              {errors.typeOfFacilityOfficeId}
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
                              <b>FMR Number</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.fmr || ""}
                              name="fmr"
                              onChange={this.handleChange}
                              invalid={errors.fmr ? true : false}
                            />
                            <FormFeedback>{errors.fmr}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Category of Post</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="categoryofPostionId"
                              value={obj.categoryofPostionId || ""}
                              invalid={errors.categoryofPostionId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.catPos &&
                                this.state.catPos.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.categoryName}
                                    </option>
                                  );
                                })}
                            </CSelect>
                            <FormFeedback>
                              {errors.categoryofPostionId}
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
                              <b>Name of the Post</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.nameofPost || ""}
                              name="nameofPost"
                              onChange={this.handleChange}
                              invalid={errors.nameofPost ? true : false}
                            />
                            <FormFeedback>{errors.nameofPost}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Total number of position approved (previously +
                                new)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalNoPositionApprov || ""}
                              name="totalNoPositionApprov"
                              onChange={this.handleChange}
                              invalid={
                                errors.totalNoPositionApprov ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.totalNoPositionApprov}
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
                              <b>
                                Number of person in place(from previously
                                inplace)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.numberofPersonPlace || ""}
                              name="numberofPersonPlace"
                              onChange={this.handleChange}
                              invalid={errors.numberofPersonPlace ? true : false}
                            />
                            <FormFeedback>{errors.numberofPersonPlace}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Number of new recruitment</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              name="numberofNewRecrt"
                              value={obj.numberofNewRecrt || ""}
                              onChange={this.handleChange}
                              invalid={errors.numberofNewRecrt ? true : false}
                            />
                            <FormFeedback>
                              {errors.numberofNewRecrt}
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
                              <b>
                                Total number of Position in place (previously
                                inplace + new recruitment)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalNoPositionPlace || ""}
                              name="totalNoPositionPlace"
                              disabled={role == "admin_role" ? false : true}
                              onChange={this.handleChange}
                              invalid={
                                errors.totalNoPositionPlace ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.totalNoPositionPlace}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Total number of vacant position (Total
                                sanctioned- Total Inplace)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalNumberofVactPos || ""}
                              name="totalNumberofVactPos"
                              onChange={this.handleChange}
                              invalid={
                                errors.totalNumberofVactPos ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.totalNumberofVactPos}
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
                              <b>
                                Break-up of vacant position (UR/OBC/SC/ST/Others
                                (Please specify)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.breakupVacantPosition || ""}
                              name="breakupVacantPosition"
                              onChange={this.handleChange}
                              invalid={
                                errors.breakupVacantPosition ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.breakupVacantPosition}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Number of position which recruitment is under
                                process
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.numberofPosRecutUnder || ""}
                              name="numberofPosRecutUnder"
                              onChange={this.handleChange}
                              disabled={role == "admin_role" ? false : true}
                              invalid={
                                errors.numberofPosRecutUnder ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.numberofPosRecutUnder}
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
                              <b>Total amount approved in INR</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalAmountAprovINR || ""}
                              name="totalAmountAprovINR"
                              onChange={this.handleChange}
                              invalid={errors.totalAmountAprovINR ? true : false}
                            />
                            <FormFeedback>
                              {errors.totalAmountAprovINR}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Total unspent amount (from previous financial
                                year) in INR
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalUnspentAmt || ""}
                              name="totalUnspentAmt"
                              onChange={this.handleChange}
                              invalid={errors.totalUnspentAmt ? true : false}
                            />
                            <FormFeedback>
                              {errors.totalUnspentAmt}
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
                              <b>Total amount received in INR</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalAmountRecevINR || ""}
                              name="totalAmountRecevINR"
                              onChange={this.handleChange}
                              invalid={errors.totalAmountRecevINR ? true : false}
                            />
                            <FormFeedback>
                              {errors.totalAmountRecevINR}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Total amount allotted in INR(unspent + received)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalAmtAllotINR || ""}
                              name="totalAmtAllotINR"
                              onChange={this.handleChange}
                              invalid={
                                errors.totalAmtAllotINR ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.totalAmtAllotINR}
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
                              <b>Total expenditure done in INR</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalExpenINR || ""}
                              name="totalExpenINR"
                              onChange={this.handleChange}
                              invalid={errors.totalExpenINR ? true : false}
                            />
                            <FormFeedback>{errors.totalExpenINR}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Total balance amount in INR
                                (Approved-expenditure) and (Allotted-
                                expenditure)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalBalAmtINR || ""}
                              name="totalBalAmtINR"
                              onChange={this.handleChange}
                              invalid={
                                errors.totalBalAmtINR ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.totalBalAmtINR}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="center"
                          >
                            {this.state.paramId ? "Update" : "Submit"}
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button htmlType="submit">Save</Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button type="secondary">Edit</Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button>Download</Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button>Print</Button>
                        </Form.Item>
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
    placeOfPostList:state.apiadd.placeOfPostList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      addHR,
      retrievePlaceOfPost,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContractualStaff);
