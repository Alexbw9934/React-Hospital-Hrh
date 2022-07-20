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
import { Link } from "react-router-dom";
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

export class HRAmend extends Component {
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
          title: "Place of Position",
          dataIndex: "placeofPostId",
          key: "placeofPostId",
          render: (text, object) => (
            <a>
              {this.state.placeOfPosition
                .filter((data) => data.id === object.placeofPostId)
                .map((id) => {
                  return id.name;
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
          title: "Division",
          dataIndex: "divisionId",
          key: "divisionID",
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
          title: "Facility",
          dataIndex: "typeofFacilityOfficeId",
          key: "typeofFacilityOfficeId",
          render: (text, obj) => (
            <a>
              {this.props.typeFacilityList
                .filter((data) => data.id === obj.typeofFacilityOfficeId)
                .map((id) => {
                  return id.facilityType;
                })}
            </a>
          ),
        },
        {
          title: "Sanctioned Posts",
          dataIndex: "sacnctionPost",
          key: "sacnctionPost",
        },
        // {
        //   title: "Action",
        //   key: "action",
        //   render: (text, record) => (
        //     <Space size="middle">
        //       <CButton
        //         style={{ backgroundColor: "blue" }}
        //         onClick={(e) => this.StoreCollector(e, record.id)}
        //       >
        //         <b style={{ color: "#fff" }}>Open</b>
        //       </CButton>
        //     </Space>
        //   ),
        // },
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
                  return `${new Date(
                    ob.fromDate
                  ).getFullYear()}-${new Date(
                    ob.toDate
                  ).getFullYear()}`})}
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
          dataIndex: "formStatus",
          key: "formStatus",
          render: (text) => (
            <a>
              Amend
            </a>
          ),
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
    axios({
      url: `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals`,
      method: "GET",
    }).then((response) => {
      console.log(response.data);
      let arr=response.data.filter(data=>data.formStatus===5)
      this.setState({ users: arr });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      this.setState({ states: response.data });
    });
  }
  StoreCollector = (e,id) => {
    this.props.history.push({
      pathname: "/hrh/HumanResourceProposalDetails/HumanResourceProposalNational",
      state: {
        data: id,
      },
    });
  };
  newCollector = () => {
    if(this.state.role==="admin_role"){
      this.props.history.push({
        pathname: "/hrh/HumanResourceProposalDetails/HumanResourceProposalNational",
      });
    }
    else if(this.state.role==="state_role"){
      this.props.history.push({
        pathname: "/hrh/HumanResourceProposalDetails/HumanResourceProposalState",
      });
    }
    else if(this.state.role==="district_role"){
    this.props.history.push({
      pathname: "/hrh/HumanResourceProposalDetails/HRProposalDistrict",
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
                    <h4>Human Resource Proposal - National</h4>
                  ) : role === "state_role" ? (
                    <h4>Human Resource Proposal - State Details</h4>
                  ) : (
                    <h4>Human Resource Proposal - District</h4>
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
                      columns={this.state.columnsNational}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HRAmend);
