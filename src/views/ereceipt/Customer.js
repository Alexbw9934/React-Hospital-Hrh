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
const config=localStorage.getItem("token");
export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://5.9.111.198:13880/api/Customers", {
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        console.log(res);
        let data=res.data;
        console.log(data)
        this.setState({users:data})
      });
  }
  render() {
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Customer</h4>
              </CCardHeader>
              <CCard>
                <CCardBody>
                  <table
                    id="dtBasicExample"
                    cellSpacing="0"
                    width="100%"
                    className="table table-striped table-bordered table-sm"
                  >
                    <tbody>
                      <tr>
                        <th>
                          <b>Name</b>
                        </th>
                        <th>
                          <b>Address </b>
                        </th>
                        {/* <th>
                        <b>Address 2</b>
                      </th> */}
                        <th>
                          <b>City Code </b>
                        </th>
                        <th>
                          <b>State Code</b>
                        </th>
                        {/* <th>
                        <b>Country</b>
                      </th> */}
                        <th>
                          <b>Website</b>
                        </th>
                        <th>
                          <b>Email</b>
                        </th>
                        <th>
                          <b>Mobile</b>
                        </th>
                        {/* <th>
                        <b>Phone</b>
                      </th> */}
                        <th>
                          <b>Text Id</b>
                        </th>
                        <th>
                          <b>Registration ID</b>
                        </th>
                        <th>
                          <b>Currency</b>
                        </th>
                        {/* <th><b>Status</b></th>
                      <th><b>Status</b></th> */}
                      </tr>
                      {this.state.users.length > 0 ? (
                        this.state.users.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td>{user.name}</td>
                              <td>{user.address1}</td>
                              <td>{user.cityId}</td>
                              <td>{user.stateId}</td>
                              <td>{user.countryId}</td>
                              <td>{user.name}</td>
                              <td>{user.cityId}</td>
                              <td>{user.name}</td>
                              <td>{user.stateId}</td>
                              <td>{user.name}</td>
                              {/* <td>{user.name}</td>
                            <td>{user.name}</td> */}
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="11">Loading...</td>
                        </tr>
                      )}
                    </tbody>
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

export default Customer;
