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
  // CHeader,
} from "@coreui/react";
import { withRouter } from "react-router";
import Calendar from "react-calendar";
// import axios from "axios";
// import AsyncSelect from "react-select";
// const config = localStorage.getItem("token");
class RecruitmentStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
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
    alert("RecruitmentStatus");
    this.props.history.push("/hrh/Applications");
  };
  render() {
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  Sharing of information
                </h4>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Financial Year </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          type="date"
                          id="date-input"
                          name="date-input"
                          placeholder="To"
                          accentColor="primary"
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Type of Approval </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          <option>From</option>
                          {/* <option>10:00</option>
                          <option>12:00</option>
                          <option>2:00</option> */}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Name Of State </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="countryCode"
                          name="countryCode"
                          placeholder="to"
                          onChange={this.handleCountry}
                        >
                          <option>State Name</option>
                          <option>Dilhi</option>
                          <option>Haryana</option>
                          <option>Utter Pradesh</option>
                          <option>Goa</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Program Type </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          {/* <option><Calendar
                          // onClick={this.handleCountry}
                          // value={this.state.value}
                        /></option> */}
                          <option>Select</option>
                          <option>NHM</option>
                          <option>NUHM</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Type of Post </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="countryCode"
                          name="countryCode"
                          placeholder="to"
                          onChange={this.handleCountry}
                        >
                          <option>Select</option>
                          <option>Medical Officer</option>
                          <option>Nurce</option>
                          <option>Paramedics</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Category of Post </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          <option>Select</option>
                          <option>Specialist</option>
                          <option>Medical Officer</option>
                          <option>Nurses </option>
                          <option>Paramedics</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">FMR Number </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          {/* <option>District Name</option>
                          <option>Gautam buddh nagar</option>
                          <option>Lucknow</option>
                          <option>Gorakhpur</option>
                          <option>Agra</option> */}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Name of Post </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          <option>Select</option>
                          <option>Medical Officer</option>
                          <option>Nurces</option>
                          <option>Paramedics</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="12">
                        <CLabel htmlFor="text-input">
                          Number of New Job Position(Approved){" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          <option>Select</option>
                          <option>Specialist</option>
                          <option>Medical Officer</option>
                          <option>Nurses </option>
                          <option>Paramedics</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Number of Post </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          <option>Select</option>
                          <option>HSC</option>
                          <option>PHC</option>
                          <option>UPHC</option>
                          <option>CHC</option>
                          <option>UCHC</option>
                          <option>SDH</option>
                          <option>DH</option>
                          <option>Other</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="12">
                        <CLabel htmlFor="text-input">
                          Total Number of Job Position approved (Previously +
                          New)
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          {/* <option>CPMU/DPMU/PM</option>
                          <option>USA</option>
                          <option>Conada</option>
                          <option>IN</option>
                          <option>Japan</option> */}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">
                          Number of Post in place{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          <option>Select</option>
                          <option>HSC</option>
                          <option>PHC</option>
                          <option>UPHC</option>
                          <option>CHC</option>
                          <option>UCHC</option>
                          <option>SDH</option>
                          <option>DH</option>
                          <option>Other</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="12">
                        <CLabel htmlFor="text-input">
                          {" "}
                          Number of old sectional Post{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          <option>Select</option>
                          <option>Surgeon</option>
                          <option>General Physician</option>
                          <option>Obstetrician</option>
                          <option>Gynaecologist</option>
                          <option>Paediatrician</option>
                          <option>Anaesthetist</option>
                          <option>Orthopaedic Surgeon</option>
                          <option>ENT specialist</option>
                          <option>Cardiology</option>
                          <option> Dermatologist</option>
                          <option>Urology</option>
                          <option>Others</option>
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="12">
                        <CLabel htmlFor="text-input">
                          Number of Post
                          Vacant(Sanctioned(old+new)-inplce-Dropped){" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          {/* <option>Nurses and Paramedical staff</option>
                          <option>AM</option>
                          <option>BM</option>
                          <option>IN</option>
                          <option>CM</option> */}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">
                          {" "}
                          Total budged approved in INR{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="From"
                          onChange={this.handleCountry}
                        >
                          {/* <option>Default Input</option>
                          <option>CM</option>
                          <option>PM</option>
                          <option>LM</option>
                          <option>NM</option> */}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>

                  {/* end */}
                  <CFormGroup>
                    <CCol sm="4">
                      <CCol sm="10"></CCol>
                      <CCol sm="8"></CCol>
                      <CCol></CCol>
                      <CButton color="primary" onClick={this.submitData}>
                        Save
                      </CButton>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

export default withRouter(RecruitmentStatus);
