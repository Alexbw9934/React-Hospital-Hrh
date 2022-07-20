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
  Upload,
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
class StatePerformanceMonitoring extends Component {
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
    if (
      obj.totalBudgetAprrINR === 0 ||
      obj.totalBudgetAprrINR < 0 ||
      obj.totalBudgetAprrINR.length > 10
    )
      errors.totalBudgetAprrINR = "Please enter total budget INR.";
    if (obj.numberofNewPostion === 0 || obj.numberofNewPostion < 0)
      errors.numberofNewPostion = "Please enter number of new position.";
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    return;
    fetch(`http://5.9.111.198:13880/api/performanceMonitoring`, {
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
                    <h4>Performance Monitoring - National</h4>
                  ) : role === "state_role" ? (
                    <h4>Performance Monitoring - State</h4>
                  ) : (
                    <h4>Performance Monitoring - District</h4>
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
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Date of Reporting</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              id="form"
                              name="submission"
                              type="date"
                              placeholder="Date"
                              onChange={this.handleChange}
                              value={
                                obj.submission === ""
                                  ? obj.submission || ""
                                  : obj.submission.split("T")[0] || ""
                              }
                              invalid={errors.submission ? true : false}
                            />
                            <FormFeedback>{errors.submission}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Program Type</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              value={obj.programType || ""}
                              onChange={this.handleRadio2}
                            >
                              <Radio value="1">NHM</Radio>
                              <Radio value="2">NUHM</Radio>
                            </Radio.Group>
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
                              name="financialYear"
                              value={obj.financialYear || ""}
                              invalid={errors.financialYear ? true : false}
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
                            <FormFeedback>{errors.financialYear}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Appraisal process by NHM</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              value={obj.appraisal || ""}
                              disabled={obj.programType === 1 ? false : true}
                              onChange={this.handleRadio2}
                            >
                              <Radio value="1">Conducted</Radio>
                              <Radio value="2">Not Conducted</Radio>
                            </Radio.Group>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Name of State/UT</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select State"
                              name="stateId"
                              value={obj.stateId || ""}
                              onChange={this.handleChange}
                              invalid={errors.stateId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.states.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </CSelect>
                            <FormFeedback>{errors.stateId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Remark(if not conducted) </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.remark || ""}
                              name="remark"
                              disabled={obj.appraisal === 2 ? false : true}
                              onChange={this.handleChange}
                              invalid={errors.totalBudgetAprrINR ? true : false}
                            />
                            <FormFeedback>
                              {errors.totalBudgetAprrINR}
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
                              <b>Name of the Division</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="divisionId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.divisionId || ""}
                              invalid={errors.districtId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.divisionArray &&
                                this.state.divisionArray.map((user) => (
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
                    </Row>
                    <table
                      style={{ margin: "10px" }}
                      className="table table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>Category of post</th>
                          <th>Total number of positions sanctioned</th>
                          <th>
                            Total number of positions in place (Except New
                            Joinee)
                          </th>
                          <th>
                            Number of New Joining who's appraisal to be
                            conducted
                          </th>
                          <th>Number of staff to be appraised</th>
                          <th>Number of Staff appraised</th>
                          <th>Number of Staff with appraisals in process</th>
                          <th>
                            Number of Staff with appraisals not initiated (Based
                            on [Formula: Staff to be Appraised – (Staff
                            appraised + Appraisal in Process)]
                          </th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
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
                          </td>
                          <td>
                            <CInput
                              value={obj.totalNopositionSanc || ""}
                              name="totalNopositionSanc"
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
                              value={obj.totalnoOfPosition || ""}
                              name="totalnoOfPosition"
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
                              value={obj.noofnewJoinee || ""}
                              name="noofnewJoinee"
                              onChange={this.handleChange}
                              invalid={errors.noAppRecUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noStafftoBeApraised || ""}
                              name="noStafftoBeApraised"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noStaffApraised || ""}
                              name="noStaffApraised"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={obj.noStaffwithApraisal || ""}
                              name="noStaffwithApraisal"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              type="number"
                              value={
                                Number(obj.noStafftoBeApraised) -
                                  Number(obj.noStaffApraised) -
                                  Number(obj.noStaffwithApraisal) || ""
                              }
                              name="noApplicantWaitUR"
                              onChange={this.handleChange}
                              invalid={errors.noApplicantShotUR ? true : false}
                            />
                            <FormFeedback>{errors.noAppRecUR}</FormFeedback>
                          </td>
                          <td>
                            <CInput
                              value={obj.remarks || ""}
                              name="remarks"
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
                        Grading of performance
                      </div>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Number of staff who did not meet the required
                                performance benchmarks on most of the indicators
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalBudgetAprrINR || ""}
                              name="totalBudgetAprrINR"
                              onChange={this.handleChange}
                              invalid={errors.totalBudgetAprrINR ? true : false}
                            />
                            <FormFeedback>
                              {errors.totalBudgetAprrINR}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Number of staff who met the required performance
                                benchmarks on few of the indicators
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalBudgetAprrINR || ""}
                              name="totalBudgetAprrINR"
                              onChange={this.handleChange}
                              invalid={errors.totalBudgetAprrINR ? true : false}
                            />
                            <FormFeedback>
                              {errors.totalBudgetAprrINR}
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
                                Number of staff who met the required performance
                                benchmarks on most of the indicators
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalBudgetAprrINR || ""}
                              name="totalBudgetAprrINR"
                              onChange={this.handleChange}
                              invalid={errors.totalBudgetAprrINR ? true : false}
                            />
                            <FormFeedback>
                              {errors.totalBudgetAprrINR}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Number of staff who met all the required
                                performance benchmarks
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalBudgetAprrINR || ""}
                              name="totalBudgetAprrINR"
                              invalid={errors.totalBudgetAprrINR ? true : false}
                            />
                            <FormFeedback>
                              {errors.totalBudgetAprrINR}
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
                              <b>Submitted the Excel file</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              value={obj.programType || ""}
                              onChange={this.handleRadio2}
                            >
                              <Radio value="1">Yes</Radio>
                              <Radio value="2">No</Radio>
                            </Radio.Group>
                            <FormFeedback>
                              {errors.totalBudgetAprrINR}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Appraisal Excel Sheet - attachment field</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Upload
                              onChange={(e) => this.handleChange(e)}
                              maxCount="1"
                            >
                              <Button type="primary">Upload</Button>
                            </Upload>
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
)(StatePerformanceMonitoring);
