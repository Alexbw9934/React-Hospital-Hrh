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
  // CHeader,
} from "@coreui/react";
import axios from "axios";
const config = localStorage.getItem("token");

export class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      address1: "",
      address2: "",
      cityId: 0,
      city: {
        id: 0,
        name: "",
        cityCode: "",
        stateId: 0,
        state: {
          id: 0,
          name: "up",
          stateCode: "09",
          countryId: 0,
          country: {
            id: 0,
            name: "india",
            countryCode: "01",
          },
        },
        countryId: 0,
        country: {
          id: 0,
          name: "india",
          countryCode: "01",
        },
      },
      stateId: 0,
      state: {
        id: 0,
        name: "up",
        stateCode: "10",
        countryId: 0,
        country: {
          id: 0,
          name: "",
          countryCode: "10",
        },
      },
      countryId: 0,
      country: {
        id: 0,
        name: "",
        countryCode: "",
      },
      website: "",
      email: "",
      mobile: "",
      phone: "",
      taxID: "",
      registrationId: "",
      currencyId: 0,
      currency: {
        id: 0,
        name: "",
        currencyCode: "",
      },
    };
    //  this.state1={
    //    stateArray:[]
    // }
    this.state2 = {
      cityArray: [],
    };
    this.state3 = {
      countryArray: [],
    };
    this.state4 = {
      currencyArray: [],
    };
  }

  componentDidMount = () => {
    // this.fetchOption1()
    this.fetchOption2();
    this.fetchOption3();
    this.fetchOption4();
  };
  fetchOption1() {
    axios
      .get("States/{country}", {
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.states),
      })
      .then((res) => {
        console.log(res);
        let state = res.data;
        console.log(state);
        this.setState((this.state1 = { stateArray: state }));
      });
  }
  fetchOption2 = () => {
    axios
      .get("http://5.9.111.198:13880/api/cities", {
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.states),
      })
      .then((res) => {
        let city = res.data;
        this.setState((this.state2 = { cityArray: city }));
      });
  };
  fetchOption3 = () => {
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
        let contry = res.data;
        this.setState((this.state3 = { countryArray: contry }));
      });
  };
  fetchOption4 = () => {
    axios
      .get("http://5.9.111.198:13880/api/currencies", {
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.states),
      })
      .then((res) => {
        //  console.log(res)
        let data = res.data;
        //  console.log(data)
        this.setState((this.state4 = { currencyArray: data }));
      });
  };
  handleCity = (e) => {
    this.setState({
      city: {
        ...this.state.city,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleState = (e) => {
    this.setState({
      state: {
        ...this.state.state,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleCountry=(e)=>{
  this.setState({
    ...this.state.country,
    [e.state.name]:e.target.value
  })
  }
  handleCurrency=(e)=>{
    this.setState({
      ...this.state.currency,
      [e.state.name]:e.target.value
    })
    }
  submitData = () => {
    fetch("http://5.9.111.198:13880/api/companies", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((resp) => {
      console.log("result", resp);
    });
  };

  render() {
    var data=this.state
   console.log(data.city.name)
    var megaData2 = this.state2;
    // console.log(megaData2, "city");
    var megaData3 = this.state3;
    // console.log(megaData3, "country");
    var megaData4 = this.state4;
    // console.log(megaData4, "currency");
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  Company
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
                        <CLabel htmlFor="text-input"> Address 1 </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="address1"
                          name="address1"
                          placeholder="Address 1"
                          onChange={(e) =>
                            this.setState({ address1: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> Address 2 </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="address2"
                          name="address2"
                          placeholder="Address 2"
                          onChange={(e) =>
                            this.setState({ address2: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  {/* country */}
                  <CCol md="4">
                    <h4>City details</h4>
                  </CCol>

                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CityName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="Select"
                          onChange={this.handleCity}
                        >
                          {megaData2.cityArray.map((city) => (
                            <option key={city.id} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">cityCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="cityCode"
                          name="cityCode"
                          placeholder="Select"
                          onChange={this.handleCity}
                        >
                          {megaData2.cityArray.map((city) => (
                            <option key={city.id} value={city.cityCode}>
                              {city.cityCode}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  {/* end */}
                  {/* State */}
                  <CCol md="4">
                    <h4>State.. details</h4>
                  </CCol>

                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">StateName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          placeholder="Select"
                          id="name"
                          name="name"
                          onChange={this.handleState}
                        >
                          {/* {megaData.cityArray.map((user) => (
                          <option value="user.value">{user.name}</option>
                        ))} */}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">StateCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="statecode"
                          name="statecode"
                          placeholder="Statecode"
                          onChange={this.handleState}
                        >
                          {/* {this.states.stateArray.map((user) => (
                          <option value="user.value">{user.stateCode}</option>
                        ))} */}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  {/* end */}
                  {/* Country */}
                  <CCol sm="4">
                    <h4>country.. details</h4>
                  </CCol>

                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">countryName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          placeholder="Select"
                        onChange={this.handleCountry}
                        >
                          {megaData3.countryArray.map((users) => (
                            <option key={users.id} value={users.name}>{users.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">countryCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="countryCode"
                          name="countryCode"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {megaData3.countryArray.map((users) => (
                            <option key={users.id} value={users.countryCode}>{users.countryCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  {/* end */}
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> Website </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="website"
                          name="webist"
                          placeholder="website"
                          onChange={(e) =>
                            this.setState({ website: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                    {/* </CFormGroup>
                  <CFormGroup row> */}
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="email-input"> Email </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="email"
                          name="email"
                          placeholder="email"
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> Mobile </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="mobile"
                          name="mobile"
                          placeholder="mobile"
                          onChange={(e) =>
                            this.setState({ mobile: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                    {/* </CFormGroup>
                  <CFormGroup row> */}
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> Phone </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="phone"
                          name="phone"
                          placeholder="phone"
                          onChange={(e) =>
                            this.setState({ phone: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> Text Id </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="textid"
                          name="textid"
                          placeholder="textid"
                          onChange={(e) =>
                            this.setState({ textid: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                    {/* </CFormGroup>
                  <CFormGroup row> */}
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input"> RegistrationId </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="registration"
                          name="registration"
                          placeholder="registration"
                          onChange={(e) =>
                            this.setState({ registration: e.target.value })
                          }
                        />
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  {/* currency */}
                  <CCol sm="4">
                    <h4>Currency details</h4>
                  </CCol>

                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">currencyName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="name"
                          name="name"
                          onChange={this.handleCurrency}
                        >
                          {megaData4.currencyArray.map((user) => (
                            <option key={user.id} value={user.name}>
                              {user.name}
                            </option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">currencyCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="currencyCode"
                          name="currencyCode"
                          onChange={this.handleCurrency}
                        >
                          {megaData4.currencyArray.map((user) => (
                            <option key={user.id} value={user.currencyCode}>
                              {user.currencyCode}
                            </option>
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

export default Company;
