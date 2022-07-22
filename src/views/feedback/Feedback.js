import React, { Component } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormGroup,
  CInput,
  CLabel,
  CForm,
  CButton,
  CSelect,
  CImg,
  CTextarea,
  CInputCheckbox,
} from "@coreui/react";
import { retrieveState, retrieveDistricts } from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { DatePicker, Select, Modal } from "antd";
import { withRouter } from "react-router";
import moment from "moment";
const config = localStorage.getItem("token");
// const ref = React.createRef();
const { confirm } = Modal;
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isDisableForm: false,
      isDisableProcess: false,
      role: localStorage.getItem("access_role"),
      grievance: [
        { key: "1", value: "State" },
        { key: "2", value: "District" },
      ],
      actionTaken: [
        { key: "1", value: "Concerned State" },
        { key: "2", value: "Concerned District" },
      ],
      feedbackRelated: [
        { key: "1", value: "Application Form" },
        { key: "2", value: "Application Process" },
        { key: "3", value: "Advertisement" },
      ],
    };
  }
  componentDidMount() {
    this.props.retrieveState();
    this.props.retrieveDistricts();
  }
  handleChange = async (value) => {
    if (value == 1) {
      this.setState({ isDisableForm: true, isDisableProcess: false });
    } else if (value == 2) {
      this.setState({ isDisableForm: false, isDisableProcess: true });
    } else {
      this.setState({ isDisableForm: false, isDisableProcess: false });
    }
  };
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
  actionNation = async () => {};
  render() {
    const { user } = this.state;
    return (
      <div>
        <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard id="personal" style={{ width: "100%" }}>
                <CCardHeader>
                  <h4>Feedback / Grievances</h4>
                </CCardHeader>
                <CCardBody>
                  <CForm className="form-horizontal">
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Feedback ID</CLabel>
                        </CCol>
                        <CCol xs="6" sm="12">
                          <CInput
                            id="feedbackID "
                            name="feedbackID"
                            value={user.feedbackID}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Name</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Email ID</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="emailId"
                            name="emailId"
                            placeholder=""
                            value={user.emailId}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Mobile Number</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="phone"
                            name="phone"
                            placeholder=""
                            value={user.phone}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Date of Feedback{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="dateOfFeedback"
                            name="dateOfFeedback"
                            type="date"
                            onChange={this.handleChange}
                            value={user.dateOfFeedback}
                            disabled={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                          {/* <DatePicker
                              id="dateOfFeedback"
                              name="dateOfFeedback"
                              defaultValue={moment(user.dateOfFeedback)}
                              value={user.dateOfFeedback}
                              onChange={this.handleChange}
                              required
                              disabled={this.state.role == "candidate_role" ? false:true}
                            /> */}
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            <CLabel htmlFor="text-input">
                              Feedback Related To
                            </CLabel>
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <Select
                            style={{ width: "100%" }}
                            onChange={this.handleChange}
                          >
                            {this.state.feedbackRelated.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.key}>
                                  {item.value}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Feedback</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CTextarea />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup
                      row
                      style={{
                        display: this.state.isDisableProcess ? "" : "none",
                      }}
                    >
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            <CLabel htmlFor="text-input">
                              How you know about the Join hand with NHM
                              initiative
                            </CLabel>
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="joinHand"
                            name="joinHand"
                            placeholder=""
                            value={user.joinHand}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            <CLabel htmlFor="text-input">
                              Is the sufficient information provided for
                              applying or submitting your interest
                            </CLabel>
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="interest"
                            name="interest"
                            placeholder=""
                            value={user.interest}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup
                      row
                      style={{
                        display: this.state.isDisableProcess ? "" : "none",
                      }}
                    >
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            <CLabel htmlFor="text-input">
                              How is the process of applying or showing interest
                              (submission of application)
                            </CLabel>
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="submission"
                            name="submission"
                            placeholder=""
                            value={user.submission}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            <CLabel htmlFor="text-input">
                              What is the feedback on the recruitment
                              communication
                            </CLabel>
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="communication"
                            name="communication"
                            placeholder=""
                            value={user.communication}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup
                      row
                      style={{
                        display: this.state.isDisableProcess ? "" : "none",
                      }}
                    >
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            <CLabel htmlFor="text-input">
                              Overall satisfaction level on the recruitment
                              process
                            </CLabel>
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="recruitment"
                            name="recruitment"
                            placeholder=""
                            value={user.recruitment}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            <CLabel htmlFor="text-input">
                              Ideas for improvement to make it more
                              user-friendly and broader dissemination
                            </CLabel>
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="dissemination"
                            name="dissemination"
                            placeholder=""
                            value={user.dissemination}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup
                      row
                      style={{
                        display: this.state.isDisableProcess ? "" : "none",
                      }}
                    >
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            <CLabel htmlFor="text-input">
                              Do you refer to your friends or colleagues
                            </CLabel>
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="colleagues"
                            name="colleagues"
                            placeholder=""
                            value={user.colleagues}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup
                      row
                      style={{
                        display: this.state.isDisableForm ? "block" : "none",
                      }}
                    >
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Feedback/Grievance Details
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CTextarea
                            id="feedbackDetail"
                            name="feedbackDetail"
                            placeholder=""
                            value={user.feedbackDetail}
                            onChange={this.handleChange}
                            required
                            readOnly={
                              this.state.role == "candidate_role"
                                ? false
                                : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Grievance related to
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <Select style={{ width: "100%" }}>
                            {this.state.grievance.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.key}>
                                  {item.value}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">District</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="districtId"
                            name="districtId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={user.districtId || ""}
                          >
                            <option value="0">-Select-</option>
                            {this.props.districtsList &&
                              this.props.districtsList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">State</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateId"
                            name="stateId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={user.stateId || ""}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateList &&
                              this.props.stateList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Action taken by</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <Select style={{ width: "100%" }}>
                            {this.state.actionTaken.map((item, index) => {
                              return (
                                <Select.Option key={index} value={item.key}>
                                  {item.value}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Action required</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Date of action taken
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="dateOfActionTaken"
                            name="dateOfActionTaken"
                            type="date"
                            onChange={this.handleChange}
                            value={user.dateOfActionTaken}
                          />
                          {/* <DatePicker
                              id="ddateOfActionTaken"
                              name="dateOfActionTaken"
                              defaultValue={moment(user.dateOfActionTaken)}
                              value={user.dateOfActionTaken}
                              onChange={this.handleChange}
                              required
                            /> */}
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Action taken</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CTextarea />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Is any action required from National Team
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            onChange={this.actionNation}
                            disabled={
                              this.state.role == "admin_role"
                                ? this.state.role == "candidate_role"
                                  ? false
                                  : false
                                : true
                            }
                          >
                            <option>Select</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Is any action required from State Team
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            onChange={this.actionNation}
                            disabled={
                              this.state.role == "state_role"
                                ? this.state.role == "candidate_role"
                                  ? false
                                  : false
                                : true
                            }
                          >
                            <option>Select</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Is any action required from District Team
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            onChange={this.actionNation}
                            disabled={
                              this.state.role == "district_role"
                                ? this.state.role == "candidate_role"
                                  ? false
                                  : false
                                : true
                            }
                          >
                            <option>Select</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CButton
                          color="primary"
                          id="prevtab"
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.showConfirm("submit")}
                        >
                          Submit
                        </CButton>
                      </CCol>
                      <CCol>
                        <CButton
                          color="info"
                          id="prevtab"
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.showConfirm("print")}
                        >
                          Print
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stateList: state.apiadd.stateList,
    districtsList: state.apiadd.districtsList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveState,
      retrieveDistricts,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
