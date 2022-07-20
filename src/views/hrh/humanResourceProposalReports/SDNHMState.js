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
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class SDNHMState extends Component {
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
        reportingFrom: "",
        reportingTo: "",
        stateId: 0,
        districtId: 0,
        typeOfServiceAssoc: 0,
        placeOfPostId: 0,
        typeOfFacilityOfficeId: 0,
        categoryofPostionId: 0,
        namePost: "",
        totalNoPosSanc: 0,
        totalNoPerPlac: 0,
        totalNumberofVactPos: 0,
        numberofPosRecutUnder: 0,
        remark: "",
      },
      errors: {},
      errorMsg: false,
      postMsg: false,
      postMsg1: false,
      stateSanction: 0,
      role: localStorage.getItem("access_role"),
      paramId: 0,
      typeFacility: [
        { id: "1", name: "CPMU" },
        { id: "2", name: "DPMU" },
        { id: "3", name: "BPMU" },
        { id: "4", name: "Others" },
      ],
      typeHealth: [
        { id: "1", name: "DH" },
        { id: "2", name: "SDH" },
        { id: "3", name: "CHC" },
        { id: "4", name: "UCHC" },
        { id: "5", name: "PHC" },
        { id: "6", name: "UPCHC" },
        { id: "7", name: "HSC" },
        { id: "8", name: "Others" },
      ],
    };
  }
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
    this.props.retrievePlaceOfPost();
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({ paramId: paramId });
      axios({
        url: `${process.env.REACT_APP_API_URL}RegularCadreSDs/${paramId}`,
        method: "GET",
      }).then((response) => {
        console.log(response.data);
        this.setState({ obj: response.data });
      });
    }
  }
  handleRadio2 = (e) => {
    this.setState({
      obj: {
        ...this.state.obj,
        typeOfServiceAssoc: e.target.value,
      },
      errors: {
        ...this.state.errors,
        typeOfServiceAssoc: "",
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
    if (obj.submissionDate === "")
      errors.submissionDate = "Please pick date of submission.";
    if (obj.financialYearId === 0)
      errors.financialYearId = "Please enter the financial year.";
    if (obj.reporting === "") errors.reporting = "Please enter reporting priod.";
    if (obj.stateId === 0) errors.stateId = "Please select State.";
    if (obj.districtId === 0) errors.districtId = "Please select District.";
    if (obj.typeOfServiceAssoc === 0)
      errors.typeOfServiceAssoc = "Please select Type of Service Association.";
    if (obj.placeOfPostId === 0)
      errors.placeOfPostId = "Please select place of post.";
    if (obj.typeOfFacilityOfficeId === 0)
      errors.typeOfFacilityOfficeId = "Please select type of facility.";
    if (obj.categoryofPostionId === 0)
      errors.categoryofPostionId = "Please select type of facility.";
    if (obj.namePost === "") errors.namePost = "Please enter name of post.";
    if (obj.totalNoPosSanc === 0)
      errors.totalNoPosSanc = "Please enter number of post sanction.";
    if (obj.totalNoPosSanc < 0)
      errors.totalNoPosSanc = "Please enter a valid number.";
    if (obj.totalNoPerPlac === 0 || obj.totalNoPerPlac < 0)
      errors.totalNoPerPlac = "Please enter Total Number of person in place.";
    if (obj.numberofOldSanc === 0 || obj.numberofOldSanc < 0)
      errors.numberofOldSanc = "Please enter number of old sanction.";
    if (obj.totalNumberofVactPos === 0 || obj.totalNumberofVactPos < 0)
      errors.totalNumberofVactPos =
        "Please enter total number of old position approve.";
    if (obj.numberofPosRecutUnder === 0 || obj.numberofPosRecutUnder < 0)
      errors.numberofPosRecutUnder = "Please enter number of post vacant.";
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
      if (this.state.paramId != 0) {
        fetch(
          `http://5.9.111.198:13880/api/RegularCadreSDs/${this.state.paramId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${config}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.obj),
          }
        ).then((resp) => {
          console.log("result", resp);
          this.setState({
            obj: {
              submissionDate: "",
              financialYearId: 0,
              reporting: "",
              stateId: 0,
              districtId: 0,
              typeOfServiceAssoc: 0,
              placeOfPostId: 0,
              typeOfFacilityOfficeId: 0,
              categoryofPostionId: 0,
              namePost: "",
              totalNoPosSanc: 0,
              totalNoPerPlac: 0,
              totalNumberofVactPos: 0,
              numberofPosRecutUnder: 0,
              remark: "",
            },
            postMsg: true,
            paramId: 0,
          });
          setTimeout(() => {
            this.setState({ postMsg: false });
          }, 10000);
        });
      } else {
        fetch("http://5.9.111.198:13880/api/RegularCadreSDs", {
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
              reporting: "",
              stateId: 0,
              districtId: 0,
              typeOfServiceAssoc: 0,
              placeOfPostId: 0,
              typeOfFacilityOfficeId: 0,
              categoryofPostionId: 0,
              namePost: "",
              totalNoPosSanc: 0,
              totalNoPerPlac: 0,
              totalNumberofVactPos: 0,
              numberofPosRecutUnder: 0,
              remark: "",
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
                  <h4>Service Delivery - NHM</h4>
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
                              <b> Reporting period</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Row gutter={20}>
                              <Col>
                                <CLabel htmlFor="text-input">From</CLabel>
                                <CInput
                                  type="date"
                                  value={
                                    obj.reportingFrom === ""
                                      ? obj.reportingFrom || ""
                                      : obj.reportingFrom.split("T")[0] || ""
                                  }
                                  name="reporting"
                                  onChange={this.handleChange}
                                  invalid={errors.reporting ? true : false}
                                />
                                <FormFeedback>{errors.reporting}</FormFeedback>
                              </Col>
                              <Col>
                                <CLabel htmlFor="text-input">To</CLabel>
                                <CInput
                                  type="date"
                                  value={
                                    obj.reportingTo === ""
                                      ? obj.reportingFrom || ""
                                      : obj.reportingFrom.split("T")[0] || ""
                                  }
                                  name="reportingTo"
                                  onChange={this.handleChange}
                                  invalid={errors.reportingTo ? true : false}
                                />
                                <FormFeedback>
                                  {errors.reportingTo}
                                </FormFeedback>
                              </Col>
                            </Row>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Number of person in place(from previously in
                                place)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.numberofPerson || ""}
                              name="numberofPerson"
                              onChange={this.handleChange}
                              invalid={errors.numberofPerson ? true : false}
                            />
                            <FormFeedback>{errors.numberofPerson}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Date of submitting Report</b>
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
                                obj.submissionDate === ""
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
                          <Col>
                            <CLabel>
                              <b>Number of new Recruitment</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.numberofnewRecr || ""}
                              name="numberofnewRecr"
                              onChange={this.handleChange}
                              invalid={errors.numberofnewRecr ? true : false}
                            />
                            <FormFeedback>
                              {errors.numberofnewRecr}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
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
                                        {`${new Date(
                                          item.fromDate
                                        ).getFullYear()}-${new Date(
                                          item.toDate
                                        ).getFullYear()}`}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect>
                            <FormFeedback>
                              {errors.financialYearId}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Total number of position in place (previously in
                                place + new recruitment)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={Number(obj.numberofPerson)+Number(obj.numberofnewRecr) || ""}
                              name="totalNoPostion"
                              disabled
                              invalid={errors.totalNoPostion ? true : false}
                            />
                            <FormFeedback>{errors.totalNoPostion}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
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
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Total number of vacant position in place (Total
                                sanctioned - Total in place)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalNoVaccantPostion || ""}
                              name="totalNoVaccantPostion"
                              onChange={this.handleChange}
                              invalid={
                                errors.totalNoVaccantPostion ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.totalNoVaccantPostion}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                    <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Program Type</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="programTypeId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.programTypeId || ""}
                              invalid={errors.programTypeId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              <option value="1">NHM</option>
                              <option value="2">NUHM</option>
                            </CSelect>
                            <FormFeedback>{errors.programTypeId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Break-up of vacant
                                position(UR/OBC/SC/ST/Others(please specify))
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.breakVaccantPostion || ""}
                              name="breakVaccantPostion"
                              onChange={this.handleChange}
                              invalid={
                                errors.breakVaccantPostion ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.breakVaccantPostion}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                    <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Enter City</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              name="cityId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.cityId || ""}
                              disabled={obj.programTypeId === 2 ? false : true}
                              invalid={errors.cityId ? true : false}
                            />
                            <FormFeedback>{errors.cityId}</FormFeedback>
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
                              value={obj.numberofPostionRecr || ""}
                              name="numberofPostionRecr"
                              onChange={this.handleChange}
                              invalid={
                                errors.numberofPostionRecr ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.numberofPostionRecr}
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
                              <b>Type of Post</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="typeOfPostId"
                              placeholder="Select"
                              onChange={this.handleChange}
                              value={obj.typeOfPostId || ""}
                              invalid={errors.typeOfPostId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              <option value="1">Service Delivery</option>
                              <option value="2">Program Management</option>
                            </CSelect>
                            <FormFeedback>{errors.placeOfPostId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
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
                              value={obj.amountApp || ""}
                              name="amountApp"
                              onChange={this.handleChange}
                              invalid={errors.amountApp ? true : false}
                            />
                            <FormFeedback>{errors.amountApp}</FormFeedback>
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
                              onChange={this.handleChange}
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
                              <b>
                                Total unspent amount (from previous financial
                                year) in INR
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.amountUnspent || ""}
                              name="amountUnspent"
                              onChange={this.handleChange}
                              invalid={errors.amountUnspent ? true : false}
                            />
                            <FormFeedback>{errors.amountUnspent}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
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
                              {this.state.typeFacility &&
                              obj.typeOfPostId === 2
                                ? this.state.typeFacility
                                    .map((item, i) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))
                                : this.state.typeHealth
                                    .map((item, i) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                            </CSelect>
                            <FormFeedback>
                              {errors.typeOfFacilityOfficeId}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
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
                              value={obj.amountRec || ""}
                              name="amountRec"
                              onChange={this.handleChange}
                              invalid={errors.amountRec ? true : false}
                            />
                            <FormFeedback>{errors.amountRec}</FormFeedback>
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
                              invalid={errors.exp ? true : false}
                            />
                            <FormFeedback>{errors.amountApp}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Total amount allotted in INR(unspent+received)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={Number(obj.amountRec)+Number(obj.amountUnspent) || ""}
                              name="amountApp"
                              disabled
                              // onChange={this.handleChange}
                              invalid={errors.amountApp ? true : false}
                            />
                            <FormFeedback>{errors.amountApp}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
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
                              invalid={
                                errors.categoryofPostionId ? true : false
                              }
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
                              value={obj.exp || ""}
                              name="exp"
                              onChange={this.handleChange}
                              invalid={errors.exp ? true : false}
                            />
                            <FormFeedback>{errors.amountApp}</FormFeedback>
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
                              value={obj.namePost || ""}
                              name="namePost"
                              onChange={this.handleChange}
                              invalid={errors.namePost ? true : false}
                            />
                            <FormFeedback>{errors.namePost}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Total balance amount in
                                INR(Approved-Expenditure) and
                                (Allotted-Expenditure)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={Number(obj.amountRec)+Number(obj.amountUnspent)-Number(obj.exp) || ""}
                              name="exp"
                              disabled
                              onChange={this.handleChange}
                              invalid={errors.exp ? true : false}
                            />
                            <FormFeedback>{errors.amountApp}</FormFeedback>
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
                                Total number of position
                                sanctioned(previously+new)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalNoPosSanc || ""}
                              name="totalNoPosSanc"
                              onChange={this.handleChange}
                              invalid={errors.totalNoPosSanc ? true : false}
                            />
                            <FormFeedback>{errors.totalNoPosSanc}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Remarks (if any)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.remark || ""}
                              name="remark"
                              onChange={this.handleChange}
                            />
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
    placeOfPostList: state.apiadd.placeOfPostList,
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
export default connect(mapStateToProps, mapDispatchToProps)(SDNHMState);
