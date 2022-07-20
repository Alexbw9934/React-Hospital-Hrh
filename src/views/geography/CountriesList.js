import React, { Component } from "react";
import {
  // CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  // CInput,
  CRow,
  // CSelect,
} from "@coreui/react";
import axios from "axios";
// import table from 'bootstrapTable'

const config = localStorage.getItem("token");

// const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWIiLCJqdGkiOiI2MmFjNWE1Yy00NTA1LTQ2OGYtYWRkYS1kMmUwZDlkMDVhYTYiLCJleHAiOjE2MjIxOTMwODYsImlzcyI6Imh0dHA6Ly8qOjUwMDAiLCJhdWQiOiJVc2VyIn0.4NjIX2KdysrZyx_MW0ScyFb7ph0s2ekVCEMCuivDXvo";
export class CountriesList extends Component {
  constructor() {
    super();
    this.state = {
      users: {},
    };
  }

  componentDidMount() {
    console.log(config);
    axios
      .get("countries", {
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        console.log(res);
        let data = res.data;
        console.log(data);
        this.setState({ users: data });
      });
  }

  render() {
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>CountriesList</h4>
              </CCardHeader>
              <CCard>
                <CCardBody>
                  <table  className="table striped bordered">
                    <tr>
                      <th className="th-sm">
                      </th>
                      <th  className="th-sm">
                        <b>ID</b>
                      </th>
                      <th className="th-sm">
                        <b>Name</b>
                      </th>
                      <th className="th-sm">
                        <b>CountriesListCode</b>
                      </th>
                    </tr>
                    {this.state.users.length > 0 ? (
                      this.state.users.map((user, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">
                            </th>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.countryCode}</td>
                          </tr>
                        );
                      })

                    ) : (
                      <tr>
                        <td colSpan="0">Loading...</td>
                      </tr>
                    )}
                      {/* <tfoot>
                      <th  className="th-sm">
                        <b></b>
                      </th>
                      <th  className="th-sm">
                        <b>ID</b>
                      </th>
                      <th className="th-sm">
                        <b>Name</b>
                      </th>
                      <th className="th-sm">
                        <b>CountriesCode</b>
                      </th>
                     </tfoot> */}
                  </table>
                </CCardBody>
              </CCard>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

export default CountriesList;
