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
} from "@coreui/react";
import {
  Form,
  Row,
  Col,
  Modal,
  Radio,
  Button,
  Tabs,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  retrieveTypeOfFacility,
  retrieveFinancialYear,
  addHR,
  retrieveTypeOfVacancyAdvertisement,
  retrievePlaceOfPost,
  retrieveStatusOfVacancyAdvertisement,
} from "../../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const { TabPane } = Tabs;
const config = localStorage.getItem("token");
class VacancyAdvertisement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      modalShow: false,
      statuss: 0,
      states: [],
      catPos: [],
      errors: {},
      divisionArray: [],
      detailsArray: [],
      detailLastId: 0,
      districtCategory: [],
      obj: {
        nameHrEmpanelledAgency: "",
        addressOfHrAgency: "",
        contactNoHrAgency: 0,
        landlineNo: 0,
        faxNo: 0,
        stateId: 0,
        typeofVacancyAdvertisementId: 0,
        typeofPostId: 0,
        totalNoVacancy: 0,
        linkAdvertisement: "",
        titleAdvertisement: "",
        imageName: "",
        imageFile: null,
        openDate: "",
        closeDate: "",
        changeClosingAdver: 0,
        illustrateReason: "",
        imageName1: "",
        imageFile1: null,
        corrigendum: 0,
        howmanyTime: 0,
        dateIssue: "",
        reasonIssue: "",
        imageName2: "",
        imageFile2: null,
        statusofVacancyAdvertisementId: 0,
        remark: "",
      },
      fileUpload: [],
      fileUpload2: [],
      fileUpload3: [],
      imgSrc: "",
      errors: {},
      errorMsg: false,
      postMsg: false,
      postMsg1: false,
      stateSanction: 0,
      role: localStorage.getItem("access_role"),
      paramId: 0,
    };
  }
  showConfirm(value) {
    confirm({
      title:
        value == "submit" ? "Do you Want to Submit?" : "Do you Want to Print?",
      content: "Are you Sure",
      onOk() {
        value == "print" ? window.print() : console.log("ok");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  componentDidMount() {
    this.props.retrieveTypeOfVacancyAdvertisement();
    this.props.retrievePlaceOfPost();
    this.props.retrieveStatusOfVacancyAdvertisement();
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
    if (this.props.history.location.state) {
      let paramId = this.props.history.location.state.data;
      this.setState({ paramId: paramId });
      axios({
        url: `${process.env.REACT_APP_API_URL}VacancyAdvertisements/${paramId}`,
        method: "GET",
      }).then((response) => {
        console.log(response.data);
        this.setState({ obj: response.data });
      });
    }
  }
  handleRadio2 = (e) => {
    this.setState({
      obj: {
        ...this.state.obj,
        programType: e.target.value,
      },
    });
  };
  handleRadio3 = (e) => {
    this.setState({
      obj: {
        ...this.state.obj,
        typeofPost: e.target.value,
      },
    });
  };
  handleChange = (e) => {
    console.log(e.target.value);
    const { obj } = this.state;
    this.setState({
      obj: {
        ...this.state.obj,
        [e.target.name]: e.target.value,
        totalNoPostionApprov:
          Number(obj.numberofPostSanc) + Number(obj.numberofNewPostion),
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  validateNational = () => {
    const { obj } = this.state;
    let errors = {};
    if (obj.nameHrEmpanelledAgency == "")
      errors.nameHrEmpanelledAgency =
        "Please enter name of HR empanelled agency.";
    if (obj.addressOfHrAgency == "")
      errors.addressOfHrAgency = "Please enter the adress of HR agency.";
    if (obj.contactNoHrAgency == 0)
      errors.contactNoHrAgency = "Please enter the contact no of HR agency.";
    if (obj.landlineNo == 0)
      errors.landlineNo = "Please enter the Landline number.";
    if (obj.faxNo == 0) errors.faxNo = "Please enter fax number.";
    if (obj.stateId == 0) errors.stateId = "Please select State.";
    if (obj.typeofVacancyAdvertisementId == 0)
      errors.typeofVacancyAdvertisementId =
        "Please select type of vacancy advertisement.";
    if (obj.typeofPostId == 0)
      errors.typeofPostId = "Please select type of post.";
    if (
      obj.totalNoVacancy == 0 ||
      obj.totalNoVacancy < 0 ||
      obj.totalNoVacancy.length > 10
    )
      errors.totalNoVacancy = "Please enter total number of vacancy.";
    if (obj.linkAdvertisement == "")
      errors.linkAdvertisement = "Please enter URL.";
    if (obj.titleAdvertisement == "")
      errors.titleAdvertisement = "Please enter title adverstisement.";
    // if (obj.upload1 == "") errors.upload1 = "Please upload the file.";
    if (obj.openDate == "") errors.openDate = "Please pick open date.";
    if (obj.closeDate == 0) errors.closeDate = "Please pick close date.";
    if (obj.changeClosingAdver == "")
      errors.changeClosingAdver = "Please enter change closing advertisement.";
    // if (obj.upload2 == "") errors.upload2 = "Please upload file.";
    if (obj.dateIssue == "") errors.dateIssue = "Please enter date issue.";
    if (
      obj.corrigendum == 0 ||
      obj.corrigendum < 0 ||
      obj.corrigendum.length > 10
    )
      errors.corrigendum = "Please enter corrigendum.";
    if ((obj.howmanyTime == 0 && obj.corrigendum == 1) || obj.howmanyTime < 0)
      errors.howmanyTime = "Please enter how many times.";
    if (obj.reasonIssue == "")
      errors.reasonIssue = "Please enter reason issue.";
    // if (obj.upload3 == "") errors.upload3 = "Please upload file.";
    if (obj.statusofVacancyAdvertisementId == 0)
      errors.statusofVacancyAdvertisementId =
        "Please select status of vacancy advertisement.";
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { obj } = this.state;
    console.log(obj.imageFile);
    // var form = document.querySelector("form");
    const formData = new FormData();
    formData.append("imageFile", obj.imageFile);
    formData.append("imageName", obj.imageName);
    formData.append("imageFile1", obj.imageFile1);
    formData.append("imageName1", obj.imageName1);
    formData.append("imageFile2", obj.imageFile2);
    formData.append("imageName2", obj.imageName2);
    formData.append("nameHrEmpanelledAgency", obj.nameHrEmpanelledAgency);
    formData.append("addressOfHrAgency", obj.addressOfHrAgency);
    formData.append("contactNoHrAgency", obj.contactNoHrAgency);
    formData.append("landlineNo", obj.landlineNo);
    formData.append("faxNo", obj.faxNo);
    formData.append("stateId", obj.stateId);
    formData.append(
      "typeofVacancyAdvertisementId",
      obj.typeofVacancyAdvertisementId
    );
    formData.append("typeofPostId", obj.typeofPostId);
    formData.append("totalNoVacancy", obj.totalNoVacancy);
    formData.append("linkAdvertisement", obj.linkAdvertisement);
    formData.append("titleAdvertisement", obj.titleAdvertisement);
    formData.append("openDate", obj.openDate);
    formData.append("closeDate", obj.closeDate);
    formData.append("changeClosingAdver", obj.changeClosingAdver);
    formData.append("illustrateReason", obj.illustrateReason);
    formData.append("corrigendum", obj.corrigendum);
    formData.append("howmanyTime", obj.howmanyTime);
    formData.append("dateIssue", obj.dateIssue);
    formData.append("reasonIssue", obj.reasonIssue);
    formData.append(
      "statusofVacancyAdvertisementId",
      obj.statusofVacancyAdvertisementId
    );
    const errors = this.validateNational();
    // console.log(errors, "errors");
    if (Object.keys(errors).length == 0) {
      this.setState({
        errors: {},
      });
      if (this.state.paramId != 0) {
        fetch(
          `http://5.9.111.198:13880/api/VacancyAdvertisements/${this.state.paramId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${config}`,
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8",
              dataType: "json",
            },
            body: formData,
          }
        ).then((resp) => {
          console.log("result", resp);
          this.setState({
            obj: {
              nameHrEmpanelledAgency: "",
              addressOfHrAgency: "",
              contactNoHrAgency: 0,
              landlineNo: 0,
              faxNo: 0,
              stateId: 0,
              typeofVacancyAdvertisementId: 0,
              typeofPostId: 0,
              totalNoVacancy: 0,
              linkAdvertisement: "",
              titleAdvertisement: "",
              upload1: "",
              openDate: "",
              closeDate: "",
              changeClosingAdver: 0,
              illustrateReason: "",
              upload2: "",
              corrigendum: 0,
              howmanyTime: 0,
              dateIssue: "",
              reasonIssue: "",
              upload3: "",
              statusofVacancyAdvertisementId: 0,
              remark: "",
            },
            postMsg: true,
            paramId: 0,
            fileUpload: [],
            fileUpload2: [],
            fileUpload3: [],
          });
          setTimeout(() => {
            this.setState({ postMsg: false });
          }, 10000);
        });
      } else {
        fetch("http://5.9.111.198:13880/api/VacancyAdvertisements", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            // "Content-Type":'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
          body: formData,
        }).then((resp) => {
          console.log("result", resp);
          this.setState({
            obj: {
              nameHrEmpanelledAgency: "",
              addressOfHrAgency: "",
              contactNoHrAgency: 0,
              landlineNo: 0,
              faxNo: 0,
              stateId: 0,
              typeofVacancyAdvertisementId: 0,
              typeofPostId: 0,
              totalNoVacancy: 0,
              linkAdvertisement: "",
              titleAdvertisement: "",
              upload1: "",
              openDate: "",
              closeDate: "",
              changeClosingAdver: 0,
              illustrateReason: "",
              upload2: "",
              corrigendum: 0,
              howmanyTime: 0,
              dateIssue: "",
              reasonIssue: "",
              upload3: "",
              statusofVacancyAdvertisementId: 0,
              remark: "",
            },
            postMsg: true,
            paramId: 0,
            fileUpload: [],
            fileUpload2: [],
            fileUpload3: [],
          });
          setTimeout(() => {
            this.setState({ postMsg: false });
          }, 10000);
        });
      }
    } else {
      this.setState({ errors });
    }
  };
  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.errors("file is must less than 2MB");
    }
    return false;
  };
  handleUpload = (e) => {
    this.setState({
      fileUpload: e.fileList,
    });
    if (e.fileList && e.fileList[0].originFileObj) {
      let imageFile = e.fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = (x) => {
        this.setState({
          obj: {
            ...this.state.obj,
            imageFile,
          },
          imgSrc: x.target.result,
        });
      }
      reader.readAsDataURL(imageFile);
    }
  };
  handleUpload2 = (e) => {
    console.log(e);
    this.setState({
      fileUpload2: e.fileList,
    });
    if (e.fileList && e.fileList[0].originFileObj) {
      let imageFile1 = e.fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = (x) => {
        this.setState({
          obj: {
            ...this.state.obj,
            imageFile1,
          },
          imgSrc: x.target.result,
        });
      }
      reader.readAsDataURL(imageFile1);
    }
  };
  handleUpload3 = (e) => {
    console.log(e);
    this.setState({
      fileUpload3: e.fileList,
    });
    if (e.fileList && e.fileList[0].originFileObj) {
      let imageFile2 = e.fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onload = (x) => {
        this.setState({
          obj: {
            ...this.state.obj,
            imageFile2,
          },
          imgSrc: x.target.result,
        });
      }
      reader.readAsDataURL(imageFile2);
    }
  };
  render() {
    const { obj, role, errors } = this.state;
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
                  <h4>Vacancy Advertisement</h4>
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
                  <CForm
                    id="form"
                    onSubmit={this.handleSubmit}
                    encType="multipart/form-data"
                  >
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Name of the HR Empanelled Agency</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              id="form"
                              name="nameHrEmpanelledAgency"
                              onChange={this.handleChange}
                              value={obj.nameHrEmpanelledAgency || ""}
                              invalid={
                                errors.nameHrEmpanelledAgency ? true : false
                              }
                            />
                            <FormFeedback>
                              {errors.nameHrEmpanelledAgency}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Address of HR Agency</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              value={obj.addressOfHrAgency || ""}
                              name="addressOfHrAgency"
                              onChange={this.handleChange}
                              invalid={errors.addressOfHrAgency ? true : false}
                            />
                            <FormFeedback>
                              {errors.addressOfHrAgency}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="6">
                            <CLabel htmlFor="text-input">
                              <b>Contact Number of the HR Agency</b>
                            </CLabel>
                          </Col>
                          <Col md="6">
                            <CInput
                              type="number"
                              value={obj.contactNoHrAgency || ""}
                              name="contactNoHrAgency"
                              onChange={this.handleChange}
                              invalid={errors.contactNoHrAgency ? true : false}
                            />
                            <FormFeedback>
                              {errors.contactNoHrAgency}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Landline Number (STD Code plus Number)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.landlineNo || ""}
                              name="landlineNo"
                              onChange={this.handleChange}
                              invalid={errors.landlineNo ? true : false}
                            />
                            <FormFeedback>{errors.landlineNo}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b> Fax No</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              type="number"
                              value={obj.faxNo || ""}
                              name="faxNo"
                              onChange={this.handleChange}
                              invalid={errors.faxNo ? true : false}
                            />
                            <FormFeedback>{errors.faxNo}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Name of the State/UT</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="stateId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.stateId || ""}
                              invalid={errors.stateId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              {this.state.states &&
                                this.state.states.map((user) => (
                                  <option key={user.id} value={user.id}>
                                    {user.name}
                                  </option>
                                ))}
                            </CSelect>
                            <FormFeedback>{errors.stateId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col md="12">
                            <CLabel htmlFor="text-input">
                              <b>Type of Vacancy</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="typeofVacancyAdvertisementId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.typeofVacancyAdvertisementId || ""}
                              invalid={
                                errors.typeofVacancyAdvertisementId
                                  ? true
                                  : false
                              }
                            >
                              <option value="0">-Select-</option>
                              {this.props.typeofVacancyAdverstisementList &&
                                this.props.typeofVacancyAdverstisementList.map(
                                  (user) => (
                                    <option key={user.id} value={user.id}>
                                      {user.name}
                                    </option>
                                  )
                                )}
                            </CSelect>
                            <FormFeedback>
                              {errors.typeofVacancyAdvertisementId}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Type of Post</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="typeofPostId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.typeofPostId || ""}
                              invalid={errors.typeofPostId ? true : false}
                            >
                              <option value="0">-Select-</option>
                              <option value="1">SD</option>
                              <option value="2">PM</option>
                            </CSelect>
                            <FormFeedback>{errors.typeofPostId}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Total Number of Vacancy</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              name="totalNoVacancy"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.totalNoVacancy || ""}
                              invalid={errors.totalNoVacancy ? true : false}
                            />
                            <FormFeedback>{errors.totalNoVacancy}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Provide the link of advertisement</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              placeholder="copy and paste the link here"
                              value={obj.linkAdvertisement || ""}
                              name="linkAdvertisement"
                              onChange={this.handleChange}
                              invalid={errors.linkAdvertisement ? true : false}
                            />
                            <FormFeedback>
                              {errors.linkAdvertisement}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Title of Vacancy Advertisement(Brief description
                                including the name of major posts) (upload the
                                detail advertisement and all relevant document)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.titleAdvertisement || ""}
                              name="titleAdvertisement"
                              onChange={this.handleChange}
                              invalid={errors.titleAdvertisement ? true : false}
                            />
                            <FormFeedback>
                              {errors.titleAdvertisement}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel></CLabel>
                          </Col>
                          <Col>
                            <Upload
                              name="upload1"
                              beforeUpload={(file) => this.beforeUpload(file)}
                              fileList={[...this.state.fileUpload]}
                              value={this.state.fileUpload || ""}
                              onChange={(e) => this.handleUpload(e)}
                              maxCount="1"
                            >
                              <Button type="primary" icon={<UploadOutlined />}>
                                Upload
                              </Button>
                            </Upload>
                            <span
                              className="invalid-feedback"
                              style={{
                                display: errors.upload1 == 0 ? "none" : "block",
                              }}
                            >
                              {errors.upload1}
                            </span>
                          </Col>
                          {/* <img src={this.state.imgSrc} style={{height:20,width:20}} alt="image-preview" /> */}
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Duration of floating vacancy advertisement</b>
                            </CLabel>
                          </Col>
                          <CRow>
                            <Col span={12}>
                              <span style={{ marginLeft: 12 }}>Open Date</span>
                              <Col>
                                <CInput
                                  value={
                                    obj.openDate == ""
                                      ? obj.openDate
                                      : obj.openDate.split("T")[0] || ""
                                  }
                                  name="openDate"
                                  type="date"
                                  onChange={this.handleChange}
                                  invalid={errors.openDate ? true : false}
                                />
                                <FormFeedback>{errors.openDate}</FormFeedback>
                              </Col>
                            </Col>
                            <Col span={12}>
                              <span style={{ marginLeft: 12 }}>
                                {" "}
                                Close Date
                              </span>
                              <Col>
                                <CInput
                                  value={
                                    obj.closeDate == ""
                                      ? obj.closeDate
                                      : obj.closeDate.split("T")[0] || ""
                                  }
                                  name="closeDate"
                                  type="date"
                                  onChange={this.handleChange}
                                  invalid={errors.closeDate ? true : false}
                                />
                                <FormFeedback>{errors.closeDate}</FormFeedback>
                              </Col>
                            </Col>
                          </CRow>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Is any change in closing advertisement</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              onChange={(e) =>
                                this.setState({
                                  obj: {
                                    ...this.state.obj,
                                    changeClosingAdver: e.target.value,
                                  },
                                })
                              }
                              value={
                                obj.changeClosingAdver == 0
                                  ? obj.changeClosingAdver
                                  : obj.changeClosingAdver.toString() || ""
                              }
                            >
                              <Radio value="1">Yes</Radio>
                              <Radio value="2">No</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display:
                                  errors.changeClosingAdver == 0
                                    ? "none"
                                    : "block",
                              }}
                            >
                              {errors.changeClosingAdver}
                            </span>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                If Yes illustrate the reason(Please upload the
                                supporting document)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.illustrateReason || ""}
                              name="illustrateReason"
                              onChange={this.handleChange}
                              disabled={
                                obj.changeClosingAdver == 1 ? false : true
                              }
                              invalid={errors.illustrateReason ? true : false}
                            />
                            <FormFeedback>
                              {errors.illustrateReason}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel></CLabel>
                          </Col>
                          <Col>
                            <Upload
                              name="upload2"
                              beforeUpload={(file) => this.beforeUpload(file)}
                              fileList={[...this.state.fileUpload2]}
                              value={this.state.fileUpload2 || ""}
                              onChange={(e) => this.handleUpload2(e)}
                              maxCount="1"
                            >
                              <Button type="primary" icon={<UploadOutlined />}>
                                Upload
                              </Button>
                            </Upload>
                            <span
                              className="invalid-feedback"
                              style={{
                                display: errors.upload2 == 0 ? "none" : "block",
                              }}
                            >
                              {errors.upload2}
                            </span>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Is any corrigendum issues on vacancy
                                advertisement
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <Radio.Group
                              onChange={(e) =>
                                this.setState({
                                  obj: {
                                    ...this.state.obj,
                                    corrigendum: e.target.value,
                                  },
                                })
                              }
                              value={
                                obj.corrigendum == 0
                                  ? obj.corrigendum
                                  : obj.corrigendum.toString() || ""
                              }
                            >
                              <Radio value="1">Yes</Radio>
                              <Radio value="2">No</Radio>
                            </Radio.Group>
                            <span
                              className="invalid-feedback"
                              style={{
                                display:
                                  errors.corrigendum == 0 ? "none" : "block",
                              }}
                            >
                              {errors.corrigendum}
                            </span>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>If yes how many times issues (Number)</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.howmanyTime || ""}
                              type="number"
                              name="howmanyTime"
                              disabled={obj.corrigendum == 1 ? false : true}
                              onChange={this.handleChange}
                              invalid={errors.howmanyTime ? true : false}
                            />
                            <FormFeedback>{errors.howmanyTime}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Date of issues</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={
                                obj.dateIssue == ""
                                  ? obj.dateIssue
                                  : obj.dateIssue.split("T")[0] || ""
                              }
                              name="dateIssue"
                              type="date"
                              onChange={this.handleChange}
                              invalid={errors.dateIssue ? true : false}
                            />
                            <FormFeedback>{errors.dateIssue}</FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>
                                Reason for issue (Please upload the document)
                              </b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CInput
                              value={obj.reasonIssue || ""}
                              name="reasonIssue"
                              onChange={this.handleChange}
                              invalid={errors.reasonIssue ? true : false}
                            />
                          </Col>
                          <Col>
                            <Upload
                              name="upload3"
                              beforeUpload={(file) => this.beforeUpload(file)}
                              fileList={[...this.state.fileUpload3]}
                              value={this.state.fileUpload2 || ""}
                              onChange={(e) => this.handleUpload3(e)}
                              maxCount="1"
                            >
                              <Button type="primary" icon={<UploadOutlined />}>
                                Upload
                              </Button>
                            </Upload>
                            <span
                              className="invalid-feedback"
                              style={{
                                display: errors.upload2 == 0 ? "none" : "block",
                              }}
                            >
                              {errors.upload3}
                            </span>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row gutter={20}>
                      <Col span={12}>
                        <CFormGroup>
                          <Col>
                            <CLabel>
                              <b>Status of vacancy advertisement</b>
                            </CLabel>
                          </Col>
                          <Col>
                            <CSelect
                              name="statusofVacancyAdvertisementId"
                              placeholder="Select"
                              onChange={(e) => this.handleChange(e)}
                              value={obj.statusofVacancyAdvertisementId || ""}
                              invalid={
                                errors.statusofVacancyAdvertisementId
                                  ? true
                                  : false
                              }
                            >
                              <option value="0">-Select-</option>
                              {this.props.statusofVacancyAdverstisementList &&
                                this.props.statusofVacancyAdverstisementList.map(
                                  (ob) => {
                                    return (
                                      <option key={ob.id} value={ob.id}>
                                        {ob.name}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect>
                            <FormFeedback>
                              {errors.statusofVacancyAdvertisementId}
                            </FormFeedback>
                          </Col>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="center"
                          >
                            {this.state.paramId ? "Update" : "Submit"}
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button htmlType="submit">Save</Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button type="secondary">Edit</Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button>Download</Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button>Print</Button>
                        </Form.Item>
                      </Col>
                    </Row>
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
    hrList: state.apiadd.hrList,
    typeofVacancyAdverstisementList:
      state.apiadd.typeofVacancyAdverstisementList,
    placeOfPostList: state.apiadd.placeOfPostList,
    statusofVacancyAdverstisementList:
      state.apiadd.statusofVacancyAdverstisementList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveTypeOfFacility,
      retrieveFinancialYear,
      addHR,
      retrieveTypeOfVacancyAdvertisement,
      retrievePlaceOfPost,
      retrieveStatusOfVacancyAdvertisement,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VacancyAdvertisement);
