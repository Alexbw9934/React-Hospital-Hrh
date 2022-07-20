import React, { Component } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CButton,
} from "@coreui/react";
import { Modal, Table } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  retrieveState,
  retrieveDistricts,
  retrieveDivision,
  retrieveTypeOfFacility,
  retrieveFinancialYear,
} from "../../../../actions/apiadd";

export class ApprovedReport extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      modalShow: false,
      users: [],
      userState: [],
      userDistrict: [],
      states: [],
      role: localStorage.getItem("access_role"),
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
          title: "Form ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Financial Year",
          dataIndex: "financialYear",
          key: "financialYear",
          render: (text, object) => (
            <a>
              {this.props.financialYearList
                .filter((item) => item.id === object.financialYear)
                .map((ob) => {
                  return `${new Date(ob.fromDate).getFullYear()}-${new Date(
                    ob.toDate
                  ).getFullYear()}`;
                })}
            </a>
          ),
        },
        {
          title: "State",
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
          title: "Status",
          dataIndex: "districtStatus",
          key: "districtStatus",
          render: (text) => <a>Approved</a>,
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <CButton
              style={{ backgroundColor: "blue" }}
              onClick={(e) => this.StoreCollector(e, record.id)}
            >
              <b style={{ color: "#fff" }}>Open</b>
            </CButton>
          ),
        },
      ],
      columnsNational: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          render: (text, object, index) => <a>{index + 1}</a>,
        },
        {
          title: "Form ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Financial Year",
          dataIndex: "financialYear",
          key: "financialYear",
          render: (text, object) => (
            <a>
              {this.props.financialYearList
                .filter((item) => item.id === object.financialYear)
                .map((ob) => {
                  return `${new Date(ob.fromDate).getFullYear()}-${new Date(
                    ob.toDate
                  ).getFullYear()}`;
                })}
            </a>
          ),
        },  
        {
          title: "Status",
          dataIndex: "districtStatus",
          key: "districtStatus",
          render: (text) => <a>Approved</a>,
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <CButton
              style={{ backgroundColor: "blue" }}
              onClick={(e) => this.StoreCollector(e, record.id)}
            >
              <b style={{ color: "#fff" }}>Open</b>
            </CButton>
          ),
        },
      ],
      columnsDistrict: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          render: (text, object, index) => <a>{index + 1}</a>,
        },
        {
          title: "Form ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Financial Year",
          dataIndex: "financialYear",
          key: "financialYear",
          render: (text, object) => (
            <a>
              {this.props.financialYearList
                .filter((item) => item.id === object.financialYear)
                .map((ob) => {
                  return `${new Date(ob.fromDate).getFullYear()}-${new Date(
                    ob.toDate
                  ).getFullYear()}`;
                })}
            </a>
          ),
        },
        {
          title: "State",
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
          title: "District",
          dataIndex: "districtId",
          key: "districtId",
          render: (text, obj) => (
            <a>
              {this.props.districtsList
                .filter((data) => data.id === obj.districtId)
                .map((id) => {
                  return id.name;
                })}
            </a>
          ),
        },
        {
          title: "Status",
          dataIndex: "districtStatus",
          key: "districtStatus",
          render: (text) => <a>Approved</a>,
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <CButton
              style={{ backgroundColor: "blue" }}
              onClick={(e) => this.StoreCollector(e, record.id)}
            >
              <b style={{ color: "#fff" }}>Open</b>
            </CButton>
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
    if (this.state.role === "district_role") {
      axios({
        url: `${process.env.REACT_APP_API_URL}HRStatusReportDistricts`,
        method: "GET",
      }).then((response) => {
        let arr=response.data.filter(data=>data.districtStatus===4)
        this.setState({ userDistrict: arr });
      });
    }
    if (this.state.role === "state_role") {
        axios({
          url: `${process.env.REACT_APP_API_URL}HRStatusReportStates`,
          method: "GET",
        }).then((response) => {
          let arr=response.data.filter(data=>data.stateStatus===4)
          this.setState({ userState: arr });
        });
      }
      if (this.state.role === "admin_role") {
        axios({
          url: `${process.env.REACT_APP_API_URL}HRStatusReportStates`,
          method: "GET",
        }).then((response) => {
          let arr=response.data.filter(data=>data.stateStatus===4)
          this.setState({ users: arr });
        });
      }
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      this.setState({ states: response.data });
    });
  }
  StoreCollector = (e,id) => {
    if (this.state.role === "admin_role") {
        this.props.history.push({
          pathname: "/hrh/HRStatusReportDetails/HRStatusReport",
          state:{
            data:id
          }
        });
      } else if (this.state.role === "state_role") {
        this.props.history.push({
          pathname: "/hrh/HRStatusReportDetails/state",
          state:{
            data:id
          }
        });
      } else {
        this.props.history.push({
          pathname: "/hrh/HRStatusReportDetails/HRStatusDistrict",
          state:{
            data:id
          }
        });
      }
  };
  newCollector = () => {
    if (this.state.role === "admin_role") {
      this.props.history.push({
        pathname: "/hrh/HRStatusReportDetails/HRStatusReport",
      });
    } else if (this.state.role === "state_role") {
      this.props.history.push({
        pathname: "/hrh/HRStatusReportDetails/state",
      });
    } else {
      this.props.history.push({
        pathname: "/hrh/HRStatusReportDetails/HRStatusDistrict",
      });
    }
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
                    <h4>Human Resource Status Report - National</h4>
                  ) : role === "state_role" ? (
                    <h4>Human Resource Status Report - State Details</h4>
                  ) : (
                    <h4>Human Resource Status Report - District</h4>
                  )}
                </div>
              </CCardHeader>
              <CCard>
                <CCardBody>
                  {role === "admin_role" ? (
                    <Table
                      dataSource={this.state.users.sort((a, b) =>
                        a.id < b.id ? 1 : -1
                      )}
                      rowKey={"id"}
                      columns={this.state.columnsNational}
                    />
                  ) : role === "state_role" ? (
                    <Table
                      dataSource={this.state.userState.sort((a, b) =>
                        a.id < b.id ? 1 : -1
                      )}
                      rowKey={"id"}
                      columns={this.state.columns}
                    />
                  ) : (
                    <Table
                      dataSource={this.state.userDistrict.sort((a, b) =>
                        a.id < b.id ? 1 : -1
                      )}
                      rowKey={"id"}
                      columns={this.state.columnsDistrict}
                    />
                  )}
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
export default connect(mapStateToProps, mapDispatchToProps)(ApprovedReport);
