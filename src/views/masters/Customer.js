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
class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "ddsff",
      companyId: 0,
      company: {
        id: 0,
        name: "string",
        address1: "gdgdgdgdgd",
        address2: "fdfffsd",
        cityId: 0,
        city: {
          id: 0,
          name: "gddgdb",
          cityCode: "ghhgfhgfhgf",
          stateId: 0,
          state: {
            id: 0,
            name: "gjgghghf",
            stateCode: "fgdfgfd",
            countryId: 0,
            country: {
              id: 0,
              name: "jghfghfggh",
              countryCode: "hfhfnffdg"
            }
          },
          countryId: 0,
          country: {
            id: 0,
            name: "hfhg",
            countryCode: "gjfghfghg"
          }
        },
        stateId: 0,
        state: {
          id: 0,
          name: "ggfhgfh",
          stateCode: "fgdfhdh",
          countryId: 0,
          country: {
            id: 0,
            name: "wfdgnghg",
            countryCode: "dsdgfh"
          }
        },
        countryId: 0,
        country: {
          id: 0,
          name: "asdfgh",
          countryCode: "zczcvxb"
        },
        website: "sdsdsd",
        email: "dddsdsd",
        mobile: "1223333",
        phone: "444444",
        taxID: "ffffff",
        registrationId: "ggggg",
        currencyId: 0,
        currency: {
          id: 0,
          name: "jjjjj",
          currencyCode: "fffff"
        }
      },
      address1: "bbbbbb",
      address2: "gggggg",
      cityId: 0,
      city: {
        id: 0,
        name: "xxxxx",
        cityCode: "hhhhh",
        stateId: 0,
        state: {
          id: 0,
          name: "hhhhhh",
          stateCode: "fffff",
          countryId: 0,
          country: {
            id: 0,
            name:"eeeee",
            countryCode: "aaaaa"
          }
        },
        countryId: 0,
        country: {
          id: 0,
          name: "ssss",
          countryCode: "aaaa"
        }
      },
      stateId: 0,
      state: {
        id: 0,
        name: "dddd",
        stateCode: "dfsss",
        countryId: 0,
        country: {
          id: 0,
          name: "sdfsdf",
          countryCode: "dsfsf"
        }
      },
      countryId: 0,
      country: {
        id: 0,
        name: "vcxvc",
        countryCode: "ffsdf"
      },
      website: "df",
      email: "dsfsd",
      mobile: "dfdf",
      phone: "dgd",
      taxID: "sdfsd",
      registrationId: "dfsf",
      currency: {
        id: 0,
        name: "fgfdgdg",
        currencyCode: "vf"
      }
    }
    this.state1={
      countryArray:[]
    }
    this.state2={
      companiesArray:[]
    }
    this.state3={
      stateArray:[]
    }
    this.state4={
      currencyArray:[]
    }
    this.state5={
      cityArray:[]
    }
  }
  componentDidMount() {
    this.countryApi();
    this.companiesApi();
    this.stateApi();
    this.currencyApi();
    this.cityApi();
  }
  countryApi=()=>{
    axios
    .get("http://5.9.111.198:13880/api/countries", {
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state1),
    })
    .then((res) => {
      // console.log(res);
      let data = res.data;
      console.log("country",data);
      this.setState((this.state1 = {countryArray: data }));
    });
  }
  companiesApi=()=>{
    axios
    .get("http://5.9.111.198:13880/api/companies", {
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state2),
    })
    .then((res) => {
      // console.log(res);
      let data = res.data;
      console.log("conpanies",data);
      this.setState((this.state2={ companiesArray: data }));
    });
  }
  stateApi=()=>{
    axios
    .get("http://5.9.111.198:13880/api/States/{country}", {
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state3),
    })
    .then((res) => {
      // console.log(res);
      let data = res.data;
      console.log("state",data);
      this.setState((this.state3 = {stateArray: data }));
    });
  }
  currencyApi=()=>{
    axios
    .get("http://5.9.111.198:13880/api/Currencies", {
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state4),
    })
    .then((res) => {
      // console.log(res);
      let data = res.data;
      console.log("currency",data);
      this.setState((this.state4 = {currencyArray: data }));
    });
  }
  cityApi=()=>{
    axios
    .get("http://5.9.111.198:13880/api/cities", {
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state4),
    })
    .then((res) => {
      // console.log(res);
      let data = res.data;
      console.log("city",data);
      this.setState((this.state5 = { cityArray: data }));
    });
  }

  handleCompanies=(e)=>{
    this.setState({
      company:{
        ...this.state.company,
        [e.target.name]:e.target.value
      }
    })
  }
  handleCountry=(e)=>{
    this.setState({
      country:{
        ...this.state.country,
        [e.target.name]:e.target.value
      }
    })
  }
  handleCity=(e)=>{
    this.setState({
      city:{
        ...this.state.country.city,
        [e.target.name]:e.target.value
      }
    })
  }
  handleCountry2=(e)=>{
    this.setState({
      city:{
        ...this.state.country.country,
        [e.target.name]:e.target.value
      }
    })
  }

  submitData = () => {
    const data = this.state;
    console.log(data);
    fetch("http://5.9.111.198:13880/api/Customers", {
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
    const company=this.state2
    console.log("result",company)
    const citydata=this.state5.cityArray
    console.log("city",citydata)

    // console.log(this.state.country);
    const result = this.state;
    console.log(result);
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>
                  Customerorm
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
                        <CLabel htmlFor="text-input">companyId</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="companyId"
                          name="companyId"
                          placeholder="companyId"
                          onChange={(e) =>
                            this.setState({ companyId: e.target.value })
                          }
                        >
                           {company.companiesArray.map((user) => (
                            <option key={user.id}>{user.id}</option>
                          ))}
                          </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CCol sm="4">
                    <h4>Company details</h4>
                  </CCol>
                  {/*company */}
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CompanyName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="name"
                        name="name"
                          placeholder="Select"
                          onChange={this.handleCompanies}
                        >
                          {company.companiesArray.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">address1</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="Add1"
                        name="Add1"
                          placeholder="Addres1"
                          onChange={this.handleCompanies}
                        >
                          {company.companiesArray.map((user) => (
                            <option key={user.id}>{user.address1}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  {/* </CFormGroup>
                  <CFormGroup row> */}
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Address2</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="Add2"
                        name="Add2"
                          placeholder="Address2"
                          onChange={this.handleCompanies}
                        >
                          {company.companiesArray.map((user) => (
                            <option key={user.id}>{user.address2}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CityName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="name"
                        name="name"
                          placeholder="cityName"
                          onChange={this.handleCity}
                        >
                          {citydata.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CityCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="citycode"
                        name="citycode"
                          placeholder="citycoed"
                          onChange={this.handleCity}
                        >
                          {citydata.map((user) => (
                            <option key={user.id}>{user.cityCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">StateName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        id="name"
                        name="name"
                          placeholder="StateName"
                          onChange={(e)=>{this.setState({
                            state:{...this.state.company.state,
                            name:e.target.value}
                          })}}
                        />
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        {/* </CSelect> */}
                      </CCol>
                    </CCol>
                  {/* </CFormGroup>
                  <CFormGroup row> */}
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CountryCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="countrycode"
                        name="countrycode"
                          placeholder="StateCode"
                          onChange={this.handleCountry2}
                        >
                          {this.state1.countryArray.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">ContryName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="countryname"
                        name="countryname"
                          placeholder="countyCode"
                          onChange={this.handleCountry2}
                        >
                          {this.state1.countryArray.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
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
                          {this.state1.countryArray.map((user) => (
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
                          {this.state1.countryArray.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>

                  <CCol sm="4">
                    <h4>State details</h4>
                  </CCol>
                  {/* country */}
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">StateName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        id="name"
                        name="name"
                          placeholder="Select"
                          onChange={(e)=>{this.setState({
                            state:{...this.state.state,
                            name:e.target.value}
                          })}}
                        />
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))} */}
                        {/* </CSelect> */}
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">StateCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="stateCode"
                        name="stateCode"
                          placeholder="statecode"
                          onChange={(e)=>{this.setState({
                            state:{...this.state.state,
                            stateCode:e.target.value}
                          })}}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        </CSelect>
                      </CCol>
                    </CCol>
                  {/* </CFormGroup>
                  <CFormGroup row> */}
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CountryName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="name"
                        name="name"
                          placeholder="Select"
                          onChange={(e)=>{this.setState({
                            state:{...this.state.state.country,
                            name:e.target.value}
                          })}}
                        >
                          {this.state1.countryArray.map((user) => (
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
                          onChange={(e)=>{this.setState({
                            state:{...this.state.state.country,
                            name:e.target.value}
                          })}}
                        >
                          {this.state1.countryArray.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
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
                          onChange={(e)=>{
                            this.setState({
                              ...this.state.country,
                              country:{
                                name:e.target.value
                              }
                            })
                          }}
                        >
                          {this.state1.countryArray.map((user) => (
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
                          onChange={(e)=>{
                            this.setState({
                              ...this.state.country,
                              country:{
                              countryCode:e.target.value
                              }
                            })
                          }}
                        >
                          {this.state1.countryArray.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Website</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        id="website"
                        name="website"
                          placeholder="website"
                          onChange={(e)=>{
                            this.setState({website:e.target.value})
                          }}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Email</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        type="email"
                        id="email"
                        name="email"
                          placeholder="email"
                          onChange={(e)=>{
                            this.setState({email:e.target.value})
                          }}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                  </CFormGroup> <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Mobile</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        type="number"
                        id="mobile"
                        name="mobile"
                          placeholder="mobile"
                          onChange={(e)=>{
                            this.setState({mobile:e.target.value})
                          }}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Phone</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        type="number"
                        id="phone"
                        name="phone"
                          placeholder="phone"
                          onChange={(e)=>{
                            this.setState({phone:e.target.value})
                          }}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">RegistrationId</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="registration"
                        name="registration"
                          placeholder="registrationId"
                          onChange={(e)=>{
                            this.setState({registrationId:e.target.value})
                          }}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))} */}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">textId</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="textid"
                        name="textid"
                          placeholder="textid"
                          onChange={(e)=>{
                            this.setState({textId:e.target.value})
                          }}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CCol sm="4">
                    <h4>Currency details</h4>
                  </CCol>
                  {/* currency */}
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CurrencyName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="currency"
                        name="currency"
                          placeholder="currency"
                          onChange={(e)=>{
                            this.setState({
                              ...this.state.currency,
                              name:e.target.value
                            })
                          }}
                        >
                          {this.state4.currencyArray.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CurrencyCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="currencyCode"
                        name="currencyCode"
                          placeholder="currencyCode"
                          onChange={(e)=>{
                            this.setState({
                              ...this.state.currency,
                              currencyCode:e.target.value
                            })
                          }}
                        >
                          {this.state4.currencyArray.map((user) => (
                            <option key={user.id}>{user.currencyCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Address1</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        id="address1"
                        name="address1"
                          placeholder="address1"
                          onChange={(e)=>{
                            this.setState({
                              address1:e.target.value
                            })
                          }}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Address2</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        id="address2"
                        name="address2"
                          placeholder="address2"
                          onChange={(e)=>{
                            this.setState({
                              address2:e.target.value
                            })
                          }}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  {/* end */}
                  <CCol sm="4">
                    <h4>City details</h4>
                  </CCol>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CityName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="cityname"
                        name="cityname"
                          placeholder="cityname"
                          onChange={(e)=>{
                            this.setState({
                              city:{
                                ...this.state.city,
                                name:e.target.value
                              }
                            })
                          }}
                        >
                          {this.state5.cityArray.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CityCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="cityCode"
                        name="cityCode"
                          placeholder="citycode"
                          onChange={this.handleCountry}
                        >
                          {this.state5.cityArray.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">StateName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="statename"
                        name="statename"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
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
                        id="stateCode"
                        name="stateCode"
                          placeholder="statecode"
                          onChange={this.handleCountry}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        </CSelect>
                      </CCol>
                    </CCol>
                  {/* </CFormGroup>

                  <CFormGroup row> */}
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
                          {this.state1.countryArray.map((user) => (
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
                          {this.state1.countryArray.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))}
                        </CSelect>
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
                          {this.state1.countryArray.map((user) => (
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
                          {this.state1.countryArray.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  {/* end */}
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CurrencyName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="currencyname"
                        name="currencyname"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {this.state4.currencyArray.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CurrencyCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="currencyCode"
                        name="currencyCode"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {this.state4.currencyArray.map((user) => (
                            <option key={user.id}>{user.currencyCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>

                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CurrencyName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="currencyname"
                        name="currencyname"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {this.state4.currencyArray.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CurrencyCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="currencyCode"
                        name="currencyCode"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {this.state4.currencyArray.map((user) => (
                            <option key={user.id}>{user.currencyCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup><CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Website</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        id="website"
                        name="website"
                          placeholder="website"
                          onChange={this.handleCountry}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Email</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        type="email"
                        id="email"
                        name="email"
                          placeholder="email"
                          onChange={this.handleCountry}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                  </CFormGroup> <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Mobile</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        type="number"
                        id="mobile"
                        name="mobile"
                          placeholder="mobile"
                          onChange={this.handleCountry}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Phone</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                        type="number"
                        id="phone"
                        name="phone"
                          placeholder="phone"
                          onChange={this.handleCountry}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        </CInput>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">RegistrationId</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="registration"
                        name="registration"
                          placeholder="registrationId"
                          onChange={this.handleCountry}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))} */}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">textId</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="textid"
                        name="textid"
                          placeholder="textid"
                          onChange={this.handleCountry}
                        >
                          {/* {this.states.users.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))} */}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CurrencyName</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="currencyname"
                        name="currencyname"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {this.state4.currencyArray.map((user) => (
                            <option key={user.id}>{user.name}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">CurrencyCode</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                        id="currencyCode"
                        name="currencyCode"
                          placeholder="Select"
                          onChange={this.handleCountry}
                        >
                          {this.state4.currencyArray.map((user) => (
                            <option key={user.id}>{user.countryCode}</option>
                          ))}
                        </CSelect>
                      </CCol>
                    </CCol>
                  </CFormGroup>
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

export default Customer;
