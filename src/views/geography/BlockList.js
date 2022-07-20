import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CForm,
  CRow,
  CFormGroup,
  // CSelect,
} from "@coreui/react";
import axios from "axios";

const config = localStorage.getItem("token");

export class BlockList extends Component {
  constructor() {
    super();
    this.state = {
      blocks: "",
      users: {},
    };
  }
  componentDidMount() {
    console.log(config);
    axios
      .get("http://5.9.111.198:13880/api/Blocks", {
        headers: {
          // Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.State),
      })
      .then((res) => {
        console.log(res);
        let data = res.data;
        console.log(data);
        this.setState({ users: data });
      });
  }
  render() {
    // const bigData = this.state.country;
    // console.log("Staatttttt");
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>BlocksList</h4>
              </CCardHeader>
              <CCard>
                <CCardBody>
                  <CForm className="form-horizontal"></CForm>
                </CCardBody>
                <CCardBody>
                  <table className="table striped bordered">
                    <tr>
                      <th>
                        <b>ID</b>
                      </th>
                      <th>
                        <b>Name</b>
                      </th>
                      {/* <th>
                        <b>StateCode</b>
                      </th>
                      <th>
                        <b>CountryId</b>
                      </th> */}

                      {/* <th>
                        <b>Phone</b>
                      </th> */}

                      {/* <th><b>Status</b></th>
                      <th><b>Status</b></th> */}
                    </tr>
                    {this.state.users.length > 0 ? (
                      this.state.users.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5">No data as of now.</td>
                      </tr>
                    )}
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

export default BlockList;
