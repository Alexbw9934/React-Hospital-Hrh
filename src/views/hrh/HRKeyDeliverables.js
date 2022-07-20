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
  addHR,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class HRKeyDeliverables extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      statuss: 0,
      states: [],
      catPos: [],
      position: [],
      errors: {},
      tableRowsDetails: [],
      tableData: [
        { id: "1", name: "Draft" },
        { id: "2", name: "National Approval" },
        // { id: "3", name: "Need Clarification" },
        { id: "3", name: "Approved" },
        // { id: "5", name: "Rejected" },
      ],
      statusArray: [
        { id: "1", name: "Draft" },
        { id: "2", name: "National Approval" },
        // { id: "3", name: "Need Clarification" },
        { id: "3", name: "Approved" },
        // { id: "5", name: "Rejected" },
      ],
      nameofPostListN: [
        { id: "1", name: "ANM" },
        { id: "2", name: "Staff Nurse" },
      ],
      nameofPostListS: [
        { id: "1", name: "Surgeon" },
        { id: "2", name: "General Physician" },
      ],
      subTypePostList: [
        { id: "1", name: "SD(HRH)" },
        { id: "2", name: "SD (SS)- Support Staff SD" },
        { id: "3", name: "PM (HRH)" },
        { id: "4", name: "PM (DEO) -DEO" },
        { id: "5", name: "PM (SS)- Support Staff SD)" },
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
      arrayObject: localStorage.getItem("arrayObject"),
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
      tabView: [],
      fmrList: [],
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
  checkingparse = (data) => {
    if (!data) return {};
    if (typeof data === "object") return data;
    if (typeof data === "string") return JSON.parse(data);

    return {};
  };
  componentDidMount() {
    this.props.retrieveDistricts();
    const valueParse = this.checkingparse(this.state.object);
    const arrayParse = this.checkingparse(this.state.arrayObject);
    // this.setState({ obj: valueParse,tabView:JSON.parse(this.state.arrayObject) });
    console.log(valueParse, arrayParse, "valueParse");
    // axios({
    //   url: `${process.env.REACT_APP_API_URL}HumanResourceProposalTabs`,
    //   method: "GET",
    // }).then((response) => {
    //   this.setState({ tabView: response.data });
    // });
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
    axios({
      url: `${process.env.REACT_APP_API_URL}humanResourceProposals`,
      method: "GET",
    }).then((response) => {
      if (this.state.role === "state_role") {
        let lastId = response.data.length;
        const valueArray = response.data;
        const obj = { ...valueArray[lastId - 1] };
        //  console.log(lastId,'lastId')
        let tableRows = [...this.state.tableRows];
        tableRows[0] = {
          ...tableRows[0],
          stateId: obj.stateId,
          stateSanctionPost: obj.numberofPostSanc,
        };
        this.setState({ obj, tableRows });
        this.setState({ stateSanction: obj.numberofPostSanc });
      }
    });
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveProgramType();
    this.listTable();
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({ paramId: paramId });
      if (this.state.role === "admin_role") {
        axios({
          url: `${process.env.REACT_APP_API_URL}humanResourceProposals/${paramId}`,
          method: "GET",
        }).then((response) => {
          this.setState({ obj: response.data });
        });
      }
      if (this.state.role === "district_role") {
        axios({
          url: `${process.env.REACT_APP_API_URL}Human_Resource_Proposal_District/${paramId}`,
          method: "GET",
        }).then((response) => {
          console.log(response.data);
          this.setState({ obj: response.data });
        });
      }
    }
  }
  listTable = () => {
    axios({
      url: `${process.env.REACT_APP_API_URL}StateDetailsTabs`,
      method: "GET",
    }).then((response) => {
      this.setState({ tableRowsDetails: response.data });
    });
  };
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
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  handleTablePlace = (e, i) => {
    const { name, value } = e.target;
    let numberTableRows = [...this.state.numberTableRows];
    numberTableRows[i] = {
      ...numberTableRows[i],
      [name]: value,
    };
    this.setState({
      numberTableRows,
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
    return
    if (this.state.role === "admin_role") {
      localStorage.removeItem("object");
      // const errors = this.validateNational();
      const errors = {};
      console.log(errors, "errors");
      if (Object.keys(errors).length === 0) {
        this.setState({
          errors: {},
        });
        if (this.props.history.location.state) {
          let paramId = this.props.history.location.state.data;
          fetch(
            `http://5.9.111.198:13880/api/humanResourceProposals/${paramId}`,
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
        } else {
          // console.log(this.state.numberTableRows, 'this.state.numberTableRows')
          // return
          fetch("http://5.9.111.198:13880/api/humanResourceProposals", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${config}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.obj),
          })
            .then((res) => res.json())
            .then((resp) => {
              console.log("result", resp);
              const id = resp.id;
              // this.state.numberTableRows.map(data=>{
              //   this.setState({numberTableRows: [...this.state.numberTableRows,{humanResourceProposalId:id}]})
              // })
              this.state.numberTableRows.map((data, i) => {
                console.log(id);
                console.log(data);
                data.humanResourceProposalId = id;
                fetch(
                  "http://5.9.111.198:13880/api/HumanResourceProposalTabs",
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
                  if (resp.status === 404) {
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
        }
      } else {
        this.setState({ errors });
      }
    }
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
    localStorage.setItem(
      "arrayObject",
      JSON.stringify(this.state.numberTableRows)
    );
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
                    <h4>Human Resource Proposal - National</h4>
                  ) : role === "state_role" ? (
                    <h4>Human Resource Proposal - State</h4>
                  ) : (
                    <h4>Human Resource Proposal - District</h4>
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
                              <b>Date of submission</b>
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
                                obj && obj.submission
                                  ? obj.submission.split("T")[0] || ""
                                  : obj.submission || ""
                              }
                              // disabled={role === "admin_role" ? false : true}
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
                              onChange={(e) =>
                                this.setState({
                                  obj: {
                                    ...this.state.obj,
                                    typeofApproval: e.target.value,
                                  },
                                })
                              }
                              value={obj.typeofApproval || ""}
                              // disabled={role === "admin_role" ? false : true}
                              // invalid={errors.typeofApproval ? true : false}
                            >
                              <Radio value="1">Annual RoP</Radio>
                              <Radio value="2">Supplementary RoP</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display:
                                  errors.typeofApproval === ""
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
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Target Financial Year 1</b>
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
                    <Row gutter={20}>
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
                              disabled={obj.typeofApproval === 2 ? false : true}
                            >
                              <option value="0">-Select-</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </CSelect>
                          </Col>
                        </CFormGroup>
                      </Col>
                      {/* {obj.financialYear>0 ? */}
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Target Financial Year 2</b>
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
                    <Row gutter={20}>
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
                    <table className="table table-bordered table-sm">
                      <thead>
                        <tr>
                          <th rowSpan={2} style={{width:'7.14%'}}>Financial Year</th>
                          <th rowSpan={2} style={{width:'7.14%'}}>
                            <b>Name of Post / Category</b>
                          </th>
                          <th rowSpan={2} style={{width:'7.14%'}}>
                            <b>
                              Requirement
                              <br />
                              (In Number)
                            </b>
                          </th>
                          <th colSpan={2} className="text-center" style={{width:'7.14%'}}>
                            <b>
                              Regular <br />
                              (In Number)
                            </b>
                          </th>
                          <th colSpan={2} className="text-center" style={{width:'7.14%'}}>
                            <b>
                              Contractual <br />
                              (In Number)
                            </b>
                          </th>
                          <th colSpan={2} className="text-center" style={{width:'7.14%'}}>
                            <b>
                              Regular + Contractual <br />
                              (In Number)
                            </b>
                          </th>
                          <th rowSpan={2} style={{width:'7.14%'}}>
                            <b>Percentage of HRH Available</b>
                          </th>
                          <th rowSpan={2} style={{width:'7.14%'}}> Target available (%)</th>
                        </tr>
                        <tr>
                          <th style={{width:'7.14%'}}>Sanctioned</th>
                          <th style={{width:'7.14%'}}>IN place</th>
                          <th style={{width:'7.14%'}}>Sanctioned</th>
                          <th style={{width:'7.14%'}}>In place</th>
                          <th style={{width:'7.14%'}}>Sanctioned</th>
                          <th style={{width:'7.14%'}}>In place</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {this.state.numberTableRows.map((data, i) => { */}
                        {this.state.catPos.map((data, i) => {
                          console.log(data);
                          return (
                            <tr key={i}>
                              <td>
                                <CFormGroup>
                                  <CSelect
                                    placeholder="Select"
                                    onChange={this.handleChange}
                                    name="financialYear"
                                    value={obj.financialYear || ""}
                                    invalid={
                                      errors.financialYear ? true : false
                                    }
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
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="text"
                                    disabled
                                    value={data.categoryName || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
                                    invalid={
                                      errors.numberofOldSanc ? true : false
                                    }
                                  />
                                  {/* <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="categoryId"
                              value={obj.categoryId || ""}
                              invalid={errors.categoryId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.catPos &&
                                this.state.catPos.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                       {item.categoryName}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect> */}
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    value={obj.numberofOldSanc || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
                                    invalid={
                                      errors.numberofOldSanc ? true : false
                                    }
                                  />
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    value={obj.numberofOldSanc || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
                                    invalid={
                                      errors.numberofOldSanc ? true : false
                                    }
                                  />
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    value={obj.numberofOldSanc || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
                                    invalid={
                                      errors.numberofOldSanc ? true : false
                                    }
                                  />
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    value={obj.numberofOldSanc || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
                                    invalid={
                                      errors.numberofOldSanc ? true : false
                                    }
                                  />
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    value={obj.numberofOldSanc || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
                                    invalid={
                                      errors.numberofOldSanc ? true : false
                                    }
                                  />
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    value={obj.numberofOldSanc || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
                                    invalid={
                                      errors.numberofOldSanc ? true : false
                                    }
                                  />
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    value={obj.numberofOldSanc || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
                                    invalid={
                                      errors.numberofOldSanc ? true : false
                                    }
                                  />
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    value={obj.numberofOldSanc || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
                                    invalid={
                                      errors.numberofOldSanc ? true : false
                                    }
                                  />
                                </CFormGroup>
                              </td>
                              <td>
                                {" "}
                                <CFormGroup>
                                  <CInput
                                    type="number"
                                    value={obj.numberofOldSanc || ""}
                                    name="numberofOldSanc"
                                    onChange={(e) => this.handleTablePlace(e)}
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
                    <Row gutter={20}>
                      <CButton
                        color="primary"
                        disabled
                        style={{ marginTop: 10, marginBottom: 10 }}
                        onClick={() =>
                          // console.log('hi')
                          this.setState((prevState) => ({
                            numberTableRows: [
                              ...prevState.numberTableRows,
                              {
                                // id: prevState + 1,
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
                          }))
                        }
                      >
                        Add Line
                      </CButton>
                    </Row>
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
                    {role === "district_role" ? null : (
                      <Tabs>
                        <TabPane tab="State Details" key="1">
                          {/* <Table dataSource={this.state.tableRows} columns={this.state.stateColumn} /> */}
                          <table
                            className="table table-bordered"
                            style={{
                              borderColor: this.state.errorMsg ? "red" : "",
                            }}
                          >
                            <thead gutter={24}>
                              <tr>
                                <th span={12}>
                                  <b>Sr. No.</b>
                                </th>
                                <th span={12}>
                                  <b>Place of Position</b>
                                </th>
                                <th span={12}>
                                  <b>State</b>
                                </th>
                                <th span={12}>
                                  <b>Division</b>
                                </th>
                                <th span={12}>
                                  <b>District</b>
                                </th>
                                <th span={12}>
                                  <b>Facility</b>
                                </th>
                                <th span={12}>
                                  <b>Sanctioned Posts</b>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.tableRows.map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td span={12}>
                                      <CFormGroup>
                                        <CInput
                                          placeholder={i + 1}
                                          type="number"
                                          readOnly
                                        />
                                      </CFormGroup>
                                    </td>
                                    <td span={12}>
                                      <CFormGroup>
                                        <CSelect
                                          name="placeofPostId"
                                          placeholder="Select"
                                          onChange={(e) =>
                                            this.handleTablePlace(e, i)
                                          }
                                          value={data.placeofPostId || ""}
                                          disabled={
                                            role === "state_role" ? false : true
                                          }
                                          invalid={
                                            errors.placeofPostId ? true : false
                                          }
                                        >
                                          <option value="0">-Select-</option>
                                          {this.state.placeOfPositionArray &&
                                            this.state.placeOfPositionArray.map(
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
                                    <td span={12}>
                                      <CFormGroup>
                                        <CSelect
                                          name="stateId"
                                          placeholder="Select"
                                          onChange={(e) =>
                                            this.handleTablePlace(e, i)
                                          }
                                          value={obj.stateId || ""}
                                          disabled
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
                                      </CFormGroup>
                                    </td>
                                    <td span={12}>
                                      <CFormGroup>
                                        <CSelect
                                          name="divisionId"
                                          placeholder="Select"
                                          onChange={(e) =>
                                            this.handleTablePlace(e, i)
                                          }
                                          value={data.divisionId || ""}
                                          invalid={
                                            errors.divisionId ? true : false
                                          }
                                          disabled={
                                            role === "state_role" ? false : true
                                          }
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
                                          {errors.divisionId}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td span={12}>
                                      <CFormGroup>
                                        <CSelect
                                          name="districtId"
                                          placeholder="Select"
                                          onChange={(e) =>
                                            this.handleTablePlace(e, i)
                                          }
                                          value={data.districtId || ""}
                                          invalid={
                                            errors.districtId ? true : false
                                          }
                                          disabled={
                                            role === "state_role" ? false : true
                                          }
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
                                          {errors.districtId}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td span={12}>
                                      <CFormGroup>
                                        <CSelect
                                          name="typeofFacilityOfficeId"
                                          placeholder="Select"
                                          onChange={(e) =>
                                            this.handleTablePlace(e, i)
                                          }
                                          value={
                                            data.typeofFacilityOfficeId || ""
                                          }
                                          invalid={
                                            errors.typeofFacilityOfficeId
                                              ? true
                                              : false
                                          }
                                          disabled={
                                            role === "state_role" ? false : true
                                          }
                                        >
                                          <option value="0">-Select-</option>
                                          {this.props.typeFacilityList &&
                                            this.props.typeFacilityList.map(
                                              (item, i) => (
                                                <option
                                                  key={item.id}
                                                  value={item.id}
                                                >
                                                  {item.facilityType}
                                                </option>
                                              )
                                            )}
                                        </CSelect>
                                        <FormFeedback>
                                          {errors.typeofFacilityOfficeId}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td span={12}>
                                      <CFormGroup>
                                        <CInput
                                          name="sacnctionPost"
                                          type="number"
                                          value={data.sacnctionPost || ""}
                                          onChange={(e) =>
                                            this.handleTablePlace(e, i)
                                          }
                                          disabled={
                                            role === "state_role" ? false : true
                                          }
                                          invalid={
                                            errors.sacnctionPost ? true : false
                                          }
                                        />
                                        <FormFeedback>
                                          {errors.sacnctionPost}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td>
                                      {i === 0 ? null : (
                                        <CIcon
                                          name="cilXCircle"
                                          className="flex-shrink-0 me-2"
                                          width={40}
                                          height={40}
                                          onClick={() => this.removeClick(i)}
                                        />
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                              {role === "state_role" ? (
                                <Button
                                  color="primary"
                                  onClick={() =>
                                    this.setState({
                                      tableRows: [
                                        ...this.state.tableRows,
                                        {
                                          srNo: 0,
                                          placeofPostId: 0,
                                          sacnctionPost: 0,
                                          divisionId: 0,
                                          districtId: 0,
                                          typeofFacilityOfficeId: 0,
                                          district: 0,
                                        },
                                      ],
                                    })
                                  }
                                >
                                  Add Line
                                </Button>
                              ) : null}
                            </tbody>
                          </table>
                        </TabPane>
                        <TabPane tab="District Details" key="2">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th className="col-sm-1">
                                  <b>Sr. No.</b>
                                </th>
                                <th className="col-sm-2">
                                  <b>Place of Position</b>
                                </th>
                                <th className="col-sm-2">
                                  <b>State</b>
                                </th>
                                <th className="col-sm-2">
                                  <b>Division</b>
                                </th>
                                <th className="col-sm-2">
                                  <b>District</b>
                                </th>
                                <th className="col-sm-2">
                                  <b>Facility</b>
                                </th>
                                <th className="col-sm-1">
                                  <b>Sanctioned Posts</b>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.secondTableRows.map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td>
                                      <Form.Item
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter!",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder={i + 1}
                                          type="number"
                                          readOnly
                                        />
                                      </Form.Item>
                                    </td>
                                    <td>
                                      <Form.Item
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please Select!",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select"
                                          disabled={
                                            role === "district_role"
                                              ? false
                                              : true
                                          }
                                        >
                                          {this.state.placeOfPositionArray.map(
                                            (item, index) => {
                                              return (
                                                <Select.Option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </Select.Option>
                                              );
                                            }
                                          )}
                                        </Select>
                                      </Form.Item>
                                    </td>
                                    <td>
                                      <Form.Item
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter!",
                                          },
                                        ]}
                                      >
                                        <Input disabled />
                                      </Form.Item>
                                    </td>
                                    <td>
                                      <Form.Item
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter!",
                                          },
                                        ]}
                                      >
                                        <Input disabled />
                                      </Form.Item>
                                    </td>
                                    <td>
                                      <Form.Item
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter!",
                                          },
                                        ]}
                                      >
                                        <Input disabled />
                                      </Form.Item>
                                    </td>
                                    <td>
                                      <Form.Item
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter!",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select"
                                          disabled={
                                            role === "district_role"
                                              ? false
                                              : true
                                          }
                                        >
                                          {this.props.typeFacilityList.map(
                                            (item, index) => {
                                              return (
                                                <Select.Option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.facilityType}
                                                </Select.Option>
                                              );
                                            }
                                          )}
                                        </Select>
                                      </Form.Item>
                                    </td>
                                    <td>
                                      <Form.Item
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter!",
                                          },
                                        ]}
                                      >
                                        <Input
                                          type="number"
                                          disabled={
                                            role === "district_role"
                                              ? false
                                              : true
                                          }
                                        />
                                      </Form.Item>
                                    </td>
                                  </tr>
                                );
                              })}
                              {role === "district_role" ? (
                                <Button
                                  color="primary"
                                  onClick={() =>
                                    this.setState({
                                      secondTableRows: [
                                        ...this.state.secondTableRows,
                                        {
                                          srNo: 0,
                                          placeOfPosition: 0,
                                          sacnctionPost: 0,
                                          division: 0,
                                          district: 0,
                                        },
                                      ],
                                    })
                                  }
                                >
                                  Add Line
                                </Button>
                              ) : null}
                            </tbody>
                          </table>
                        </TabPane>
                      </Tabs>
                    )}
                    <Space size="middle" style={{ paddingTop: "5px" }}>
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
                      {role === "admin_role" ? (
                        <Button
                          color="primary"
                          style={{
                            display:
                              obj.statuss === 1 || obj.statuss === 3
                                ? "block"
                                : "none",
                          }}
                        >
                          Send for Approval
                        </Button>
                      ) : null}
                      {role === "admin_role" ? (
                        <Button
                          color="primary"
                          // style={{
                          //   display: obj.statuss === 2 ? "block" : "none",
                          // }}
                        >
                          Approved
                        </Button>
                      ) : null}
                      {role === "admin_role" ? (
                        <Button
                          color="primary"
                          style={{
                            display: obj.statuss === 2 ? "block" : "none",
                          }}
                        >
                          Reject
                        </Button>
                      ) : null}
                      {role === "admin_role" ? (
                        <Button
                          color="primary"
                          style={{
                            display: obj.statuss === 2 ? "block" : "none",
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
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      retrieveDistricts,
      retrieveProgramType,
      addHR,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(HRKeyDeliverables);
