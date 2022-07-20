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
  retrieveData,
  addHR,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import { data } from "jquery";
import StateCSvFinance from "./StateCSvFinance";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class DistributeFinancial extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      csvOrmanually: 0,
      statuss: 0,
      states: [],
      catPos: [],
      position: [],
      rowsAllocate: {},
      rowsData: {},
      errors: {},
      tableRowsDetails: [],
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
    this.props.retrieveDistricts();
    if (this.props.history.location.state.data) {
      let paramId = this.props.history.location.state.data;
      axios({
        url: `${process.env.REACT_APP_API_URL}StateFinancialDistributions`,
        method: "GET",
      }).then((response) => {
        let arr = response.data.filter(
          (val) => val.financialStatusId === paramId
        );
        this.setState({ tableRows: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}FinancialStatus/${paramId}`,
        method: "GET",
      }).then((response) => {
        console.log(this.props.history.location.state, "id");
        console.log(response.data, "response");
        this.setState({ rowsData: response.data });
      });
    }
    if (this.props.history.location.state.fId) {
      let paramId = this.props.history.location.state.fId;
      axios({
        url: `${process.env.REACT_APP_API_URL}FinancialStatus/${paramId}`,
        method: "GET",
      }).then((response) => {
        console.log(this.props.history.location.state, "id");
        console.log(response.data, "response");
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
    if (Number(rowsAllocate.amount) > Number(`${rowsData.amount}00000`)) {
      this.setState({ errorMsg: true });
    } else {
      this.setState({ errorMsg: false });
      let propVal = this.props.history.location.state;
      this.state.tableRows.map((data) => {
        data.humanResourceProposalNationalId = propVal.objId;
        data.stateId = propVal.sId;
        data.reportingPeriodId = propVal.rPId;
        data.districtId = 1;
        data.financialStatusId = propVal.fId;
        fetch(`${process.env.REACT_APP_API_URL}StateFinancialDistributions`, {
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
                  humanResourceProposalNationalId: 0,
                  financialStatusId: 0,
                  selectedValue: 0,
                  stateId: 0,
                  divisionId: 0,
                  districtId: 0,
                  facilityTypeId: 0,
                  amount: 0,
                },
              ],
            });
            setTimeout(() => {
              this.setState({ postMsg1: false });
            }, 10000);
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
    const { obj, role, errors, rowsData, csvOrmanually } = this.state;
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
                ) : this.state.errorMsg ? (
                  <CAlert color="warning" className="d-flex align-items-center">
                    <CIcon
                      name="cilWarning"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Allocated amount is greater than assign</div>
                  </CAlert>
                ) : null}
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Count Type</th>
                      <th>Approved (in lakh)</th>
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
                              ` ${rowsData.amount}00000` -
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
                <CCardBody>
                  {propVal.data ? null : (
                    <CForm>
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
                    </CForm>
                  )}
                  {csvOrmanually === 2 ? (
                    <StateCSvFinance
                      objId={propVal.objId}
                      fId={propVal.fId}
                      sId={propVal.sId}
                      setTable={this.setTable}
                    />
                  ) : (
                    <CForm onSubmit={this.handleSubmit}>
                      <table className="table table-bordered table-sm table-responsive">
                        <thead gutter={24}>
                          <tr>
                            <th span={12} style={{ width: "14.1%" }}>
                              <b>Sr. No.</b>
                            </th>
                            <th span={12} style={{ width: "14.1%" }}>
                              <b>Select State/Division/Distt</b>
                            </th>
                            <th span={12} style={{ width: "14.1%" }}>
                              <b>State</b>
                            </th>
                            <th span={12} style={{ width: "14.1%" }}>
                              <b>Division</b>
                            </th>
                            <th span={12} style={{ width: "14.1%" }}>
                              <b>District</b>
                            </th>
                            <th span={12} style={{ width: "14.1%" }}>
                              <b>Facility Type</b>
                            </th>
                            <th span={12} style={{ width: "14.1%" }}>
                              <b>Amount</b>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.tableRows.length > 0 ? (
                            this.state.tableRows.map((data, i) => {
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
                                        disabled={propVal.data ? true : false}
                                        value={data.selectedValue || ""}
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
                                        {errors.selectedValue}
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
                                        value={data.stateId || ""}
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
                                        disabled={
                                          data.selectedValue === 1
                                            ? true
                                            : data.selectedValue === 2
                                            ? true
                                            : propVal.data
                                            ? true
                                            : false
                                        }
                                        invalid={
                                          errors.placeofPostId ? true : false
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
                                        {errors.placeofPostId}
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
                                          data.selectedValue === 1
                                            ? true
                                            : data.selectedValue === 3
                                            ? true
                                            : propVal.data
                                            ? true
                                            : false
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
                                        name="facilityTypeId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        disabled={propVal.data ? true : false}
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
                                  <td span={12}>
                                    <CFormGroup>
                                      <CInput
                                        name="amount"
                                        type="number"
                                        value={data.amount || ""}
                                        onChange={(e) => {
                                          this.handleTablePlace(e, i);
                                        }}
                                        disabled={propVal.data ? true : false}
                                        invalid={errors.amount ? true : false}
                                      />
                                      <FormFeedback>
                                        {errors.amount}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  {i === 0 || propVal.data ? null : (
                                    <td>
                                      {" "}
                                      <CIcon
                                        name="cilXCircle"
                                        className="flex-shrink-0 me-2"
                                        width={20}
                                        height={20}
                                        onClick={() => this.removeClick(i)}
                                      />
                                    </td>
                                  )}
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={7}>Loading...</td>
                            </tr>
                          )}
                          <tr>
                            {propVal.data ? null : (
                              <td>
                                <Button
                                  // color="primary"
                                  onClick={() =>
                                    this.setState({
                                      tableRows: [
                                        ...this.state.tableRows,
                                        {
                                          humanResourceProposalNationalId: 0,
                                          financialStatusId: 0,
                                          selectedValue: 0,
                                          stateId: 0,
                                          divisionId: 0,
                                          districtId: 0,
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
                            )}
                          </tr>
                        </tbody>
                      </table>
                      {propVal.data ? null : (
                        <CButton type="submit">Save Data</CButton>
                      )}
                    </CForm>
                  )}
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
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      retrieveDistricts,
      retrieveProgramType,
      retrieveData,
      addHR,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributeFinancial);
