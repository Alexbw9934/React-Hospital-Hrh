import React, { Component } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CButton,
} from "@coreui/react";
import { Button, Space, Modal, Table } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import {
  retrieveState,
  retrieveDistricts,
  retrieveDivision,
  retrieveTypeOfFacility,
  retrieveFinancialYear,
} from "../../../actions/apiadd";
import moment from "moment";
const { confirm } = Modal;
const config = localStorage.getItem("token");

class QuarterlyDetails extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      users: [],
      userState: [],
      states: [],
      role: localStorage.getItem("access_role"),
      reserveOptions: ["A", "B"],
      checkedList: ["A"],
      placeOfPosition: [
        { id: "1", name: "State" },
        { id: "2", name: "District" },
        { id: "3", name: "Division" },
      ],
      divisionArray: [],
      catPos: [],
      districtCategory: [],
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          render: (text, object, index) => <a>{index + 1}</a>,
        },
        {
          title: "Reporting Priod",
          dataIndex: "financialYear",
          key: "financialYear",
          render: (text, object) => (
            <a>
              {this.props.financialYearList
                .filter((item) => item.id === object.financialYear)
                .map((ob) => {
                  return moment(ob.fromDate).format("MMM D, YYYY");
                })}
            </a>
          ),
        },
        {
          title: "Name of the HR Empanelment Agency",
          dataIndex: "stateId",
          key: "stateId",
          render: (text, obj) => (
            <a>
              {this.props.stateList
                .filter((data) => data.id === obj.stateId)
                .map((id) => {
                  return id.name;
                })}
            </a>
          ),
        },
        {
          title: "Address of HR Agency",
          dataIndex: "nameofPost",
          key: "nameofPost",
        },
        {
          title: "Contact Number of the HR agency",
          dataIndex: "numberofPostSanc",
          key: "numberofPostSanc",
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
              <Link to={{pathname: `/hrh/hrEmpanelledAgency/Quarterly`, state: { data: record.id}}}>
              <CButton
                style={{ backgroundColor: "blue" }}
                // onClick={(e) => this.StoreCollector(e, record.id)}
              >
                <b style={{ color: "#fff" }}>Open</b>
              </CButton>
              </Link>
          ),
        },
      ],
    };
  }
  componentDidMount() {
    this.props.retrieveState();
    this.props.retrieveDistricts();
    this.props.retrieveDivision();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveFinancialYear();
    axios({
      url: `${process.env.REACT_APP_API_URL}agencyRegistrationDetails`,
      method: "GET",
    }).then((response) => {
      console.log(response.data);
      this.setState({ users: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}StateDetailsTabs`,
      method: "GET",
    }).then((response) => {
      console.log(response.data, "yyyyyyyyyyy");
      this.setState({ userState: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      this.setState({ states: response.data });
    });
  }
  StoreCollector = (id) => {
    this.props.history.push({
      pathname: "/hrh/hrEmpanelledAgency/Quarterly",
      state: {
        data: id,
      },
    });
  };
  newCollector = () => {
    this.props.history.push({
      pathname: "/hrh/hrEmpanelledAgency/Quarterly",
    });
  };
  render() {
    const { isSupplementary, role } = this.state;
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {role === "admin_role" ? (
                    <h4>Recruitment Status Report (Quarterly)-National</h4>
                  ) : role === "state_role" ? (
                    <h4>Recruitment Status Report (Quarterly)- State Details</h4>
                  ) : (
                    <h4>Recruitment Status Report (Quarterly) - District</h4>
                  )}
                </div>
              </CCardHeader>
              <CCard>
                {role === "admin_role" ? (
                  <CButton
                    color="primary"
                    onClick={() => this.newCollector()}
                    style={{
                      height: "20%",
                      width: "10%",
                      marginLeft: 15,
                      marginTop: 10,
                    }}
                  >
                    Add New
                  </CButton>
                ) : null}
                <CCardBody>
                    <Table
                      dataSource={this.state.users.sort((a, b) =>
                        a.id < b.id ? 1 : -1
                      )}
                      rowKey={"id"}
                      columns={this.state.columns}
                    />
                </CCardBody>
              </CCard>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateList: state.apiadd.stateList,
    districtsList: state.apiadd.districtsList,
    divisionList: state.apiadd.divisionList,
    typeFacilityList: state.apiadd.typeFacilityList,
    financialYearList: state.apiadd.financialYearList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveState,
      retrieveDistricts,
      retrieveDivision,
      retrieveTypeOfFacility,
      retrieveFinancialYear,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuarterlyDetails);
