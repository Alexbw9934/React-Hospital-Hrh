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
  Table,
  Upload,
} from "antd";
import Select from 'react-select';
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
class StateHRISDashboards extends Component {
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
        hris: 0,
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
      tableRows: [
        {
          srNo: 0,
          placeofPostId: 0,
          sacnctionPost: 0,
          divisionId: 0,
          districtId: 0,
          typeofFacilityOfficeId: 0,
        },
      ],
      secondTableRows: [
        {
          srNo: 0,
          placeOfPosition: 0,
          sacnctionPost: 0,
          division: 0,
          district: 0,
        },
      ],
      paramId: 0,

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
    axios({
      url: `${process.env.REACT_APP_API_URL}Divisions`,
      method: "GET",
    }).then((response) => {
      this.setState({ divisionArray: response.data });
    });

    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
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
        totalNoPostionApprov: Number(obj.numberofPostSanc) + Number(obj.numberofNewPostion)
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
    if (obj.submission === "")
      errors.submission = "Please pick date of submission.";
    if (obj.financialYear === 0)
      errors.financialYear = "Please enter the financial year.";
    if (obj.typeofApproval === "")
      errors.typeofApproval = "Please select Type of Approval.";
    if (obj.stateId === 0) errors.stateId = "Please select State.";
    if (obj.numberOfDivDist === "")
      errors.numberOfDivDist = "Please enter Division.";
    // if (obj.districtCategoryId === 0)
    //   errors.districtCategoryId = "Please select District.";
    if (obj.divsionId === "") errors.divsionId = "Please select Division.";
    if (obj.programType === 0)
      errors.programType = "Please select programe type.";
    if (obj.typeofPost === 0) errors.typeofPost = "Please select type of post.";
    if (obj.categoryofPostion === 0)
      errors.categoryofPostion = "Please select category of post.";
    if (obj.fmr === 0 || obj.fmr < 0) errors.fmr = "Please enter FMR number.";
    if (obj.numberofPostSanc === 0)
      errors.numberofPostSanc = "Please enter number of post sanction.";
    if (obj.numberofPostSanc < 0)
      errors.numberofPostSanc = "Please enter a valid number.";
    if (obj.numberofNewPost === 0 || obj.numberofNewPost < 0)
      errors.numberofNewPost = "Please enter number of new post.";
    if (obj.numberofOldSanc === 0 || obj.numberofOldSanc < 0)
      errors.numberofOldSanc = "Please enter number of old sanction.";
    if (obj.totalNoPostionApprov === 0 || obj.totalNoPostionApprov < 0)
      errors.totalNoPostionApprov =
        "Please enter total number of old position approve.";
    if (obj.numberofPostVaccant === 0 || obj.numberofPostVaccant < 0)
      errors.numberofPostVaccant = "Please enter number of post vacant.";
    if (obj.nameofPost === "") errors.nameofPost = "Please enter name of post.";
    if (obj.totalBudgetAprrINR === 0 || obj.totalBudgetAprrINR < 0 || obj.totalBudgetAprrINR.length > 10)
      errors.totalBudgetAprrINR = "Please enter total budget INR.";
    if (obj.numberofNewPostion === 0 || obj.numberofNewPostion < 0)
      errors.numberofNewPostion = "Please enter number of new position.";
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    return
    fetch(
      `http://5.9.111.198:13880/api/`,
      {
        method: "POST",
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
        paramId: 0,
      });
      setTimeout(() => {
        this.setState({ postMsg: false });
      }, 10000);
    });
  };

  render() {
    const { obj, role, detailsArray, errors } = this.state;
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
                  {role === "admin_role" ? (
                    <h4>State HRIS Dashboards - National</h4>
                  ) : role === "state_role" ? (
                    <h4>State HRIS Dashboards - State</h4>
                  ) : (
                    <h4>State HRIS Dashboards - District</h4>
                  )}
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
                          <Col>
                            <CLabel>
                              <b>Is the HRIS fully Functional</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                             disabled={role==="admin_role"?true:false}
                              onChange={(e) =>
                                this.setState({
                                  obj: {
                                    ...this.state.obj,
                                    hris: e.target.value,
                                  },
                                })
                              }
                              value={obj.hris || ""}
                            // invalid={errors.typeofApproval ? true : false}
                            >
                              <Radio value="1">Yes</Radio>
                              <Radio value="2">No</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display: errors.typeofApproval === "" ? "none" : "block",
                              }}
                            >
                              {errors.typeofApproval}
                            </span>
                            <FormFeedback>{errors.stateId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <CLabel>
                            <Col>
                              <b>If No Provide the reason</b>
                            </Col>
                          </CLabel>
                          <Col>
                            <CInput
                              placeholder="Enter"
                              type="number"
                              onChange={(e) =>
                                this.setState({ sanctionOfPosition: e })
                              }
                              disabled={obj.hris === 2 && role==="state_role" ? false : true}
                              value={this.state.sanctionOfPosition || ""}
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
                              <b>If Yes what are the features available</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Select
                              id="listId"
                              name="listId"
                              disabled={role==="admin_role"?true:false}
                              placeholder="Select Multiple"
                              onChange={this.updateSelect}
                              value={this.state.defaultValue}
                              isMulti
                              //   options={options}
                            />
                            <FormFeedback>{errors.numberofPerson}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Date of Uploading HRIS URL</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              id="form"
                              name="submission"
                              type="date"
                              disabled={role==="admin_role"?true:false}
                              placeholder="Date"
                              onChange={this.handleChange}
                              value={
                                obj.submission === ""
                                  ? obj.submission || ""
                                  : obj.submission.split("T")[0] || ''
                              }
                              invalid={errors.submission ? true : false}
                            />
                            <FormFeedback>{errors.submission}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <CLabel>
                            <Col>
                              <b>Guest Login ID</b>
                            </Col>
                          </CLabel>
                          <Col>
                            <CInput
                              placeholder="Enter"
                              type="number"
                              disabled={role==="admin_role"?true:false}
                              onChange={(e) =>
                                this.setState({ sanctionOfPosition: e })
                              }
                              value={this.state.sanctionOfPosition || ""}
                            />
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <CLabel>
                            <Col>
                              <b>Guest Login Password</b>
                            </Col>
                          </CLabel>
                          <Col>
                            <CInput
                              placeholder="Enter"
                              type="number"
                              disabled={role==="admin_role"?true:false}
                              onChange={(e) =>
                                this.setState({ sanctionOfPosition: e })
                              }
                              value={this.state.sanctionOfPosition || ""}
                            />
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <CLabel>
                            <Col>
                              <b>If in process when it expected to complete</b>
                            </Col>
                          </CLabel>
                          <Col>
                            <CInput
                              placeholder="Enter"
                              type="number"
                              disabled={role==="admin_role"?true:false}
                              onChange={(e) =>
                                this.setState({ sanctionOfPosition: e })
                              }
                              value={this.state.sanctionOfPosition || ""}
                            />
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                  {role==="admin_role"?
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Is the HRIS Accepted by National Team</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              onChange={(e) =>
                                this.setState({
                                  obj: {
                                    ...this.state.obj,
                                    hris: e.target.value,
                                  },
                                })
                              }
                              value={obj.hris || ""}
                            // invalid={errors.typeofApproval ? true : false}
                            >
                              <Radio value="1">Yes</Radio>
                              <Radio value="2">No</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display: errors.typeofApproval === "" ? "none" : "block",
                              }}
                            >
                              {errors.typeofApproval}
                            </span>
                            <FormFeedback>{errors.stateId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <CLabel>
                            <Col>
                              <b>If No Provide the reason</b>
                            </Col>
                          </CLabel>
                          <Col>
                            <CInput
                              placeholder="Enter"
                              type="number"
                              onChange={(e) =>
                                this.setState({ sanctionOfPosition: e })
                              }
                              disabled={obj.hris === 2 ? false : true}
                              value={this.state.sanctionOfPosition || ""}
                            />
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>:null}
                    <Row>
                      <Col>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="center"
                          >
                            {this.state.paramId
                              ? "Update"
                              : "Submit"}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateHRISDashboards);
