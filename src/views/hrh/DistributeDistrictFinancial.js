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
  retrieveBlocks,
  retrieveProgramType,
  retrieveData,
  addHR,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import { data } from "jquery";
import FinanceCSV from "./FinanceCSV";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class DistributeDistrictFinancial extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      csvOrmanually:0,
      modalShow: false,
      rowsData:{},
      rowsAllocate:{},
      statuss: 0,
      states: [],
      catPos: [],
      position: [],
      errors: {},
      tableRowsDetails: [],
      statusArray: [
        { id: "1", name: "Draft" },
        { id: "2", name: "National Approval" },
        { id: "3", name: "Approved" },
      ],
      divisionArray: [],
      detailsArray: [],
      detailLastId: 0,
      districtCategory: [],
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
        { id: "1", name: "District" },
    { id: "3", name: "Block" },
    { id: "2", name: "City" },
      ],
      tableRows: [
        {
          humanResourceProposalNationalId: 0,
          financialStatusId: 0,
          selectedValue: 0,
          districtId: 0,
          blockId: 0,
          cityId: 0,
          facilityTypeId: 0,
          amount: 0,
        },
      ],
    };
  }

  componentDidMount() {
    this.props.retrieveData();
    this.props.retrieveBlocks();
    if (this.props.history.location.state.fId) {
      let paramId = this.props.history.location.state.fId;
      axios({
        url: `${process.env.REACT_APP_API_URL}DistrictFianancialDistributions`,
        method: "GET",
      }).then((response) => {
        let arr=response.data.filter(data=>data.financialStatusId==paramId)
        this.setState({ tableRows:arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}StateFinancialDistributions/${paramId}`,
        method: "GET",
      }).then((response) => {
        this.setState({ rowsData: response.data });
      });
    }
    if (this.props.history.location.state.data) {
      let paramId = this.props.history.location.state.data;
      axios({
        url: `${process.env.REACT_APP_API_URL}StateFinancialDistributions/${paramId}`,
        method: "GET",
      }).then((response) => {
        this.setState({ rowsData: response.data });
      });
    }
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
  }

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
  setTable = async (e, arr) => {
    await this.setState({ tableRows: arr });
    console.log(arr, "save arr");
    this.handleSubmit(e);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateNational();
    const { rowsData } = this.state;
    let val = {};
    let rowsAllocate = this.state.tableRows.reduce((prev, cur) => {
      val = {
        amount: Number(prev.amount) + Number(cur.amount),
      };
      return val;
    });
    console.log(rowsAllocate, rowsData);
    if (Number(rowsAllocate.amount) > Number(rowsData.amount)) {
      this.setState({ errorMsg: true });
    } else {
      this.setState({ errorMsg: false });
      let propVal=this.props.history.location.state      
      this.state.tableRows.map((data) => {
        data.humanResourceProposalNationalId =  propVal.obj;
        data.districtId = 1;
        data.financialStatusId=propVal.data
        data.reportingPeriodId = propVal.rPId;
        data.financialYearId = propVal.fYId;
        fetch(
          `${process.env.REACT_APP_API_URL}DistrictFianancialDistributions`,
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
          if (resp.status == 404) {
            this.setState({
              errorMsg: true,
            });
            setTimeout(() => {
              this.setState({ errorMsg: false });
            }, 10000);
          } else {
            this.setState({
              postMsg: true,
              errorMsg:false,
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
          }
          console.log("result", resp);
        });
      });
    setTimeout(() => {
      this.setState({ postMsg: false });
    }, 10000);
  }
  };
  removeClick = (i) => {
    let tableRows = [...this.state.tableRows];
    tableRows.splice(i, 1);
    this.setState({ tableRows });
  };
  openModal = (data) => {
    this.setState({ modalData: data, isModalVisible: true });
  };
  render() {
    const { errors, rowsData,csvOrmanually } = this.state;
    const propVal = this.props.history.location.state;
    let rowsAllocate =
    this.state.tableRows.length > 0
      ? this.state.tableRows.reduce((prev, cur) => {
          let val = {};
          val = {
            amount: Number(prev.amount) + Number(cur.amount),
          };
          return val;
        })
      : {};
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
                {this.state.postMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                      <div>Data save Successfully</div>
                  </CAlert>
                ) : null}
                <CCardBody>
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Count Type</th>
                      <th>Approved</th>
                      <th>Allocated</th>
                      <th>unallocated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Amount</th>
                      <td>
                        {" "}
                        <CFormGroup>
                          <CInput
                            name="amount"
                            value={rowsData.amount || ""}
                            type="text"
                            readOnly
                          />
                        </CFormGroup>
                      </td>
                      <td>
                        {" "}
                        <CFormGroup>
                          <CInput
                            name="amount"
                            value={rowsAllocate.amount || ""}
                            type="text"
                            readOnly
                          />
                        </CFormGroup>
                      </td>
                      <td>
                        {" "}
                        <CFormGroup>
                          <CInput
                            name="amount"
                            value={
                              ` ${rowsData.amount}` -
                                `${rowsAllocate.amount}` || ""
                            }
                            style={{
                              backgroundColor: this.state.errorMsg ? "red" : "",
                            }}
                            readOnly
                          />
                        </CFormGroup>
                      </td>
                    </tr>
                  </tbody>
                </table>
               {propVal.fId?null: <CForm>
                    <CFormGroup>
                      <Row gutter={20}>
                        <Col md="6">
                          <CLabel>
                            <b>Distribute via</b>
                          </CLabel>
                        </Col>
                        <Col md="6">
                          <CSelect
                            name="csvOrmanually"
                            placeholder="Select"
                            onChange={(e) =>
                              this.setState({ csvOrmanually: e.target.value })
                            }
                            value={csvOrmanually || ""}
                            invalid={errors.placeofPostId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            <option value="1">Manually</option>
                            <option value="2">CSV Upload</option>
                          </CSelect>
                          <FormFeedback>{errors.placeofPostId}</FormFeedback>
                        </Col>
                      </Row>
                    </CFormGroup>
                  </CForm>}
                  {csvOrmanually == 2 ? (
                    <FinanceCSV
                      objId={propVal.objId}
                      fId={propVal.fId}
                      sId={propVal.sId}
                      setTable={this.setTable}
                    />
                  ) :
                  <CForm onSubmit={this.handleSubmit}>
                    <table
                      className="table table-bordered table-sm"
                    >
                      <thead gutter={24}>
                        <tr>
                          <th span={12} style={{ width: "7.1%" }}>
                            <b>Sr. No.</b>
                          </th>
                          <th span={12} style={{ width: "7.1%" }}>
                            <b>Select District/Block/City</b>
                          </th>
                          <th span={12} style={{ width: "7.1%" }}>
                            <b>District</b>
                          </th>
                          <th span={12} style={{ width: "7.1%" }}>
                            <b>Block</b>
                          </th>
                          <th span={12} style={{ width: "7.1%" }}>
                            <b>City</b>
                          </th>
                          <th span={12} style={{ width: "7.1%" }}>
                            <b>Facility Type</b>
                          </th>
                          <th span={12} style={{ width: "7.1%" }}>
                            <b>Amount</b>
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
                                    name="selectedValue"
                                    placeholder="Select"
                                    onChange={(e) =>
                                      this.handleTablePlace(e, i)
                                    }
                                    value={data.selectedValue || ""}
                                    disabled={propVal.fId ? true : false}
                                    invalid={
                                      errors.placeofPostId ? true : false
                                    }
                                  >
                                    <option value="0">-Select-</option>
                                    {this.state.placeOfPositionArray &&
                                      this.state.placeOfPositionArray.map(
                                        (user) => (
                                          <option key={user.id} value={user.id}>
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
                                    value={1 || ""}
                                    disabled
                                  >
                                    <option value="0">-Select-</option>
                                  </CSelect>
                                </CFormGroup>
                              </td>
                              <td span={12}>
                                <CFormGroup>
                                  <CSelect
                                    name="blockId"
                                    placeholder="Select"
                                    onChange={(e) =>
                                      this.handleTablePlace(e, i)
                                    }
                                    value={data.blockId || ""}
                                    disabled={
                                      data.selectedValue == 1
                                        ? true
                                        : data.selectedValue == 2
                                        ? true
                                        : propVal.fId
                                        ? true
                                        : false
                                    }
                                    invalid={
                                      errors.placeofPostId ? true : false
                                    }
                                  >
                                    <option value="0">-Select-</option>
                                    {this.props.blockList &&
                                      this.props.blockList.map((user) => (
                                        <option key={user.id} value={user.id}>
                                          {user.name}
                                        </option>
                                      ))}
                                  </CSelect>
                                  <FormFeedback>
                                    {errors.placeofPostId}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                              <td span={12}>
                                <CFormGroup>
                                  <CSelect
                                    name="cityId"
                                    placeholder="Select"
                                    onChange={(e) =>
                                      this.handleTablePlace(e, i)
                                    }
                                    value={data.cityId || ""}
                                    invalid={errors.districtId ? true : false}
                                    disabled={
                                      data.selectedValue == 1
                                        ? true
                                        : data.selectedValue == 3
                                        ? true
                                        : propVal.fId
                                        ? true
                                        : false
                                    }
                                  >
                                    <option value="0">-Select-</option>
                                    {this.props.cityList &&
                                      this.props.cityList.map(
                                        (user) => (
                                          <option key={user.id} value={user.id}>
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
                                    value={data.facilityTypeId || ""}
                                    invalid={
                                      errors.typeofFacilityOfficeId
                                        ? true
                                        : false
                                    }
                                    disabled={propVal.fId ? true : false}
                                  >
                                    <option value="0">-Select-</option>
                                    {this.props.typeFacilityList &&
                                      this.props.typeFacilityList.map(
                                        (item, i) => (
                                          <option key={item.id} value={item.id}>
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
                                    name="amount"
                                    type="number"
                                    value={data.amount || ""}
                                    onChange={(e) => {
                                      this.handleTablePlace(e, i);
                                    }}
                                    disabled={propVal.fId ? true : false}
                                    invalid={
                                      errors.sacnctionPost ? true : false
                                    }
                                  />
                                  <FormFeedback>
                                    {errors.sacnctionPost}
                                  </FormFeedback>
                                </CFormGroup>
                              </td>
                            </tr>
                          );
                        })}
                        {propVal.fId ? null : (
                          <tr>
                            <td>
                              <Button
                                // color="primary"
                                onClick={() =>
                                  this.setState({
                                    tableRows: [
                                      ...this.state.tableRows,
                                      {
                                        financialStatusId: 0,
                                        selectedValue: 0,
                                        districtId: 0,
                                        blockId: 0,
                                        cityId: 0,
                                        facilityTypeId: 0,
                                        amount: 0,
                                      },
                                    ],
                                  })
                                }
                              >
                                Add Line
                              </Button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {propVal.fId ? null : (
                      <CButton color="primary" type="submit">Save Data</CButton>
                    )}
                  </CForm>
  }
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
    cityList: state.apiadd.cityList,
    blockList:state.apiadd.blockList
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      retrieveBlocks,
      retrieveProgramType,
      retrieveData,
      addHR,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributeDistrictFinancial);
