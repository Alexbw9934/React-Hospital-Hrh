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
  CToast,
  CToastBody,
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
  message,
} from "antd";
import axios from "axios";
import {
  retrieveTypeOfFacility,
  retrieveFinancialYear,
  retrieveDistricts,
  retrieveProgramType,
  retrieveFinancialStatus,
  addHR,
} from "../../actions/apiadd";
import { retrievePost, retrieveSubTypeofPost,retrieveReprtingPeriod } from "../../actions/masterapi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback, ListGroupItemHeading } from "reactstrap";
import { Link } from "react-router-dom";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class HumanResourceProposalState extends Component {
  constructor() {
    super();
    this.state = {
      physical: [],
      financial:[],
      key:[],
      statusMsg: false,
      country: "",
      modalShow: false,
      formStatus: 0,
      amendList: [],
      states: [],
      catPos: [],
      position: [],
      errors: {},
      tableRowsDetails: [],
      tableData: [
        { id: "1", name: "Draft" },
        { id: "2", name: "National Approval" },
        { id: "3", name: "Approved" },
      ],
      statusArray: [
        { id: "0", name: "Draft" },
        { id: "1", name: "Pending Approval" },
        { id: "5", name: "Need Amendment" },
        { id: "4", name: "Approved" },
        { id: "6", name: "Canceled" },
        { id: "7", name: "Rejected" },
      ],
      distribute: [],
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
        formStatus: 1,
      },
      keydeil: [
        {
          finacialYearId: 0,
          categoryofPostId: 0,
          postId: 0,
          reqirementNo: 0,
          regSanctioned: 0,
          regInPlace: 0,
          contractualApprov: 0,
          contractualInPlace: 0,
          regContractSanctioned: 0,
          regContractInPlace: 0,
          percHrAvail: 0,
          totalAvail: 0,
        },
      ],
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
        { id: "1", name: "State" },
        { id: "3", name: "Division" },
        { id: "2", name: "District" },
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
      paramId: 0,
      postList: [],
      tabView: [],
      fmrList: [],
      isModalVisible: false,
      modalData: { allocated: 0, unallocated: 0 },
      show: false,
    };
  }
  checkingparse = (data) => {
    if (!data) return {};
    if (typeof data === "object") return data;
    if (typeof data === "string") return JSON.parse(data);

    return {};
  };
  componentDidMount() {
    this.props.retrieveDistricts();
    this.props.retrieveFinancialStatus();
    this.props.retrievePost();
    this.props.retrieveSubTypeofPost();
    this.props.retrieveReprtingPeriod()
    const valueParse = this.checkingparse(this.state.object);
    this.setState({ obj: valueParse });
    console.log(valueParse);
    axios({
      url: `${process.env.REACT_APP_API_URL}FMRs`,
      method: "GET",
    }).then((response) => {
      this.setState({ fmrList: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Posts`,
      method: "GET",
    }).then((response) => {
      this.setState({ postList: response.data });
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
      url: `${process.env.REACT_APP_API_URL}Posts`,
      method: "GET",
    }).then((response) => {
      console.log("position", response.data);
      this.setState({ position: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}FMRs`,
      method: "GET",
    }).then((response) => {
      this.setState({ fmrList: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}StateDistributionKeyDeliverables`,
      method: "GET",
    }).then((response) => {
      this.setState({key: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}StateFinancialDistributions`,
      method: "GET",
    }).then((response) => {
      console.log("position", response.data);
      this.setState({ distribute: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}StatePysicalDistributions`,
      method: "GET",
    }).then((response) => {
      console.log("position", response.data);
      this.setState({ physical: response.data });
    });
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      axios({
        url: `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${paramId}`,
        method: "GET",
      }).then((response) => {
        let obj = response.data;
        console.log(obj, "object");
        this.setState({ obj });
        axios({
          url: `${process.env.REACT_APP_API_URL}PhysicalStatus`,
          method: "GET",
        }).then((response) => {
          const arr = response.data.filter(
            (data) => data.humanResourceProposalNationalId === obj.id
          );
          console.log(obj.id, "YYYYYYYYYYYYYYYYYYYYYYYY");
          this.setState({ numberTableRows: arr });
        });
        axios({
          url: `${process.env.REACT_APP_API_URL}FinancialStatus`,
          method: "GET",
        }).then((response) => {
          const arr = response.data.filter(
            (data) => data.humanResourceProposalNationalId === obj.id
          );
          this.setState({ tableRows: arr });
        });
        axios({
          url: `${process.env.REACT_APP_API_URL}KeyDeliverables`,
          method: "GET",
        }).then((response) => {
          const arr = response.data.filter(
            (data) => data.humanResourceProposalNationalId === obj.id
          );
          console.log(arr, "key de");
          this.setState({ keydeil: arr });
        });
      });
    }
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveProgramType();
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
    }
    setTimeout(() => {
      this.setState({ postMsg: false });
    }, 10000);
  };
  newCollector = (val,pty) => {
    const { obj } = this.state;
    this.props.history.push({
      pathname:
        "/hrh/HumanResourceProposalDetails/HumanResourceProposalState/Distribute",
      state: {
        pId: val,
        objId: this.state.obj.id,
        sId: this.state.obj.stateId,
        pTy:pty,
        rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  };
  openModal = () => {
    this.setState({ show: true });
  };
  closeModal = () => {
    this.setState({ show: false });
  };
  physicalCollector2 = (val,pty) => {
    const { obj } = this.state;
    this.props.history.push({
      pathname:
        "/hrh/HumanResourceProposalDetails/HumanResourceProposalState/Distribute",
      state: {
        ppId: val,
        objId: this.state.obj.id,
        sId: this.state.obj.stateId,
        pTy:pty,
        rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  };
  financeCollector = (id) => {
    const { obj } = this.state;
    this.props.history.push({
      pathname: `/hrh/HumanResourceProposalDetails/HumanResourceProposalState/DistributeFinancial`,
      state: {
        objId: `${obj.id}`,
        data: `${id}`,
        sId: `${obj.stateId}`,
        rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  };
  financeCollector2 = (id) => {
    const { obj } = this.state;
    this.props.history.push({
      pathname: `/hrh/HumanResourceProposalDetails/HumanResourceProposalState/DistributeFinancial`,
      state: {
        objId: `${obj.id}`,
        fId: `${id}`,
        sId: `${obj.stateId}`,
        rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  };
  keyCollector=(id)=>{
    const { obj } = this.state;
    this.props.history.push({
      pathname: `/hrh/HumanResourceProposalDetails/HumanResourceProposalState/KeyDistribute`,
      state: {
        objId: `${obj.id}`,
        kId: `${id}`,
        sId: `${obj.stateId}`,
          rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  }
  keyCollector2=(id)=>{
    const { obj } = this.state;
    this.props.history.push({
      pathname: `/hrh/HumanResourceProposalDetails/HumanResourceProposalState/KeyDistribute`,
      state: {
        objId: `${obj.id}`,
        data: `${id}`,
        sId: `${obj.stateId}`,
        rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  }
  changeStatus = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/stateStatus",
          value: 1,
        },
      ];
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operation),
        }
      ).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          message.success("Changed Successfully!");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  need = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/stateStatus",
          value: 5,
        },
      ];
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operation),
        }
      ).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          message.success("Changed Successfully!");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  cancel = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/stateStatus",
          value: 6,
        },
      ];
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operation),
        }
      ).then((response) => {
        if (response.status === 201) {
          message.success("Canceled Successfully!");
          console.log("SUCCESSS");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  approv = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/stateStatus",
          value: 4,
        },
      ];
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operation),
        }
      ).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          message.success("Approved Successfully!");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 10000);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  reject = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/stateStatus",
          value: 7,
        },
      ];
      fetch(
        `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(operation),
        }
      ).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          message.success("Rejected Successfully!");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  showConfirm = (value, status) => {
    confirm({
      // title:"",
      content: "Are you Sure?",
      onOk: () => {
        return status === 1
          ? this.changeStatus(value)
          : status === 4
          ? this.approv(value)
          : status === 6
          ? this.cancel(value)
          : status === 7
          ? this.reject(value)
          : status === 5
          ? this.need(value)
          : console.log("none");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  render() {
    const { obj, role, errors, modalData, amendList } = this.state;
    console.log(obj, "finannacial object");
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
                  <h4>Human Resource Proposal - State</h4>
                </div>
              </CCardHeader>
              <CCard>
                {/* {this.state.statusMsg ? ( */}
                <CToast
                  autohide={false}
                  visible={this.state.statusMsg}
                  className="align-items-center"
                >
                  <div className="d-flex">
                    <CToastBody>Changed Successfully!</CToastBody>
                    {/* <CToastClose className="me-2 m-auto" /> */}
                  </div>
                </CToast>
                {/* ) : null} */}
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
                              disabled
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
                                    typeofApprovalId: e.target.value,
                                  },
                                })
                              }
                              value={obj.typeofApprovalId || ""}
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
                              disabled={
                                role === "state_role" || obj.typeofApproval === 1
                                  ? true
                                  : false
                              }
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
                    <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              disabled
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="financialYearId"
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
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Reporting Period</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              disabled
                              name="reportngPriod"
                              value={obj.reportngPriod || ""}
                              invalid={errors.reportngPriod ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.reportingPeriodList &&
                                this.props.reportingPeriodList.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.name}
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
                              <b>Assigned To(Maker)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              disabled
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
                              <b>Status</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              name="formStatus"
                              value={obj.formStatus || ""}
                              disabled
                              onChange={this.handleChange}
                              invalid={errors.formStatus ? true : false}
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
                            <FormFeedback>{errors.formStatus}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                    <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Form ID</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput value={obj.id||""} disabled name="formId" onChange={this.handleChange} />
                            <FormFeedback>{errors.formStatus}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Tabs>
                      <TabPane tab="Physical Status" key="1">
                        <table className="table table-bordered table-responsive">
                          <thead>
                            <tr>
                              <th style={{ width: "6.25%" }}>
                                <b>Program Type</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Type of Post</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Sub type of Post</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>FMR Code</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Category of post</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Name of the post</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Approval Type</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Number of Post approved(On going)</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Number of Post proposed</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Number of Post dropped</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Number of Post In place</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>Number of new post approved</b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>
                                  Monthly average salary per month per post (in
                                  INR)
                                </b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>
                                  Total number of posts approved in RoP -
                                  ((Ongoing + new approved)- Dropped)
                                </b>
                              </th>
                              <th style={{ width: "6.25%" }}>
                                <b>
                                  Total number of post vacant- (Total Approved
                                  in RoP- In Place)
                                </b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.numberTableRows.map((data, i) => {
                              console.log(data, "data");
                              return (
                                <tr key={i}>
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
                                       style={{ width: "150px" }}
                                        name="fmr"
                                        disabled
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.typeofPostId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.postList &&
                                          this.props.postList.map((user) => (
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
                                        style={{ width: "150px" }}
                                        name="typeofPositionId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.subTypeofPostId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.subTypeofPostList &&
                                          this.props.subTypeofPostList.map(
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
                                        name="categoryofPostId"
                                        value={data.fmrCodeId || ""}
                                        invalid={
                                          errors.categoryofPostion
                                            ? true
                                            : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.fmrList &&
                                          this.state.fmrList.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.fmr}
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
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="categoryofPostId"
                                        value={data.categoryofPostId || ""}
                                        invalid={
                                          errors.categoryofPostion
                                            ? true
                                            : false
                                        }
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
                                        name="positionId"
                                        value={data.postId || ""}
                                        invalid={
                                          errors.nameofPost ? true : false
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
                                        name="positionId"
                                        value={data.approvalTypeId || ""}
                                        invalid={
                                          errors.nameofPost ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        <option value="1">Number</option>
                                        <option value="2">Lumpsum </option>
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
                                        name="numberofNewPostion"
                                        value={data.numofPostApprov || ""}
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
                                       style={{ width: "70px" }}
                                        type="number"
                                        // value={
                                        //   Number(data.numberofPostSanc) +
                                        //     Number(data.numberofNewPostion) || ""
                                        // }
                                        value={data.numofPostProposed || ""}
                                        disabled
                                        name="totalNoPostionApprov"
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
                                        value={data.numofPostDrop || ""}
                                        name="numberofPostPlace"
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
                                        value={data.numofPostPlace || ""}
                                        name="numberofOldSanc"
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
                                        style={{ width: "70px" }}
                                        disabled
                                        value={data.numofNewPostApprov || ""}
                                        name="numberofPostVaccant"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofPostVaccant
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{ width: "70px" }}
                                        disabled
                                        value={data.monthlyAverSalary || ""}
                                        name="numberofPostVaccant"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofPostVaccant
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{ width: "70px" }}
                                        disabled
                                        value={data.totalNoPostApprov || ""}
                                        name="numberofPostVaccant"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofPostVaccant
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{ width: "70px" }}
                                        disabled
                                        value={data.totalNoPostVacant || ""}
                                        name="numberofPostVaccant"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofPostVaccant
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  {obj.stateStatus === 4 ||obj.stateStatus === 6||obj.stateStatus === 7 ? null: (
                                    <td>
                                      {this.state.physical.filter(
                                        (d) => d.physicalStatusId === data.id
                                      ).length > 0 ? (
                                        <CButton
                                          color="primary"
                                          onClick={() =>
                                            this.physicalCollector2(data.id,data.programTypeId)
                                          }
                                        >
                                          View Distribution
                                        </CButton>
                                      ) : (
                                        <Space>
                                          <CButton
                                            color="primary"
                                            onClick={() =>
                                              this.newCollector(data.id,data.programTypeId)
                                            }
                                          >
                                            Distribute
                                          </CButton>{" "}
                                        </Space>
                                      )}
                                    </td>
                                  ) }
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Financial Status" key="2">
                        <table className="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th>
                                <b>Program Type</b>
                              </th>
                              <th>
                                <center>
                                  <b>Budget Recommended under NRHM</b>
                                </center>
                              </th>
                              <th>
                                <b>Financial year</b>
                              </th>
                              <th>
                                <b> Amount (In Lakh)</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.tableRows.map((val, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <b>
                                      {this.props.programTypeList
                                        .filter(
                                          (data) => data.id === val.programTypeId
                                        )
                                        .map((id) => {
                                          return id.name;
                                        })}
                                    </b>
                                  </td>
                                  <td>
                                    <b>
                                      {this.props.financialStatusList
                                        .filter((data) => data.id === val.budget)
                                        .map((id) => {
                                          return id.name;
                                        })}
                                    </b>
                                  </td>
                                  <td>
                                    {this.props.financialYearList
                                      .filter(
                                        (data) => data.id === val.finacialYearId
                                      )
                                      .map((id) => {
                                        return `${new Date(
                                          id.fromDate
                                        ).getFullYear()}-${new Date(
                                          id.toDate
                                        ).getFullYear()}`;
                                      })}
                                  </td>
                                  <td>{val.amount}</td>
                                 {obj.stateStatus===4 ||obj.stateStatus === 6||obj.stateStatus === 7? null:
                                  <td>
                                    {" "}
                                    {this.state.distribute.filter(
                                      (data) => data.financialStatusId === val.id
                                    ).length > 0 ? (
                                      <CButton
                                        color="primary"
                                        onClick={() =>
                                          this.financeCollector(val.id)
                                        }
                                      >
                                        View Distribution
                                      </CButton>
                                    ) : (
                                      <Space>
                                        <CButton
                                          color="primary"
                                          onClick={() => this.financeCollector2(val.id)}
                                        >
                                          Distribute
                                        </CButton>{" "}
                                      </Space>
                                    )}
                                  </td>}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Key Deliverables" key="3">
                        <table className="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                Financial Year
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Category of Post</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Name of Post</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>
                                  Requirement
                                  <br />
                                  (In Number)
                                </b>
                              </th>
                              <th colSpan={2} style={{ width: "16%" }}>
                                <b>
                                  Regular <br />
                                  (In Number)
                                </b>
                              </th>
                              <th colSpan={2} style={{ width: "16%" }}>
                                <b>
                                  Contractual <br />
                                  (In Number)
                                </b>
                              </th>
                              <th colSpan={2} style={{ width: "16%" }}>
                                <b>
                                  Regular + Contractual <br />
                                  (In Number)
                                </b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Percentage of HRH Available</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                {" "}
                                Target available (%)
                              </th>
                            </tr>
                            <tr>
                              <th>Sanctioned</th>
                              <th>IN place</th>
                              <th> Approved</th>
                              <th>In place</th>
                              <th>Sanctioned</th>
                              <th>In place</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.keydeil.map((data, i) => {
                              console.log(data, "position");
                              return (
                                <tr key={i}>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        onChange={this.handleChange}
                                        name="finacialYearId"
                                        value={data.finacialYearId || ""}
                                        invalid={
                                          errors.financialYear ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.financialYearList &&
                                          this.props.financialYearList.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
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
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        onChange={this.handleChange}
                                        name="categoryofPostId"
                                        value={data.categoryofPostId || ""}
                                        invalid={errors.category ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.categoryofPost &&
                                          this.props.categoryofPost.map(
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
                                      <CSelect
                                        placeholder="Select"
                                        onChange={this.handleChange}
                                        name="postId"
                                        value={data.postId || ""}
                                        invalid={errors.category ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.postList &&
                                          this.state.postList.map(
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
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.reqirementNo || ""}
                                        name="reqirementNo"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
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
                                        value={data.regSanctioned || ""}
                                        name="regSanctioned"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
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
                                        value={data.regInPlace || ""}
                                        name="regInPlace"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
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
                                        value={data.contractualApprov || ""}
                                        name="contractualApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
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
                                        value={data.contractualInPlace || ""}
                                        name="contractualInPlace"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
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
                                        value={data.regContractSanctioned || ""}
                                        name="regContractSanctioned"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
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
                                        value={data.regContractInPlace || ""}
                                        name="regContractInPlace"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
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
                                        value={data.percHrAvail || ""}
                                        name="percHrAvail"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
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
                                        value={data.totalAvail || ""}
                                        name="totalAvail"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    {this.state.key.filter(
                                      (d) =>
                                        d.keyDeliverableId === data.id
                                    ).length > 0 ? (
                                      <CButton
                                        color="primary"
                                        onClick={() => this.keyCollector2(data.id)}
                                      >
                                        View Distribution
                                      </CButton>
                                    ) : (
                                      <Space>
                                        <CButton
                                          color="primary"
                                          onClick={() =>
                                            this.keyCollector(data.id)
                                          }
                                        >
                                          Distribute
                                        </CButton>{" "}
                                      </Space>
                                     )} 
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Amendments" key="4">
                        <table className="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th>Created By</th>
                              <th>Created At</th>
                              <th>Amendment Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            {amendList.length > 0 ? (
                              amendList.map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td>
                                      {" "}
                                      <CFormGroup>
                                        <CInput
                                          id="form"
                                          name="submission"
                                          type="text"
                                          disabled
                                          onChange={this.handleChange}
                                          value={data.createdBy}
                                          invalid={
                                            errors.submission ? true : false
                                          }
                                        />
                                        <FormFeedback>
                                          {errors.submission}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td>
                                      {" "}
                                      <CFormGroup>
                                        <CInput
                                          id="form"
                                          name="submission"
                                          type="text"
                                          disabled
                                          onChange={this.handleChange}
                                          value={data.createdBy}
                                          invalid={
                                            errors.submission ? true : false
                                          }
                                        />
                                        <FormFeedback>
                                          {errors.submission}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td>
                                      {" "}
                                      <CFormGroup>
                                        <CInput
                                          id="form"
                                          name="submission"
                                          type="text"
                                          disabled
                                          onChange={this.handleChange}
                                          value={data.createdBy}
                                          invalid={
                                            errors.submission ? true : false
                                          }
                                        />
                                        <FormFeedback>
                                          {errors.submission}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan={3}>Loading...</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </TabPane>
                    </Tabs>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Assigned To (Maker)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              disabled
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
                              <b>State Status</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              name="stateStatus"
                              value={obj.stateStatus || ""}
                              disabled
                              onChange={this.handleChange}
                              invalid={errors.stateStatus ? true : false}
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
                            <FormFeedback>{errors.formStatus}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Space size="middle" style={{ paddingTop: "5px" }}>
                      {/* <CButton
                        disabled={this.state.disableSub}
                        color="primary"
                        type="submit"
                      >
                        {this.state.paramId ? "Update" : "Submit"}
                      </CButton>
                      <CButton
                        color="light"
                        onClick={(e) => {
                          e.preventDefault();
                          this.partialSave();
                        }}
                      >
                        Save
                      </CButton> */}
                      <CButton
                        color="dark"
                        onClick={() => this.setState({ statusMsg: true })}
                      >
                        Download
                      </CButton>
                      {obj.stateStatus === 0 || obj.stateStatus === 5 ? (
                        <CButton
                          color="info"
                          onClick={() => {
                            this.showConfirm(obj.id, 1);
                          }}
                        >
                          Submit for Approval
                        </CButton>
                      ) : null}
                      {obj.formStatus === 1 ? (
                        <CButton
                          color="secondary"
                          // onClick={() => this.handleAmend()}
                        >
                          Send for Amendment
                        </CButton>
                      ) : null}
                      {obj.stateStatus === 1 ? (
                        <CButton
                          color="success"
                          onClick={() => this.showConfirm(obj.id, 4)}
                        >
                          Approve
                        </CButton>
                      ) : null}
                      {obj.stateStatus === 1 ? (
                        <CButton
                          color="warning"
                          onClick={() => this.showConfirm(obj.id, 7)}
                        >
                          Reject
                        </CButton>
                      ) : null}
                      {obj.stateStatus === 0 || obj.stateStatus === 1 ? (
                        <CButton
                          color="danger"
                          onClick={() => this.showConfirm(obj.id, 6)}
                        >
                          Cancel
                        </CButton>
                      ) : null}
                    </Space>
                    <Modal
                      width={1000}
                      height={500}
                      centered
                      visible={this.state.show}
                      onOk={() => this.setState({ show: false })}
                      onCancel={() => this.setState({ show: false })}
                    >
                      <Row gutter={20}>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <Radio.Group
                                onChange={(e) =>
                                  this.setState({
                                    obj: {
                                      ...this.state.obj,
                                      assign: e.target.value,
                                    },
                                  })
                                }
                                value={obj.assign || ""}
                              >
                                <Radio value="1">Assign To (Maker)</Radio>
                                <br />
                                <Radio value="2">Distribute</Radio>
                                <br />
                                <Radio value="3">Distribution Completed</Radio>
                              </Radio.Group>
                            </Col>
                          </CFormGroup>
                        </Col>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel>
                                <b>Assign To (Maker)</b>
                              </CLabel>
                            </Col>
                            <Col>
                              <CSelect
                                disabled
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
                              <br />
                              <CButton color="primary">
                                Send to Division/District
                              </CButton>
                            </Col>
                          </CFormGroup>
                        </Col>
                      </Row>
                    </Modal>
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
    financialStatusList: state.apiadd.financialStatusList,
    postList: state.masterapi.postList,
    subTypeofPostList: state.masterapi.subTypeofPostList,
    reportingPeriodList: state.masterapi.reportingPeriodList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      retrieveDistricts,
      retrieveProgramType,
      retrieveFinancialStatus,
      retrievePost,
      retrieveSubTypeofPost,
      addHR,
      retrieveReprtingPeriod,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanResourceProposalState);
