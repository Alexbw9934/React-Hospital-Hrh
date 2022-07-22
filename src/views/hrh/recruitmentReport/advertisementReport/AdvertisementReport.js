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
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  retrieveTypeOfFacility,
  retrieveFinancialYear,
  addHR,
  retrievePlaceOfPost,
  retrieveProgramType,
} from "../../../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class AdvertisementReport extends Component {
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
    this.props.retrievePlaceOfPost();
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveProgramType();
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
    if (obj.submissionDate == "")
      errors.submissionDate = "Please pick date of submission.";
    if (obj.financialYearId == 0)
      errors.financialYearId = "Please enter the financial year.";
    if (obj.reporting == "") errors.reporting = "Please enter reporting priod.";
    if (obj.stateId == 0) errors.stateId = "Please select State.";
    if (obj.districtId == 0) errors.districtId = "Please select District.";
    if (obj.typeOfServiceAssoc == 0)
      errors.typeOfServiceAssoc = "Please select Type of Service Association.";
    if (obj.placeOfPostId == 0)
      errors.placeOfPostId = "Please select place of post.";
    if (obj.typeOfFacilityOfficeId == 0)
      errors.typeOfFacilityOfficeId = "Please select type of facility.";
    if (obj.categoryofPostionId == 0)
      errors.categoryofPostionId = "Please select type of facility.";
    if (obj.namePost == "") errors.namePost = "Please enter name of post.";
    if (obj.totalNoPosSanc == 0)
      errors.totalNoPosSanc = "Please enter number of post sanction.";
    if (obj.totalNoPosSanc < 0)
      errors.totalNoPosSanc = "Please enter a valid number.";
    if (obj.totalNoPerPlac == 0 || obj.totalNoPerPlac < 0)
      errors.totalNoPerPlac = "Please enter Total Number of person in place.";
    if (obj.numberofOldSanc == 0 || obj.numberofOldSanc < 0)
      errors.numberofOldSanc = "Please enter number of old sanction.";
    if (obj.totalNumberofVactPos == 0 || obj.totalNumberofVactPos < 0)
      errors.totalNumberofVactPos =
        "Please enter total number of old position approve.";
    if (obj.numberofPosRecutUnder == 0 || obj.numberofPosRecutUnder < 0)
      errors.numberofPosRecutUnder = "Please enter number of post vacant.";
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
  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.errors("file is must less than 2MB");
    }
    return false;
  };
  handleUpload = (e) => {
    this.setState({
      fileUpload: e.fileList,
    });
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
                  <h4>Advertisement Status Report</h4>
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
                                    obj.reportingFrom == ""
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
                                    obj.reportingTo == ""
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
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Date of Report Submission</b>
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
                              <b>Name of division</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="divisionId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.divisionId || ""}
                              invalid={errors.divisionId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.divisionArray &&
                                this.state.divisionArray.map((user) => (
                                  <option key={user.id} value={user.id}>
                                    {user.name}
                                  </option>
                                ))}
                            </CSelect>
                            <FormFeedback>{errors.divisionId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Name of the State/UT</b>
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
                              <b>Type of Health Program</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="healthProgramId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.healthProgramId || ""}
                              invalid={errors.healthProgramId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.programTypeList &&
                                this.props.programTypeList.map((user) => (
                                  <option key={user.id} value={user.id}>
                                    {user.name}
                                  </option>
                                ))}
                            </CSelect>
                            <FormFeedback>
                              {errors.healthProgramId}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <div
                        className="btn btn-primary btn-block"
                        style={{ margin: "20px", textAlign: "left" }}
                      >
                        Details of Advertisement
                      </div>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Recruitment Conducted By</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="recruitmentCondId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.recruitmentCondId || ""}
                              invalid={errors.recruitmentCondId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              <option value="1">NHM</option>
                              <option value="2">Non-NHM</option>
                              <option value="2">Outsource</option>
                              <option value="2">HR Agency</option>
                            </CSelect>
                            <FormFeedback>{errors.programTypeId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Last Date of Advertisement</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="date"
                              value={obj.lastDateAdver || ""}
                              name="lastDateAdver"
                              onChange={this.handleChange}
                              invalid={errors.lastDateAdver ? true : false}
                            />
                            <FormFeedback>{errors.lastDateAdver}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Advertisement Number</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              name="adverNo"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.adverNo || ""}
                              invalid={errors.adverNo ? true : false}
                            />
                            <FormFeedback>{errors.adverNo}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Upload document of Advertisement</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Upload
                              name="upload1"
                              beforeUpload={(file) => this.beforeUpload(file)}
                              //   fileList={[...this.state.fileUpload]}
                              value={this.state.fileUpload || ""}
                              onChange={(e) => this.handleUpload(e)}
                              maxCount="1"
                            >
                              <Button type="primary" icon={<UploadOutlined />}>
                                Upload
                              </Button>
                            </Upload>
                            <span
                              className="invalid-feedback"
                              style={{
                                display: errors.upload1 ? "none" : "block",
                              }}
                            >
                              {errors.upload1}
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
                              <b>Heading of Advertisement</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.headingAdver || ""}
                              name="headingAdver"
                              onChange={this.handleChange}
                              invalid={errors.headingAdver ? true : false}
                            />
                            <FormFeedback>{errors.headingAdver}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Status of Recruitment</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="statusRecrId"
                              placeholder="Select"
                              onChange={this.handleChange}
                              value={obj.statusRecrId || ""}
                              invalid={errors.statusRecrId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              <option value="1">Ongoing</option>
                              <option value="1">Completed</option>
                            </CSelect>
                            <FormFeedback>{errors.statusRecrId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Date of Advertisement issue</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="date"
                              value={obj.DateAdver || ""}
                              name="DateAdver"
                              onChange={this.handleChange}
                              invalid={errors.DateAdver ? true : false}
                            />
                            <FormFeedback>{errors.DateAdver}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <div
                        className="btn btn-primary btn-block"
                        style={{ margin: "20px", textAlign: "left" }}
                      >
                        Details of Advertised Post
                      </div>
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
                              {this.state.typeFacility && obj.typeOfPostId == 2
                                ? this.state.typeFacility.map((item, i) => (
                                    <option key={item.id} value={item.id}>
                                      {item.name}
                                    </option>
                                  ))
                                : this.state.typeHealth.map((item, i) => (
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
                              <b>Type of Job Association</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="jobAssocId"
                              placeholder="Select"
                              onChange={this.handleChange}
                              value={obj.jobAssocId || ""}
                              invalid={errors.jobAssocId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              <option value="1">Contract under NHM</option>
                              <option value="2">Outsource under NHM </option>
                              <option value="3">Non-NHM </option>
                            </CSelect>
                            <FormFeedback>{errors.jobAssocId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <table
                      style={{ margin: "10px" }}
                      className="table table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>
                            (Data entry for UR/SC/ST/OBC only in number Except
                            for “ Other “ Row)
                          </th>
                          <th>
                            Total Number of Posts Available for Recruitment (Old
                            + New) – Automatically filled from Annexure IIB
                            Report
                          </th>
                          <th>
                            Number of Posts for which Advertisement Issued
                          </th>
                          <th>Number of Applications Received</th>
                          <th>Number of Applicants Shortlisted</th>
                          <th>
                            Number of Applicants Appeared in Selection Process
                          </th>
                          <th>Number of Applicants Selected</th>
                          <th>Number of Applicants on Waitlist</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>UR</th>
                          <td>
                            <CInput
                              value={obj.totalNoUR || ""}
                              disabled
                              name="totalNoUR"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssUR || ""}
                              name="noPostAdverIssUR"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecUR || ""}
                              name="noAppRecUR"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotUR || ""}
                              name="noApplicantShotUR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedUR || ""}
                              name="noApplicantAppearedUR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectUR || ""}
                              name="noApplicantSelectUR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitUR || ""}
                              name="noApplicantWaitUR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>OBC</th>
                          <td>
                            <CInput
                              value={obj.totalNoOBC || ""}
                              disabled
                              name="totalNoOBC"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssOBC || ""}
                              name="noPostAdverIssOBC"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecOBC || ""}
                              name="noAppRecOBC"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotOBC || ""}
                              name="noApplicantShotOBC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedOBC || ""}
                              name="noApplicantAppearedOBC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectOBC || ""}
                              name="noApplicantSelectOBC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitOBC || ""}
                              name="noApplicantWaitOBC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>SC</th>
                          <td>
                            <CInput
                              value={obj.totalNoSC || ""}
                              disabled
                              name="totalNoSC"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssSC || ""}
                              name="noPostAdverIssSC"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecSC || ""}
                              name="noAppRecSC"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotSC || ""}
                              name="noApplicantShotSC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedSC || ""}
                              name="noApplicantAppearedSC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectSC || ""}
                              name="noApplicantSelectSC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitSC || ""}
                              name="noApplicantWaitSC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>ST</th>
                          <td>
                            <CInput
                              value={obj.totalNoST || ""}
                              disabled
                              name="totalNoST"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssST ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssST || ""}
                              name="noPostAdverIssST"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecST || ""}
                              name="noAppRecST"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotST || ""}
                              name="noApplicantShotST"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedST || ""}
                              name="noApplicantAppearedST"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectST || ""}
                              name="noApplicantSelectST"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitST || ""}
                              name="noApplicantWaitST"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>Others(please specify)</th>
                          <td>
                            <CInput
                              value={obj.totalNoOther || ""}
                              disabled
                              name="totalNoOrR"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssOR || ""}
                              name="noPostAdverIssOR"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecOR || ""}
                              name="noAppRecOR"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotOR || ""}
                              name="noApplicantShotOR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedOR || ""}
                              name="noApplicantAppearedOR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectOR || ""}
                              name="noApplicantSelectOR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitOR || ""}
                              name="noApplicantWaitOR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>
                            <CInput
                              value={obj.totalNoT || ""}
                              disabled
                              name="totalNoT"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssT || ""}
                              name="noPostAdverIssT"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecT || ""}
                              name="noAppRecT"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotT || ""}
                              name="noApplicantShotT"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedT || ""}
                              name="noApplicantAppearedT"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectT || ""}
                              name="noApplicantSelectT"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitT || ""}
                              name="noApplicantWaitT"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Row gutter={20}>
                      <div
                        className="btn btn-primary btn-block"
                        style={{ margin: "20px", textAlign: "left" }}
                      >
                        Joining Details
                      </div>
                    </Row>
                    <table
                      style={{ margin: "10px" }}
                      className="table table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>
                            (Data entry for UR/SC/ST/OBC only in number Except
                            for “ Other “ Row)
                          </th>
                          <th>Number of Applicants Issued Offer Letter</th>
                          <th>Number of Applicants Joined</th>
                          <th>
                            Number of Applicants Not Joined (Incl. Waitlist
                            Candidates Issued Offer Letter)
                          </th>
                          <th>Number of Applicants Resigned after Joining</th>
                          <th>Number of Applicants Terminated after Joining</th>
                          <th>
                            Number of Applicants In Position (as on Report
                            DateJoined-Resigned-Terminated)
                          </th>
                          <th>Number of Posts to be Re-advertised</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>UR</th>
                          <td>
                            <CInput
                              value={obj.totalNoUR || ""}
                              disabled
                              name="totalNoUR"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssUR || ""}
                              name="noPostAdverIssUR"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecUR || ""}
                              name="noAppRecUR"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotUR || ""}
                              name="noApplicantShotUR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedUR || ""}
                              name="noApplicantAppearedUR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectUR || ""}
                              name="noApplicantSelectUR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitUR || ""}
                              name="noApplicantWaitUR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>OBC</th>
                          <td>
                            <CInput
                              value={obj.totalNoOBC || ""}
                              disabled
                              name="totalNoOBC"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssOBC || ""}
                              name="noPostAdverIssOBC"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecOBC || ""}
                              name="noAppRecOBC"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotOBC || ""}
                              name="noApplicantShotOBC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedOBC || ""}
                              name="noApplicantAppearedOBC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectOBC || ""}
                              name="noApplicantSelectOBC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitOBC || ""}
                              name="noApplicantWaitOBC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>SC</th>
                          <td>
                            <CInput
                              value={obj.totalNoSC || ""}
                              disabled
                              name="totalNoSC"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssSC || ""}
                              name="noPostAdverIssSC"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecSC || ""}
                              name="noAppRecSC"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotSC || ""}
                              name="noApplicantShotSC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedSC || ""}
                              name="noApplicantAppearedSC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectSC || ""}
                              name="noApplicantSelectSC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitSC || ""}
                              name="noApplicantWaitSC"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>ST</th>
                          <td>
                            <CInput
                              value={obj.totalNoST || ""}
                              disabled
                              name="totalNoST"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssST ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssST || ""}
                              name="noPostAdverIssST"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecST || ""}
                              name="noAppRecST"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotST || ""}
                              name="noApplicantShotST"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedST || ""}
                              name="noApplicantAppearedST"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectST || ""}
                              name="noApplicantSelectST"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitST || ""}
                              name="noApplicantWaitST"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>Others(please specify)</th>
                          <td>
                            <CInput
                              value={obj.totalNoOther || ""}
                              disabled
                              name="totalNoOrR"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssOR || ""}
                              name="noPostAdverIssOR"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecOR || ""}
                              name="noAppRecOR"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotOR || ""}
                              name="noApplicantShotOR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedOR || ""}
                              name="noApplicantAppearedOR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectOR || ""}
                              name="noApplicantSelectOR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitOR || ""}
                              name="noApplicantWaitOR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>
                            <CInput
                              value={obj.totalNoT || ""}
                              disabled
                              name="totalNoT"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noPostAdverIssT || ""}
                              name="noPostAdverIssT"
                              onChange={this.handleChange}
                              invalid={errors.noPostAdverIssUR ? true : false}
                            />
                            <FormFeedback>
                              {errors.noPostAdverIssUR}
                            </FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noAppRecT || ""}
                              name="noAppRecT"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantShotT || ""}
                              name="noApplicantShotT"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantAppearedT || ""}
                              name="noApplicantAppearedT"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantSelectT || ""}
                              name="noApplicantSelectT"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noApplicantWaitT || ""}
                              name="noApplicantWaitT"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Reasons for Re-advertisement (If any)</b>
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
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Monthly Salary for Post</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.monthlySalary || ""}
                              name="monthlySalary"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Duration of Recruitment Process</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.durationRecrtPro || ""}
                              name="durationRecrtPro "
                              onChange={this.handleChange}
                            />
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                      <Button type="primary" style={{margin:'10px'}}>Add New Post</Button>
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
    programTypeList: state.apiadd.programTypeList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      addHR,
      retrievePlaceOfPost,
      retrieveProgramType,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementReport);
