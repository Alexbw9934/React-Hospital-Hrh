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
  CSelect,
  CAlert,
} from "@coreui/react";
import axios from "axios";
import { Modal, Table, Space } from "antd";
import {
  retrieveProgramType,
  retrievePlaceOfFacility,
  retrieveBlocks,
  retrieveData,
  retrieveDivision,
  retrieveState,
  retrieveDistricts,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class PlaceOfFacility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: 0,
        name: "",
        specialist: "",
        programTypeId: 0,
        cityId: 0,
        blockId: 0,
        districtId: 0,
        divisionId: 0,
        stateId: 0,
        status: 0,
      },
      districtCategory: [],
      stateCategory: [],
      states: [],
      editValue: {
        id: 0,
        name: "",
        specialist: "",
        programTypeId: 0,
        cityId: 0,
        blockId: 0,
        districtId: 0,
        divisionId: 0,
        stateId: 0,
        status: 0,
      },
      edit: false,
      users: [],
      updateMsg: false,
      postMsg: false,
      deleteMsg: false,
      checkingMsg: false,
      errors: {},
    };
  }
  componentDidMount() {
    this.props.retrieveProgramType();
    this.props.retrievePlaceOfFacility();
    this.props.retrieveBlocks();
    this.props.retrieveDivision();
    this.props.retrieveDistricts();
    this.props.retrieveData();
    this.props.retrieveState();
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  handleStatus = (e) => {
    console.log(e.target.value);
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: JSON.parse(e.target.value),
      },
    });
  };
  validate = () => {
    const { value } = this.state;
    let errors = {};
    if (value.programTypeId === 0)
      errors.programTypeId = "Select the Program Type.";
    if (value.stateId === 0) errors.stateId = "Select the State.";
    if (value.districtId === 0) errors.districtId = "Select the District.";
    if (value.blockId === 0) errors.blockId = "Select the Block.";
    if (value.cityId === 0) errors.cityId = "Select the City.";
    if (value.divisionId === 0) errors.divisionId = "Select the Division.";
    if (value.name === "") errors.name = "Please enter Name.";
    if (value.specialist === "") errors.specialist = "Please enter Specialist.";
    return errors;
  };
  submitData = (e) => {
    e.preventDefault();
    const value = this.state;
    const errors = this.validate();
    console.log("########", value.value);
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
      let check = this.props.placeOfFacilityList.map((data) => {
        if (value.value.name === data.name) return false;
      });
      if (check.includes(false)) {
        this.setState({
          checkingMsg: true,
        });
      } else {
        this.setState({
          checkingMsg: false,
        });
        fetch("http://5.9.111.198:13880/api/PlaceofFacilities", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value.value),
        }).then((resp) => {
          this.setState({
            postMsg: true,
          });
          setTimeout(() => {
            this.setState({
              postMsg: false,
            });
          }, 5000);
          this.setState({
            value: {
              name: "",
              specialist: "",
              programTypeId: 0,
              cityId: 0,
              blockId: 0,
              districtId: 0,
              divisionId: 0,
              stateId: 0,
            },
          });
          this.props.retrievePlaceOfFacility();
          console.log("result", resp);
        });
      }
    } else {
      this.setState({ errors });
    }
  };
  editForm = (id) => {
    console.log(id);
    this.setState({ edit: true, errors: {}, checkingMsg: false });
    axios
      .get(`http://5.9.111.198:13880/api/PlaceofFacilities/${id}`)
      .then((res) => {
        console.log(res.data, "edit");
        let data = res.data;
        this.setState({ editValue: data });
      });
  };
  updateValidate = () => {
    let errors = {};
    if (this.state.editValue.name === "") errors.name = "Please enter the name.";
    if (this.state.editValue.specialist === "")
      errors.specialist = "Please enter the Specialist.";
    if (this.state.editValue.programTypeId === 0)
      errors.programTypeId = "Select the Program Type.";
    if (this.state.editValue.cityId === 0) errors.cityId = "Select the City.";
    if (this.state.editValue.divisionId === 0)
      errors.divisionId = "Select the Division.";
    if (this.state.editValue.districtId === 0)
      errors.districtId = "Select the District.";
    if (this.state.editValue.stateId === 0) errors.stateId = "Select the State.";
    if (this.state.editValue.blockId === 0) errors.blockId = "Select the Block.";
    return errors;
  };
  updateData = (e, id) => {
    e.preventDefault();
    const errors = this.updateValidate();
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
      fetch(`http://5.9.111.198:13880/api/PlaceofFacilities/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.editValue),
      }).then((resp) => {
        this.setState({
          updateMsg: true,
        });
        setTimeout(() => {
          this.setState({
            updateMsg: false,
          });
        }, 5000);
        this.setState({
          editValue: {
            id: 0,
            name: "",
            specialist: "",
            programTypeId: 0,
            cityId: 0,
            blockId: 0,
            districtId: 0,
            divisionId: 0,
            stateId: 0,
          },
          edit: false,
          checkingMsg: false,
        });
        console.log("result", resp);
        this.props.retrievePlaceOfFacility();
      });
    } else {
      this.setState({ errors });
    }
  };
  updateChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      editValue: {
        ...this.state.editValue,
        [evt.target.name]: value,
      },
      errors: {
        ...this.state.errors,
        [evt.target.name]: "",
      },
    });
  };
  updateStatus = (e) => {
    console.log(e.target.value);
    this.setState({
      editValue: {
        ...this.state.editValue,
        [e.target.name]: JSON.parse(e.target.value),
      },
    });
  };
  showConfirm = (value, status) => {
    confirm({
      title:
        status.toString() === 0
          ? "Do you want to Activate ?"
          : "Do you want to Inactivate ?",
      content: "Are you Sure",
      onOk: () => {
        return this.changeStatus(value, status);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  changeStatus = (id, status) => {
    let operation = [
      {
        op: "replace",
        path: "/status",
        value: status.toString() === 0 ? "1" : "0",
      },
    ];
    fetch(`http://5.9.111.198:13880/api/PlaceofFacilities/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      this.setState({
        checkingMsg: false,
        value: {
          id: 0,
          name: "",
          specialist: "",
          programTypeId: 0,
          cityId: 0,
          blockId: 0,
          districtId: 0,
          divisionId: 0,
          stateId: 0,
        },
        editValue: {
          id: 0,
          name: "",
          specialist: "",
          programTypeId: 0,
          cityId: 0,
          blockId: 0,
          districtId: 0,
          divisionId: 0,
          stateId: 0,
        },
      });
      setTimeout(() => {
        this.setState({
          edit: false,
          errors: {},
        });
      }, 5000);
      console.log("result", resp);
      this.props.retrievePlaceOfFacility();
    });
  };
  render() {
    const { errors, editValue } = this.state;
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Place of Facility/Office</h4>
              </CCardHeader>
              <CCardBody>
                {this.state.checkingMsg ? (
                  <CAlert color="warning" className="d-flex align-items-center">
                    <CIcon
                      name="cilWarning"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>This name is already exist</div>
                  </CAlert>
                ) : this.state.updateMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Updated Successfully</div>
                  </CAlert>
                ) : this.state.postMsg ? (
                  <CAlert color="success" className="d-flex align-items-center">
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Data save Successfully</div>
                  </CAlert>
                ) : this.state.deleteMsg ? (
                  <CAlert
                    color="danger"
                    className="d-flex align-items-center"
                    id="delete"
                  >
                    <CIcon
                      name="cilCheckCircle"
                      className="flex-shrink-0 me-2"
                      width={24}
                      height={24}
                    />
                    <div>Deleted Successfully</div>
                  </CAlert>
                ) : null}
                {this.state.edit ? (
                  <CForm
                    id="form1"
                    className="form-horizontal"
                    onSubmit={(e) => this.updateData(e, editValue.id)}
                  >
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            Place of Facility
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="name"
                            name="name"
                            onChange={this.updateChange}
                            defaultValue={editValue.name || ""}
                            value={editValue.name || ""}
                            invalid={errors.name ? true : false}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">District</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="districtId"
                            name="districtId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.districtId || ""}
                            invalid={errors.districtId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.districtsList &&
                              this.props.districtsList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.districtId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Specialities</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="specialist"
                            name="specialist"
                            onChange={this.updateChange}
                            defaultValue={editValue.specialist || ""}
                            value={editValue.specialist || ""}
                            invalid={errors.specialist ? true : false}
                          />
                          <FormFeedback>{errors.specialist}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">City</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="cityId"
                            name="cityId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.cityId || ""}
                            invalid={errors.cityId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.cityList &&
                              this.props.cityList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.cityId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Program Type</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="programTypeId"
                            name="programTypeId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.programTypeId || ""}
                            invalid={errors.programTypeId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.programTypeList &&
                              this.props.programTypeList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.programTypeId}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Block</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="blockId"
                            name="blockId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.blockId || ""}
                            invalid={errors.blockId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.blockList &&
                              this.props.blockList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.blockId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateId"
                            name="stateId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.stateId || ""}
                            invalid={errors.stateId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateList &&
                              this.props.stateList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.stateId}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Division</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="divisionId"
                            name="divisionId"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.divisionId || ""}
                            invalid={errors.divisionId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.divisionList &&
                              this.props.divisionList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.divisionId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Status </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="status"
                            name="status"
                            placeholder="Select"
                            onChange={this.updateStatus}
                            value={editValue.status || ""}
                          >
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol></CCol>
                    </CFormGroup>
                    <CFormGroup>
                      <CCol>
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton color="primary" type="submit">
                          Update
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                ) : (
                  <CForm
                    id="form"
                    className="form-horizontal"
                    onSubmit={this.submitData}
                  >
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            Place of Facility{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="name"
                            name="name"
                            placeholder="Place of Facility"
                            value={this.state.value.name}
                            onChange={this.handleChange}
                            invalid={errors.name ? true : false}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">District</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="districtId"
                            name="districtId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.districtId || ""}
                            invalid={errors.districtId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.districtsList &&
                              this.props.districtsList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.districtId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Specialities </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="specialist"
                            name="specialist"
                            placeholder="Specialities"
                            value={this.state.value.specialist}
                            onChange={this.handleChange}
                            invalid={errors.specialist ? true : false}
                          />
                          <FormFeedback>{errors.specialist}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">City</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="cityId"
                            name="cityId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.cityId || ""}
                            invalid={errors.cityId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.cityList &&
                              this.props.cityList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.cityId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Program Type</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="programTypeId"
                            name="programTypeId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.programTypeId || ""}
                            invalid={errors.programTypeId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.programTypeList &&
                              this.props.programTypeList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.programTypeId}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Block </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="blockId"
                            name="blockId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.blockId || ""}
                            invalid={errors.blockId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.blockList &&
                              this.props.blockList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.blockId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">State</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="stateId"
                            name="stateId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.stateId || ""}
                            invalid={errors.stateId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.stateList &&
                              this.props.stateList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.stateId}</FormFeedback>
                        </CCol>
                      </CCol>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Division</CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="divisionId"
                            name="divisionId"
                            placeholder="Select"
                            onChange={this.handleChange}
                            value={this.state.value.divisionId || ""}
                            invalid={errors.divisionId ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.divisionList &&
                              this.props.divisionList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>{errors.divisionId}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">Status </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="status"
                            name="status"
                            placeholder="Select"
                            onChange={this.handleStatus}
                            value={this.state.value.status || ""}
                          >
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                          </CSelect>
                        </CCol>
                      </CCol>
                      <CCol></CCol>
                    </CFormGroup>
                    {/* end */}
                    <CFormGroup>
                      <CCol>
                        <CCol sm="10"></CCol>
                        <CCol sm="8"></CCol>
                        <CCol></CCol>
                        <CButton color="primary" type="submit">
                          Save
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                  <h4>Place of Facility/Office List</h4>
                </CCardHeader>
                <CCardBody>
                  <Table
                    dataSource={this.props.placeOfFacilityList.sort((a, b) =>
                      a.id < b.id ? 1 : -1
                    )}
                    rowKey={"id"}
                  >
                    <Table.Column
                      title="ID"
                      dataIndex="id"
                      key="id"
                      render={(text, obj, i) => <>{i + 1}</>}
                    ></Table.Column>
                    <Table.Column
                      title="Place of Facility"
                      dataIndex="name"
                      key="name"
                    ></Table.Column>
                    <Table.Column
                      title="Specialist"
                      dataIndex="specialist"
                      key="specialist"
                    ></Table.Column>
                    <Table.Column
                      title="Program Type"
                      dataIndex="programTypeId"
                      key="programTypeId"
                      render={(text, user) => (
                        <>
                          {" "}
                          {this.props.programTypeList
                            .filter((data) => data.id === user.programTypeId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="State"
                      dataIndex="stateId"
                      key="stateId"
                      render={(text, user) => (
                        <>
                          {this.props.stateList
                            .filter((data) => data.id === user.stateId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="District"
                      dataIndex="districtId"
                      key="districtId"
                      render={(text, user) => (
                        <>
                          {this.props.districtsList
                            .filter((data) => data.id === user.districtId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="City"
                      dataIndex="cityId"
                      key="cityId"
                      render={(text, user) => (
                        <>
                          {this.props.cityList
                            .filter((data) => data.id === user.cityId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Block"
                      dataIndex="blockId"
                      key="blockId"
                      render={(text, user) => (
                        <>
                          {this.props.blockList
                            .filter((data) => data.id === user.blockId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Division"
                      dataIndex="divisionId"
                      key="divisionId"
                      render={(text, user) => (
                        <>
                          {this.props.divisionList
                            .filter((data) => data.id === user.divisionId)
                            .map((id) => {
                              return id.name;
                            })}
                        </>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Status"
                      dataIndex="status"
                      key="status"
                      render={(status) => (
                        <>{status.toString() === 0 ? "Inactive" : "Active"}</>
                      )}
                    ></Table.Column>
                    <Table.Column
                      title="Action"
                      key="action"
                      render={(text, user) => (
                        <Space size="middle">
                          <CButton
                            color="primary"
                            style={{ backgroundColor: "#0D6EFD" }}
                            onClick={() => this.editForm(user.id)}
                          >
                            Edit
                          </CButton>
                          {user.status.toString() === 1 ? (
                            <CButton
                              color="danger"
                              style={{ backgroundColor: "red" }}
                              onClick={() =>
                                this.showConfirm(user.id, user.status)
                              }
                            >
                              Inactivate
                            </CButton>
                          ) : (
                            <CButton
                              color="success"
                              style={{ backgroundColor: "green" }}
                              onClick={() =>
                                this.showConfirm(user.id, user.status)
                              }
                            >
                              Activate
                            </CButton>
                          )}
                        </Space>
                      )}
                    ></Table.Column>
                  </Table>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    programTypeList: state.apiadd.programTypeList,
    placeOfFacilityList: state.apiadd.placeOfFacilityList,
    cityList: state.apiadd.cityList,
    stateList: state.apiadd.stateList,
    divisionList: state.apiadd.divisionList,
    districtsList: state.apiadd.districtsList,
    blockList: state.apiadd.blockList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveProgramType,
      retrieveProgramType,
      retrievePlaceOfFacility,
      retrieveBlocks,
      retrieveData,
      retrieveDivision,
      retrieveState,
      retrieveDistricts,
      retrievePlaceOfFacility,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PlaceOfFacility);
