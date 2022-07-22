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
import PhysicalCSVState from "./PhysicalCSVState";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class Distribute extends Component {
  constructor() {
    super();
    this.state = {
      rowsData: {},
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
          physicalStatusId: 0,
          selectedValue: 0,
          stateId: 0,
          divisionId: 0,
          districtId: 0,
          facilityTypeId: 0,
          numofPostApprov: 0,
          numofPostProposed: 0,
          numofPostDrop: 0,
          numofPostPlace: 0,
          numofNewPostApprov: 0,
          monthlyAverSalary: 0,
          totalNoPostApprov: 0,
          totalNoPostVacant: 0,
        },
      ],
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
    if (this.props.history.location.state.pId) {
      let paramId = this.props.history.location.state.pId;
      axios({
        url: `${process.env.REACT_APP_API_URL}PhysicalStatus/${paramId}`,
        method: "GET",
      }).then((response) => {
        console.log(this.props.history.location.state, "id");
        console.log(response.data, "response");
        this.setState({ rowsData: response.data });
      });
    }
    if (this.props.history.location.state.ppId) {
      let paramId = this.props.history.location.state.ppId;
      axios({
        url: `${process.env.REACT_APP_API_URL}StatePysicalDistributions`,
        method: "GET",
      }).then((response) => {
        let arr = response.data.filter(
          (data) => data.physicalStatusId == paramId
        );
        this.setState({ tableRows: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}PhysicalStatus/${paramId}`,
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
  setTable =async (e,arr) => {
    await this.setState({tableRows:arr})
    console.log(arr,"save arr")
      this.handleSubmit(e);     
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateNational();
    const { rowsData } = this.state;
    let val = {};
    let rowsAllocate = this.state.tableRows.reduce((prev, cur) => {
      val = {
        numofPostApprov:
          Number(prev.numofPostApprov) + Number(cur.numofPostApprov),
        numofPostProposed:
          Number(prev.numofPostProposed) + Number(cur.numofPostProposed),
        numofPostDrop: Number(prev.numofPostDrop) + Number(cur.numofPostDrop),
        numofPostPlace:
          Number(prev.numofPostPlace) + Number(cur.numofPostPlace),
        numofNewPostApprov:
          Number(prev.numofNewPostApprov) + Number(cur.numofNewPostApprov),
        totalNoPostApprov:
          Number(prev.totalNoPostApprov) + Number(cur.totalNoPostApprov),
        totalNoPostVacant:
          Number(prev.totalNoPostVacant) + Number(cur.totalNoPostVacant),
      };
      return val;
    });
    console.log(rowsAllocate, rowsData);
    if (
      Number(rowsAllocate.numofPostApprov) > Number(rowsData.numofPostApprov) ||
      Number(rowsAllocate.numofPostProposed) >
        Number(rowsData.numofPostProposed) ||
      rowsAllocate.numofNewPostApprov > rowsData.numofNewPostApprov ||
      rowsAllocate.numofPostDrop > rowsData.numofPostDrop ||
      rowsAllocate.numofPostPlace > rowsData.numofPostPlace ||
      rowsAllocate.totalNoPostApprov > rowsData.totalNoPostApprov ||
      rowsAllocate.totalNoPostVacant > rowsData.totalNoPostVacant
    ) {
      this.setState({ errorMsg: true });
    } else {
      this.setState({ errorMsg: false });
      let paramId = this.props.history.location.state;
      this.state.tableRows.map((data) => {
        data.humanResourceProposalNationalId = paramId.objId;
        data.physicalStatusId = paramId.pId;
        data.stateId = paramId.sId;
        data.reportingPeriodId = paramId.rPId;
        data.financialYearId = paramId.fYId;
        data.programTypeId=rowsData.programTypeId
        data.typeofPost=rowsData.typeofPostId
        data.subTypeofPost=rowsData.subTypeofPostId
        data.fmrId=rowsData.fmrCodeId
        data.categoryofPostId=rowsData.categoryofPostId
        data.postId=rowsData.postId
        console.log("else prt", this.state.tableRows);
        fetch(`${process.env.REACT_APP_API_URL}StatePysicalDistributions`, {
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
              postMsg: true,
              tableRows: [
                {
                  humanResourceProposalNationalId: 0,
                  physicalStatusId: 0,
                  selectedValue: 0,
                  stateId: 0,
                  divisionId: 0,
                  districtId: 0,
                  facilityTypeId: 0,
                  numofPostApprov: 0,
                  numofPostProposed: 0,
                  numofPostDrop: 0,
                  numofPostPlace: 0,
                  numofNewPostApprov: 0,
                  monthlyAverSalary: 0,
                  totalNoPostApprov: 0,
                  totalNoPostVacant: 0,
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
  saveLocal = () => {
    console.log("save", this.props.hrList);
    addHR(this.state.obj);
  };
  partialSave = () => {
    localStorage.setItem("object", JSON.stringify(this.state.obj));
  };
  openModal = (data) => {
    this.setState({ modalData: data, isModalVisible: true });
  };

  render() {
    const {
      obj,
      role,
      errors,
      csvOrmanually,
      rowsData,
      // rowsAllocate,
      rowsUnAll,
    } = this.state;
    const propState = this.props.history.location.state;
    let rowsAllocate = this.state.tableRows.reduce((prev, cur) => {
      let val = {};
      val = {
        numofPostApprov:
          Number(prev.numofPostApprov) + Number(cur.numofPostApprov),
        numofPostProposed:
          Number(prev.numofPostProposed) + Number(cur.numofPostProposed),
        numofPostDrop: Number(prev.numofPostDrop) + Number(cur.numofPostDrop),
        numofPostPlace:
          Number(prev.numofPostPlace) + Number(cur.numofPostPlace),
        numofNewPostApprov:
          Number(prev.numofNewPostApprov) + Number(cur.numofNewPostApprov),
        totalNoPostApprov:
          Number(prev.totalNoPostApprov) + Number(cur.totalNoPostApprov),
        totalNoPostVacant:
          Number(prev.totalNoPostVacant) + Number(cur.totalNoPostVacant),
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
                  {role == "admin_role" ? (
                    <h4>Human Resource Proposal - National</h4>
                  ) : role == "state_role" ? (
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
                        <th>Number of Post approved(On going)</th>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsData.numofPostApprov || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="numofPostApprov"
                              value={rowsAllocate.numofPostApprov || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="numofPostApprov"
                              value={
                                rowsData.numofPostApprov -
                                  rowsAllocate.numofPostApprov || ""
                              }
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th>Number of Post proposed</th>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="numofPostProposed"
                              value={rowsData.numofPostProposed || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsAllocate.numofPostProposed || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={
                                rowsData.numofPostProposed -
                                  rowsAllocate.numofPostProposed || ""
                              }
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th>Number of Post dropped</th>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsData.numofPostDrop || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsAllocate.numofPostDrop || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={
                                rowsData.numofPostDrop -
                                  rowsAllocate.numofPostDrop || ""
                              }
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th>Number of Post In place</th>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsData.numofPostPlace || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsAllocate.numofPostPlace || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={
                                rowsData.numofPostPlace -
                                  rowsAllocate.numofPostPlace || ""
                              }
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th>Number of new post approved</th>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsData.numofNewPostApprov || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsAllocate.numofNewPostApprov || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={
                                rowsData.numofNewPostApprov -
                                  rowsAllocate.numofNewPostApprov || ""
                              }
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          Total number of posts approved in RoP - ((Ongoing +
                          new approved)- Dropped)
                        </th>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsData.totalNoPostApprov || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsAllocate.totalNoPostApprov || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={
                                rowsData.totalNoPostApprov -
                                  rowsAllocate.totalNoPostApprov || ""
                              }
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          Total number of post vacant- (Total Approved in RoP-
                          In Place)
                        </th>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsData.totalNoPostVacant || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={rowsAllocate.totalNoPostVacant || ""}
                              type="text"
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                        <td>
                          {" "}
                          <CFormGroup>
                            <CInput
                              name="totalNoPostionApprov"
                              value={
                                rowsData.totalNoPostVacant -
                                  rowsAllocate.totalNoPostVacant || ""
                              }
                              style={{
                                backgroundColor: this.state.errorMsg
                                  ? "red"
                                  : "",
                              }}
                              readOnly
                            />
                          </CFormGroup>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                 {propState.ppId?null: <CForm>
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
                    <PhysicalCSVState
                      objId={propState.objId}
                      pId={propState.pId}
                      sId={propState.sId}
                      rowsData={rowsData}
                      setTable={this.setTable}
                    />
                  ) : (
                    <CForm onSubmit={this.handleSubmit}>
                      <table className="table table-bordered table-sm">
                        <thead gutter={24}>
                          <tr>
                            <th span={12} style={{ width: "7.1%" }}>
                              <b>Sr. No.</b>
                            </th>
                            <th span={12} style={{ width: "7.1%" }}>
                              <b>Select State/Division/Distt</b>
                            </th>
                            <th span={12} style={{ width: "7.1%" }}>
                              <b>State</b>
                            </th>
                            <th span={12} style={{ width: "7.1%" }}>
                              <b>Division</b>
                            </th>
                            <th span={12} style={{ width: "7.1%" }}>
                              <b>District</b>
                            </th>
                            {propState.pTy == 2 || propState.pTy == 3 ? (
                              <th span={12} style={{ width: "7.1%" }}>
                                <b>City</b>
                              </th>
                            ) : null}
                            <th span={12} style={{ width: "7.1%" }}>
                              <b>Facility Type</b>
                            </th>
                            <th span={12} style={{ width: "7.1%" }}>
                              <b>Number of Post approved(On going)</b>
                            </th>
                            <th span={12} style={{ width: "7.1%" }}>
                              <b>Number of Post proposed</b>
                            </th>
                            <th span={12} style={{ width: "7.14%" }}>
                              <b>Number of Post dropped</b>
                            </th>
                            <th span={12} style={{ width: "7.14%" }}>
                              <b>Number of Post In place</b>
                            </th>
                            <th span={12} style={{ width: "7.14%" }}>
                              <b>Number of new post approved</b>
                            </th>
                            <th span={12} style={{ width: "7.14%" }}>
                              <b>
                                Monthly average salary per month per post (in
                                INR)
                              </b>
                            </th>
                            <th span={12} style={{ width: "7.14%" }}>
                              <b>
                                Total number of posts approved in RoP -
                                ((Ongoing + new approved)- Dropped)
                              </b>
                            </th>
                            <th span={12} style={{ width: "7.14%" }}>
                              <b>
                                Total number of post vacant- (Total Approved in
                                RoP- In Place)
                              </b>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.tableRows.map((data, i) => {
                            data.totalNoPostApprov =
                              Number(data.numofPostApprov) +
                              Number(data.numofNewPostApprov) -
                              Number(data.numofPostDrop);
                            data.totalNoPostVacant =
                              Number(data.totalNoPostApprov) -
                              Number(data.numofPostPlace);
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
                                      disabled={propState.ppId ? true : false}
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
                                          <option key={user.id} value={user.id}>
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
                                        data.selectedValue == 1
                                          ? true
                                          : data.selectedValue == 2
                                          ? true
                                          : propState.ppId
                                          ? true
                                          : false
                                      }
                                      invalid={
                                        errors.placeofPostId ? true : false
                                      }
                                    >
                                      <option value="0">-Select-</option>
                                      {this.state.divisionArray &&
                                        this.state.divisionArray.map((user) => (
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
                                      name="districtId"
                                      placeholder="Select"
                                      onChange={(e) =>
                                        this.handleTablePlace(e, i)
                                      }
                                      value={data.districtId || ""}
                                      invalid={errors.districtId ? true : false}
                                      disabled={
                                        data.selectedValue == 1
                                          ? true
                                          : data.selectedValue == 3
                                          ? true
                                          : propState.ppId
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
                                {propState.pTy == 2 || propState.pTy == 3 ? (
                                  <td span={12}>
                                    <CFormGroup>
                                      <CSelect
                                        name="cityId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        disabled={propState.ppId ? true : false}
                                        value={data.cityId || ""}
                                        invalid={errors.cityId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.cityList &&
                                          this.props.cityList.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.cityId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                ) : null}
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
                                      disabled={propState.ppId ? true : false}
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
                                      name="numofPostApprov"
                                      type="number"
                                      value={data.numofPostApprov || ""}
                                      onChange={(e) => {
                                        this.handleTablePlace(e, i);
                                      }}
                                      disabled={propState.ppId ? true : false}
                                      invalid={
                                        errors.sacnctionPost ? true : false
                                      }
                                    />
                                    <FormFeedback>
                                      {errors.sacnctionPost}
                                    </FormFeedback>
                                  </CFormGroup>
                                </td>
                                <td span={12}>
                                  <CFormGroup>
                                    <CInput
                                      name="numofPostProposed"
                                      type="number"
                                      value={data.numofPostProposed || ""}
                                      onChange={(e) => {
                                        this.handleTablePlace(e, i);
                                      }}
                                      disabled={propState.ppId ? true : false}
                                      invalid={
                                        errors.sacnctionPost ? true : false
                                      }
                                    />
                                    <FormFeedback>
                                      {errors.sacnctionPost}
                                    </FormFeedback>
                                  </CFormGroup>
                                </td>
                                <td span={12}>
                                  <CFormGroup>
                                    <CInput
                                      name="numofPostDrop"
                                      type="number"
                                      value={data.numofPostDrop || ""}
                                      onChange={(e) => {
                                        this.handleTablePlace(e, i);
                                      }}
                                      disabled={propState.ppId ? true : false}
                                      invalid={
                                        errors.sacnctionPost ? true : false
                                      }
                                    />
                                    <FormFeedback>
                                      {errors.sacnctionPost}
                                    </FormFeedback>
                                  </CFormGroup>
                                </td>
                                <td span={12}>
                                  <CFormGroup>
                                    <CInput
                                      name="numofPostPlace"
                                      type="number"
                                      value={data.numofPostPlace || ""}
                                      onChange={(e) => {
                                        this.handleTablePlace(e, i);
                                      }}
                                      disabled={propState.ppId ? true : false}
                                      invalid={
                                        errors.sacnctionPost ? true : false
                                      }
                                    />
                                    <FormFeedback>
                                      {errors.sacnctionPost}
                                    </FormFeedback>
                                  </CFormGroup>
                                </td>
                                <td span={12}>
                                  <CFormGroup>
                                    <CInput
                                      name="numofNewPostApprov"
                                      type="number"
                                      value={data.numofNewPostApprov || ""}
                                      onChange={(e) => {
                                        this.handleTablePlace(e, i);
                                      }}
                                      disabled={propState.ppId ? true : false}
                                      invalid={
                                        errors.sacnctionPost ? true : false
                                      }
                                    />
                                    <FormFeedback>
                                      {errors.sacnctionPost}
                                    </FormFeedback>
                                  </CFormGroup>
                                </td>
                                <td span={12}>
                                  <CFormGroup>
                                    <CInput
                                      name="monthlyAverSalary"
                                      type="number"
                                      value={data.monthlyAverSalary || ""}
                                      onChange={(e) => {
                                        this.handleTablePlace(e, i);
                                      }}
                                      disabled={propState.ppId ? true : false}
                                      invalid={
                                        errors.sacnctionPost ? true : false
                                      }
                                    />
                                    <FormFeedback>
                                      {errors.sacnctionPost}
                                    </FormFeedback>
                                  </CFormGroup>
                                </td>
                                <td span={12}>
                                  <CFormGroup>
                                    <CInput
                                      name="totalNoPostApprov"
                                      type="number"
                                      value={data.totalNoPostApprov || ""}
                                      onChange={(e) => {
                                        this.handleTablePlace(e, i);
                                      }}
                                      disabled
                                      invalid={
                                        errors.sacnctionPost ? true : false
                                      }
                                    />
                                    <FormFeedback>
                                      {errors.sacnctionPost}
                                    </FormFeedback>
                                  </CFormGroup>
                                </td>
                                <td span={12}>
                                  <CFormGroup>
                                    <CInput
                                      name="totalNoPostVacant"
                                      type="number"
                                      value={data.totalNoPostVacant || ""}
                                      onChange={(e) => {
                                        this.handleTablePlace(e, i);
                                      }}
                                      disabled
                                      invalid={
                                        errors.sacnctionPost ? true : false
                                      }
                                    />
                                    <FormFeedback>
                                      {errors.sacnctionPost}
                                    </FormFeedback>
                                  </CFormGroup>
                                </td>
                                {i == 0 || propState.ppId ? null : (
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
                          })}
                          <tr>
                            <td>
                              {propState.ppId ? null : (
                                <Button
                                  // color="primary"
                                  onClick={() =>
                                    this.setState({
                                      tableRows: [
                                        ...this.state.tableRows,
                                        {
                                          humanResourceProposalNationalId: 0,
                                          physicalStatusId: 0,
                                          selectedValue: 0,
                                          stateId: 0,
                                          divisionId: 0,
                                          districtId: 0,
                                          facilityTypeId: 0,
                                          numofPostApprov: 0,
                                          numofPostProposed: 0,
                                          numofPostDrop: 0,
                                          numofPostPlace: 0,
                                          numofNewPostApprov: 0,
                                          monthlyAverSalary: 0,
                                          totalNoPostApprov: 0,
                                          totalNoPostVacant: 0,
                                        },
                                      ],
                                    })
                                  }
                                >
                                  Add Line
                                </Button>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {propState.ppId ? null : (
                        <Space size="middle">
                          <CButton color="primary" type="submit">
                            Save Data
                          </CButton>
                        </Space>
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
export default connect(mapStateToProps, mapDispatchToProps)(Distribute);
