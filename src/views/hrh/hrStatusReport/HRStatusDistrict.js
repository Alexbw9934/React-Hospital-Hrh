import React, { Component } from "react";
import {
  CCardHeader,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CAlert,
  CFormGroup,
  CSelect,
  CInput,
  CForm,
  CLabel,
  CButton,
} from "@coreui/react";
import {
  Form,
  Row,
  Select,
  Col,
  Input,
  Modal,
  Radio,
  Button,
  Tabs,
  Table,
  Space,
  message,
  Checkbox,
} from "antd";
import axios from "axios";
import {
  retrieveTypeOfFacility,
  retrieveFinancialYear,
  retrieveDistricts,
  retrieveProgramType,
  retrieveTypeOfAssociation,
  retrieveTypeOfPositions,
  retrieveFinancialStatus,
  retrievePlaceOfPost,
  addHR,
} from "../../../actions/apiadd";
import { retrievePost,retrieveReprtingPeriod } from "../../../actions/masterapi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import AmendModal from "../AmendModal";
import '../style.css'
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class HRStatusDistrict extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      objAmend: {},
      modalShow: false,
      statuss: 0,
      states: [],
      catPos: [],
      position: [],
      errors: {},
      tableRowsDetails: [],
      value: {},
      nameOfPostList: [],
      tableData: [
        { id: "1", name: "Draft" },
        { id: "2", name: "National Approval" },
        { id: "3", name: "Approved" },
      ],
      statusArray: [
        { id: "0", name: "Draft" },
        { id: "1", name: "Pending Approval" },
        { id: "5", name: "Need Amendment" },
        { id: "4", name: "Approve" },
        { id: "6", name: "Canceled" },
        { id: "7", name: "Rejected" },
      ],
      divisionArray: [],
      detailsArray: [],
      detailLastId: 0,
      districtCategory: [],
      obj: {
        programCheck:false,
        programType:0,
        submissionDate: "",
        stateId: 0,
        districtId: 0,
        typeofApprovalId: 0,
        selectNumber: 0,
        financialYearId: 0,
        reportingPeriodId: 0,
        districtStatus: 0,
      },
      programList:[],
      numberTableRows: [
        {
          id: 0,
          fmr: 0,
          programType: 0,
          typeofPosition: 0,
          categoryofPost: 0,
          nameofPost: 0,
          amount: 0,
          numberofPostSanc: 0,
          numberofNewPostion: 0,
          totalNoPostionApprov: 0,
          numberofPost: 0,
          numberofOldSanc: 0,
          numberofPostVaccant: 0,
        },
      ],
      errors: {},
      errorMsg: false,
      postMsg: false,
      postMsg1: false,
      stateSanction: 0,
      role: localStorage.getItem("access_role"),
      object: localStorage.getItem("object"),
      reserveOptions: ["A", "B"],
      checkedList: ["A"],
      placeOfPosition: 0,
      placeOfPositionArray: [
        { id: "1", name: "Division" },
        { id: "2", name: "Institute" },
      ],
      tableRows: [
        {
          srNo: 0,
          placeofPostId: 0,
          sacnctionPost: 0,
          divisionId: 0,
          districtId: 0,
          typeofFacilityOfficeId: 0,
        },
      ],
      secondTableRows: [
        {
          srNo: 0,
          placeOfPosition: 0,
          sacnctionPost: 0,
          division: 0,
          district: 0,
        },
      ],
      paramId: 0,
      tabView: [],
      fmrList: [],
      isModalVisible: false,
      tabdata: {},
    };
  }
  showConfirm = (value, status) => {
    confirm({
      // title:"",
      content: "Are you Sure?",
      onOk: () => {
        return status === 1
          ? this.changeStatus(value)
          : status === 4
          ? this.approv(value)
          : status === 6
          ? this.cancel(value)
          : status === 5
          ? this.need(value)
          : console.log("none");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  componentDidMount() {
    this.props.retrieveDistricts();
    this.props.retrievePost();
    this.props.retrieveFinancialStatus();
    this.props.retrievePlaceOfPost();
    this.props.retrieveTypeOfAssociation();
    this.props.retrieveTypeOfPositions();
    this.props.retrieveReprtingPeriod();
    axios({
      url: `${process.env.REACT_APP_API_URL}Posts`,
      method: "GET",
    }).then((response) => {
      console.log(response, "name of posts");
      this.setState({ nameOfPostList: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}FMRs`,
      method: "GET",
    }).then((response) => {
      this.setState({ fmrList: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}States`,
      method: "GET",
    }).then((response) => {
      this.setState({ states: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}CatgoryofPositions`,
      method: "GET",
    }).then((response) => {
      this.setState({ catPos: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Districts`,
      method: "GET",
    }).then((response) => {
      this.setState({ districtCategory: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}Divisions`,
      method: "GET",
    }).then((response) => {
      this.setState({ divisionArray: response.data });
    });
    axios({
      url: `${process.env.REACT_APP_API_URL}TypeofPosts`,
      method: "GET",
    }).then((response) => {
      console.log("position", response.data);
      this.setState({ position: response.data });
    });
    this.props.retrieveFinancialYear();
    this.props.retrieveTypeOfFacility();
    this.props.retrieveProgramType();
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({ paramId: paramId });
      if (this.state.role === "district_role") {
        axios({
          url: `${process.env.REACT_APP_API_URL}HRStatusReportDistricts/${paramId}`,
          method: "GET",
        }).then((response) => {
          console.log(response.data);
          this.setState({ obj: response.data });
        });
        axios({
          url: `${process.env.REACT_APP_API_URL}DistrictContractualReports`,
          method: "GET",
        }).then((response) => {
          let arr = response.data.filter(
            (data) => data.hrStatusReportDistrictId === paramId
          );
          this.setState({ numberTableRows: arr });
        });
        axios({
          url: `${process.env.REACT_APP_API_URL}DistrictRegularCadreReports`,
          method: "GET",
        }).then((response) => {
          console.log(response.data,'console.log(response.data);');
          let arr = response.data.filter(
            (data) => data.hrStatusReportDistrictId === paramId
          );
          this.setState({ tableRows: arr });
        });
        axios({
          url: `${process.env.REACT_APP_API_URL}DistrictFinancialStatusReports`,
          method: "GET",
        }).then((response) => {
          const arr = response.data.filter(
            (data) => data.hrStatusReportDistrictId === paramId
          );
          console.log(arr, "checking array");
          let obj = {};
          const r = arr.map((data) => {
            let val = this.props.financialStatusList
              .filter((y) => y.id === data.budget)
              .map((x) => x.name);
            obj = {
              ...obj,
              programTypeId: data.programTypeId,
              budget: data.budget,
              name: val[0],
              amount: data.amount,
              finacialYearId: data.finacialYearId,
            };
            return obj;
          });
          this.setState({
            programList: [r],
          });
        });
      }
    }
  }
  handleChange = (e) => {
    console.log(e.target.value);
    const { obj } = this.state;
    this.setState({
      obj: {
        ...this.state.obj,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  handleTablePlace = async(e, i) => {
    const { name, value } = e.target;
    let numberTableRows = [...this.state.numberTableRows];
    numberTableRows[i] = {
      ...numberTableRows[i],
      [name]: value,
    };
    if(name==="namePost"){
     await axios({
        url: `${process.env.REACT_APP_API_URL}StatePysicalDistributions`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) => data.postId ===value && data.districtId ===this.state.obj.districtId
        );
        if(arr.length>0){
        console.log(arr[0].numofPostApprov,'handleChange')
        numberTableRows[i] = {
          ...numberTableRows[i],
          noApprPostTotal: arr[0].totalNoPostApprov,
        };
      }
      });
    }
    this.setState({
      numberTableRows,
    });
  };
  handleTable2 = (e, i) => {
    const { name, value } = e.target;
    let tableRows = [...this.state.tableRows];
    tableRows[i] = {
      ...tableRows[i],
      [name]: value,
    };
    this.setState({
      tableRows,
    });
  };
  handleTableFinance = (e, i, j) => {
    const { name, value } = e.target;
    let programList = [...this.state.programList];
    programList[j][i] = {
      ...programList[j][i],
      [name]: value,
    };
    this.setState({
      programList,
    });
  };
  validateNational = () => {
    const { obj } = this.state;
    let errors = {};
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}HRStatusReportDistricts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.obj),
    }).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      }).then((resp) => {
        let id=resp.id
        if (this.state.numberTableRows.length > 0) {
          this.state.numberTableRows.map((data, i) => {
            data.hrStatusReportDistrictId = id;
            data.reportingPeriodId= this.state.obj.reportingPeriodId;
            data.stateId=this.state.obj.stateId;
            data.divisionId=this.state.obj.divisionId;
            data.districtId=this.state.obj.districtId;
            fetch(
              `${process.env.REACT_APP_API_URL}DistrictContractualReports`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            ).then((resp) => {
              if (resp.status === 404) {
                this.setState({
                  errorMsg: true,
                });
                setTimeout(() => {
                  this.setState({ errorMsg: false });
                }, 10000);
              } else {
                this.setState({
                  postMsg1: true,
                  numberTableRows: [
                    {
                      fmrId: 0,
                      programTypeId: 0,
                      typeofPostionId: 0,
                      categoryPostId: 0,
                      namePost: 0,
                      noApprPostTotal: 0,
                      noApprPostUR: 0,
                      noApprPostOBC: 0,
                      noApprPostSC: 0,
                      noApprPostST: 0,
                      noApprPostOthers: 0,
                      noPostPlaceTotal: 0,
                      noPostPlaceUR: 0,
                      noPostPlaceOBC: 0,
                      noPostPlaceSC: 0,
                      noPostPlaceST: 0,
                      noPostPlaceOthers: 0,
                      noVacantPostTotal: 0,
                      noVacantPostUR: 0,
                      noVacantPostOBC: 0,
                      novacantPostSC: 0,
                      noVacantPostST: 0,
                      noVacantPostOthers: 0,
                      noRecuritedPostTotal: 0,
                      noRecuritedPostUR: 0,
                      noRecuritedPostOBC: 0,
                      noRecuritedPostSC: 0,
                      noRecuritedPostST: 0,
                      noRecuritedPostOthers: 0,
                      noProcessPostTotal: 0,
                      noProcessPostUR: 0,
                      noProcessPostOBC: 0,
                      noProcessPostSC: 0,
                      noProcessPostST: 0,
                      noProcessPostOthers: 0,
                      noVacancyTotal: 0,
                      noVacancyUR: 0,
                      noVacancyOBC: 0,
                      noVacancySC: 0,
                      noVacancyST: 0,
                      noVacancyOthers: 0,
                      specifyOthers: "",
                    },
                  ],
                });
                setTimeout(() => {
                  this.setState({ postMsg1: false });
                }, 10000);
              }
              console.log("result", resp);
            });
          });
        }
        if (this.state.tableRows.length > 0) {
          this.state.tableRows.map((data, i) => {
            data.hrStatusReportDistrictId = id;
            data.reportingPeriodId= this.state.obj.reportingPeriodId;
            data.stateId=this.state.obj.stateId;
            data.divisionId=this.state.obj.divisionId;
            data.districtId=this.state.obj.districtId;
            fetch(
              `${process.env.REACT_APP_API_URL}DistrictRegularCadreReports`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            ).then((resp) => {
              if (resp.status === 404) {
                this.setState({
                  errorMsg: true,
                });
                setTimeout(() => {
                  this.setState({ errorMsg: false });
                }, 10000);
              } else {
                this.setState({
                  postMsg1: true,
                  tableRows: [
                    {
                      placeofPostId: 0,
                      typeofPostId: 0,
                      categoryPostId: 0,
                      typeofServicesId: 0,
                      facilityTypeId: 0,
                      postId: 0,
                      noPostionSacnOld: 0,
                      noPostionSacnNew: 0,
                      noPostionSacnTotal: 0,
                      noPostionPlaceOld: 0,
                      noPostionPlaceNew: 0,
                      noPostionPlaceTotal: 0,
                      noPostionVacantOld: 0,
                      noPostionVacantNew: 0,
                      noPostionVacantTotal: 0,
                      noPostionRecuriteOld: 0,
                      noPostionRecuriteNew: 0,
                      noPostionRecuriteTotal: 0,
                      noPostionUndProceOld: 0,
                      noPostionUndProceNew: 0,
                      noPostionUndProceTotal: 0,
                      novacancy: 0,
                      remark: "",
                    },
                  ],
                });
                setTimeout(() => {
                  this.setState({ postMsg1: false });
                }, 10000);
              }
              console.log("result", resp);
            });
          });
        }
        if (this.state.programList.length > 0) {
          this.state.programList.map((data, i) => {
            data.map((item, j) => {
              item.hrStatusReportDistrictId = id;
              item.reportingPeriodId= this.state.obj.reportingPeriodId;
            item.stateId=this.state.obj.stateId;
            item.divisionId=this.state.obj.divisionId;
            item.districtId=this.state.obj.districtId;
              fetch(`${process.env.REACT_APP_API_URL}DistrictFinancialStatusReports`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${config}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
              }).then((resp) => {
                if (resp.status === 404) {
                  this.setState({
                    errorMsg: true,
                  });
                  setTimeout(() => {
                    this.setState({ errorMsg: false });
                  }, 10000);
                } else {
                  this.setState({
                    postMsg1: true,
                    programList: [],
                  });
                  setTimeout(() => {
                    this.setState({ postMsg1: false });
                  }, 10000);
                }
                console.log("result", resp);
              });
            });
          });
        }
        this.setState({
          postMsg: true,
          obj: {
            submissionDate: "",
            stateId: 0,
            districtId: 0,
            typeofApprovalId: 0,
            selectNumber: 0,
            financialYearId: 0,
            reportingPeriodId: 0,
            stateStatus: 0,
            districtStatus: 0,
            formStatus: 0,
          },
        });
        setTimeout(() => {
          this.setState({ postMsg: false });
        }, 10000);
      })
  };
  removeClick = (i) => {
    let tableRows = [...this.state.tableRows];
    tableRows.splice(i, 1);
    this.setState({ tableRows });
  };
  removeClick2 = (i) => {
    let numberTableRows = [...this.state.numberTableRows];
    numberTableRows.splice(i, 1);
    this.setState({ numberTableRows });
  };
  changeStatus = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/districtStatus",
          value: 1,
        },
      ];
      fetch(`${process.env.REACT_APP_API_URL}HRStatusReportDistricts/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      }).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          message.success("Changed Successfully!");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  need = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/districtStatus",
          value: 5,
        },
      ];
      fetch(`${process.env.REACT_APP_API_URL}HRStatusReportDistricts/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      }).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          message.success("Changed Successfully!");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  cancel = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/districtStatus",
          value: 6,
        },
      ];
      fetch(`${process.env.REACT_APP_API_URL}HRStatusReportDistricts/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      }).then((response) => {
        if (response.status === 201) {
          message.success("Canceled Successfully!");
          console.log("SUCCESSS");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  approv = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/districtStatus",
          value: 4,
        },
      ];
      fetch(`${process.env.REACT_APP_API_URL}HRStatusReportDistricts/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${config}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      }).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          message.success("Approved Successfully!");
          this.setState({ statusMsg: true });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 10000);
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  handleAmend = () => {
    this.setState({ statusAmend: true });
  };
  submitAmmend = (e) => {
    e.preventDefault();
    if (this.state.obj.id) {
      let obj = {
        humanResourceProposalNationalId: this.state.obj.id,
        createdBy: "Admin",
        createdAt: new Date(),
        amendmentReason: this.state.objAmend.amendmentReason,
      };
      fetch(
        `${process.env.REACT_APP_API_URL}NationalPostProposalAmendmentReasons`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      ).then((response) => {
        if (response.status === 201) {
          console.log("SUCCESSS");
          let operation = [
            {
              op: "replace",
              path: "/formStatus",
              value: 5,
            },
          ];
          fetch(
            `${process.env.REACT_APP_API_URL}HRStatusReportDistricts/${this.state.obj.id}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${config}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(operation),
            }
          ).then((response) => {
            if (response.status === 201) {
              console.log("SUCCESSS");
              this.setState({ statusMsg: true });
              setTimeout(() => {
                this.setState({ statusMsg: false });
              }, 5000);
              return response.json();
            } else if (response.status === 404) {
              throw new Error(`Error! status: ${response.status}`);
            }
          });
          message.success("Changed Successfully!");
          this.setState({ statusMsg: true });
          this.setState({ statusAmend: false });
          setTimeout(() => {
            this.setState({ statusMsg: false });
          }, 5000);

          this.getObject();
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Error! status: ${response.status}`);
        }
      });
    }
  };
  handleFinance = (e) => {
    this.setState({
      obj: {
        ...this.state.obj,
        programCheck: e.target.checked,
        programType: e.target.value,
      },
    });
    console.log(this.props.financialStatusList, "arra");
    if (e.target.checked === true) {
      let ob = {};
      let arr = this.props.programTypeList.map((val, i) => {
        return this.props.financialStatusList.map((item) => {
          ob = {
            ...ob,
            programTypeId: val.id,
            budget: item.id,
            name: item.name,
          };
          return ob;
        });
      });
      this.setState({
        programList: arr,
      });
    }
    if (e.target.name === "programType") {
      let ob = {};
      let arr = this.props.programTypeList
        .filter((data) => data.id === e.target.value)
        .map((val, i) => {
          return this.props.financialStatusList.map((item) => {
            ob = {
              ...ob,
              programTypeId: val.id,
              budget: item.id,
              name: item.name,
            };
            return ob;
          });
        });
      this.setState({
        programList: arr,
      });
    }
  };
  render() {
    const { obj, role, errors, value, objAmend,programList } = this.state;
    return (
      <div>
        {this.state.statusAmend && (
          <AmendModal
            statusAmend={this.state.statusAmend}
            submitAmmend={this.submitAmmend}
            handleChange={this.handleChange}
            objAmend={objAmend}
          />
        )}
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
                    <h4>Human Resource Status Report - State</h4>
                  ) : (
                    <h4>Human Resource Status Report - District</h4>
                  )}
                </div>
              </CCardHeader>
              <CCard>
                {this.state.postMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    {this.props.history.location.state ? (
                      <div>Updated Successfully</div>
                    ) : (
                      <div>Data save Successfully</div>
                    )}
                  </CAlert>
                ) : null}
                <CCardBody>
                  <CForm onSubmit={this.handleSubmit}>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Date of submission</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              id="form"
                              name="submissionDate"
                              type="date"
                              onChange={this.handleChange}
                              value={
                                obj && obj.submissionDate
                                  ? obj.submissionDate.split("T")[0] || ""
                                  : obj.submissionDate || ""
                              }
                              invalid={errors.submission ? true : false}
                            />
                            <FormFeedback>{errors.submission}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Status</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              name="districtStatus"
                              value={obj.districtStatus || ''}
                              disabled
                              onChange={this.handleChange}
                              invalid={errors.statuss ? true : false}
                            >
                              <option value="0">Draft</option>
                              {this.state.statusArray.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </CSelect>
                            <FormFeedback>{errors.statuss}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Name of State/UT</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select State"
                              name="stateId"
                              value={obj.stateId || ""}
                              onChange={this.handleChange}
                              invalid={errors.stateId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.states.map((item, index) => {
                                return (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </CSelect>
                            <FormFeedback>{errors.stateId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Name of District</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select District"
                              name="districtId"
                              value={obj.districtId}
                              onChange={this.handleChange}
                              invalid={errors.distictId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.districtCategory.map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              )}
                            </CSelect>
                            <FormFeedback>{errors.districtId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                    <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Reporting Period</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="reportingPeriodId"
                              value={obj.reportingPeriodId || ""}
                              invalid={errors.reportngPriod ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.reportingPeriodList &&
                                this.props.reportingPeriodList.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect>
                            <FormFeedback>{errors.financialYear}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              placeholder="Select"
                              onChange={this.handleChange}
                              name="financialYearId"
                              value={obj.financialYearId || ""}
                              invalid={errors.financialYear ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.props.financialYearList &&
                                this.props.financialYearList.map(
                                  (item, index) => {
                                    return (
                                      <option key={index} value={item.id}>
                                        {`${new Date(
                                          item.fromDate
                                        ).getFullYear()}-${new Date(
                                          item.toDate
                                        ).getFullYear()}`}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect>
                            <FormFeedback>{errors.financialYear}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Type of Approval</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              onChange={(e) =>
                                this.setState({
                                  obj: {
                                    ...this.state.obj,
                                    typeofApprovalId: e.target.value,
                                  },
                                })
                              }
                              value={obj.typeofApprovalId || ""}
                            >
                              <Radio value="1">Annual RoP</Radio>
                              <Radio value="2">Supplementary RoP</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display:
                                  errors.typeofApproval === ""
                                    ? "none"
                                    : "block",
                              }}
                            >
                              {errors.typeofApproval}
                            </span>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Select Number</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select Number"
                              onChange={this.handleChange}
                              name="selectNumber"
                              value={obj.selectNumber || ""}
                              disabled={
                                obj.typeofApprovalId === 2 ? false : true
                              }
                            >
                              <option value="0">-Select-</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </CSelect>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Tabs>
                      <TabPane tab="Contractual" key="1">
                        <table className="table table-bordered table-responsive">
                          <thead>
                            <tr>
                              <th rowSpan={2} className="w-25">
                                <b>FMR</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Program Type</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Type of Post</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Category of Post</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Name of the Post</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of Approved Posts </b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of Posts In Place</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of vacant Posts</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of recruited Posts</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of In Process Posts</b>
                              </th>
                              <th colSpan={6} style={{ width: "8%" }}>
                                <b>Number of vacancy as on</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                Specify Others
                              </th>
                            </tr>
                            <tr>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                              <th>
                                <b>Total</b>
                              </th>
                              <th>
                                <b>UR</b>
                              </th>
                              <th>
                                <b>OBC</b>
                              </th>
                              <th>
                                <b>SC</b>
                              </th>
                              <th>
                                <b>ST</b>
                              </th>
                              <th>
                                <b>Others</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.numberTableRows.map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        name="fmrId"
                                        style={{width:'150px'}}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.fmrId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.fmrList &&
                                          this.state.fmrList.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.fmr}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        name="programTypeId"
                                        placeholder="Select"
                                        style={{width:'150px'}}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.programTypeId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.programTypeList &&
                                          this.props.programTypeList.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        name="typeofPostionId"
                                        placeholder="Select"
                                        style={{width:'150px'}}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.typeofPostionId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.position &&
                                          this.state.position.map(
                                            (user) => (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            )
                                          )}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{width:'150px'}}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="categoryPostId"
                                        value={data.categoryPostId || ""}
                                        invalid={
                                          errors.categoryofPostion
                                            ? true
                                            : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.catPos &&
                                          this.state.catPos.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.categoryName}
                                                </option>
                                              );
                                            }
                                          )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.divisionId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{width:'150px'}}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="namePost"
                                        value={data.namePost || ""}
                                        invalid={
                                          errors.nameofPost ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList &&
                                          this.state.nameOfPostList.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          )}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        disabled
                                        value={data.noApprPostTotal || ""}
                                        name="noApprPostTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.totalBudgetAprrINR
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                      style={{width:'70px'}}
                                        type="number"
                                        value={data.noApprPostUR || ""}
                                        name="noApprPostUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofPostSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noApprPostOBC"
                                        value={data.noApprPostOBC || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofNewPostion
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noApprPostSC || ""}
                                        name="noApprPostSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.totalNoPostionApprov
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noApprPostST || ""}
                                        name="noApprPostST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofNewPost ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noApprPostOthers || ""}
                                        name="noApprPostOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noPostPlaceTotal || ""}
                                        name="noPostPlaceTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noPostPlaceUR || ""}
                                        name="noPostPlaceUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noPostPlaceOBC || ""}
                                        name="noPostPlaceOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noPostPlaceSC || ""}
                                        name="noPostPlaceSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noPostPlaceST || ""}
                                        name="noPostPlaceST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noPostPlaceOthers || ""}
                                        name="noPostPlaceOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacantPostTotal || ""}
                                        name="noVacantPostTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacantPostUR || ""}
                                        name="noVacantPostUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacantPostOBC || ""}
                                        name="noVacantPostOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.novacantPostSC || ""}
                                        name="novacantPostSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.novacantPostST || ""}
                                        name="novacantPostST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacantPostOthers || ""}
                                        name="noVacantPostOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noRecuritedPostTotal || ""}
                                        name="noRecuritedPostTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                      style={{width:'70px'}}
                                        type="number"
                                        value={data.noRecuritedPostUR || ""}
                                        name="noRecuritedPostUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noRecuritedPostOBC || ""}
                                        name="noRecuritedPostOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noRecuritedPostSC || ""}
                                        name="noRecuritedPostSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noRecuritedPostST || ""}
                                        name="noRecuritedPostST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noRecuritedPostOthers || ""}
                                        name="noRecuritedPostOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noProcessPostTotal || ""}
                                        name="noProcessPostTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noProcessPostUR || ""}
                                        name="noProcessPostUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noProcessPostOBC || ""}
                                        name="noProcessPostOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noProcessPostSC || ""}
                                        name="noProcessPostSC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noProcessPostST || ""}
                                        name="noProcessPostST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noProcessPostOthers || ""}
                                        name="noProcessPostOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacancyTotal || ""}
                                        name="noVacancyTotal"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacancyUR || ""}
                                        name="noVacancyUR"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacancyOBC || ""}
                                        name="noVacancyOBC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacancySC || ""}
                                        name="noVacancySC"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacancyST || ""}
                                        name="noVacancyST"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        value={data.noVacancyOthers || ""}
                                        name="noVacancyOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="text"
                                        style={{width:'70px'}}
                                        value={data.specifyOthers || ""}
                                        name="specifyOthers"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofOldSanc ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  {i === 0 ||
                                  obj.formStatus === 4 ||
                                  obj.districtStatus === 6 ||
                                  obj.districtStatus === 7 ? null : (
                                    <td>
                                      <CIcon
                                        name="cilXCircle"
                                        className="flex-shrink-0 me-2"
                                        width={20}
                                        height={20}
                                        onClick={() => this.removeClick2(i)}
                                      />
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                       {obj.districtStatus===4 || obj.districtStatus===5 ||obj.districtStatus===6?null: 
                       <CButton
                          color="primary"
                          className="mb-3"
                          onClick={() =>
                            // console.log('hi')
                            this.setState((prevState) => ({
                              numberTableRows: [
                                ...prevState.numberTableRows,
                                {
                                  // id: prevState + 1,
                                  fmrId: 0,
                                  programTypeId: 0,
                                  typeofPostionId: 0,
                                  categoryPostId: 0,
                                  namePost: 0,
                                  noApprPostTotal: 0,
                                  noApprPostUR: 0,
                                  noApprPostOBC: 0,
                                  noApprPostSC: 0,
                                  noApprPostST: 0,
                                  noApprPostOthers: 0,
                                  noPostPlaceTotal: 0,
                                  noPostPlaceUR: 0,
                                  noPostPlaceOBC: 0,
                                  noPostPlaceSC: 0,
                                  noPostPlaceST: 0,
                                  noPostPlaceOthers: 0,
                                  noVacantPostTotal: 0,
                                  noVacantPostUR: 0,
                                  noVacantPostOBC: 0,
                                  novacantPostSC: 0,
                                  noVacantPostST: 0,
                                  noVacantPostOthers: 0,
                                  noRecuritedPostTotal: 0,
                                  noRecuritedPostUR: 0,
                                  noRecuritedPostOBC: 0,
                                  noRecuritedPostSC: 0,
                                  noRecuritedPostST: 0,
                                  noRecuritedPostOthers: 0,
                                  noProcessPostTotal: 0,
                                  noProcessPostUR: 0,
                                  noProcessPostOBC: 0,
                                  noProcessPostSC: 0,
                                  noProcessPostST: 0,
                                  noProcessPostOthers: 0,
                                  noVacancyTotal: 0,
                                  noVacancyUR: 0,
                                  noVacancyOBC: 0,
                                  noVacancySC: 0,
                                  noVacancyST: 0,
                                  noVacancyOthers: 0,
                                  specifyOthers: "",
                                },
                              ],
                            }))
                          }
                        >
                          Add line
                        </CButton>}
                      </TabPane>
                      <TabPane tab="Regular Cadre" key="2">
                        <table className="table table-bordered table-responsive">
                          <thead>
                            <tr>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Place of Post
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Type of Post
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Category of post
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Type of Service/Association
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Facility Type
                              </th>
                              <th style={{ width: "9.09%" }} rowSpan={2}>
                                Name of Post
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position sanctioned
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position in place
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position vacant
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position recruited
                              </th>
                              <th style={{ width: "9.09%" }} colSpan={3}>
                                Number of position under process
                              </th>
                              <th style={{ width: "9.09%" }}>
                                Number of vacancy as on date
                              </th>
                              <th style={{ width: "9.09%" }}>Remarks</th>
                            </tr>
                            <tr>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                              <th>Old</th>
                              <th>New</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.tableRows.map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                      style={{width:'150px'}}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        name="placeofPostId"
                                        value={data.placeofPostId || ""}
                                        invalid={
                                          errors.placeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.placeofPostList.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                      style={{width:'150px'}}
                                        placeholder="Select"
                                        value={data.typeofPostionId ||""}
                                        name="typeofPostionId"
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.typeOfPost ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.typePostList.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                      style={{width:'150px'}}
                                        placeholder="Select State"
                                        name="categoryPostId"
                                        value={data.categoryPostId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={errors.stateId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.catPos.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.categoryName}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                      style={{width:'150px'}}
                                        placeholder="Select State"
                                        name="typeofServicesId"
                                        value={data.typeofServicesId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={errors.stateId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.typeofAssociationList.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                      style={{width:'150px'}}
                                        placeholder="Select State"
                                        name="facilityTypeId"
                                        value={data.facilityTypeId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.facilityType ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.typeFacilityList.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.facilityType}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                      style={{width:'150px'}}
                                        placeholder="Select State"
                                        name="postId"
                                        value={data.postId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.facilityType ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList.map(
                                          (item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                      style={{width:'70px'}}
                                        type="number"
                                        name="noPostionSacnOld"
                                        value={data.noPostionSacnOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionSacnNew"
                                        value={data.noPostionSacnNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionSacnTotal"
                                        value={data.noPostionSacnTotal || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionPlaceOld"
                                        value={data.noPostionPlaceOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionPlaceNew"
                                        value={data.noPostionPlaceNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionPlaceTotal"
                                        value={data.noPostionPlaceTotal || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionVacantOld"
                                        value={data.noPostionVacantOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionVacantNew"
                                        value={data.noPostionVacantNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionVacantTotal"
                                        value={data.noPostionVacantTotal || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionRecuriteOld"
                                        value={data.noPostionRecuriteOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionRecuriteNew"
                                        value={data.noPostionRecuriteNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionRecuriteTotal"
                                        value={
                                          data.noPostionRecuriteTotal || ""
                                        }
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionUndProceOld"
                                        value={data.noPostionUndProceOld || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionUndProceNew"
                                        value={data.noPostionUndProceNew || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="noPostionUndProceTotal"
                                        value={
                                          data.noPostionUndProceTotal || ""
                                        }
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="number"
                                        style={{width:'70px'}}
                                        name="novacancy"
                                        value={data.novacancy || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                        type="text"
                                        style={{width:'120px'}}
                                        name="remark"
                                        value={data.remark || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.distictId ? true : false
                                        }
                                      />
                                      <FormFeedback>
                                        {errors.placeofPostId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  {i === 0 ||
                                  obj.formStatus === 4 ||
                                  obj.districtStatus === 6 ||
                                  obj.districtStatus === 7 ? null : (
                                    <td>
                                      <CIcon
                                        name="cilXCircle"
                                        className="flex-shrink-0 me-2"
                                        width={20}
                                        height={20}
                                        onClick={() => this.removeClick(i)}
                                      />
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {obj.districtStatus===4 || obj.districtStatus===5 ||obj.districtStatus===6?null:
                         <CButton
                          color="primary"
                          className="mb-3"
                          onClick={() =>
                            // console.log('hi')
                            this.setState((prevState) => ({
                              tableRows: [
                                ...prevState.tableRows,
                                {
                                  // id: prevState + 1,
                                  placeofPostId: 0,
                      typeofPostId: 0,
                      categoryPostId: 0,
                      typeofServicesId: 0,
                      facilityTypeId: 0,
                      postId: 0,
                      noPostionSacnOld: 0,
                      noPostionSacnNew: 0,
                      noPostionSacnTotal: 0,
                      noPostionPlaceOld: 0,
                      noPostionPlaceNew: 0,
                      noPostionPlaceTotal: 0,
                      noPostionVacantOld: 0,
                      noPostionVacantNew: 0,
                      noPostionVacantTotal: 0,
                      noPostionRecuriteOld: 0,
                      noPostionRecuriteNew: 0,
                      noPostionRecuriteTotal: 0,
                      noPostionUndProceOld: 0,
                      noPostionUndProceNew: 0,
                      noPostionUndProceTotal: 0,
                      novacancy: 0,
                      remark: "",
                                },
                              ],
                            }))
                          }
                        >
                          Add line
                        </CButton>}
                      </TabPane>
                      <TabPane tab="Financial Status" key="3">
                      <Row gutter={20}>
                          <Col span={12}>
                            <CFormGroup>
                              <Col>
                                <CLabel>Show all Program Types</CLabel>
                              </Col>
                              <Col>
                                <Checkbox
                                  checked={
                                    obj.programCheck === true ? true : false
                                  }
                                  onChange={(e) => this.handleFinance(e)}
                                />

                                <FormFeedback>{errors.program}</FormFeedback>
                              </Col>
                            </CFormGroup>
                          </Col>
                          <Col span={12}>
                            <CFormGroup>
                              <Col>
                                <CLabel>
                                  Filter Entry line for the Program Type
                                </CLabel>
                              </Col>
                              <Col>
                                <CSelect
                                  placeholder="Select"
                                  onChange={(e) => {
                                    this.handleFinance(e);
                                  }}
                                  name="programType"
                                  value={obj.programType || ""}
                                  invalid={errors.programType ? true : false}
                                  disabled={
                                    obj.programCheck === true ? true : false
                                  }
                                >
                                  <option value="0">-Select-</option>
                                  {this.props.programTypeList &&
                                    this.props.programTypeList.map(
                                      (item, index) => {
                                        return (
                                          <option key={index} value={item.id}>
                                            {item.name}
                                          </option>
                                        );
                                      }
                                    )}
                                </CSelect>
                                <FormFeedback>{errors.program}</FormFeedback>
                              </Col>
                            </CFormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <CAlert color="primary">
                            Above filter will show data entry line for the
                            selected Program Type. You should ensure that you
                            are doing the data entry for all Program Types
                          </CAlert>
                        </Row>
                        <table className="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th>
                                <b>Program Type</b>
                              </th>
                              <th>
                                <center>
                                  <b>Budget Recommended under NRHM</b>
                                </center>
                              </th>
                              <th>
                                <b>Financial year</b>
                              </th>
                              <th>
                                <b> Amount (In Lakh)</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                          {programList.map((val, j) => {
                              return val.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td>
                                      <CFormGroup>
                                        <CSelect
                                          name="programTypeId"
                                          placeholder="Select"
                                          disabled
                                          value={item.programTypeId || ""}
                                        >
                                          <option value="0">-Select-</option>
                                          {this.props.programTypeList &&
                                            this.props.programTypeList.map(
                                              (user) => (
                                                <option
                                                  key={user.id}
                                                  value={user.id}
                                                >
                                                  {user.name}
                                                </option>
                                              )
                                            )}
                                        </CSelect>
                                        <FormFeedback>
                                          {errors.placeofPostId}
                                        </FormFeedback>
                                      </CFormGroup>
                                    </td>
                                    <td>
                                      <b>{item.name}</b>
                                    </td>
                                    <td>
                                      {" "}
                                      <CSelect
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTableFinance(e, i, j)
                                        }
                                        name="finacialYearId"
                                        value={item.finacialYearId || ""}
                                        invalid={
                                          errors.finacialYearId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.financialYearList &&
                                          this.props.financialYearList.map(
                                            (item, index) => {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {`${new Date(
                                                    item.fromDate
                                                  ).getFullYear()}-${new Date(
                                                    item.toDate
                                                  ).getFullYear()}`}
                                                </option>
                                              );
                                            }
                                          )}
                                      </CSelect>
                                    </td>
                                    <td>
                                      {" "}
                                      <CFormGroup>
                                        <CInput
                                          type="number"
                                          value={item.amount || ""}
                                          name="amount"
                                          onChange={(e) =>
                                            this.handleTableFinance(e, i, j)
                                          }
                                          invalid={errors.amount ? true : false}
                                        />
                                      </CFormGroup>
                                    </td>
                                  </tr>
                                );
                            })})}
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Key Deliverable" key="4">
                        <table className="table table-bordered table-sm">
                          <thead>
                            <tr>
                              <th>
                                <b>Program Type</b>
                              </th>
                              <th>
                                <center>
                                  <b>Budget Recommended under NRHM</b>
                                </center>
                              </th>
                              <th>
                                <b>Financial year</b>
                              </th>
                              <th>
                                <b> Amount (In Lakh)</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.programTypeList.map((val, i) => {
                              return this.props.financialStatusList.map(
                                (data, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>
                                        <CFormGroup>
                                          <CSelect
                                            name="programTypeId"
                                            placeholder="Select"
                                            disabled
                                            onChange={(e) =>
                                              this.handleTablePlace(e)
                                            }
                                            value={val.id || ""}
                                          >
                                            <option value="0">-Select-</option>
                                            {this.props.programTypeList &&
                                              this.props.programTypeList.map(
                                                (user) => (
                                                  <option
                                                    key={user.id}
                                                    value={user.id}
                                                  >
                                                    {user.name}
                                                  </option>
                                                )
                                              )}
                                          </CSelect>
                                          <FormFeedback>
                                            {errors.placeofPostId}
                                          </FormFeedback>
                                        </CFormGroup>
                                      </td>
                                      <td>
                                        <b>{data.name}</b>
                                      </td>
                                      <td>
                                        {" "}
                                        <CSelect
                                          placeholder="Select"
                                          onChange={this.handleChange}
                                          name="financialYear"
                                          value={obj.financialYear || ""}
                                          invalid={
                                            errors.financialYear ? true : false
                                          }
                                        >
                                          <option value="0">-Select-</option>
                                          {this.props.financialYearList &&
                                            this.props.financialYearList.map(
                                              (item, index) => {
                                                return (
                                                  <option
                                                    key={index}
                                                    value={item.id}
                                                  >
                                                    {`${new Date(
                                                      item.fromDate
                                                    ).getFullYear()}-${new Date(
                                                      item.toDate
                                                    ).getFullYear()}`}
                                                  </option>
                                                );
                                              }
                                            )}
                                        </CSelect>
                                      </td>
                                      <td>
                                        {" "}
                                        <CFormGroup>
                                          <CInput
                                            type="number"
                                            value={obj.numberofOldSanc || ""}
                                            name="numberofOldSanc"
                                            onChange={(e) =>
                                              this.handleTablePlace(e)
                                            }
                                            invalid={
                                              errors.numberofOldSanc
                                                ? true
                                                : false
                                            }
                                          />
                                        </CFormGroup>
                                      </td>
                                    </tr>
                                  );
                                }
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane>
                    </Tabs>
                    <Space size="middle" style={{ paddingTop: "5px" }}>
                      {obj.districtStatus === 4 ||
                      obj.districtStatus === 6 ||
                      obj.districtStatus === 7 ? null : (
                        <CButton
                          disabled={this.state.disableSub}
                          color="primary"
                          type="submit"
                        >
                          {this.state.paramId ? "Update" : "Submit"}
                        </CButton>
                      )}
                      <CButton
                        color="dark"
                        onClick={() => this.setState({ statusMsg: true })}
                      >
                        Download
                      </CButton>
                      {obj.districtStatus === 0 || obj.districtStatus === 5 ? (
                        <CButton
                          color="info"
                          onClick={() => {
                            this.showConfirm(obj.id, 1);
                          }}
                        >
                          Submit for Approval
                        </CButton>
                      ) : null}
                      {obj.districtStatus === 1 ? (
                        <CButton
                          color="secondary"
                          onClick={() => this.handleAmend()}
                        >
                          Send for Amendment
                        </CButton>
                      ) : null}
                      {obj.districtStatus === 1 ? (
                        <CButton
                          color="success"
                          onClick={() => this.showConfirm(obj.id, 4)}
                        >
                          Approve
                        </CButton>
                      ) : null}
                      {obj.districtStatus === 1 ? (
                        <CButton
                          color="warning"
                          onClick={() => this.showConfirm(obj.id, 7)}
                        >
                          Reject
                        </CButton>
                      ) : null}
                      {obj.districtStatus === 0 || obj.districtStatus === 1 ? (
                        <CButton
                          color="danger"
                          onClick={() => this.showConfirm(obj.id, 6)}
                        >
                          Cancel
                        </CButton>
                      ) : null}
                    </Space>
                  </CForm>
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
    typeFacilityList: state.apiadd.typeFacilityList,
    financialYearList: state.apiadd.financialYearList,
    districtList: state.apiadd.districtsList,
    hrList: state.apiadd.hrList,
    programTypeList: state.apiadd.programTypeList,
    typeofAssociationList: state.apiadd.typeofAssociationList,
    typeOfPositionList: state.apiadd.typeOfPositionList,
    financialStatusList: state.apiadd.financialStatusList,
    placeofPostList: state.apiadd.placeOfPostList,
    typePostList: state.masterapi.postList,
    reportingPeriodList:state.masterapi.reportingPeriodList
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      retrieveDistricts,
      retrieveProgramType,
      retrieveTypeOfAssociation,
      retrieveTypeOfPositions,
      retrieveFinancialStatus,
      retrievePlaceOfPost,
      retrievePost,
      addHR,
      retrieveReprtingPeriod
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(HRStatusDistrict);
