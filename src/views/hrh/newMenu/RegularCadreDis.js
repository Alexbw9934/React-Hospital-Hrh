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
} from "../../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class RegularCadre extends Component {
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
  newCollector = () => {
    this.props.history.push({
      pathname: "/hrh/HumanResourceProsal/DistributeDistrict",
    });
  };
  componentDidMount() {
    this.props.retrieveTypeOfAssociation();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveTypeOfPositions();
  }
  render() {
    const { obj, role, errors } = this.state;
    return (
      <CForm>
        <Row gutter={20}>
          <Col span={12}>
            <CFormGroup>
              <Col md="12">
                <CLabel htmlFor="text-input">
                  <b>Type of Service/Association</b>
                </CLabel>
              </Col>
              <Col md="6">
                <CSelect
                  placeholder="Select State"
                  name="stateId"
                  value={obj.stateId || ""}
                  onChange={this.handleChange}
                  invalid={errors.stateId ? true : false}
                >
                  <option value="0">-Select-</option>
                  {this.props.typeofAssociationList.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </CSelect>
              </Col>
            </CFormGroup>
          </Col>
          <Col span={12}>
            <CFormGroup>
              <Col md="6">
                <CLabel htmlFor="text-input">
                  <b>Place of Post</b>
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
                  <option value="1">District</option>
                  <option value="2">Block</option>
                  <option value="3">City</option>
                  <option value="4"> Health SD Institution</option>
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
                  <b>Facility Type</b>
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
                  {this.props.typeFacilityList.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.facilityType}
                      </option>
                    );
                  })}
                </CSelect>
                <FormFeedback>{errors.financialYear}</FormFeedback>
              </Col>
            </CFormGroup>
          </Col>
          <Col span={12}>
            <CFormGroup>
              <Col>
                <CLabel>
                  <b>Category of post</b>
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
                  {this.props.typeOfPositionList.map((item, index) => {
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
              <Col>
                <CLabel>
                  <b>Name of Post</b>
                </CLabel>
              </Col>
              <Col>
                <CInput
                  placeholder=""
                  name="nameofPost"
                  value={obj.nameofPost}
                  onChange={this.handleChange}
                  invalid={errors.distictId ? true : false}
                />
              </Col>
            </CFormGroup>
          </Col>
          <Col span={12}>
            <CFormGroup>
              <Col>
                <CLabel>
                  <b>Total number of position sanctioned</b>
                </CLabel>
              </Col>
              <Col>
                <CInput
                  type="number"
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
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <CFormGroup>
              <Col>
                <CLabel>
                  <b>Total Number of person in place</b>
                </CLabel>
              </Col>
              <Col>
                <CInput
                  type="number"
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
          <Col span={12}>
            <CFormGroup>
              <Col>
                <CLabel>
                  <b>
                    Total number of vacant position (Total sanctioned- Total In
                    place)
                  </b>
                </CLabel>
              </Col>
              <Col>
                <CInput
                  type="number"
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
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <CFormGroup>
              <Col>
                <CLabel>
                  <b>Number of position which recruitment is under process</b>
                </CLabel>
              </Col>
              <Col>
                <CInput
                  type="number"
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
          <Col span={12}>
            <CFormGroup>
              <Col>
                <CLabel>
                  <b>Remarks</b>
                </CLabel>
              </Col>
              <Col>
                <CInput
                  name="distictId"
                  value={obj.remark}
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
        </Row>
      </CForm>
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
      addHR,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RegularCadre);
