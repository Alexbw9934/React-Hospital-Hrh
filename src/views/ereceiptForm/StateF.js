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
import axios from "axios";
// import AsyncSelect from "react-select";
const config = localStorage.getItem("token");
class StateF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      stateCode: "",
      countryId: 0,
      country: {
        id: 0,
        name: "",
        countryCode: "",
      },
    };
    this.states = {
      users: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://5.9.111.198:13880/api/countries", {
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.states),
      })
      .then((res) => {
        // console.log(res);
        let data = res.data;
        // console.log(data);
        this.setState((this.states = { users: data }));
      });
  }
  handleCountry=(e)=>{
    this.setState({
      country:{
        ...this.state.country,
        [e.target.name]:e.target.value
      }

    })
  }
  submitData = () => {
    const data = this.state;
    const data1 = this.state.country;
    console.log(data);
    console.log(data1.name);
    fetch("http://5.9.111.198:13880/api/States", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      console.log("result", resp);
    });
  };
  render() {
    console.log(this.state.country);
    const result = this.state;
    console.log(result);
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  State
                </h4>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> Name </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="name"
                          name="name"
                          placeholder="Name"
                          onChange={(e) =>
                            this.setState({ name: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> StateCode </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="countryCode"
                          name="countryCode"
                          placeholder="Country Code"
                          onChange={(e) =>
                            this.setState({ stateCode: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CCol sm="4">
                    <h4>Country details</h4>
                  </CCol>
                  {/* country */}
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CountryName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="name"
                        name="name"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">ContryCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="countryCode"
                        name="countryCode"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))}
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

export default StateF;
