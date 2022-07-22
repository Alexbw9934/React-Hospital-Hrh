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
  CButton,
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
  Space,
} from "antd";
import axios from "axios";
import {
  retrieveTypeOfFacility,
  retrieveFinancialYear,
  retrieveDistricts,
  retrieveProgramType,
  retrieveTypeOfAssociation,
  retrieveTypeOfPositions,
  addHR,
  retrievePlaceOfPost,
} from "../../../actions/apiadd";
import { retrievePost } from "../../../actions/masterapi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class HRStatusReportForm extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      statuss: 0,
      states: [],
      catPos: [],
      position: [],
      nameOfPostList:[],
      errors: {},
      tableRowsDetails: [],
      value: {},
      tableData: [
        { id: "1", name: "Draft" },
        { id: "2", name: "National Approval" },
        { id: "3", name: "Approved" },
      ],
      statusArray: [
        { id: "1", name: "Draft" },
        { id: "2", name: "National Approval" },
        { id: "3", name: "Approved" },
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
        statuss: 1,
      },
      numberTableRows: [
        {
          id: 0,
          fmr: 0,
          programType: 0,
          typeofPosition: 0,
          categoryofPost: 0,
          nameofPost: 0,
          amount: 0,
          numberofPostSanc: 0,
          numberofNewPostion: 0,
          totalNoPostionApprov: 0,
          numberofPost: 0,
          numberofOldSanc: 0,
          numberofPostVaccant: 0,
        },
      ],
      errors: {},
      errorMsg: false,
      postMsg: false,
      postMsg1: false,
      stateSanction: 0,
      role: localStorage.getItem("access_role"),
      object: localStorage.getItem("object"),
      reserveOptions: ["A", "B"],
      checkedList: ["A"],
      placeOfPosition: 0,
      placeOfPositionArray: [
        { id: "1", name: "Division" },
        { id: "2", name: "Institute" },
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
      tabView: [],
      fmrList: [],
      isModalVisible: false,
      tabdata: {},
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
  checkingparse = (data) => {
    if (!data) return {};
    if (typeof data == "object") return data;
    if (typeof data == "string") return JSON.parse(data);

    return {};
  };
  componentDidMount() {
    this.props.retrieveDistricts();
    this.props.retrieveTypeOfAssociation();
    this.props.retrieveTypeOfPositions(); 
    axios({
      url: `${process.env.REACT_APP_API_URL}FMRs`,
      method: "GET",
    }).then((response) => {
      this.setState({ fmrList: response.data });
    });
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
    axios({
      url: `${process.env.REACT_APP_API_URL}Positions`,
      method: "GET",
    }).then((response) => {
      console.log("position", response.data);
      this.setState({ position: response.data });
    });
  
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveProgramType();
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({ paramId: paramId });
        axios({
          url: `${process.env.REACT_APP_API_URL}HRStatusReportStates/${paramId}`,
          method: "GET",
        }).then((response) => {
          console.log(response.data);
          let obj=response.data 
          this.setState({ obj});
          console.log(obj,'jjjjjjjjjjj')
        axios({
          url: `${process.env.REACT_APP_API_URL}DistrictContractualReports`,
          method: "GET",
        }).then((response) => {
          let arr = response.data.filter(
            (data) => data.stateId==obj.stateId && data.reportingPeriodId==obj.reportingPeriodId
          );
          this.setState({ numberTableRows: arr });
        });
        axios({
          url: `${process.env.REACT_APP_API_URL}DistrictRegularCadreReports`,
          method: "GET",
        }).then((response) => {
          let arr = response.data.filter(
            (data) => (data) => data.stateId==obj.stateId && data.reportingPeriodId==obj.reportingPeriodId
          );
          this.setState({ tableRows: arr });
        });
        axios({
          url: `${process.env.REACT_APP_API_URL}DistrictFinancialStatusReports`,
          method: "GET",
        }).then((response) => {
          const arr = response.data.filter(
            (data) => (data) => data.stateId==obj.stateId && data.reportingPeriodId==obj.reportingPeriodId
          );
          console.log(arr, "checking array");
          let obj = {};
          const r = arr.map((data) => {
            let val = this.props.financialStatusList
              .filter((y) => y.id == data.budget)
              .map((x) => x.name);
            obj = {
              ...obj,
              programTypeId: data.programTypeId,
              budget: data.budget,
              name: val[0],
              amount: data.amount,
              finacialYearId: data.finacialYearId,
            };
            return obj;
          });
          this.setState({
            programList: [r],
          });
        });
      });
      }
  
  }
 
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
  handleTablePlace = (e, i) => {
    const { name, value } = e.target;
    let tableRows = [...this.state.tableRows];
    tableRows[i] = {
      ...tableRows[i],
      [name]: value,
    };
    this.setState({
      tableRows,
    });
  };
  validateNational = () => {
    const { obj } = this.state;
    let errors = {};
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    return;
    const errors = this.validateNational();
    let postSanc = 0;
    this.state.tableRows.map((data) => {
      return (postSanc = postSanc + data.sacnctionPost);
    });
    if (postSanc < this.state.obj.numberofPostSanc) {
      this.setState({ errors });
    } else {
      this.state.tableRows.map((data) => {
        data.humanResourceProposalId = this.state.obj.id;
        console.log("else prt", this.state.tableRows);
        fetch("http://5.9.111.198:13880/api/HumanResourceProposalTabs", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((resp) => {
          if (resp.status == 404) {
            this.setState({
              errorMsg: true,
            });
            setTimeout(() => {
              this.setState({ errorMsg: false });
            }, 10000);
          } else {
            this.setState({
              postMsg1: true,
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
            });
            setTimeout(() => {
              this.setState({ postMsg1: false });
            }, 10000);
            this.listTable();
          }
          console.log("result", resp);
        });
      });
    }
    setTimeout(() => {
      this.setState({ postMsg: false });
    }, 10000);
  };
  removeClick = (i) => {
    let tableRows = [...this.state.tableRows];
    tableRows.splice(i, 1);
    this.setState({ tableRows });
  };
  saveLocal = () => {
    console.log("save", this.props.hrList);
    addHR(this.state.obj);
  };
  partialSave = () => {
    localStorage.setItem("object", JSON.stringify(this.state.obj));
  };
  render() {
    const { obj, role, errors, value } = this.state;
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
                  {role == "admin_role" ? (
                    <h4>Human Resource Status Report - National</h4>
                  ) : role == "state_role" ? (
                    <h4>Human Resource Status Report - State</h4>
                  ) : (
                    <h4>Human Resource Status Report - District</h4>
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
                  <CForm>
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
                              disabled
                              id="form"
                              name="submission"
                              type="date"
                              placeholder="Date"
                              onChange={this.handleChange}
                              value={
                                obj && obj.submission
                                  ? obj.submission.split("T")[0] || ""
                                  : obj.submission || ""
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
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Type of Approval</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              disabled
                              onChange={(e) =>
                                this.setState({
                                  obj: {
                                    ...this.state.obj,
                                    typeofApproval: e.target.value,
                                  },
                                })
                              }
                              value={obj.typeofApproval || ""}
                            >
                              <Radio value="1">Annual RoP</Radio>
                              <Radio value="2">Supplementary RoP</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display:
                                  errors.typeofApproval == ""
                                    ? "none"
                                    : "block",
                              }}
                            >
                              {errors.typeofApproval}
                            </span>
                            {/* <FormFeedback>{errors.typeofApproval}</FormFeedback> */}
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Select Number</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select Number"
                              onChange={this.handleChange}
                              name="number"
                              value={obj.number || ""}
                              disabled
                              //   ={
                              //     role == "district_role" || obj.typeofApproval == 1
                              //       ? true
                              //       : false
                              //   }
                            >
                              <option value="0">-Select-</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </CSelect>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      {role == "district_role" ? (
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel>
                                <b>Name of District</b>
                              </CLabel>
                            </Col>
                            <Col>
                              <CInput
                                disabled
                                placeholder="Select District"
                                name="distictId"
                                value={"Mamit" || ""}
                                onChange={this.handleChange}
                                invalid={errors.distictId ? true : false}
                              />
                              {/* <option value="0">-Select-</option>
                              {this.state.districtCategory.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })} */}
                              {/* </CSelect> */}
                              <FormFeedback>{errors.stateId}</FormFeedback>
                            </Col>
                          </CFormGroup>
                        </Col>
                      ) : null}
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Reporting Period</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="reportngPriod"
                              value={obj.reportngPriod || ""}
                              invalid={errors.reportngPriod ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.reportingPriodList &&
                                this.props.reportingPriodList.map(
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
                            <FormFeedback>{errors.financialYear}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Status</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              name="statuss"
                              // value={obj.statuss || ''}
                              defaultValue={this.state.statusArray[0]}
                              disabled
                              onChange={this.handleChange}
                              invalid={errors.statuss ? true : false}
                            >
                              <option value="0">Draft</option>
                              {this.state.statusArray.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </CSelect>
                            <FormFeedback>{errors.statuss}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="3">
                            <CLabel htmlFor="text-input">
                              <b>First Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="3">
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
                            <FormFeedback>{errors.financialYear}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="3">
                            <CLabel htmlFor="text-input">
                              <b>Last Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="3">
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
                            <FormFeedback>{errors.financialYear}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Tabs>
                    <TabPane tab="Contractual" key="1">
                        <table className="table table-bordered table-responsive">
                          <thead>
                            <tr>
                              <th rowSpan={2} className="w-25">
                                <b>State</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Division</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>District</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Reporting Period</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>FMR</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Program Type</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Type of Position</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Category of post</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Name of the post</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of Approved Posts </b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of Posts In Place</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of vacant Posts</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of recruited Posts</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of In Process Posts</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of vacancy as on</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                Specify Others
                              </th>
                            </tr>
                            <tr>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.numberTableRows.map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        name="stateId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.stateId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.states &&
                                          this.state.states.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        name="divisionId"
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.divisionId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.divisionArray &&
                                          this.state.divisionArray.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        name="districtId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.districtId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.districtCategory &&
                                          this.state.districtCategory.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        name="reportingPeriodId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.reportingPeriodId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.reportingPeriodList &&
                                          this.props.reportingPeriodList.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        name="fmrId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.fmrId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.fmrList &&
                                          this.state.fmrList.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.fmr}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        name="programTypeId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.programTypeId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.programTypeList &&
                                          this.props.programTypeList.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        name="typeofPostionId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.typeofPostionId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.position &&
                                          this.state.position.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
                                            </option>
                                          ))}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="categoryPostId"
                                        value={data.categoryPostId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.catPos &&
                                          this.state.catPos.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.categoryName}
                                                </option>
                                              );
                                            }
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.divisionId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="namePost"
                                        value={data.namePost || ""}
                                        invalid={
                                          errors.nameofPost ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList &&
                                          this.state.nameOfPostList.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          )}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noApprPostTotal || ""}
                                        name="noApprPostTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.totalBudgetAprrINR
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noApprPostUR || ""}
                                        name="noApprPostUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofPostSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noApprPostOBC"
                                        value={data.noApprPostOBC || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofNewPostion
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noApprPostSC || ""}
                                        name="noApprPostSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.totalNoPostionApprov
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noApprPostST || ""}
                                        name="noApprPostST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofNewPost ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noApprPostOthers || ""}
                                        name="noApprPostOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noPostPlaceTotal || ""}
                                        name="noPostPlaceTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noPostPlaceUR || ""}
                                        name="noPostPlaceUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noPostPlaceOBC || ""}
                                        name="noPostPlaceOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noPostPlaceSC || ""}
                                        name="noPostPlaceSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noPostPlaceST || ""}
                                        name="noPostPlaceST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noPostPlaceOthers || ""}
                                        name="noPostPlaceOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noVacantPostTotal || ""}
                                        name="noVacantPostTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noVacantPostUR || ""}
                                        name="noVacantPostUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noVacantPostOBC || ""}
                                        name="noVacantPostOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.novacantPostSC || ""}
                                        name="novacantPostSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.novacantPostST || ""}
                                        name="novacantPostST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noVacantPostOthers || ""}
                                        name="noVacantPostOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noRecuritedPostTotal || ""}
                                        name="noRecuritedPostTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noRecuritedPostUR || ""}
                                        name="noRecuritedPostUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noRecuritedPostOBC || ""}
                                        name="noRecuritedPostOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noRecuritedPostSC || ""}
                                        name="noRecuritedPostSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noRecuritedPostST || ""}
                                        name="noRecuritedPostST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noRecuritedPostOthers || ""}
                                        name="noRecuritedPostOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noProcessPostTotal || ""}
                                        name="noProcessPostTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noProcessPostUR || ""}
                                        name="noProcessPostUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noProcessPostOBC || ""}
                                        name="noProcessPostOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noProcessPostSC || ""}
                                        name="noProcessPostSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noProcessPostST || ""}
                                        name="noProcessPostST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noProcessPostOthers || ""}
                                        name="noProcessPostOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noVacancyTotal || ""}
                                        name="noVacancyTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noVacancyUR || ""}
                                        name="noVacancyUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        disabled
                                        style={{ width: "70px" }}
                                        value={data.noVacancyOBC || ""}
                                        name="noVacancyOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.noVacancySC || ""}
                                        name="noVacancySC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noVacancyST || ""}
                                        name="noVacancyST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.noVacancyOthers || ""}
                                        name="noVacancyOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="text"
                                        style={{ width: "70px" }}
                                        value={data.specifyOthers || ""}
                                        name="specifyOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Regular Cadre" key="3">
                        <table className="table table-bordered table-responsive">
                          <thead>
                            <tr>
                              <th rowSpan={2} className="w-25">
                                <b>State</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Division</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>District</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Reporting Period</b>
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Place of Post
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Type of Post
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Category of post
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Type of Service/Association
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Facility Type
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Name of Post
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position sanctioned
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position in place
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position vacant
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position recruited
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position under process
                              </th>
                              <th style={{ width: "9.09%" }}>
                                Number of vacancy as on date
                              </th>
                              <th style={{ width: "9.09%" }}>Remarks</th>
                            </tr>
                            <tr>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.tableRows.map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        name="stateId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.stateId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.states &&
                                          this.state.states.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        name="divisionId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.divisionId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.divisionArray &&
                                          this.state.divisionArray.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        name="districtId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.districtId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.districtCategory &&
                                          this.state.districtCategory.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        name="reportingPeriodId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.reportingPeriodId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.reportingPeriodList &&
                                          this.props.reportingPeriodList.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        style={{ width: "150px" }}
                                        disabled
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        name="placeofPostId"
                                        value={data.placeofPostId || ""}
                                        invalid={
                                          errors.placeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.placeofPostList.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        name="typeofPostId"
                                        value={data.typeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.typeOfPost ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.position.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select State"
                                        name="categoryPostId"
                                        value={data.categoryPostId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={errors.stateId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.catPos.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.categoryName}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select State"
                                        name="typeofServicesId"
                                        value={data.typeofServicesId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={errors.stateId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.typeofAssociationList.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select State"
                                        name="facilityTypeId"
                                        value={data.facilityTypeId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.facilityType ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.typeFacilityList.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.facilityType}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select State"
                                        name="postId"
                                        value={data.postId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.facilityType ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionSacnOld"
                                        value={data.noPostionSacnOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionSacnNew"
                                        value={data.noPostionSacnNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionSacnTotal"
                                        value={data.noPostionSacnTotal || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionPlaceOld"
                                        value={data.noPostionPlaceOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionPlaceNew"
                                        value={data.noPostionPlaceNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionPlaceTotal"
                                        value={data.noPostionPlaceTotal || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionVacantOld"
                                        value={data.noPostionVacantOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionVacantNew"
                                        value={data.noPostionVacantNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionVacantTotal"
                                        value={data.noPostionVacantTotal || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionRecuriteOld"
                                        value={data.noPostionRecuriteOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionRecuriteNew"
                                        value={data.noPostionRecuriteNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionRecuriteTotal"
                                        value={
                                          data.noPostionRecuriteTotal || ""
                                        }
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionUndProceOld"
                                        value={data.noPostionUndProceOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionUndProceNew"
                                        value={data.noPostionUndProceNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="noPostionUndProceTotal"
                                        value={
                                          data.noPostionUndProceTotal || ""
                                        }
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        name="novacancy"
                                        value={data.novacancy || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="text"
                                        name="remark"
                                        value={data.remark || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane>
                    </Tabs>
                    {this.state.errorMsg ? (
                      <CAlert
                        color="warning"
                        className="d-flex align-items-center"
                        style={{ backgroundColor: "#CD5C5C" }}
                      >
                        <CIcon
                          name="cilWarning"
                          className="flex-shrink-0 me-2"
                          width={24}
                          height={24}
                          style={{ color: "#FFF" }}
                        />
                        <div style={{ color: "#FFF" }}>
                          Sanctioned post is greater than number of post
                          sanctioned(previously approved)
                        </div>
                      </CAlert>
                    ) : this.state.postMsg1 ? (
                      <CAlert
                        color="success"
                        className="d-flex align-items-center"
                      >
                        <CIcon
                          name="cilCheckCircle"
                          className="flex-shrink-0 me-2"
                          width={24}
                          height={24}
                        />
                        <div>Data save Successfully</div>
                      </CAlert>
                    ) : null}

                    <Space size="middle">
                      <CButton color="primary" type="submit">
                        {this.state.paramId ? "Update" : "Submit"}
                      </CButton>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          this.partialSave();
                        }}
                      >
                        Save
                      </Button>
                      <Button type="secondary">Edit</Button>
                      <Button>Download</Button>
                      {role == "admin_role" ? (
                        <Button
                          color="primary"
                          style={{
                            display:
                              obj.statuss == 1 || obj.statuss == 3
                                ? "block"
                                : "none",
                          }}
                        >
                          Send for Approval
                        </Button>
                      ) : null}
                      {role == "admin_role" ? (
                        <Button color="primary">Approved</Button>
                      ) : null}
                      {role == "admin_role" ? (
                        <Button
                          color="primary"
                          style={{
                            display: obj.statuss == 2 ? "block" : "none",
                          }}
                        >
                          Reject
                        </Button>
                      ) : null}
                      {role == "admin_role" ? (
                        <Button
                          color="primary"
                          style={{
                            display: obj.statuss == 2 ? "block" : "none",
                          }}
                        >
                          Need Clarification
                        </Button>
                      ) : null}
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
    districtList: state.apiadd.districtsList,
    hrList: state.apiadd.hrList,
    programTypeList: state.apiadd.programTypeList,
    typeofAssociationList: state.apiadd.typeofAssociationList,
    typeOfPositionList: state.apiadd.typeOfPositionList,
    placeofPostList:state.apiadd.placeOfPostList,
    typePostList:state.masterapi.postList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      retrieveDistricts,
      retrieveProgramType,
      retrieveTypeOfAssociation,
      retrieveTypeOfPositions,
      retrievePlaceOfPost,
      retrievePost,
      addHR,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(HRStatusReportForm);
