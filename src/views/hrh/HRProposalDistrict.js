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
  Upload,
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
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class HRProposalDistrict extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      statusMsg:false,
      formStatus: 0,
      states: [],
      catPos: [],
      position: [],
      errors: {},
      keyDeil:[],
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
        { id: "4", name: "Approve" },
        { id: "6", name: "Canceled" },
        { id: "7", name: "Rejected" },
      ],
      divisionArray: [],
      detailsArray: [],
      detailLastId: 0,
      districtCategory: [],
      obj: {},
      numberTableRows: [{}],
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
      tableRows: [{}],
      keyDeil:[],
      physical: [],
      financial: [],
      paramId: 0,
      tabView: [],
      fmrList: [],
      isModalVisible: false,
      tabdata: {},
    };
  }
  componentDidMount() {
    this.props.retrieveDistricts();
    this.props.retrievePost();
    this.props.retrieveSubTypeofPost();
    this.props.retrieveReprtingPeriod()
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
    if(this.props.history.location.state){
    let paramId = this.props.history.location.state.data;
    axios({
      url: `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${paramId}`,
      method: "GET",
    }).then((response) => {
      let obj = response.data;
      this.setState({ obj });
      axios({
        url: `${process.env.REACT_APP_API_URL}StatePysicalDistributions`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) =>
            data.humanResourceProposalNationalId === obj.id &&
            data.districtId === 1
        );
        console.log(arr,'value from array')
        this.setState({ numberTableRows: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}StateFinancialDistributions`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) =>
            data.humanResourceProposalNationalId === obj.id &&
            data.districtId === 1
        );
        this.setState({ tableRows: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}StateDistributionKeyDeliverables`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) =>
            data.humanResourceProposalNationalId === obj.id &&
            data.districtId === 1
        );
        console.log(arr,'value from array')
        this.setState({ keyDeil: arr });
      });
    })
    }
    axios({
      url: `${process.env.REACT_APP_API_URL}DistrictPhysicalDistributions`,
      method: "GET",
    }).then((response) => {
      this.setState({ physical: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}DistrictFianancialDistributions`,
      method: "GET",
    }).then((response) => {
      this.setState({ financial: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}DistrictDistributionKeyDeliverables`,
      method: "GET",
    }).then((response) => {
      this.setState({ keyDeil: response.data });
    });
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveProgramType();
    this.props.retrieveFinancialStatus();
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
  newCollector = (id) => {
    this.props.history.push({
      pathname:
        "/hrh/HumanResourceProposalDetails/HRProposalDistrict/DistributeDistrict",
      state: {
       data:id,
       objId:this.state.obj.id,
       sId:this.state.obj.stateId
      },
    });
  };
  viewCollector = (id) => {
    this.props.history.push({
      pathname:
        "/hrh/HumanResourceProposalDetails/HRProposalDistrict/DistributeDistrict",
      state: {
       pId:id,
       objId:this.state.obj.id,
       sId:this.state.obj.stateId
      },
    });
  };
  collector = (id) => {
    this.props.history.push({
      pathname:
        "/hrh/HumanResourceProposalDetails/HRProposalDistrict/DistributeDistrictFinancial",
      state: {
        data: id,
        obj: this.state.obj.id,
        rpId:this.state.obj.reportPrdId,
        fYId:this.state.obj.financialYear
      },
    });
  };
  openModal = () => {
    this.setState({ show: true });
  };
  closeModal = () => {
    this.setState({ show: false });
  };
  physicalCollector2 = (id) => {
    const { obj } = this.state;
    this.props.history.push({
      pathname: `/hrh/HumanResourceProposalDetails/HRProposalDistrict/physicalCsvDistrict`,
      query: {
        hId: `${obj.id}`,
        pId: `${id}`,
        dId: 2,
        rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  };
  financeCollector2 = (id) => {
    const { obj } = this.state;
    this.props.history.push({
      pathname: `/hrh/HumanResourceProposalDetails/HRProposalDistrict/DistributeDistrictFinancial`,
      state: {
        objId: `${obj.id}`,
        fId: `${id}`,
        dId: 1,
        rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  };
  keyCollector = (id) => {
    const { obj } = this.state;
    this.props.history.push({
      pathname: `/hrh/HumanResourceProposalDetails/HRProposalDistrict/DistributeDistrictKeyDeliverable`,
      state: {
        objId: `${obj.id}`,
        kId: `${id}`,
        dId: 1,
        rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  };
  keyCollector2 = (id) => {
    const { obj } = this.state;
    this.props.history.push({
      pathname: `/hrh/HumanResourceProposalDetails/HRProposalDistrict/DistributeDistrictKeyDeliverable`,
      state: {
        objId: `${obj.id}`,
        data: `${id}`,
        dId: 1,
        rpId:obj.reportPrdId,
        fYId:obj.financialYear
      },
    });
  };
  need = (id) => {
    if (id) {
      let val = {
        humanResourceProposalNationalId: id,
        oldStatusId: this.state.obj.formStatus,
        newStatusId: 5,
        createdBy: "Admin",
      };
      fetch(`${process.env.REACT_APP_API_URL}Div_DistrictPostsApprovalStatus`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      }).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          this.setState({statusMsg:true})
          setTimeout(()=>{
            this.setState({statusMsg:false})
          },5000)
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  cancel = (id) => {
    if (id) {
      let val = {
        humanResourceProposalNationalId: id,
        oldStatusId: this.state.obj.formStatus,
        newStatusId: 6,
        createdBy: "Admin",
      };
      fetch(`${process.env.REACT_APP_API_URL}Div_DistrictPostsApprovalStatus`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      }).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          this.setState({statusMsg:true})
          setTimeout(()=>{
            this.setState({statusMsg:false})
          },5000)
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  approv = (id) => {
    if (id) {
      let val = {
        humanResourceProposalNationalId: id,
        oldStatusId: this.state.obj.formStatus,
        newStatusId: 4,
        createdBy: "Admin",
      };
      fetch(`${process.env.REACT_APP_API_URL}Div_DistrictPostsApprovalStatus`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      }).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          this.setState({statusMsg:true})
          setTimeout(()=>{
            this.setState({statusMsg:false})
          },5000)
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  reject = (id) => {
    if (id) {
      let val = {
        humanResourceProposalNationalId: id,
        oldStatusId: this.state.obj.formStatus,
        newStatusId: 7,
        createdBy: "Admin",
      };
      fetch(`${process.env.REACT_APP_API_URL}Div_DistrictPostsApprovalStatus`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      }).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          this.setState({statusMsg:true})
          setTimeout(()=>{
            this.setState({statusMsg:false})
          },5000)
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  changeStatus = (id) => {
    if (id) {
      let val = {
        humanResourceProposalNationalId: id,
        oldStatusId: this.state.obj.formStatus,
        newStatusId: 1,
        createdBy: "Admin",
      };
      fetch(`${process.env.REACT_APP_API_URL}Div_DistrictPostsApprovalStatus`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      }).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          this.setState({statusMsg:true})
          setTimeout(()=>{
            this.setState({statusMsg:false})
          },5000)
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
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
                    <h4>Human Resource Proposal - District</h4>
                </div>
              </CCardHeader>
              <CCard>
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
                              value={obj.typeofApproval || ""}
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
                                role === "district_role" ||
                                obj.typeofApproval === 1
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
                              value={obj.reportPrdId || ""}
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
                              <b>Maker of District</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              disabled
                              placeholder="Select State"
                              name="stateId"
                              value={obj.districtId || ""}
                              onChange={this.handleChange}
                              invalid={errors.districtId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.districtCategory.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
                            </CSelect>
                            <FormFeedback>{errors.stateId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Checker of District</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              disabled
                              placeholder="Select State"
                              name="stateId"
                              value={obj.districtId || ""}
                              onChange={this.handleChange}
                              invalid={errors.districtId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.districtCategory.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
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
                              <b>Name of District</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              disabled
                              placeholder="Select District"
                              name="distictId"
                              value={"Agra" || ""}
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
                              // value={obj.formStatus || ''}
                              defaultValue={this.state.statusArray[0]}
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
                            <th>
                                <b>District</b>
                              </th>
                              <th>
                                <b>Facility Type</b>
                              </th>
                              <th>
                                <b>Number of Post approved(On going)</b>
                              </th>
                              <th>
                                <b>Number of Post proposed</b>
                              </th>
                              <th>
                                <b>Number of Post dropped</b>
                              </th>
                              <th>
                                <b>Number of Post In place</b>
                              </th>
                              <th>
                                <b>Number of new post approved</b>
                              </th>
                              <th>
                                <b>
                                  Monthly average salary per month per post (in
                                  INR)
                                </b>
                              </th>
                              <th>
                                <b>
                                  Total number of posts approved in RoP -
                                  ((Ongoing + new approved)- Dropped)
                                </b>
                              </th>
                              <th>
                                <b>
                                  Total number of post vacant- (Total Approved
                                  in RoP- In Place)
                                </b>
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
                                       style={{ width: "150px" }}
                                        disabled
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
                                        name="fmr"
                                        style={{ width: "150px" }}
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
                                        placeholder="Select"
                                        style={{ width: "150px" }}
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
                                        placeholder="Select"
                                        style={{ width: "150px" }}
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
                                   <td span={12}>
                                    <CFormGroup>
                                      <CSelect
                                       style={{ width: "150px" }}
                                        name="districtId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.districtId || ""}
                                        invalid={
                                          errors.districtId ? true : false
                                        }
                                        disabled
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
                                       style={{ width: "150px" }}
                                        name="facilityTypeId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        disabled
                                        value={data.facilityTypeId || ""}
                                        invalid={
                                          errors.facilityTypeId ? true : false
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
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofPostApprov || ""}
                                        name="numofPostApprov"
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
                                       style={{ width: "70px" }}
                                        disabled
                                        type="number"
                                        value={data.numofPostProposed || ""}
                                        name="totalBudgetAprrINR"
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
                                       style={{ width: "70px" }}
                                        disabled
                                        type="number"
                                        value={data.numofPostDrop || ""}
                                        name="numberofPostSanc"
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
                                        name="numberofNewPostion"
                                        value={data.numofPostPlace || ""}
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
                                        type="number"
                                        style={{ width: "70px" }}
                                        value={data.numofNewPostApprov || ""}
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
                                        value={data.monthlyAverSalary || ""}
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
                                        value={data.totalNoPostApprov || ""}
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
                                  {obj.districtStatus === 4 ||obj.districtStatus === 6||obj.districtStatus === 7 ? null: <td>
                                    {" "}
                                    {this.state.physical.filter(
                                      (d) => d.physicalStatusId === data.id
                                    ).length > 0 ? (
                                      <CButton
                                        color="primary"
                                        onClick={() =>
                                          this.viewCollector(data.id)
                                        }
                                      >
                                        View Distribution
                                      </CButton>
                                    ) : (
                                      <Space>
                                        <CButton
                                          color="primary"
                                          onClick={() => this.newCollector(data.id)}
                                        >
                                          Distribute
                                        </CButton>
                                      </Space>
                                    )}
                                  </td>}
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
                            <th rowSpan={2}>
                                <b>District</b>
                              </th>
                              <th rowSpan={2}> 
                                <b>Facility Type</b>
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
                                   <td span={12}>
                                    <CFormGroup>
                                      <CSelect
                                        name="districtId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={val.districtId || ""}
                                        invalid={
                                          errors.districtId ? true : false
                                        }
                                        disabled
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
                                        name="facilityTypeId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        disabled
                                        value={val.facilityTypeId || ""}
                                        invalid={
                                          errors.facilityTypeId ? true : false
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
                                  <td>{val.amount}</td>
                                  {obj.districtStatus === 4 ||obj.districtStatus === 6||obj.districtStatus === 7 ? null:  <td>
                                    {" "}
                                    {this.state.financial.filter(
                                      (data) => data.financialStatusId === val.id
                                    ).length > 0 ? (
                                      <CButton
                                        color="primary"
                                        onClick={() => this.financeCollector2(val.id)}
                                      >
                                        View Distribution
                                      </CButton>
                                    ) : (
                                      <Space>
                                        <CButton
                                          color="primary"
                                          onClick={() => this.collector(val.id)}
                                        >
                                          Distribute
                                        </CButton>
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
                            <th rowSpan={2}>
                                <b>District</b>
                              </th>
                              <th rowSpan={2}> 
                                <b>Facility Type</b>
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
                            {this.state.keyDeil.map((data, i) => {
                              return (
                                <tr key={i}>
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
                                        disabled
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
                                        name="facilityTypeId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        disabled
                                        value={data.facilityTypeId || ""}
                                        invalid={
                                          errors.facilityTypeId ? true : false
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
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.reqirementNo || ""}
                                        disabled
                                        name="numberofOldSanc"
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
                                        disabled
                                        name="numberofOldSanc"
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
                                        disabled
                                        name="numberofOldSanc"
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
                                        disabled
                                        name="numberofOldSanc"
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
                                        disabled
                                        name="numberofOldSanc"
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
                                        disabled
                                        name="numberofOldSanc"
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
                                        disabled
                                        name="numberofOldSanc"
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
                                        disabled
                                        name="numberofOldSanc"
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
                                        disabled
                                        name="numberofOldSanc"
                                        onChange={(e) =>
                                          this.handleTablePlace(e)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  {obj.districtStatus === 4 ||obj.districtStatus === 6||obj.districtStatus === 7 ? null:  <td>
                                    {" "}
                                    {this.state.keyDeil.filter(
                                      (d) => d.keyDeliverableId === data.id
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
                                          onClick={() => this.keyCollector(data.id)}
                                        >
                                          Distribute
                                        </CButton>
                                      </Space>
                                    )}
                                  </td>}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane>
                    </Tabs>
                    <Space size="middle" style={{ paddingTop: "5px" }}>
                      <CButton color="dark">Download</CButton>
                      <CButton
                        color="info"
                        onClick={() => this.changeStatus(obj.id)}
                        style={{
                          display:
                            obj.districtStatus === 0 || obj.districtStatus === 5
                              ? "block"
                              : "none",
                        }}
                      >
                        Submit for Approval
                      </CButton>

                      <CButton
                        color="success"
                        style={{
                          display: obj.districtStatus === 1 ? "block" : "none",
                        }}
                      >
                        Approved
                      </CButton>
                      <CButton
                        color="warning"
                        style={{
                          display: obj.districtStatus === 1 ? "block" : "none",
                        }}
                      >
                        Reject
                      </CButton>
                      <CButton
                        color="secondary"
                        style={{
                          display: obj.districtStatus === 1 ? "block" : "none",
                        }}
                      >
                        Need Clarification
                      </CButton>
                      <CButton
                        color="danger"
                        style={{
                          display:
                            obj.districtStatus === 0 || obj.districtStatus === 1
                              ? "block"
                              : "none",
                        }}
                      >
                        Cancel
                      </CButton>
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
                                <Radio value="3">Distribution Complleted</Radio>
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
export default connect(mapStateToProps, mapDispatchToProps)(HRProposalDistrict);
