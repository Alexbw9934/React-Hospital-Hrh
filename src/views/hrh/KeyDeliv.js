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
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import KeyCsv from "./KeyCsv";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class KeyDeliv extends Component {
  constructor() {
    super();
    this.state = {
      rowsData: {},
      keydeil: [{}],
      rowsAllocate: {
        numofPostApprov: 0,
        numofPostProposed: 0,
        numofPostDrop: 0,
        numofPostPlace: 0,
        numofNewPostApprov: 0,
        totalNoPostApprov: 0,
        totalNoPostVacant: 0,
      },
      rowsUnAll: {
        numofPostApprov: 0,
        numofPostProposed: 0,
        numofPostDrop: 0,
        numofPostPlace: 0,
        numofNewPostApprov: 0,
        totalNoPostApprov: 0,
        totalNoPostVacant: 0,
      },
      country: "",
      modalShow: false,
      statuss: 0,
      states: [],
      catPos: [],
      position: [],
      errors: {},
      csvOrmanually: 0,
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
        { id: "1", name: "State" },
        { id: "3", name: "Division" },
        { id: "2", name: "District" },
      ],
      tableRows: [
        {
          humanResourceProposalNationalId: 0,
          keyDeliverableId: 0,
          selectedValue: 0,
          stateId: 0,
          divisionId: 0,
          districtId: 0,
          facilityTypeId: 0,
          financialYearId: 0,
          categoryPostId: 0,
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
          distributionVia: 0,
          distributionStatus: 0,
        },
      ],
    };
  }
  componentDidMount() {
    this.props.retrieveData();
    this.props.retrieveDistricts();
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
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.kId;
      axios({
        url: `${process.env.REACT_APP_API_URL}KeyDeliverables/${paramId}`,
        method: "GET",
      }).then((response) => {
        console.log(this.props.history.location.state, "id");
        console.log(response.data, "response");
        this.setState({ rowsData: response.data });
      });
    }
    if (this.props.history.location.state.data) {
      let paramId = this.props.history.location.state.data;
      axios({
        url: `${process.env.REACT_APP_API_URL}StateDistributionKeyDeliverables`,
        method: "GET",
      }).then((response) => {
        let arr = response.data.filter(
          (data) => data.keyDeliverableId === paramId
        );
        console.log(arr, "response from table view");
        this.setState({ keydeil: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}KeyDeliverables/${paramId}`,
        method: "GET",
      }).then((response) => {
        console.log(this.props.history.location.state, "id");
        console.log(response.data, "response");
        this.setState({ rowsData: response.data });
      });
    }
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveProgramType();
  }
  handleTablePlace = (e, i) => {
    const { name, value } = e.target;
    let keydeil = [...this.state.keydeil];
    keydeil[i] = {
      ...keydeil[i],
      [name]: value,
    };
    this.setState({
      keydeil,
    });
  };
  validateNational = () => {
    const { obj } = this.state;
    let errors = {};
    return errors;
  };
  setTable = async (e, arr) => {
    await this.setState({ keydeil: arr });
    console.log(arr, "save arr");
    this.handleSubmit(e);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateNational();
    const { rowsData } = this.state;
    let val = {};
    let rowsAllocate = this.state.keydeil.reduce((prev, cur) => {
      val = {
        regSanctioned: Number(prev.regSanctioned) + Number(cur.regSanctioned),
        regInPlace: Number(prev.regInPlace) + Number(cur.regInPlace),
        contractualApprov:
          Number(prev.contractualApprov) + Number(cur.contractualApprov),
        contractualInPlace:
          Number(prev.contractualInPlace) + Number(cur.contractualInPlace),
        regContractSanctioned:
          Number(prev.regContractSanctioned) +
          Number(cur.regContractSanctioned),
        regContractInPlace:
          Number(prev.regContractInPlace) + Number(cur.regContractInPlace),
      };
      return val;
    });
    if (
      Number(rowsAllocate.regSanctioned) > Number(rowsData.regSanctioned) ||
      Number(rowsAllocate.regInPlace) > Number(rowsData.regInPlace) ||
      rowsAllocate.contractualApprov > rowsData.contractualApprov ||
      rowsAllocate.contractualInPlace > rowsData.contractualInPlace ||
      rowsAllocate.regContractSanctioned > rowsData.regContractSanctioned ||
      rowsAllocate.regContractInPlace > rowsData.regContractInPlace
    ) {
      this.setState({ errorMsg: true });
    } else {
      this.setState({ errorMsg: false });
      let paramId = this.props.history.location.state;
      this.state.keydeil.map((data) => {
        data.humanResourceProposalNationalId = paramId.objId;
        data.keyDeliverableId = paramId.kId;
        data.reportingPeriodId=paramId.rPId;
        data.stateId = paramId.sId;
        data.distributionVia = 1;
        fetch(
          `${process.env.REACT_APP_API_URL}StateDistributionKeyDeliverables`,
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
                  humanResourceProposalNationalId: 0,
                  keyDeliverableId: 0,
                  selectedValue: 0,
                  stateId: 0,
                  divisionId: 0,
                  districtId: 0,
                  facilityTypeId: 0,
                  financialYearId: 0,
                  categoryPostId: 0,
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
                  distributionVia: 0,
                  distributionStatus: 0,
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
      setTimeout(() => {
        this.setState({ postMsg: false });
      }, 10000);
    }
  };
  removeClick = (i) => {
    let keydeil = [...this.state.keydeil];
    keydeil.splice(i, 1);
    this.setState({ keydeil });
  };

  render() {
    const {
      obj,
      role,
      errors,
      modalData,
      rows,
      csvOrmanually,
      rowsData,
      // rowsAllocate,
      rowsUnAll,
    } = this.state;
    const propState = this.props.history.location.state;
    let rowsAllocate = this.state.keydeil.reduce((prev, cur) => {
      let val = {};
      val = {
        regSanctioned: Number(prev.regSanctioned) + Number(cur.regSanctioned),
        regInPlace: Number(prev.regInPlace) + Number(cur.regInPlace),
        contractualApprov:
          Number(prev.contractualApprov) + Number(cur.contractualApprov),
        contractualInPlace:
          Number(prev.contractualInPlace) + Number(cur.contractualInPlace),
        regContractSanctioned:
          Number(prev.regContractSanctioned) +
          Number(cur.regContractSanctioned),
        regContractInPlace:
          Number(prev.regContractInPlace) + Number(cur.regContractInPlace),
      };
      return val;
    });
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
                    <div>Allocated post is greater than assign</div>
                  </CAlert>
                ) : null}
                <CCardBody>
                  <table
                    className="table table-bordered table-sm"
                    style={{ width: "50%" }}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>Value from National</th>
                        <th>Allocated</th>
                        <th>Unallocated</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th rowSpan={2}>Regular</th>
                        <th>Sanction</th>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={rowsData.regSanctioned || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={rowsAllocate.regSanctioned || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={
                                rowsData.regSanctioned -
                                  rowsAllocate.regSanctioned || ""
                              }
                              readOnly
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th>In place</th>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={rowsData.regInPlace || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={rowsAllocate.regInPlace || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={
                                rowsData.regInPlace - rowsAllocate.regInPlace ||
                                ""
                              }
                              readOnly
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th rowSpan={2}>Contractual</th>
                        <th>Approve</th>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={rowsData.contractualApprov || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              value={rowsAllocate.contractualApprov || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={
                                rowsData.contractualApprov -
                                  rowsAllocate.contractualApprov || ""
                              }
                              readOnly
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th>In place</th>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={rowsData.contractualInPlace || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              value={rowsAllocate.contractualInPlace || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={
                                rowsData.contractualInPlace -
                                  rowsAllocate.contractualInPlace || ""
                              }
                              readOnly
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th rowSpan={2}>Regular + Contractual</th>
                        <th> Sanction</th>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={rowsData.regContractSanctioned || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              value={rowsAllocate.regContractSanctioned || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={
                                rowsData.regContractSanctioned -
                                  rowsAllocate.regContractSanctioned || ""
                              }
                              readOnly
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th>In place</th>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={rowsData.regContractInPlace || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              value={rowsAllocate.regContractInPlace || ""}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          <CFormGroup>
                            <CInput
                              value={
                                rowsData.regContractInPlace -
                                  rowsAllocate.regContractInPlace || ""
                              }
                              readOnly
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {propState.data ? null : (
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
                    <KeyCsv
                      objId={propState.hId}
                      kId={propState.kId}
                      sId={propState.sId}
                      setTable={this.setTable}
                    />
                  ) : (
                    <div>
                      <CForm onSubmit={this.handleSubmit}>
                        <table className="table table-bordered table-sm table-responsive">
                          <thead>
                            <tr>
                              <th rowSpan={2} style={{ width: "7.1%" }}>
                                <b>Sr. No.</b>
                              </th>
                              <th rowSpan={2} style={{ width: "7.1%" }}>
                                <b>Select State/Division/Distt</b>
                              </th>
                              <th rowSpan={2} style={{ width: "7.1%" }}>
                                <b>State</b>
                              </th>
                              <th rowSpan={2} style={{ width: "7.1%" }}>
                                <b>Division</b>
                              </th>
                              <th rowSpan={2} style={{ width: "7.1%" }}>
                                <b>District</b>
                              </th>
                              <th rowSpan={2} style={{ width: "7.1%" }}>
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
                            {this.state.keydeil.map((data, i) => {
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
                                        disabled={propState.data ? true : false}
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
                                        value={propState.sId || ""}
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
                                          data.placeofPostId === 1
                                            ? true
                                            : data.placeofPostId === 2
                                            ? true
                                            : propState.data
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
                                          data.placeofPostId === 1
                                            ? true
                                            : data.placeofPostId === 3
                                            ? true
                                            : propState.data
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
                                        value={data.facilityTypeId || ""}
                                        invalid={
                                          errors.typeofFacilityOfficeId
                                            ? true
                                            : false
                                        }
                                        disabled={propState.data ? true : false}
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
                                        name="reqirementNo"
                                        disabled={propState.data ? true : false}
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
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.regSanctioned || ""}
                                        name="regSanctioned"
                                        disabled={propState.data ? true : false}
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
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.regInPlace || ""}
                                        name="regInPlace"
                                        disabled={propState.data ? true : false}
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
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.contractualApprov || ""}
                                        name="contractualApprov"
                                        disabled={propState.data ? true : false}
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
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.contractualInPlace || ""}
                                        name="contractualInPlace"
                                        disabled={propState.data ? true : false}
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
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.regContractSanctioned || ""}
                                        name="regContractSanctioned"
                                        disabled={propState.data ? true : false}
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
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.regContractInPlace || ""}
                                        name="regContractInPlace"
                                        disabled={propState.data ? true : false}
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
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.percHrAvail || ""}
                                        name="percHrAvail"
                                        disabled={propState.data ? true : false}
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
                                    {" "}
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        value={data.totalAvail || ""}
                                        name="totalAvail"
                                        disabled={propState.data ? true : false}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  {i===0 ||propState.data ? null : (
                                    <td>
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
                            })}
                          </tbody>
                        </table>
                       {propState.data?null: <Row>
                            <CButton
                            className="mb-3"
                              color="primary"
                              onClick={() =>
                                this.setState((prevState) => ({
                                  keydeil: [
                                    ...prevState.keydeil,
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
                                }))
                              }
                            >
                              Add Line
                            </CButton>
                          </Row>}
                        {propState.data ? null : (
                          <Space size="middle">
                            <CButton color="primary" type="submit">
                              Save Data
                            </CButton>
                          </Space>
                        )}
                      </CForm>
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(KeyDeliv);
