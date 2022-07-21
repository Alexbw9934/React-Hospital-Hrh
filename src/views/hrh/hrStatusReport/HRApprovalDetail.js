import React, { Component, useState, useEffect } from "react";
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
import {
  retrievePost,
  retrieveReprtingPeriod,
} from "../../../actions/masterapi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import AmendModal from "../AmendModal";
import "../style.css";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
// const [editValue, setEditValue] = useState({
//   id: 0,
//   finacialYearId: "",
//   lastFY:'',
//   firstFY:'',
//   finacial: [],
// });

class HRApprovalDetail extends Component {
  constructor() {
    super();
    this.state = {
      editValue: {
        id: 0,
        finacialYearId: "",
        lastFY:'',
        firstFY:'',
        finacial: [],
      },
      statusAmend: false,
      country: "",
      modalShow: false,
      statuss: 0,
      states: [],
      nameOfPostList: [],
      objAmend: {},
      catPos: [],
      position: [],
      errors: {},
      tableRowsDetails: [],
      value: {},
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
      amendList: [],
      detailsArray: [],
      detailLastId: 0,
      districtCategory: [],
      obj: {
        submissionDate: "",
        formStatus: 0,
        stateId: 0,
        typeofApprovalId: 0,
        selectNumber: 0,
        financialYearId: 0,
        reportingPeriodId: 0,
        stateStatus: 0,
        districtStatus: 0,
      },
      numberTableRows: [{}],
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
      tableRows: [{}],
      paramId: 0,
      tabView: [],
      fmrList: [],
      isModalVisible: false,
      tabdata: {},
      programList: [],
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
          : status === 7
          ? this.reject(value)
          : status === 5
          ? this.need(value)
          : console.log("none");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  getObject = () => {
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({ paramId: paramId });
      axios({
        url: `${process.env.REACT_APP_API_URL}HumanResourceProposalNationals/${paramId}`,
        method: "GET",
      }).then((response) => {
        this.setState({ obj: response.data });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}PhysicalStatus`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) => data.humanResourceProposalNationalId === paramId
        );

        this.setState({ numberTableRows: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}FinancialStatus`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) => data.humanResourceProposalNationalId === paramId
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
      axios({
        url: `${process.env.REACT_APP_API_URL}KeyDeliverables`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) => data.humanResourceProposalNationalId === paramId
        );
        this.setState({ tableRows: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}NationalPostProposalAmendmentReasons`,
        method: "GET",
      }).then((response) => {
        let arr = response.data.filter(
          (data) => data.humanResourceProposalNationalId === paramId
        );
        this.setState({ amendList: arr });
      });
    }
  };
  componentDidMount() {
    this.props.retrieveDistricts();
    this.props.retrieveReprtingPeriod();
    this.getObject();
    this.props.retrievePost();
    this.props.retrieveFinancialStatus();
    this.props.retrievePlaceOfPost();
    this.props.retrieveTypeOfAssociation();
    this.props.retrieveTypeOfPositions();
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
      axios({
        url: `${process.env.REACT_APP_API_URL}HRStatusReportStates/${paramId}`,
        method: "GET",
      }).then((response) => {
        console.log(response.data);
        let obj = response.data;
        this.setState({ obj });
        console.log(obj, "jjjjjjjjjjj");
        axios({
          url: `${process.env.REACT_APP_API_URL}DistrictContractualReports`,
          method: "GET",
        }).then((response) => {
          let arr = response.data.filter(
            (data) =>
              data.stateId === obj.stateId &&
              data.reportingPeriodId === obj.reportingPeriodId
          );
          this.setState({ numberTableRows: arr });
        });
        axios({
          url: `${process.env.REACT_APP_API_URL}DistrictRegularCadreReports`,
          method: "GET",
        }).then((response) => {
          let arr = response.data.filter(
            (data) => (data) =>
              data.stateId === obj.stateId &&
              data.reportingPeriodId === obj.reportingPeriodId
          );
          this.setState({ tableRows: arr });
        });
        axios({
          url: `${process.env.REACT_APP_API_URL}DistrictFinancialStatusReports`,
          method: "GET",
        }).then((response) => {
          const arr = response.data.filter(
            (data) => (data) =>
              data.stateId === obj.stateId &&
              data.reportingPeriodId === obj.reportingPeriodId
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
      });
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
  handleReport = async (e) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}ReportingPeriods/${e.target.value}`,
      method: "GET"
    }).then((res) => {
      console.log("@!!!!!!!!!!!!!!!!!!!", res);
      let si = [];
      let obj ={};
      let arr = res.data.finacialYearId.split(",");
      this.props.financialYearList.map((d, i) => {
        arr.map((s, i) => {
          if (s == d.id) {
            obj = {
              ...obj,
              value: d.id,
              label: d.name,
            };
            si.push(obj);
          }
        });
      });
      this.state.editValue.firstFY = si[0].value;
      this.state.editValue.lastFY = si[si.length - 1].value;
    })
    const { obj } = this.state;
    this.setState({
      obj: {
        ...obj,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
    let hrArr=[]
    await axios({
      url: `${process.env.REACT_APP_API_URL}HRStatusReportDistricts`,
      method: "GET",
    }).then((response) => {
        hrArr = response.data.filter(
        (data) =>
          data.stateId === obj.stateId &&
          data.reportingPeriodId === e.target.value &&
          data.districtStatus===4
      );
    });
    let value = Array.from(hrArr, (option) => option.id);
      axios({
        url: `${process.env.REACT_APP_API_URL}DistrictContractualReports`,
        method: "GET",
      }).then((response) => {
        let arr = response.data.filter(
          (data) =>
            value.includes(data.hrStatusReportDistrictId)
        )
        this.setState({ numberTableRows: arr })
        let val = {};
        if(arr.length>0){
        let rowsAllocate = arr.reduce((prev, cur,i,arr) => {
          if (cur.namePost===prev.namePost) {
            val = {
              ...val,
              noApprPostTotal:cur.noApprPostTotal+prev.noApprPostTotal
            }  
          }
          return val;
        });
        console.log(rowsAllocate)
      }  
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}DistrictRegularCadreReports`,
        method: "GET",
      }).then((response) => {
        let arr = response.data.filter(
          (data) =>
          value.includes(data.hrStatusReportDistrictId)
        );
        this.setState({ tableRows: arr });
      });
      axios({
        url: `${process.env.REACT_APP_API_URL}DistrictFinancialStatusReports`,
        method: "GET",
      }).then((response) => {
        const arr = response.data.filter(
          (data) =>
          value.includes(data.hrStatusReportDistrictId)
        );
        // this.setState({ programList: [arr3] });
      });

   
  };
  handleTablePlace = (e, i) => {
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
  validateNational = () => {
    const { obj } = this.state;
    let errors = {};
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}HRStatusReportStates`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.obj),
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
          obj: {
            id: 0,
            submissionDate: "",
            formStatus: 0,
            stateId: 0,
            typeofApprovalId: 0,
            selectNumber: 0,
            financialYearId: 0,
            reportingPeriodId: 0,
            stateStatus: 0,
            districtStatus: 0,
          },
        });
        setTimeout(() => {
          this.setState({ postMsg1: false });
        }, 10000);
      }
      console.log("result", resp);
    });
  };
  removeClick = (i) => {
    let tableRows = [...this.state.tableRows];
    tableRows.splice(i, 1);
    this.setState({ tableRows });
  };
  changeStatus = (id) => {
    if (id) {
      let operation = [
        {
          op: "replace",
          path: "/stateStatus",
          value: 1,
        },
      ];
      fetch(`${process.env.REACT_APP_API_URL}HRStatusReportStates/${id}`, {
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
          path: "/stateStatus",
          value: 5,
        },
      ];
      fetch(`${process.env.REACT_APP_API_URL}HRStatusReportStates/${id}`, {
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
          path: "/stateStatus",
          value: 6,
        },
      ];
      fetch(`${process.env.REACT_APP_API_URL}HRStatusReportStates/${id}`, {
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
          path: "/stateStatus",
          value: 4,
        },
      ];
      fetch(`${process.env.REACT_APP_API_URL}HRStatusReportStates/${id}`, {
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
              path: "/stateStatus",
              value: 5,
            },
          ];
          fetch(
            `${process.env.REACT_APP_API_URL}HRStatusReportStates/${this.state.obj.id}`,
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
  render() {
    const { obj, role, errors, value, amendList, objAmend, programList } =
      this.state;
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
                  <h4>Human Resource Status Report - State</h4>
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
                              placeholder="Date"
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
                              <b>State Status</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              placeholder="Select"
                              name="stateStatus"
                              value={obj.stateStatus || ""}
                              disabled
                              onChange={this.handleChange}
                              invalid={errors.formStatus ? true : false}
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
                            <FormFeedback>{errors.formStatus}</FormFeedback>
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
                              disabled={obj.typeofApproval === 1 ? true : false}
                            >
                              <option value="0">-Select-</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </CSelect>
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
                              onChange={this.handleReport}
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
                            {/* <FormFeedback>{errors.typeofApproval}</FormFeedback> */}
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b> First Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              name="firstFY"
                              disabled
                              value={this.state.editValue.firstFY || ""}
                            >
                              <option value="0">-Select-</option>
                              {this.props.financialYearList.map((data) => {
                                return (
                                  <option value={data.id} key={data.id}>
                                    {data.name}
                                  </option>
                                );
                              })}
                            </CSelect>
                            <FormFeedback>{errors.toDate}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b> Last Financial Year</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CSelect
                              name="firstFY"
                              disabled
                              value={this.state.editValue.lastFY || ""}
                            >
                              <option value="0">-Select-</option>
                              {this.props.financialYearList.map((data) => {
                                return (
                                  <option value={data.id} key={data.id}>
                                    {data.name}
                                  </option>
                                );
                              })}
                            </CSelect>
                            <FormFeedback>{errors.toDate}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Tabs>
                      <TabPane tab="Physical Summary" key="1">
                        <table className="table table-bordered table-responsive">
                          <thead>
                            <tr>
                              <th rowSpan={2} className="w-25" style={{ display: "none" }}>
                                <b>State</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Program Type</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Type of Post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Sub type of Post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>FMR Code</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Category of post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Name of the post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Approval Type</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post approved(On going)</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post proposed</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post dropped</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post In place</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of new post approved</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Monthly average salary per month per post (in
                                  INR)
                                </b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Total number of posts approved in RoP -
                                  ((Ongoing + new approved)- Dropped)
                                </b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Total number of post vacant- (Total Approved
                                  in RoP- In Place)
                                </b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.numberTableRows.map((data, i) => {
                              data.totalNoPostApprov =
                                Number(data.numofPostApprov) +
                                Number(data.numofNewPostApprov) -
                                Number(data.numofPostDrop);
                              data.totalNoPostVacant =
                                Number(data.totalNoPostApprov) -
                                Number(data.numofPostPlace);
                              return (
                                <tr key={i}>
                                  <td style={{ display: "none" }}>
                                    <CFormGroup>
                                      <CSelect
                                        
                                        disabled
                                        name="stateId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.stateId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.states &&
                                          this.state.states.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
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
                                       style={{ width: "150px" }}
                                        name="programTypeId"
                                        placeholder="Select"
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
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        name="typeofPostId"
                                        value={data.typeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.typeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.postList
                                          .filter(
                                            (val) =>
                                              val.programTypeId ===
                                              data.programTypeId
                                          )
                                          .map((user) => {
                                            return (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            );
                                          })}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        name="subTypeofPostId"
                                        value={data.subTypeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.subTypeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.subTypeofPostList
                                          .filter(
                                            (val) =>
                                              val.typeofPostId ===
                                              data.typeofPostId
                                          )
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
                                            </option>
                                          ))}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        name="fmrCodeId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.fmrCodeId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.fmrList
                                          .filter(
                                            (val) =>
                                              val.subTypeofPost ===
                                              data.subTypeofPostId
                                          )
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.fmr}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.fmrCodeId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="categoryofPostId"
                                        value={data.categoryofPostId || ""}
                                        invalid={
                                          errors.categoryofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.catPos
                                          .filter(
                                            (val) => val.fmrId === data.fmrCodeId
                                          )
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.categoryName}
                                            </option>
                                          ))}
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
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="postId"
                                        value={data.postId || ""}
                                        invalid={errors.postId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList.filter(d=>d.categoryofPostionId===data.categoryofPostId).map(
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
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="approvalTypeId"
                                        value={data.approvalTypeId || ""}
                                        invalid={
                                          errors.approvalTypeId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        <option value="1">Number</option>
                                        <option value="2">Lumpsum </option>
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.divisionId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "150px" }}
                                        type={
                                          data.approvalTypeId === 1
                                            ? "number"
                                            : "text"
                                        }
                                        value={data.numofPostApprov || ""}
                                        name="numofPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostApprov ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofPostProposed || ""}
                                        name="numofPostProposed"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostProposed
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        name="numofPostDrop"
                                        value={data.numofPostDrop || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostDrop ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofPostPlace || ""}
                                        name="numofPostPlace"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostPlace ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofNewPostApprov || ""}
                                        name="numofNewPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofNewPostApprov
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.monthlyAverSalary || ""}
                                        name="monthlyAverSalary"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.monthlyAverSalary
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.totalNoPostApprov || ""}
                                        disabled
                                        name="totalNoPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.totalNoPostApprov
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        disabled
                                        value={data.totalNoPostVacant || ""}
                                        name="numberofPostVaccant"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofPostVaccant
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  {i === 0 ||obj.formStatus === 4 ||
                            obj.formStatus === 6 ||
                            obj.formStatus === 7 ? null : (
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
                            {obj.formStatus === 4 ||
                            obj.formStatus === 6 ||
                            obj.formStatus === 7 ? null : (
                              <tr>
                                <td colSpan={15}>
                                  <CButton
                                    color="primary"
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onClick={() =>
                                      // console.log('hi')
                                      this.setState((prevState) => ({
                                        numberTableRows: [
                                          ...prevState.numberTableRows,
                                          {
                                            programTypeId: 0,
                                            typeofPostId: 0,
                                            subTypeofPostId: 0,
                                            fmrCodeId: 0,
                                            categoryofPostId: 0,
                                            postId: 0,
                                            approvalTypeId: 0,
                                            numofPostApprov: 0,
                                            numofPostProposed: 0,
                                            numofPostDrop: 0,
                                            numofPostPlace: 0,
                                            numofNewPostApprov: 0,
                                            monthlyAverSalary: 0,
                                            sacnctionPost: 0,
                                            totalNoPostApprov: 0,
                                            totalNoPostVacant: 0,
                                          },
                                        ],
                                      }))
                                    }
                                  >
                                    Add Line
                                  </CButton>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </TabPane>
                      {/* <TabPane tab="Regular Cadre" key="3">
                        <table className="table table-bordered table-responsive">
                          <thead>
                            <tr>
                              <th rowSpan={2} className="w-25">
                                <b>State</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Division</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>District</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Reporting Period</b>
                              </th>
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
                                        disabled
                                        name="stateId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.stateId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.states &&
                                          this.state.states.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
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
                                        disabled
                                        name="divisionId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.divisionId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.divisionArray &&
                                          this.state.divisionArray.map(
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
                                        disabled
                                        name="districtId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.districtId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.districtCategory &&
                                          this.state.districtCategory.map(
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
                                        disabled
                                        name="reportingPeriodId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.reportingPeriodId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.reportingPeriodList &&
                                          this.props.reportingPeriodList.map(
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
                                        style={{ width: "150px" }}
                                        disabled
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
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        name="typeofPostId"
                                        value={data.typeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.typeOfPost ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.position.map(
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
                                        disabled
                                        style={{ width: "150px" }}
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
                                        disabled
                                        style={{ width: "150px" }}
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
                                        disabled
                                        style={{ width: "150px" }}
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
                                        disabled
                                        style={{ width: "150px" }}
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
                                        disabled
                                        style={{ width: "70px" }}
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="text"
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
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane> */}
                      <TabPane tab="Financial Status" key="2">
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
                            {programList.map((val, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <b>
                                      {this.props.programTypeList
                                        .filter(
                                          (data) => data.id === val.programTypeId
                                        )
                                        .map((id) => {
                                          return id.name;
                                        })}
                                    </b>
                                  </td>
                                  <td>
                                    <b>
                                      {this.props.financialStatusList
                                        .filter((data) => data.id === val.budget)
                                        .map((id) => {
                                          return id.name;
                                        })}
                                    </b>
                                  </td>
                                  <td>
                                    {this.props.financialYearList
                                      .filter(
                                        (data) => data.id === val.finacialYearId
                                      )
                                      .map((id) => {
                                        return `${new Date(
                                          id.fromDate
                                        ).getFullYear()}-${new Date(
                                          id.toDate
                                        ).getFullYear()}`;
                                      })}
                                  </td>
                                  <td>{val.amount}</td>
                                </tr>
                              );
                            })}
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
                           <tr><td>Loading...</td></tr>
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Physical District Wise" key="5">
                        <table className="table table-bordered table-responsive">
                          <thead>
                            <tr>
                              <th rowSpan={2} className="w-25" style={{display: "none"}}>
                                <b>State</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Division</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>District</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Program Type</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Type of Post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Sub type of Post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>FMR Code</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Category of post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Name of the post</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Approval Type</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post approved(On going)</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post proposed</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post dropped</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of Post In place</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>Number of new post approved</b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Monthly average salary per month per post (in
                                  INR)
                                </b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Total number of posts approved in RoP -
                                  ((Ongoing + new approved)- Dropped)
                                </b>
                              </th>
                              <th style={{ width: "6.66%" }}>
                                <b>
                                  Total number of post vacant- (Total Approved
                                  in RoP- In Place)
                                </b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.numberTableRows.map((data, i) => {
                              data.totalNoPostApprov =
                                Number(data.numofPostApprov) +
                                Number(data.numofNewPostApprov) -
                                Number(data.numofPostDrop);
                              data.totalNoPostVacant =
                                Number(data.totalNoPostApprov) -
                                Number(data.numofPostPlace);
                              return (
                                <tr key={i}>
                                  <td style={{display: "none" }}>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        name="stateId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.stateId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.states &&
                                          this.state.states.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
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
                                        name="divisionId"
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.divisionId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.divisionArray &&
                                          this.state.divisionArray.map(
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
                                        disabled
                                        name="districtId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.districtId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.districtCategory &&
                                          this.state.districtCategory.map(
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
                                       style={{ width: "150px" }}
                                        name="programTypeId"
                                        placeholder="Select"
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
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        name="typeofPostId"
                                        value={data.typeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.typeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.postList
                                          .filter(
                                            (val) =>
                                              val.programTypeId ===
                                              data.programTypeId
                                          )
                                          .map((user) => {
                                            return (
                                              <option
                                                key={user.id}
                                                value={user.id}
                                              >
                                                {user.name}
                                              </option>
                                            );
                                          })}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        name="subTypeofPostId"
                                        value={data.subTypeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.subTypeofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.subTypeofPostList
                                          .filter(
                                            (val) =>
                                              val.typeofPostId ===
                                              data.typeofPostId
                                          )
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
                                            </option>
                                          ))}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        name="fmrCodeId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.fmrCodeId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.fmrList
                                          .filter(
                                            (val) =>
                                              val.subTypeofPost ===
                                              data.subTypeofPostId
                                          )
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.fmr}
                                            </option>
                                          ))}
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.fmrCodeId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        placeholder="Select"
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="categoryofPostId"
                                        value={data.categoryofPostId || ""}
                                        invalid={
                                          errors.categoryofPostId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.catPos
                                          .filter(
                                            (val) => val.fmrId === data.fmrCodeId
                                          )
                                          .map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.categoryName}
                                            </option>
                                          ))}
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
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="postId"
                                        value={data.postId || ""}
                                        invalid={errors.postId ? true : false}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.nameOfPostList.filter(d=>d.categoryofPostionId===data.categoryofPostId).map(
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
                                        style={{ width: "150px" }}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="approvalTypeId"
                                        value={data.approvalTypeId || ""}
                                        invalid={
                                          errors.approvalTypeId ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        <option value="1">Number</option>
                                        <option value="2">Lumpsum </option>
                                      </CSelect>
                                      <FormFeedback>
                                        {errors.divisionId}
                                      </FormFeedback>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "150px" }}
                                        type={
                                          data.approvalTypeId === 1
                                            ? "number"
                                            : "text"
                                        }
                                        value={data.numofPostApprov || ""}
                                        name="numofPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostApprov ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofPostProposed || ""}
                                        name="numofPostProposed"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostProposed
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        name="numofPostDrop"
                                        value={data.numofPostDrop || ""}
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostDrop ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofPostPlace || ""}
                                        name="numofPostPlace"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofPostPlace ? true : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.numofNewPostApprov || ""}
                                        name="numofNewPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numofNewPostApprov
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.monthlyAverSalary || ""}
                                        name="monthlyAverSalary"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.monthlyAverSalary
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        value={data.totalNoPostApprov || ""}
                                        disabled
                                        name="totalNoPostApprov"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.totalNoPostApprov
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CInput
                                       style={{ width: "70px" }}
                                        type="number"
                                        disabled
                                        value={data.totalNoPostVacant || ""}
                                        name="numberofPostVaccant"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        invalid={
                                          errors.numberofPostVaccant
                                            ? true
                                            : false
                                        }
                                      />
                                    </CFormGroup>
                                  </td>
                                  {i === 0 ||obj.formStatus === 4 ||
                            obj.formStatus === 6 ||
                            obj.formStatus === 7 ? null : (
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
                            {obj.formStatus === 4 ||
                            obj.formStatus === 6 ||
                            obj.formStatus === 7 ? null : (
                              <tr>
                                <td colSpan={15}>
                                  <CButton
                                    color="primary"
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onClick={() =>
                                      // console.log('hi')
                                      this.setState((prevState) => ({
                                        numberTableRows: [
                                          ...prevState.numberTableRows,
                                          {
                                            programTypeId: 0,
                                            typeofPostId: 0,
                                            subTypeofPostId: 0,
                                            fmrCodeId: 0,
                                            categoryofPostId: 0,
                                            postId: 0,
                                            approvalTypeId: 0,
                                            numofPostApprov: 0,
                                            numofPostProposed: 0,
                                            numofPostDrop: 0,
                                            numofPostPlace: 0,
                                            numofNewPostApprov: 0,
                                            monthlyAverSalary: 0,
                                            sacnctionPost: 0,
                                            totalNoPostApprov: 0,
                                            totalNoPostVacant: 0,
                                          },
                                        ],
                                      }))
                                    }
                                  >
                                    Add Line
                                  </CButton>
                                </td>
                              </tr>
                            )}
                          </tbody>
                          {/* <thead>
                            <tr>
                              <th rowSpan={2} className="w-25">
                                <b>State</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Division</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>District</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Reporting Period</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>FMR</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Program Type</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Type of Position</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Category of post</b>
                              </th>
                              <th rowSpan={2} style={{ width: "8%" }}>
                                <b>Name of the post</b>
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
                                        disabled
                                        name="stateId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.stateId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.states &&
                                          this.state.states.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
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
                                        name="divisionId"
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.divisionId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.divisionArray &&
                                          this.state.divisionArray.map(
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
                                        disabled
                                        name="districtId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.districtId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.districtCategory &&
                                          this.state.districtCategory.map(
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
                                        disabled
                                        name="reportingPeriodId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.reportingPeriodId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.reportingPeriodList &&
                                          this.props.reportingPeriodList.map(
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
                                        disabled
                                        style={{ width: "150px" }}
                                        name="fmrId"
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
                                        disabled
                                        style={{ width: "150px" }}
                                        name="programTypeId"
                                        placeholder="Select"
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
                                        disabled
                                        style={{ width: "150px" }}
                                        name="typeofPostionId"
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.typeofPostionId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.position &&
                                          this.state.position.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
                                            </option>
                                          ))}
                                      </CSelect>
                                    </CFormGroup>
                                  </td>
                                  <td>
                                    <CFormGroup>
                                      <CSelect
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        name="categoryPostId"
                                        value={data.categoryPostId || ""}
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
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        style={{ width: "70px" }}
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
                                        disabled
                                        type="number"
                                        style={{ width: "70px" }}
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        type="text"
                                        style={{ width: "70px" }}
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
                                </tr>
                              );
                            })}
                          </tbody> */}
                        </table>
                      </TabPane>
                      {/* <TabPane tab="Regular Cadre District Wise" key="6">
                        <table className="table table-bordered table-responsive">
                          <thead>
                            <tr>
                              <th rowSpan={2} className="w-25">
                                <b>State</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Division</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>District</b>
                              </th>
                              <th rowSpan={2} className="w-25">
                                <b>Reporting Period</b>
                              </th>
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
                                        disabled
                                        name="stateId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.stateId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.states &&
                                          this.state.states.map((user) => (
                                            <option
                                              key={user.id}
                                              value={user.id}
                                            >
                                              {user.name}
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
                                        disabled
                                        name="divisionId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.divisionId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.divisionArray &&
                                          this.state.divisionArray.map(
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
                                        disabled
                                        name="districtId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.districtId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.districtCategory &&
                                          this.state.districtCategory.map(
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
                                        disabled
                                        name="reportingPeriodId"
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        onChange={(e) =>
                                          this.handleTablePlace(e, i)
                                        }
                                        value={data.reportingPeriodId || ""}
                                      >
                                        <option value="0">-Select-</option>
                                        {this.props.reportingPeriodList &&
                                          this.props.reportingPeriodList.map(
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
                                        style={{ width: "150px" }}
                                        disabled
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
                                        disabled
                                        style={{ width: "150px" }}
                                        placeholder="Select"
                                        name="typeofPostId"
                                        value={data.typeofPostId || ""}
                                        onChange={(e) =>
                                          this.handleTable2(e, i)
                                        }
                                        invalid={
                                          errors.typeOfPost ? true : false
                                        }
                                      >
                                        <option value="0">-Select-</option>
                                        {this.state.position.map(
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
                                        disabled
                                        style={{ width: "150px" }}
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
                                        disabled
                                        style={{ width: "150px" }}
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
                                        disabled
                                        style={{ width: "150px" }}
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
                                        disabled
                                        style={{ width: "150px" }}
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
                                        disabled
                                        style={{ width: "70px" }}
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="number"
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
                                        disabled
                                        style={{ width: "70px" }}
                                        type="text"
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
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane> */}
                      <TabPane tab="Financial Status District Wise" key="7">
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
                            {programList.map((val, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <b>
                                      {this.props.programTypeList
                                        .filter(
                                          (data) => data.id === val.programTypeId
                                        )
                                        .map((id) => {
                                          return id.name;
                                        })}
                                    </b>
                                  </td>
                                  <td>
                                    <b>
                                      {this.props.financialStatusList
                                        .filter((data) => data.id === val.budget)
                                        .map((id) => {
                                          return id.name;
                                        })}
                                    </b>
                                  </td>
                                  <td>
                                    {this.props.financialYearList
                                      .filter(
                                        (data) => data.id === val.finacialYearId
                                      )
                                      .map((id) => {
                                        return `${new Date(
                                          id.fromDate
                                        ).getFullYear()}-${new Date(
                                          id.toDate
                                        ).getFullYear()}`;
                                      })}
                                  </td>
                                  <td>{val.amount}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </TabPane>
                      <TabPane tab="Key Deliverable District Wise" key="8">
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
                          <tr><td>Loading...</td></tr>
                          </tbody>
                        </table>
                      </TabPane>
                    </Tabs>
                    <Space size="middle" style={{ paddingTop: "5px" }}>
                      {obj.stateStatus === 4 ||
                      obj.stateStatus === 6 ||
                      obj.stateStatus === 7 ? null : (
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
                      {obj.stateStatus === 0 || obj.stateStatus === 5 ? (
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
                      {obj.stateStatus === 1 ? (
                        <CButton
                          color="success"
                          onClick={() => this.showConfirm(obj.id, 4)}
                        >
                          Approve
                        </CButton>
                      ) : null}
                      {obj.stateStatus === 1 ? (
                        <CButton
                          color="warning"
                          onClick={() => this.showConfirm(obj.id, 7)}
                        >
                          Reject
                        </CButton>
                      ) : null}
                      {obj.stateStatus === 0 || obj.stateStatus === 1 ? (
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
    postList: state.masterapi.postList,
    subTypeofPostList: state.masterapi.subTypeofPostList,
    typePostList: state.masterapi.postList,
    reportingPeriodList: state.masterapi.reportingPeriodList,
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
      retrieveReprtingPeriod,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(HRApprovalDetail);
