import React, { Component } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CButton,
  CInput,
  CFormGroup,
  CSelect,
  CAlert,
  CLabel,
  CForm,
} from "@coreui/react";
import {
  Form,
  Row,
  Select,
  Col,
  Input,
  Modal,
  DatePicker,
  Radio,
  Button,
  Checkbox,
  Tabs,
} from "antd";
import {
  retrieveTypeOfFacility,
  retrieveFinancialYear,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormFeedback } from "reactstrap";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { CardBody } from "reactstrap";
import "./style.css";
import moment from "moment";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");

export class HumanResourceProposalDetailsForm extends Component {
  constructor() {
    super();
    this.state = {
      paramId: "",
      states: [],
      users: [],
      catPos: [],
      obj:[],
      errors:{},
      statusArray:[],
      districtCategory:[],
      role: localStorage.getItem("access_role"),
      reserveOptions: ["A", "B"],
      checkedList: ["A"],
      states:[],
      placeOfPositionArray: [
        { id: "1", name: "State" },
        { id: "2", name: "District" },
        { id: "3", name: "Division" },
      ],
      tableRows: [
        {
          srNo: 0,
          placeOfPosition: 0,
          sanctionPost: 0,
          division: 0,
          district: 0,
        },
      ],
      secondTableRows:[{
        srNo: 0,
        placeOfPosition: 0,
        sanctionPost: 0,
        division: 0,
        district: 0,
      }]
    };
  }
  componentWillMount() {
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({ paramId: paramId });
    }
  }
  componentDidMount() {
    axios({
      url: `${process.env.REACT_APP_API_URL}humanResourceProposals/${this.state.paramId}`,
      method: "GET",
    }).then((response) => {
      console.log(response.data);
      this.setState({ obj: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}CatgoryofPositions`,
      method: "GET",
    }).then((response) => {
      this.setState({ catPos: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      this.setState({ states: response.data });
    });
  }
  render() {
    const { users, isSupplementary, role,obj,errors } = this.state;
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
                                obj.submission }
                              disabled={role === "admin_role" ? false : true}
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
                              <b>Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="financialYear"
                              value={obj.financialYear}
                              disabled={role === "admin_role" ? false : true}
                              invalid={errors.financialYear ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.financialYearList &&
                                this.props.financialYearList.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {`${
                                          item.fromDate.split("T")[0]
                                        } -From Date  `}
                                        {`${
                                          item.toDate.split("T")[0]
                                        } -To Date`}
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
                              value={obj.typeofApproval}
                              disabled={role === "admin_role" ? false : true}
                              invalid={errors.typeofApproval ? true : false}
                            >
                              <Radio value="1">Annual RoP</Radio>
                              <Radio value="2">Supplementary RoP</Radio>
                            </Radio.Group>
                            <FormFeedback>{errors.typeofApproval}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    {role === "district_role" ? (
                      <Row gutter={20}>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel>
                                <b>Program Type</b>
                              </CLabel>
                            </Col>
                            <Col>
                              <Radio.Group
                                value={obj.programType}
                                onChange={this.handleRadio2}
                                disabled={role === "admin_role" ? false : true}
                              >
                                <Radio value="1">NHM</Radio>
                                <Radio value="2">NUHM</Radio>
                              </Radio.Group>
                            </Col>
                          </CFormGroup>
                        </Col>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel>
                                <b>Type of Post</b>
                              </CLabel>
                            </Col>
                            <Col>
                              <Radio.Group
                                value={obj.typeofPost}
                                onChange={this.handleRadio3}
                                disabled={role === "admin_role" ? false : true}
                              >
                                <Radio value="1">SD</Radio>
                                <Radio value="2">PM</Radio>
                              </Radio.Group>
                            </Col>
                          </CFormGroup>
                        </Col>
                      </Row>
                    ) : null}
                    {role === "district_role" ? (
                      <Row gutter={20}>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel>Name of the Post</CLabel>
                            </Col>
                            <Col>
                              <CInput
                                value={obj.nameofPost}
                                name="nameofPost"
                                onChange={this.handleChange}
                                disabled={role === "admin_role" ? false : true}
                              />
                            </Col>
                          </CFormGroup>
                        </Col>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel>
                                <b>Place of position</b>
                              </CLabel>
                            </Col>
                            <Col>
                              <CSelect
                                name="placeofPostId"
                                placeholder="Select"
                                onChange={() => this.handleChange()}
                                value={obj.placeofPostId}
                                disabled={role === "state_role" ? false : true}
                                invalid={errors.placeofPostId ? true : false}
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
                            </Col>
                          </CFormGroup>
                        </Col>
                      </Row>
                    ) : null}
                    <Row gutter={20}>
                      {obj.typeofApproval === 2 ? (
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
                                value={obj.number}
                                disabled={role === "admin_role" ? false : true}
                              >
                                <option value="0">-Select-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                              </CSelect>
                            </Col>
                          </CFormGroup>
                        </Col>
                      ) : null}
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
                              value={obj.stateId}
                              onChange={this.handleChange}
                              disabled={role === "admin_role" ?  false:true}
                              invalid={errors.stateId?true:false}
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
                      {role === "district_role" ? (
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel>
                                <b>District</b>
                              </CLabel>
                            </Col>
                            <Col>
                              <CSelect
                                placeholder="Select District"
                                onChange={this.handleSelect4}
                                disabled={role === "admin_role" ? false:true}
                              >
                                {this.state.districtCategory.length > 0 &&
                                  this.state.districtCategory.map(
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
                              </CSelect>
                            </Col>
                          </CFormGroup>
                        </Col>
                      ) : null}
                    </Row>
                    {role === "district_role" ? (
                      <Row gutter={20}>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel>
                                <b>Facility</b>
                              </CLabel>
                            </Col>
                            <Col>
                              <CSelect
                                name="typeofFacilityOfficeId"
                                placeholder="Select"
                                onChange={(e) => this.handleChange(e)}
                                value={obj.typeofFacilityOfficeId}
                                invalid={
                                  errors.typeofFacilityOfficeId ? true : false
                                }
                                disabled
                              >
                                <option value="0">-Select-</option>
                                {this.props.typeFacilityList &&
                                  this.props.typeFacilityList.map((item, i) => (
                                    <option key={item.id} value={item.id}>
                                      {item.facilityType}
                                    </option>
                                  ))}
                              </CSelect>
                              <FormFeedback>
                                {errors.typeofFacilityOfficeId}
                              </FormFeedback>
                            </Col>
                          </CFormGroup>
                        </Col>
                        <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>Status</b></CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              name="statuss"
                              onChange={this.handleChange}
                              value={obj.statuss}
                              disabled
                            >
                              <option value="0">-Select-</option>
                              {this.state.statusArray.map((item, index) => {
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
                      </Row>
                    ) : null}
                    {role === "district_role" ? (
                      <Row gutter={20}>
                        <Col span={12}>
                          <CFormGroup>
                            <CLabel><Col><b>Sanctioned positions</b></Col></CLabel>
                            <Col>
                            <CInput
                              placeholder="Enter"
                              type="number"
                              onChange={(e) =>
                                this.setState({ sanctionOfPosition: e })
                              }
                              value={this.state.sanctionOfPosition}
                              disabled
                            />
                            </Col>
                          </CFormGroup>
                        </Col>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                            <CLabel><b>National Proposal Id</b></CLabel></Col>  
                            <Col>
                            <CInput
                              placeholder="Enter"
                              onChange={(e) =>
                                this.setState({ nationalProposalId: e })
                              }
                              value={this.state.nationalProposalId}
                              disabled
                            />
                            </Col>
                         </CFormGroup>
                        </Col>
                      </Row>
                    ) : null}
                    {role === "district_role" ? (
                      <Row gutter={20}>
                        <Col span={12}>
                        <CFormGroup>
                            <CLabel><Col><b>State Proposal Id</b></Col></CLabel>
                            <Col>
                            <CInput
                              placeholder="Enter"
                              onChange={(e) =>
                                this.setState({ stateProposalId: e })
                              }
                              value={this.state.stateProposalId}
                              disabled
                            />
                            </Col>
                          </CFormGroup>
                        </Col>
                      </Row>
                    ) : null}
                    {/* <Row gutter={20}>
                        <Col span={12}>
                          <Form.Item
                            label="Number of Divisions/ District"
                            name="numberOfDivisions"
                            rules={[
                              {
                                required: role === "state_role" ? false : true,
                                message: "Please select!",
                              },
                            ]}
                          >
                            <Input
                              value={this.state.numberOfDivDist}
                              onChange={this.handleChange}
                              disabled={role === "state_role" ? true : false}
                            />
                          </Form.Item>
                        </Col>
                      </Row> */}
                    {role === "district_role" ? null : (
                      <Row gutter={20}>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel><b>Program Type</b></CLabel>
                            </Col>
                            <Col>
                              <Radio.Group
                                value={obj.programType}
                                onChange={this.handleRadio2}
                                disabled={role === "admin_role" ? false : true}
                              >
                                <Radio value="1">NHM</Radio>
                                <Radio value="2">NUHM</Radio>
                              </Radio.Group>
                            </Col>
                          </CFormGroup>
                        </Col>
                        <Col span={12}>
                          <CFormGroup>
                            <Col>
                              <CLabel><b>Type of Post</b></CLabel>
                            </Col>
                            <Col>
                              <Radio.Group
                                value={obj.typeofPost}
                                onChange={this.handleRadio3}
                                disabled={role === "admin_role" ? false : true}
                              >
                                <Radio value="1">SD</Radio>
                                <Radio value="2">PM</Radio>
                              </Radio.Group>
                            </Col>
                          </CFormGroup>
                        </Col>
                      </Row>
                    )}
                    {/* {role === "state_role" ? (
                      <Row gutter={20}>
                        <Col span={12}>
                          <CFormGroup>
                          <Col>
                          <CLabel>Place of Post</CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select Post"
                              name="placePost"
                              value={obj.placeofPost}
                              onChange={this.handleChange}
                              disabled={role === "admin_role" ? false : true}
                            >
                              <option value="0">-Select-</option>
                              {this.state.states.map((item, index) => {
                                return (
                                  <option key={index} value={index}>
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
                          <Col>
                          <CLabel>Division (RPMU)</CLabel></Col>
                          <Col>
                            <CSelect
                              placeholder="Select Division"
                              name="division"
                              onChange={this.handleChange}
                              disabled={role === "admin_role" ? false : true}
                            >
                              <option value="0">-Select-</option>
                              {this.state.divisionArray.length > 0 &&
                                this.state.divisionArray.map((item, index) => {
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
                      </Row>
                    ) : null} */}
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>Category of Post</b></CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="categoryofPostion"
                              value={obj.categoryofPostion}
                              disabled={role === "admin_role" ? false : true}
                              invalid={errors.categoryofPostion?true:false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.catPos &&
                                this.state.catPos.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.categoryName}
                                    </option>
                                  );
                                })}
                            </CSelect>
                            <FormFeedback>{errors.categoryofPostion}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>FMR Number</b></CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.fmr}
                              name="fmr"
                              onChange={this.handleChange}
                              disabled={role === "admin_role" ? false : true}
                              invalid={errors.fmr?true:false}
                            />
                            <FormFeedback>{errors.fmr}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                              Number of Post sanctioned(Previously approved)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.numberofPostSanc}
                              name="numberofPostSanc"
                              onChange={this.handleChange}
                              disabled={role === "admin_role" ? false : true}
                              invalid={errors.numberofPostSanc?true:false}
                            />
                            <FormFeedback>{errors.numberofPostSanc}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>Number of new position(Approved)</b></CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              name="numberofNewPostion"
                              value={obj.numberofNewPostion}
                              onChange={this.handleChange}
                              disabled={role === "admin_role" ? false : true}
                              invalid={errors.numberofNewPostion?true:false}
                            />
                            <FormFeedback>{errors.numberofNewPostion}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>
                              Total number of position approved (previously +
                              new)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalNoPostionApprov}
                              name="totalNoPostionApprov"
                              disabled={role === "admin_role" ? false : true}
                              onChange={this.handleChange}
                              invalid={errors.totalNoPostionApprov?true:false}
                            />
                            <FormFeedback>{errors.totalNoPostionApprov}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>Number of new post in place</b></CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.numberofNewPost}
                              name="numberofNewPost"
                              disabled={role === "admin_role" ? false : true}
                              onChange={this.handleChange}
                              invalid={errors.numberofNewPost?true:false}
                            />
                            <FormFeedback>{errors.numberofNewPost}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>
                              Number of Old sanctioned position dropped</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.numberofOldSanc}
                              name="numberofOldSanc"
                              disabled={role === "admin_role" ? false : true}
                              onChange={this.handleChange}
                              invalid={errors.numberofOldSanc?true:false}
                            />
                            <FormFeedback>{errors.numberofOldSanc}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>
                              Number of post vacant(sanctioned(Old + new) - in
                              place dropped)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.numberofPostVaccant}
                              name="numberofPostVaccant"
                              disabled={role === "admin_role" ? false : true}
                              onChange={this.handleChange}
                              invalid={errors.numberofPostVaccant?true:false}
                            />
                            <FormFeedback>{errors.numberofPostVaccant}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>Name of the Post</b></CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.nameofPost}
                              name="nameofPost"
                              onChange={this.handleChange}
                              disabled={role === "admin_role" ? false : true}
                              invalid={errors.nameofPost?true:false}
                            />
                            <FormFeedback>{errors.nameofPost}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>Total budget approved in INR-</b></CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.totalBudgetAprrINR}
                              name="totalBudgetAprrINR"
                              onChange={this.handleChange}
                              disabled={role === "admin_role" ? false : true}
                              invalid={errors.totalBudgetAprrINR?true:false}
                            />
                            <FormFeedback>{errors.totalBudgetAprrINR}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel><b>Status</b></CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              name="statuss"
                              onChange={this.handleChange}
                              value={obj.statuss}
                              disabled
                            >
                              <option value="0">-Select-</option>
                              {this.state.statusArray.map((item, index) => {
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
                          <table
                            className="table bordered table-responsive-md table-striped"
                            style={{
                              borderColor: this.state.errorMsg ? "red" : "",
                            }}
                          >
                            <thead gutter={24}>
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
                            </thead>
                            {this.state.tableRows.map((data, i) => {
                              return (
                                <tr key={data.i}>
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
                                        value={data.placeofPostId}
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
                                        value={obj.stateId}
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
                                        value={data.divisionId}
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
                                        value={data.districtId}
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
                                        value={data.typeofFacilityOfficeId}
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
                                        value={data.sacnctionPost}
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
                          </table>
                        </TabPane>
                        <TabPane tab="District Details" key="2">
                          <table className="table bordered table-responsive-md table-striped">
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
                          </table>
                        </TabPane>
                      </Tabs>
                    )}
                    <Row>
                      <Col>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="center"
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button type="default">Save</Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button type="secondary">Edit</Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button>Download</Button>
                        </Form.Item>
                      </Col>
                      {role === "admin_role" ? (
                        <Col>
                          <Form.Item>
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
                          </Form.Item>
                        </Col>
                      ) : null}
                      {role === "admin_role" ? (
                        <Col>
                          <Form.Item>
                            <Button
                              color="primary"
                              // style={{
                              //   display: obj.statuss === 2 ? "block" : "none",
                              // }}
                            >
                              Approved
                            </Button>
                          </Form.Item>
                        </Col>
                      ) : null}
                      {role === "admin_role" ? (
                        <Col>
                          <Form.Item>
                            <Button
                              color="primary"
                              style={{
                                display: obj.statuss === 2 ? "block" : "none",
                              }}
                            >
                              Reject
                            </Button>
                          </Form.Item>
                        </Col>
                      ) : null}
                      {role === "admin_role" ? (
                        <Col>
                          <Form.Item>
                            <Button
                              color="primary"
                              style={{
                                display: obj.statuss === 2 ? "block" : "none",
                              }}
                            >
                              Need Clarification
                            </Button>
                          </Form.Item>
                        </Col>
                      ) : null}
                    </Row>
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
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
) (HumanResourceProposalDetailsForm);
