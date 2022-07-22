import React from "react";
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
} from "@coreui/react";
// import ReactToPrint from "react-to-print";
import axios from "axios";
import "./Person.css";
import { withRouter } from "react-router";
import { DatePicker, Modal } from "antd";
// import AsyncSelect from "react-select";
const PnId = localStorage.getItem("document");
const ref = React.createRef();
const { confirm } = Modal;
class PersonalInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      nationalStatus: [
        { id: 1, name: "Yes" },
        { id: 2, name: "No" },
      ],
      isDisable: false,
      conStates: "",
      conDistrict: "",
      natStatus: "",
      statusDetails: [
        { id: 1, name: "Accept" },
        { id: 2, name: "Rejected " },
        { id: 3, name: "In Process" },
        { id: 4, name: "Offer Letter Issued" },
        { id: 5, name: "Joined" },
      ],
      honoriumPM: "",
      placeOfJoin: "",
      dateOfJoining: "",
      designation: "",
      role: localStorage.getItem("access_role"),
      joiningDisplay: false,
      rejectDisplay: false,
      acceptDisplay: false,
      appointmentDisplay: false,
      rejectRsn: "",
      fwdRsn:'',
      levelStateDisplay:false,
      levelHRDisplay:false,
    };
  }
  componentDidMount() {
    // axios
    //   .get(`ApplicationForms/${PnId}`, {
    //     headers: {
    //       // "Authorization":`Bearer ${config}`,
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(this.state),
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     let data = res.data;
    //     console.log(data);
    //     this.setState({ users: data });
    //   });
    axios({
      url: `${process.env.REACT_APP_API_URL}Applications/${PnId}`,
      method: "GET",
    }).then((response) => {
      this.setState({ users: response.data });
    });
  }

  handleCountry = (e) => {
    this.setState({
      country: {
        ...this.state.country,
        [e.target.name]: e.target.value,
      },
    });
  };
  submitData = () => {
    alert("PersonalInformation");
  };
  handleSelect = async (e) => {
    let val = e.target.value;
    if (val == 1) {
      //  document.getElementById('national-status').show();
      await this.setState({ levelDisplay: true });
    } else {
      await this.setState({ levelDisplay: false });
    }
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSelect = async (e) => {
    let val = e.target.value;
    if (val == 1) {
      await this.setState({ isDisable: true });
    } else {
      await this.setState({ isDisable: false });
    }
  };
  handleLevel = async (e) => {
    console.log(e.target.value)
    let val = e.target.value;
    if (val == 1) {
      await this.setState({ levelStateDisplay: true });
    } else {
      await this.setState({ levelStateDisplay: false});
    }
  };
  handleHR = async (e) => {
    console.log(e.target.value)
    let val = e.target.value;
    if (val == 2) {
      await this.setState({ levelHRDisplay: true });
    } else {
      await this.setState({ levelHRDisplay: false});
    }
  };
  handleStatus = async (e) => {
    let val = e.target.value;
    if (val == 5) {
      await this.setState({
        joiningDisplay: true,
        rejectDisplay: false,
        acceptDisplay: false,
        appointmentDisplay: false,
      });
    } else if (val == 2) {
      await this.setState({
        joiningDisplay: false,
        rejectDisplay: true,
        acceptDisplay: false,
        appointmentDisplay: false,
      });
    } else if (val == 1) {
      await this.setState({
        joiningDisplay: false,
        rejectDisplay: false,
        acceptDisplay: true,
        appointmentDisplay: false,
      });
    } else
      await this.setState({
        joiningDisplay: false,
        rejectDisplay: false,
        acceptDisplay: false,
        appointmentDisplay: true,
      });
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
    let user = this.state.users;
    return (
      <div>
        <table>
          {/* {this.state.users ? (
            this.state.users.map((user, index) => {
              return ( */}
          <tr>
            {/* <p>{user.registrationNo}</p>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.statePref1}</td>
                              <td>{user.districPref1}</td> */}
            <div>
              <CRow>
                <CCol xs="12" sm="12">
                  <CCard id="personal" style={{ width: "100%" }}>
                    <CCardHeader>
                      <h4>
                        Personal Informations
                      </h4>
                    </CCardHeader>
                    <CCardBody>
                      <CForm className="form-horizontal">
                        <CFormGroup row>
                          {/* <CRow> */}
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">
                                Registration Number
                              </CLabel>
                            </CCol>
                            <CCol xs="6" sm="10">
                              <CInput
                                style={{ width: "87%" }}
                                id="registrationNo"
                                name="registrationNo"
                                value={user.registrationNo}
                                onChange={this.handleChange}
                                required
                              />

                              {/* <CFormFeedback invalid>Please provide a valid city.</CFormFeedback> */}
                            </CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Name</CLabel>
                            </CCol>
                            <CCol xs="12" sm="10">
                              <CInput
                                style={{ width: "87%" }}
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Father Name</CLabel>
                            </CCol>
                            <CCol xs="12" sm="10">
                              <CInput
                                style={{ width: "87%" }}
                                id="fatherName"
                                name="fatherName"
                                placeholder=""
                                value={user.fatherName}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                            {/* </CCol>
                      <CCol> */}
                            <CCol md="6">
                              <CLabel htmlFor="text-input">
                                Date of Birth{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="10">
                              <CInput
                                style={{ width: "87%" }}
                                type="date"
                                id="dob"
                                name="dob"
                                // placeholder="dob"
                                value={user.dob}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">
                                <CLabel htmlFor="text-input">Phone </CLabel>
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="10">
                              <CInput
                                style={{ width: "120%" }}
                                id="phone"
                                name="phone"
                                // placeholder="Contact Number"
                                value={user.phone}
                                onChange={this.handleChange}
                                required
                              />

                              {/* <option>From</option>
                          </CSelect> */}
                            </CCol>
                            {/* </CCol>
                    <CCol> */}
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Email </CLabel>
                            </CCol>
                            <CCol xs="12" sm="10">
                              <CInput
                                style={{ width: "120%" }}
                                type="email"
                                id="email"
                                name="email"
                                // placeholder="name@gmail.com"
                                value={user.email}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>To</option>
                          </CSelect> */}
                            </CCol>
                          </CCol>

                          {/* <CCol xs="12" sm="4"> */}
                          <CCardBody style={{ marginTop: "-6%" }}>
                            <CImg
                              className="img"
                              id="image"
                              name="image"
                              onChange={this.handleChange}
                              style={{
                                width: "28%",
                                marginTop: "-60%",
                                marginLeft: "73%",
                              }}
                              src="data:image/jpeg;base64,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"
                              rounded
                            />
                          </CCardBody>
                          <CCol sm="1"></CCol>
                          {/* </CCol> */}
                          {/* </CRow> */}
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Address </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="address"
                                name="address"
                                // placeholder="Address"
                                value={user.address}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>NHM/NUHM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Street 1 </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="street1"
                                name="street1"
                                // placeholder="street1"
                                value={user.street1}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>NHM/NUHM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">street2 </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="street2"
                                name="street2"
                                // placeholder="street2"
                                value={user.street2}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>SD/PM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">PinCode </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="pincode"
                                name="pincode"
                                // placeholder="pincode"
                                value={user.pincode}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>SD/PM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        {/* <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">
                          <b>City</b>{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="name"
                          name="name"
                          // placeholder="City"
                          // value={user.city.name}
                          onChange={this.handleCity}
                        />
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">
                          <b>Country</b>{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="name"
                          name="name"
                          // placeholder="Country"
                          // value={user.country.name}
                          onChange={this.handleCountry}
                          required
                        />
                        {/* <option>SD/PM</option>
                        </CSelect> */}
                        {/* </CCol> */}
                        {/* </CCol> */}
                        {/* </CFormGroup> */}
                        <CFormGroup row>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">
                                <b>State</b>{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="name"
                                name="name"
                                placeholder="All India State only"
                                onChange={this.handleState}
                                readOnly
                              />
                              {/* <option>NHM/NUHM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">
                                <b>District</b>{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="name"
                                name="name"
                                placeholder="District"
                                onChange={(e) => {
                                  this.setState({
                                    districtCategories: {
                                      name: e.target.value,
                                    },
                                  });
                                }}
                                required
                                readOnly
                              />
                              {/* <option>SD/PM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input"></CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="statePref1"
                                name="statePref1"
                                // placeholder="Preference 1"
                                value={user.statePref1}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>NHM/NUHM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input"> </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="districPref1"
                                name="districPref1"
                                // placeholder="Preference 1"
                                value={user.districPref1}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>SD/PM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input"> </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="statePref2"
                                name="statePref2"
                                // placeholder="Preference 2"
                                value={user.statePref2}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input"></CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="districPref2"
                                name="districPref2"
                                // placeholder="Preference 2"
                                value={user.districPref2}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>CPMU/DPMU/PM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                year of Issue
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                type="date"
                                id="yearofIssue"
                                name="yearofIssue"
                                // placeholder=""
                                value={user.yearofIssue}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>NHM/NUHM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="12">Name of Issuing Councl </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="nameofIssueCouncil"
                                name="nameofIssueCouncil"
                                // placeholder="Issue Council"
                                value={user.nameofIssueCouncil}
                                onChange={this.handleChange}
                                required
                              />
                              {/* <option>SD/PM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">Place </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="place"
                                name="place"
                                // placeholder="place"
                                value={user.place}
                                onChange={this.handleChange}
                                required
                              />

                              {/* <option>SD/PM</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">
                                Category of Post{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="name"
                                name="name"
                                // placeholder="From"
                                // value={user.categoryofpost.name}
                                onChange={this.handleCategory}
                                required
                              />
                              {/* <option>Nurses and Paramedical staff</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="6">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Job Position{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="name"
                                name="name"
                                // placeholder="From"
                                // value={user.position.name}
                                onChange={this.handlePosition}
                                required
                              />
                              {/* <option>Defoult Input</option>
                        </CSelect> */}
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Updated status of all concerned States{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="conStates"
                                name="conStates"
                                onChange={this.handleChange}
                                value={this.state.conStates}
                                required
                                readOnly={
                                  this.state.role == "state_role"
                                    ? false
                                    : true
                                }
                              />
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Updated status of all concerned Districts{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="conDistrict"
                                name="conDistrict"
                                value={this.state.conDistrict}
                                onChange={this.handleChange}
                                readOnly={
                                  this.state.role == "district_role"
                                    ? false
                                    : true
                                }
                                required
                              />
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Updated status from national level{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CSelect
                                onChange={this.handleSelect}
                                id="select"
                                readOnly={
                                  this.state.role == "admin_role"
                                    ? false
                                    : true
                                }
                              >
                                <option></option>
                                {this.state.nationalStatus.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  }
                                )}
                              </CSelect>
                            </CCol>
                          </CCol>
                          <CCol
                            id="national-status"
                            style={{
                              display: this.state.isDisable ? "block" : "none",
                            }}
                          >
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                National status{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="natStatus"
                                name="natStatus"
                                value={this.state.natStatus}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Status Details{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CSelect onChange={this.handleStatus} id="select">
                                {this.state.statusDetails.map((item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </CSelect>
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup
                          row
                          style={{
                            display: this.state.joiningDisplay ? "" : "none",
                          }}
                        >
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Date of Joining{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <DatePicker
                                id="date-join"
                                name="dateOfJoining"
                                value={this.state.dateOfJoining}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Place of Joining{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="place-join"
                                name="placeOfJoin"
                                value={this.state.placeOfJoin}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Designation{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CSelect
                                onChange={this.handleChange}
                                id="select"
                              ></CSelect>
                            </CCol>
                          </CCol>
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Honorarium per month (In INR){" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="h-p-m"
                                name="honoriumPM"
                                value={this.state.honoriumPM}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup
                          row
                          style={{
                            display: this.state.rejectDisplay ? "" : "none",
                          }}
                        >
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Rejection Reason{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CInput
                                id="rejectRsn"
                                name="rejectRsn"
                                value={this.state.rejectRsn}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup
                          row
                          style={{
                            display: this.state.acceptDisplay ? "" : "none",
                          }}
                        >
                          <CCol>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Appointment done at{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CSelect onChange={this.handleLevel}>
                                <option value="1">State Level</option>
                                <option value="2">District Level</option>
                              </CSelect>
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row
                         >
                          <CCol  style={{
                            display: this.state.levelStateDisplay ? "" : "none",
                          }}>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                State HR forward the application to the concerned Distt{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                              <CSelect onChange={this.handleHR}>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                              </CSelect>
                            </CCol>
                          </CCol>
                          <CCol  style={{
                            display: this.state.levelHRDisplay ? "" : "none",
                          }}>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">
                                {" "}
                                Reason for not forwarding{" "}
                              </CLabel>
                            </CCol>
                            <CCol xs="12" sm="12">
                            <CInput
                                id="fwdRsn"
                                name="fwdRsn"
                                value={this.state.fwdRsn}
                                onChange={this.handleChange}
                                required
                              />
                            </CCol>
                          </CCol>
                        </CFormGroup>
                        {/* end */}
                        <CFormGroup row>
                          <CCol>
                            {" "}
                            <CButton
                              color="info"
                              id="prevtab"
                              style={{ marginLeft: "10px" }}
                              onClick={() => () => this.showConfirm("print")}
                            >
                              Print
                            </CButton>
                          </CCol>
                          <CCol>
                            {" "}
                            <CButton
                              color="success"
                              style={{ marginLeft: "10px" }}
                              onClick={() => this.showConfirm("submit")}
                            >
                              Submit
                            </CButton>
                          </CCol>
                          {/* <CButton color="primary" onClick={this.submitData}>
                        Save
                      </CButton> */}
                        </CFormGroup>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </div>
          </tr>
          {/* );
            })
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )} */}
        </table>
      </div>
    );
  }
}

export default withRouter(PersonalInformation);
