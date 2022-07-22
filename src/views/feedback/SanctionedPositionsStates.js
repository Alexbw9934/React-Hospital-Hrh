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
  CTextarea,
} from "@coreui/react";
import { DatePicker,Modal} from "antd";
import { withRouter } from "react-router";
import moment from "moment";
const config = localStorage.getItem("token");
// const ref = React.createRef();
const { confirm } = Modal;
class SanctionedPositionsStates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        feedbackRelated: "Application Process",
      },
      isDisableForm: false,
      isDisableProcess: false,
      isDisableSupp: false,
      role: localStorage.getItem("access_role"),
    };
  }
  componentDidMount() {}
  handleChange = (e) =>{
    // let user = this.state;
    // this.setState({user:{
    //   [e.target.name]:e.targe.value
    // }})
  }
  suppCount = async (e) => {
    let val = e.target.value;
    if (val == 2) {
      await this.setState({ isDisableSupp: true });
    } else {
      await this.setState({ isDisableSupp: false });
    }
  };
  showConfirm(value) {
    confirm({
      title:
        value == "submit" ? "Do you Want to Submit?" : "Do you Want to Print?",
      content: "Are you Sure",
      onOk() {
        value == "print" ?window.print():console.log("ok");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard id="personal" style={{ width: "100%" }}>
                <CCardHeader>
                  <h4>Sanctioned Positions - States</h4>
                </CCardHeader>
                <CCardBody>
                  <CForm className="form-horizontal">
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Date</CLabel>
                        </CCol>
                        <CCol xs="6" sm="10">
                          <DatePicker
                            id="date"
                            name="date"
                            defaultValue={moment(user.date)}
                            value={user.date}
                            onChange={this.handleChange}
                            required
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Financial Year</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CInput
                            type="number"
                            id="financialYear"
                            name="financialYear"
                            value={user.financialYear}
                            onChange={this.handleChange}
                            required
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Type of Approval</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            onChange={this.suppCount}
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          >
                            <option value="1">Annual RoP</option>
                            <option value="2">Supplementary RoP</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup
                      row
                      style={{
                        display: this.state.isDisableSupp ? "block" : "none",
                      }}
                    >
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Supp Count</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CTextarea
                            id="suppCount"
                            name="suppCount"
                            placeholder=""
                            value={user.suppCount}
                            onChange={this.handleChange}
                            required
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup
                      style={{
                        display: this.state.role == "admin_role" ? "none" : "",
                      }}
                      row
                    >
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Name of Division</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            placeholder="Name of Division"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          >
                            <option></option>
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Name of District</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            placeholder="Name of District"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          >
                            <option></option>
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Type of District</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            placeholder="Type of District"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          >
                            <option></option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Name of State</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            placeholder="State"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          >
                            <option></option>
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Program Type</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            placeholder="Program Type"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          >
                            <option value="1">NHM</option>
                            <option value="2">NUHM</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Type of Post</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            placeholder="Type of Post"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          >
                            <option value="1">Service Delivery (SD)</option>
                            <option value="2">Program Management (PM)</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel
                            htmlFor="text-input"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          >
                            Category of Post
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            placeholder="Category of Post"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          ></CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel
                            htmlFor="text-input"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          >
                            Name of the Post
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            placeholder="Name of the Post"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          ></CSelect>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Number of post sanctioned
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CInput
                            id="numberPost"
                            name="numberPostt"
                            // placeholder="Number of post sanctioned"
                            type="number"
                            value={user.numberPost}
                            onChange={this.handleChange}
                            required
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Number of new position
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CInput
                            id="newPosition"
                            name="newPosition"
                            // placeholder="Number of post sanctioned"
                            type="number"
                            value={user.newPosition}
                            onChange={this.handleChange}
                            required
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Total number of position approved
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CInput
                            id="positionApproved"
                            name="positionApproved"
                            // placeholder="Total number of position approved"
                            type="number"
                            value={user.positionApproved}
                            onChange={this.handleChange}
                            required
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Number of post in placed
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CInput
                            id="postPlace"
                            name="postPlace"
                            // placeholder="Number of post in placed"
                            type="number"
                            value={user.postPlace}
                            onChange={this.handleChange}
                            required
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          />
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Number of Old sanctioned position dropped
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CInput
                            id="sanctionedPosition"
                            name="sanctionedPosition"
                            // placeholder="Number of Old sanctioned position dropped"
                            type="number"
                            value={user.sanctionedPosition}
                            onChange={this.handleChange}
                            required
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">
                            Number of post vacant
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CInput
                            id="postVaccant"
                            name="postVaccant"
                            // placeholder="Number of post vacant"
                            type="number"
                            value={user.postVaccant}
                            onChange={this.handleChange}
                            required
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          />
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="12">
                          <CLabel htmlFor="text-input">Status</CLabel>
                        </CCol>
                        <CCol xs="12" sm="10">
                          <CSelect
                            placeholder="Select Status"
                            disabled={
                              this.state.role == "admin_role" ? false : true
                            }
                          ></CSelect>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CButton
                          color="primary"
                          id="prevtab"
                          style={{ marginLeft: "10px" }}
                           onClick={() => this.showConfirm('submit')}
                        >
                          Submit
                        </CButton>
                      </CCol>
                      <CCol>
                        <CButton
                          color="info"
                          id="prevtab"
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.showConfirm('print')}
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

export default withRouter(SanctionedPositionsStates);
