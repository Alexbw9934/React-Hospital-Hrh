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
  Col,
  Input,
  Modal,
  Radio,
  Button,
  Tabs,
} from "antd";
import Select from 'react-select';
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
class AssessmentSDHR extends Component {
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
                  <h4> Assessment of the Caseload for Service Delivery Human Resource</h4>
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
                              Number of Staff (In-place)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.noofStaff || ""}
                              name="noofStaff"
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
                              <b>Name of the State</b>
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
                              Number of Staff per shift (If applicable)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.noOfStaffPerShift || ""}
                              name="noOfStaffPerShift"
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
                              <b>Name of the District</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="districtId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.districtId || ""}
                              invalid={errors.districtId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.districtCategory &&
                                this.state.districtCategory.map((user) => (
                                  <option key={user.id} value={user.id}>
                                    {user.name}
                                  </option>
                                ))}
                            </CSelect>
                            <FormFeedback>{errors.districtId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                              Name of the Performance Measurement Indicator - Multiple indicators (example annex)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                          <Select
                              id="listId"
                              name="listId"
                              placeholder="Select Multiple"
                              onChange={this.updateSelect}
                              value={this.state.defaultValue}
                              isMulti
                              //   options={options}
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
                              <b>Type of SD Institution</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="SDInstId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.SDInstId || ""}
                              invalid={errors.districtCategoryId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {/* <option value="1">Aspirational</option>
                              <option value="2">Non - Aspirational</option> */}
                            </CSelect>
                            <FormFeedback>
                              {errors.districtCategoryId}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                              Caseload against the selected Indicator (In number (Yearly Data)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.caseload || ""}
                              name="caseload"
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
                              <b>Average monthly caseload- Yearly Data / 12</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.avgmonthlyCaseload || ""}
                              name="avgmonthlyCaseload"
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
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Name of Post</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              name="nameofPost"
                              placeholder="Enter"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.nameofPost || ""}
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
                              Average caseload per day- Month Caseload / 24 days or Year Caseload / 288 days
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
export default connect(mapStateToProps, mapDispatchToProps)(AssessmentSDHR);
