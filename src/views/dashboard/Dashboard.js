import React, { lazy, useState, useEffect } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CHeader,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";

import ChartBarSimple from "../charts/ChartBarSimple.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  let history = useHistory();

  const [users, setUsers] = useState([]);
  // const [data,setData]=useState({})

  function StoreCollector(id) {
    // alert(id)
    localStorage.setItem("document", JSON.stringify(id));
    history.push("/hrh/PersonalInformation");
  }

  useEffect(() => {
    axios.get("http://5.9.111.198:13880/api/ApplicationForms").then((res) => {
      console.log(res.data);
      let data = res.data;
      setUsers(data);
      // console.log("arraydata",users);
      // setUsers(res.data.slice(0, 10));
      // console.log(list);
    });
  }, []);
  return (
    <>
      <WidgetsDropdown />
      <CCard accentColor="primary">
        <CRow>
          <CCardBody>
            <CRow>
              <CCol xs="12" md="6" xl="6">
                <CCard borderColor="info">
                  <CRow>
                    <CCol sm="5">
                      <h4 id="traffic" className="card-title mb-0">
                        <a>HR Status</a>
                      </h4>
                      <div className="small text-muted">
                        A Constantmonitor of all state HRs
                      </div>
                    </CCol>
                    <CCol sm="7" className="d-none d-md-block">
                      <CButton color="primary" className="float-right">
                        <CIcon name="cil-cloud-download" />
                      </CButton>
                      <CButtonGroup className="float-right mr-3">
                        {["Week", "Month", "Year"].map((value) => (
                          <CButton
                            color="outline-secondary"
                            key={value}
                            className="mx-0"
                            active={value == "Month"}
                          >
                            {value}
                          </CButton>
                        ))}
                      </CButtonGroup>
                    </CCol>
                  </CRow>
                  <ChartBarSimple
                    style={{
                      height: "340px",
                      marginTop: "40px",
                      color: "warning",
                    }}
                  />
                </CCard>
              </CCol>
              <CCol xs="12" md="6" xl="6">
                <CCard borderColor="info">
                  <CRow>
                    <CCol sm="5">
                      <h4 id="traffic" className="card-title mb-0">
                        National Report
                      </h4>
                      {/* <div className="small text-muted">A Constantmonitor of all state HRs</div> */}
                    </CCol>
                  </CRow>
                  <hr className="mt-5" />
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">
                        <b>Uttar Pradesh </b>
                      </span>
                      <span className="ml-auto font-weight-bold">
                        Hr Requirment Status(33%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="33"
                      />
                    </div>
                  </div>
                  <hr className="mt-5" />
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">
                        <b>Haryana</b>
                      </span>
                      <span className="ml-auto font-weight-bold">
                        Hr Requirment Status(53%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="53"
                      />
                    </div>
                  </div>
                  <hr className="mt-5" />
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">
                        <b>Bangal</b>
                      </span>
                      <span className="ml-auto font-weight-bold">
                        Hr Requirment Status(53%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="53"
                      />
                    </div>
                  </div>
                </CCard>
              </CCol>
            </CRow>
            <CCardBody accentColor="primary">
              <CRow>
                <CHeader>
                  <b>Applications....</b>
                  <b />
                  <CLink to="/hrh/Applications">View All Applications</CLink>
                </CHeader>
              </CRow>
              <table className="table striped bordered">
                <tr>
                  <th>
                    <b>Resitration No.</b>
                  </th>
                  <th>
                    <b>Name</b>
                  </th>
                  <th>
                    <b>Email</b>
                  </th>
                  <th>
                    <b>State</b>
                  </th>
                  <th>
                    <b>District</b>
                  </th>
                  <th>
                    <b>Action</b>
                  </th>
                </tr>
                {users.length > 0 ? (
                  users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.registrationNo}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.statePref1}</td>
                        <td>{user.districPref1}</td>
                        <td>
                          <CButton
                            style={{ backgroundColor: "blue" }}
                            onClick={() => StoreCollector(user.id)}
                          >
                            <b style={{ color: "aquamarine" }}>Open</b>
                          </CButton>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                )}
              </table>
            </CCardBody>
          </CCardBody>
        </CRow>
      </CCard>
      {/* end */}
    </>
  );
};

export default withRouter(Dashboard);
