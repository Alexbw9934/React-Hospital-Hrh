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
  CInputGroup,
  CInputGroupPrepend,
  // CHeader,
} from "@coreui/react";
import { withRouter } from "react-router";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { Spin } from "antd";
// import AsyncSelect from "react-select";
// const config = localStorage.getItem("token");
class PerformanceAppraisal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      value: "",
      categoryofPostArray: [],
      positionArray: [],
      castes: [],
      PerformanceAppraisals: [],
    };
  }
  componentDidMount() {
    axios({
      url: `${process.env.REACT_APP_API_URL}PerformanceAppraisals`,
      method: "GET",
    }).then((response) => {
      this.setState({ PerformanceAppraisals: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}CatgoryofPositions`,
      method: "GET",
    }).then((response) => {
      localStorage.setItem("CatgoryofPositions", JSON.stringify(response.data));
      this.setState({ categoryofPostArray: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Positions`,
      method: "GET",
    }).then((response) => {
      localStorage.setItem("Positions", JSON.stringify(response.data));
      this.setState({ positionArray: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Castes`,
      method: "GET",
    }).then((response) => {
      localStorage.setItem("Castes", JSON.stringify(response.data));
      this.setState({ castes: response.data });
    });
    this.setState({ loading: false });
  }
  handleCountry = (e) => {
    this.setState({
      country: {
        ...this.state.country,
        [e.target.name]: e.target.value,
      },
    });
  };
  StoreCollector = (id) => {
    this.props.history.push("/hrh/AddPerformanceAppraisal", {
      performanceAppraisalId: id,
    });
  };
  render() {
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h4>Performance Appraisals</h4>
                <CButton
                  style={{ backgroundColor: "blue" }}
                  onClick={() =>
                    this.props.history.push("/hrh/AddPerformanceAppraisal")
                  }
                >
                  <b style={{ color: "white" }}>Add Performance Appraisal</b>
                </CButton>
              </CCardHeader>
              <CCardBody>
                {/* <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input">Date </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput type="date" id="date-input" name="date-input" placeholder="To" />
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input"></CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput type="date" id="date-input" name="date-input" placeholder="To" />
                      </CCol>
                    </CCol>
                    <CCol>
                      <CCol md="6">
                        <CLabel htmlFor="text-input"> </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInputGroup>
                          <CInput id="input1-group2" name="input1-group2" placeholder="Search" />
                          <CInputGroupPrepend>
                            <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                          </CInputGroupPrepend>
                        </CInputGroup>
                      </CCol>
                    </CCol>
                  </CFormGroup>
                </CForm> */}
                <CCardBody>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr className="table-active d-flex">
                          <th style={{ width: 110 }}>From Date</th>
                          <th style={{ width: 100 }}>To Date</th>
                          <th style={{ width: 110 }}>FMR</th>
                          <th style={{ width: 110 }}>Category of Post</th>
                          <th style={{ width: 110 }}>Name of the Post</th>
                          <th style={{ width: 110 }}>
                            Total number of Job Position Sanctioned(Previously +
                            new){" "}
                          </th>
                          <th style={{ width: 110 }}>
                            Number of Person in Place(from Previously inplace)
                          </th>
                          <th style={{ width: 110 }}>
                            Number of new Recruitment
                          </th>
                          <th style={{ width: 110 }}>
                            Total number of vacant Place
                          </th>
                          <th style={{ width: 110 }}>
                            Total number of vacant Job Position(total
                            Sanctioned-total inplace)
                          </th>
                          <th style={{ width: 110 }}>
                            Break up of vacant Job Position(UR OBC SC ST others)
                          </th>
                          <th style={{ width: 110 }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.loading ? (
                          <Spin />
                        ) : (
                          this.state.PerformanceAppraisals.map((item) => {
                            let catPosName =
                              this.state.categoryofPostArray.filter(
                                (c) => c.id === item.categoryPositionId
                              )[0];
                            let PositionName = this.state.positionArray.filter(
                              (c) => c.id === item.positionId
                            )[0];
                            let casteName = this.state.castes.filter(
                              (c) => c.id === item.casteId
                            )[0];
                            return (
                              <tr className="d-flex">
                                <td style={{ width: 110 }}>
                                  {item.fromDate.split("T")[0]}
                                </td>
                                <td style={{ width: 100 }}>
                                  {item.toDate.split("T")[0]}
                                </td>
                                <td style={{ width: 110 }}>{item.fmr}</td>
                                <td style={{ width: 110 }}>
                                  {catPosName
                                    ? catPosName.name
                                    : item.categoryPositionId}
                                </td>
                                <td style={{ width: 110 }}>
                                  {PositionName
                                    ? PositionName.name
                                    : item.positionId}
                                </td>
                                <td style={{ width: 110 }}>
                                  {item.totalNumberPosition}
                                </td>
                                <td style={{ width: 110 }}>
                                  {item.numberofPersonPlace}
                                </td>
                                <td style={{ width: 110 }}>
                                  {item.numberofNewRecuritment}
                                </td>
                                <td style={{ width: 110 }}>
                                  {item.totalNoofVacantPlace}
                                </td>
                                <td style={{ width: 110 }}>
                                  {item.totalNoofVacantPosition}
                                </td>
                                <td style={{ width: 110 }}>
                                  {casteName ? casteName.name : item.casteId}
                                </td>
                                <td>
                                  <CButton
                                    style={{ backgroundColor: "blue" }}
                                    onClick={() => this.StoreCollector(item.id)}
                                  >
                                    <b style={{ color: "aquamarine" }}>Edit</b>
                                  </CButton>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </CCardBody>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

export default withRouter(PerformanceAppraisal);
