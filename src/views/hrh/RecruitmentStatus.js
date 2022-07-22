import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import axios from "axios";
import { withRouter } from "react-router";
import { Spin } from "antd";
import AddRecruitmentStatus from "./AddRecruitmentStatus";
const config = localStorage.getItem("token");

class RecruitmentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RecruitmentStatusData: [],
      loading: true,
    };
    this.state1 = {
      stateArray: [],
    };
    this.state2 = {
      categoDistrictArray: [],
    };
    this.state3 = {
      programTypeArray: [],
    };
    this.state4 = {
      programPostArray: [],
    };
    this.state5 = {
      typeofOfficeArray: [],
    };
    this.state6 = {
      categoryofPostArray: [],
    };
    this.state7 = {
      positionArray: [],
    };
  }

  StoreCollector = (id) => {
    this.props.history.push("/hrh/AddRecruitmentStatus", {
      RecruitmentStatusId: id,
    });
  };

  async componentDidMount() {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}RecruitmentStatus`,
    }).then((response) => {
      console.log(response);
      this.setState({
        RecruitmentStatusData: response.data,
      });
    });
    await this.fetchOption1();
    await this.fetchOption2();
    await this.fetchOption3();
    await this.fetchOption4();
    await this.fetchOption5();
    await this.fetchOption6();
    await this.fetchOption7();
    this.setState({
      loading: false,
    });
  }
  fetchOption1() {
    axios
      .get("States", {
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
        localStorage.setItem("states", JSON.stringify(state));
        this.setState((this.state1 = { stateArray: state }));
      });
  }
  fetchOption2 = () => {
    axios
      .get("DistrictCategories", {
        headers: {
          // "Authorization":`Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        console.log(data);
        localStorage.setItem("districts", JSON.stringify(data));
        this.setState((this.state2 = { categoDistrictArray: data }));
      });
  };
  fetchOption3 = () => {
    axios
      .get("ProgramTypes", {
        headers: {
          // "Authorization":`Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        console.log(data);
        localStorage.setItem("ProgramTypes", JSON.stringify(data));
        this.setState((this.state3 = { programTypeArray: data }));
      });
  };
  fetchOption4 = () => {
    axios
      .get("PlaceofPosts", {
        headers: {
          // "Authorization":`Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        console.log(data);
        localStorage.setItem("PlaceofPosts", JSON.stringify(data));
        this.setState((this.state4 = { programPostArray: data }));
      });
  };
  fetchOption5 = () => {
    axios
      .get("TypeofFacilityOffices", {
        headers: {
          // "Authorization":`Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        console.log(data);
        localStorage.setItem("TypeofFacilityOffices", JSON.stringify(data));
        this.setState((this.state5 = { typeofOfficeArray: data }));
      });
  };
  fetchOption6 = () => {
    axios
      .get("CatgoryofPositions", {
        headers: {
          // "Authorization":`Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        console.log(data);
        localStorage.setItem("CatgoryofPositions", JSON.stringify(data));
        this.setState((this.state6 = { categoryofPostArray: data }));
      });
  };
  fetchOption7 = () => {
    axios
      .get("Positions", {
        headers: {
          // "Authorization":`Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        console.log(data);
        localStorage.setItem("Positions", JSON.stringify(data));
        this.setState((this.state7 = { positionArray: data }));
      });
  };

  render() {
    return (
      <div>
        <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>Recruitment Status</h4>
                  <CButton
                    style={{ backgroundColor: "blue" }}
                    onClick={() =>
                      this.props.history.push("/hrh/AddRecruitmentStatus")
                    }
                  >
                    <b style={{ color: "white" }}>Add RecruitmentStatus</b>
                  </CButton>
                </CCardHeader>
                <CCard>
                  <CCardBody>
                    <table className="table striped bordered">
                      <tr>
                        <th>
                          <b>Program Type</b>
                        </th>
                        <th>
                          <b>Program Post</b>
                        </th>
                        <th>
                          <b>Category of Post</b>
                        </th>
                        <th>
                          <b>Type of office/facility</b>
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
                      {this.state.loading ? (
                        <Spin />
                      ) : (
                        this.state.RecruitmentStatusData.map((item) => {
                          let catPostName =
                            this.state6.categoryofPostArray.filter(
                              (c) => c.id == item.categoryofPostId
                            )[0];
                          let officeName = this.state5.typeofOfficeArray.filter(
                            (t) => t.id == item.typesofofficeId
                          )[0];
                          let stateName = this.state1.stateArray.filter(
                            (s) => s.id == item.stateId
                          )[0];
                          let districtName =
                            this.state2.categoDistrictArray.filter(
                              (s) => s.id == item.districtId
                            )[0];
                          let programType = this.state3.programTypeArray.filter(
                            (p) => p.id == item.programTypeId
                          )[0];
                          return (
                            <tr className="ml-5">
                              <td>
                                {programType
                                  ? programType.name
                                  : item.programTypeId}
                              </td>
                              <td>{item.programPost}</td>
                              <td>
                                {catPostName
                                  ? catPostName.name
                                  : item.categoryofPostId}
                              </td>
                              <td>
                                {officeName
                                  ? officeName.name
                                  : item.typesofofficeId}
                              </td>
                              <td>
                                {stateName ? stateName.name : item.stateId}
                              </td>
                              <td>
                                {districtName
                                  ? districtName.name
                                  : item.districtId}
                              </td>
                              <td>
                                <CButton
                                  style={{ backgroundColor: "blue" }}
                                  onClick={() => this.StoreCollector(item.id)}
                                >
                                  <b style={{ color: "aquamarine" }}>Open</b>
                                </CButton>
                              </td>
                            </tr>
                          );
                        })
                      )}
                      {/* {this.state.users.length > 0 ? (
                        this.state.users.map((user, index) => {
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
                                  onClick={() => this.StoreCollector(user.id)}
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
                      )} */}
                    </table>
                    {/* <CButton onClick={()=>this.props.history.push("/hrh/PdF")}>Generate Pdf</CButton> */}
                  </CCardBody>
                </CCard>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    );
  }
}

export default withRouter(RecruitmentStatus);
