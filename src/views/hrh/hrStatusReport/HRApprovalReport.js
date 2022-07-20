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
import { retrievePost,retrieveReprtingPeriod,retrieveSubTypeofPost } from "../../../actions/masterapi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class HRApprovalReport extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      statuss: 0,
      states: [],
      catPos: [],
      nameOfPostList:[],
      position: [],
      errors: {},
      programList:[],
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
  getObject = () => {
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({ paramId: paramId });
      axios({
        url: `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${paramId}`,
        method: "GET",
      }).then((response) => {
        this.setState({ obj: response.data });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}NationalPostProposalAmendmentReasons`,
        method: "GET",
      }).then((response) => {
        let arr = response.data.filter(
          (data) => data.humanResourceProposalNationalId === paramId
        );
        this.setState({ amendList: arr });
      });
    }
  };
  componentDidMount() {
    this.props.retrieveDistricts();
    this.props.retrieveTypeOfAssociation();
    this.props.retrieveTypeOfPositions(); 
    this.props.retrieveReprtingPeriod();
    this.getObject();
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
      url: `${process.env.REACT_APP_API_URL}Posts`,
      method: "GET",
    }).then((response) => {
      console.log(response,'name of posts')
      this.setState({ nameOfPostList: response.data });
    });
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveProgramType();
    this.props.retrievePost();
    this.props.retrieveSubTypeofPost(); 
  }
 
  handleChange = async (e) => {
    console.log(e.target.value);
    const { obj } = this.state;
    let latest = {};
    let oldest = {};
    let val=[];
    let arr=this.props.reportingPeriodList.filter(data=>data.id===e.target.value);
    if(arr.length>0){
    let strArray = arr[0].finacialYearId.split(",");  
     val=this.props.financialYearList.filter((d) => !strArray.includes(d.id))
    if (val.length > 0) {
      latest = val.reduce(function (r, a) {
        return r.toDate > a.toDate ? r : a;
      });
      oldest = val.reduce(function (r, a) {
        return r.fromDate < a.fromDate ? r : a;
      });
      let arr2=[]
       await axios({
          url: `${process.env.REACT_APP_API_URL}PhysicalStatus`,
          method: "GET",
        }).then((response) => {
           arr2 = response.data.filter(
            (data) => !strArray.includes(data.financialYearId) && data.stateId===obj.stateId
          );
          console.log(arr2,'kkkkkkkkkkkkkkk')
        });
        let obj2={};
        let postArr=arr2.map(data=>{
          obj2={
            ...obj2,
            postId:data.postId
          }
          return obj2
        })
        const key = 'postId';
        const arrayUniqueByKey = [...new Map(arr2.map(item =>
          [item[key], item])).values()];
        console.log('handleChange',arrayUniqueByKey)
      this.setState({ numberTableRows: arrayUniqueByKey });
        axios({
          url: `${process.env.REACT_APP_API_URL}KeyDeliverables`,
          method: "GET",
        }).then((response) => {
          const arr = response.data.filter(
            (data) => data.finacialYearId===oldest.id
          );
          this.setState({ tableRows: arr });
        });
    }
    }
    this.setState({
      obj: {
        ...obj,
        reportngPeriod: e.target.value,
         lastFY:latest.id,
         firstFY:oldest.id
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
  removeClick = (i) => {
    let tableRows = [...this.state.tableRows];
    tableRows.splice(i, 1);
    this.setState({ tableRows });
  };
  render() {
    const { obj, role, errors, value,programList } = this.state;
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
                    <h4>HR Approval Report</h4>
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
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Reporting Period</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={(e)=>this.handleChange(e)}
                              name="reportngPeriod"
                              value={obj.reportngPeriod || ""}
                              invalid={errors.reportngPeriod ? true : false}
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
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>First Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              disabled
                              name="reportngPriod"
                              value={obj.firstFY || ""}
                              invalid={errors.reportngPriod ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.financialYearList &&
                                this.props.financialYearList.map(
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
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Last Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                            disabled
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="lastFY"
                              value={obj.lastFY || ""}
                              invalid={errors.reportngPriod ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.financialYearList &&
                                this.props.financialYearList.map(
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
                              value={obj.formStatus || ''}
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
                            <FormFeedback>{errors.formStatus}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Tabs>
                      <TabPane tab="Physical Status" key="1">
                        <table className="table table-bordered table-sm table-responsive">
                          <thead>
                            <tr>
                              <th>Financial Year</th>
                              <th style={{ width: "6.66%" }}>
                                <b>Program Type</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Type of Post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Sub type of Post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>FMR Code</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Category of post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Name of the post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Approval Type</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post approved(On going)</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post proposed</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post dropped</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post In place</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of new post approved</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Monthly average salary per month per post (in
                                  INR)
                                </b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Total number of posts approved in RoP -
                                  ((Ongoing + new approved)- Dropped)
                                </b>
                              </th>
                              <th style={{ width: "6.66%" }}>
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
                              placeholder="Select"
                              onChange={this.handleChange}
                              disabled
                              name="financialYearId"
                              value={data.financialYearId || ""}
                              invalid={errors.reportngPriod ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.financialYearList &&
                                this.props.financialYearList.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
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
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        name="typeofPostId"
                                        value={data.typeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.typeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.postList
                                          .map((user) => {
                                            return (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            );
                                          })}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        name="subTypeofPostId"
                                        value={data.subTypeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.subTypeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.subTypeofPostList
                                          .map((user) => (
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
                                        name="fmrCodeId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.fmrCodeId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.fmrList
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.fmr}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.fmrCodeId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="categoryofPostId"
                                        value={data.categoryofPostId || ""}
                                        invalid={
                                          errors.categoryofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.catPos
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.categoryName}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.divisionId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="postId"
                                        value={data.postId || ""}
                                        invalid={errors.postId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList.map(
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
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="approvalTypeId"
                                        value={data.approvalTypeId || ""}
                                        invalid={
                                          errors.approvalTypeId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        <option value="1">Number</option>
                                        <option value="2">Lumpsum </option>
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.divisionId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "150px" }}
                                        type={
                                          data.approvalTypeId === 1
                                            ? "number"
                                            : "text"
                                        }
                                        value={data.numofPostApprov || ""}
                                        name="numofPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostApprov ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofPostProposed || ""}
                                        name="numofPostProposed"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostProposed
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
                                        name="numofPostDrop"
                                        value={data.numofPostDrop || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostDrop ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofPostPlace || ""}
                                        name="numofPostPlace"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostPlace ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofNewPostApprov || ""}
                                        name="numofNewPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofNewPostApprov
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
                                        value={data.monthlyAverSalary || ""}
                                        name="monthlyAverSalary"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.monthlyAverSalary
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
                                        value={data.totalNoPostApprov || ""}
                                        disabled
                                        name="totalNoPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.totalNoPostApprov
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
                            {programList.map((val, j) => {
                              return val.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td>
                                      <CFormGroup>
                                        <CSelect
                                          name="programTypeId"
                                          placeholder="Select"
                                          disabled
                                          value={item.programTypeId || ""}
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
                                      <b>{item.name}</b>
                                    </td>
                                    <td>
                                      {" "}
                                      <CSelect
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTableFinance(e, i, j)
                                        }
                                        name="finacialYearId"
                                        value={item.finacialYearId || ""}
                                        invalid={
                                          errors.finacialYearId ? true : false
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
                                    </td>
                                    <td>
                                      {" "}
                                      <CFormGroup>
                                        <CInput
                                          type="number"
                                          value={item.amount || ""}
                                          name="amount"
                                          onChange={(e) =>
                                            this.handleTableFinance(e, i, j)
                                          }
                                          invalid={errors.amount ? true : false}
                                        />
                                      </CFormGroup>
                                    </td>
                                  </tr>
                                );
                              });
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
                            {this.state.tableRows.map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
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
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        name="categoryofPostId"
                                        value={data.categoryofPostId || ""}
                                        invalid={
                                          errors.categoryofPostId ? true : false
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
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    {" "}
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleKeyTable(e, i)
                                        }
                                        name="postId"
                                        value={data.postId || ""}
                                        invalid={errors.postId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList
                                          .filter(
                                            (d) =>
                                              d.categoryofPostionId ===
                                              data.categoryofPostId
                                          )
                                          .map((item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          })}
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
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.reqirementNo ? true : false
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
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.regSanctioned ? true : false
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
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.regInPlace ? true : false
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
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.contractualApprov
                                            ? true
                                            : false
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
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.contractualInPlace
                                            ? true
                                            : false
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
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.regContractSanctioned
                                            ? true
                                            : false
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
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.regContractInPlace
                                            ? true
                                            : false
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
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.percHrAvail ? true : false
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
                                          this.handleKeyTable(e, i)
                                        }
                                        invalid={
                                          errors.totalAvail ? true : false
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
                    </Tabs>
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
                        <Button color="primary">Approved</Button>
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
    typeofAssociationList: state.apiadd.typeofAssociationList,
    typeOfPositionList: state.apiadd.typeOfPositionList,
    placeofPostList:state.apiadd.placeOfPostList,
    postList:state.masterapi.postList,
    reportingPeriodList: state.masterapi.reportingPeriodList,
    subTypeofPostList: state.masterapi.subTypeofPostList,
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
      retrieveReprtingPeriod,
      retrieveSubTypeofPost,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(HRApprovalReport);
