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
  CAlert,
  CSelect,
} from "@coreui/react";
import axios from "axios";
import { Modal, Table, Space } from "antd";
import {
  retrieveTypeOfFacility,
  retrieveSpecialist,
} from "../../actions/apiadd";
import { connect } from "react-redux";
import Select, { StylesConfig } from "react-select";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class Specialist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: 0,
        specialities: "",
        typeofFacilitiesId: [],
        typeofFacility: "",
        status: 0,
      },
      editValue: {
        id: 0,
        specialities: "",
        typeofFacilitiesId: [],
        status: 0,
      },
      edit: false,
      updateMsg: false,
      postMsg: false,
      deleteMsg: false,
      checkingMsg: false,
      errors: {},
      isValid: false,
      defaultValue: "",
      isValid: false,
    };
  }
  componentDidMount() {
    this.props.retrieveTypeOfFacility();
    this.props.retrieveSpecialist();
  }

  handleChange = (e) => {
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
  handleSelect = (selected) => {
    let value = Array.from(selected, (option) => option.value);
    console.log(value);
    this.setState({
      value: {
        ...this.state.value,
        typeofFacilitiesId: value.toString(),
        typeofFacility: selected,
      },
      errors: {
        ...this.state.errors,
        typeofFacilitiesId: "",
      },
      isValid: true,
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
    if (value.specialities === "")
      errors.specialities = "Please enter the Specialist.";
    if (value.typeofFacility.length === 0)
      errors.typeofFacilitiesId = "Select the Type of Facilities.";
    return errors;
  };
  submitData = (e) => {
    e.preventDefault();
    const {value} = this.state;
    const errors = this.validate();
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
      let check = this.props.SpecialistList.map((data) => {
        if (value.specialities === data.specialities) return false;
      });
      if (check.includes(false)) {
        this.setState({
          checkingMsg: true,
        });
      } else {
        this.setState({
          checkingMsg: false,
        });
        fetch("http://5.9.111.198:13880/api/Specialities", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }).then((resp) => {
          if (resp.status === 201) {
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
                specialities: "",
                typeofFacilitiesId: [],
              },
            });

            this.props.retrieveSpecialist();
            document.getElementById("form").reset();
            console.log("result", resp);
          } else {
            console.log("result", resp);
          }
        });
      }
    } else {
      this.setState({ errors });
    }
  };
  editForm = (id) => {
    console.log(id);
    this.setState({ edit: true, errors: {}, checkingMsg: false });
    axios.get(`http://5.9.111.198:13880/api/Specialities/${id}`).then((res) => {
      console.log(res.data, "edit");
      let data = res.data;
      this.setState({ editValue: data });
      let defaultValue = this.props.typeFacilityList
        .filter((obj) =>
          data.typeofFacilitiesId
            .toString()
            .split(",")
            .includes(obj.id.toString())
        )
        .map((obj) => {
          return { value: obj.id, label: obj.facilityType };
        });
      this.setState({ defaultValue: defaultValue });
    });
  };
  updateValidate = () => {
    let errors = {};
    if (this.state.defaultValue === 0)
      errors.typeofFacilitiesId = "Select the Type of Facilities.";
    if (this.state.editValue.specialities === "")
      errors.specialities = "Please enter Specialist.";
    return errors;
  };
  updateData = (e, id) => {
    e.preventDefault();
    const errors = this.updateValidate();
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
      fetch(`http://5.9.111.198:13880/api/Specialities/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.editValue),
      }).then((resp) => {
        if (resp.status === 204) {
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
              specialities: "",
              typeofFacilitiesId: 0,
            },
            edit: false,
            checkingMsg: false,
          });
          console.log("result", resp);
          this.props.retrieveSpecialist();
        } else {
          console.log("result", resp);
        }
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
  updateSelect = (selected) => {
    let value = Array.from(selected, (option) => option.value);
    console.log(value);
    this.setState({
      editValue: {
        ...this.state.editValue,
        typeofFacilitiesId: value.toString(),
      },
      errors: {
        ...this.state.errors,
        typeofFacilitiesId: "",
      },
      defaultValue: selected,
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
    fetch(`http://5.9.111.198:13880/api/Specialities/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      if (resp.status === 200) {
        this.props.retrieveSpecialist();
        this.setState({
          checkingMsg: false,
        });
        console.log("result", resp);
      } else {
        console.log("result", resp);
      }
    });
  };
  styles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#ddd" : state.isValid ? "#ddd" : "red",
      // overwrittes hover style
      "&:hover": {
        borderColor: state.isFocused ? "#ddd" : state.isValid ? "#ddd" : "red",
      },
    }),
  };
  render() {
    const { errors, editValue } = this.state;
    let options = this.props.typeFacilityList.map(function (facility) {
      return { value: facility.id, label: facility.facilityType };
    });
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Specialist</h4>
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
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Specialist</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="specialities"
                          name="specialities"
                          onChange={this.updateChange}
                          defaultValue={editValue.specialities || ""}
                          value={editValue.specialities || ""}
                          invalid={errors.specialities ? true : false}
                        />
                        <FormFeedback>{errors.specialities}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of Facility</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="typeofFacilitiesId"
                          name="typeofFacilitiesId"
                          placeholder="Select Multiple"
                          onChange={this.updateSelect}
                          value={this.state.defaultValue}
                          isMulti
                          options={options}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.typeofFacilitiesId}
                        </span>
                        {/* <FormFeedback>{errors.typeofFacilitiesId}</FormFeedback> */}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
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
                    </CFormGroup>
                    <CFormGroup>
                      <CCol sm="10"></CCol>
                      <CCol sm="8"></CCol>
                      <CCol></CCol>
                      <CButton color="primary" type="submit">
                        Update
                      </CButton>
                    </CFormGroup>
                  </CForm>
                ) : (
                  <CForm
                    id="form"
                    className="form-horizontal"
                    onSubmit={this.submitData}
                  >
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Specialist </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="specialities"
                          name="specialities"
                          placeholder="Specialist"
                          value={this.state.value.specialities}
                          onChange={this.handleChange}
                          invalid={errors.specialities ? true : false}
                        />
                        <FormFeedback>{errors.specialities}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of Facility</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <Select
                          id="typeofFacilitiesId"
                          name="typeofFacilitiesId"
                          placeholder="Select Multiple"
                          isMulti
                          onChange={this.handleSelect}
                          value={this.state.value.typeofFacility || ""}
                          options={options}
                        />
                        <span
                          className="invalid-feedback"
                          style={{
                            display: this.state.isValid ? "none" : "block",
                          }}
                        >
                          {errors.typeofFacilitiesId}
                        </span>
                        {/* <FormFeedback>{errors.typeofFacilitiesId}</FormFeedback> */}
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
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
                    </CFormGroup>
                    <CFormGroup>
                      <CCol sm="10"></CCol>
                      <CCol sm="8"></CCol>
                      <CCol></CCol>
                      <CButton color="primary" type="submit">
                        Save
                      </CButton>
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
                  <h4>Specialist List</h4>
                </CCardHeader>
                <CCardBody>
                  <Table
                    dataSource={this.props.SpecialistList.sort((a, b) =>
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
                      title="Specialist"
                      dataIndex="specialities"
                      key="specialities"
                    ></Table.Column>
                    <Table.Column
                      title="Type of Facility"
                      dataIndex="typeofFacilitiesId"
                      key="typeofFacilitiesId"
                      render={(text, user) => (
                        <>
                          {this.props.typeFacilityList &&
                            this.props.typeFacilityList
                              .filter((obj) =>
                                user.typeofFacilitiesId
                                  .split(",")
                                  .includes(obj.id.toString())
                              )
                              .map((data, i, row) => {
                                return i + 1 === row.length
                                  ? `${data.facilityType} `
                                  : `${data.facilityType} ,`;
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
    SpecialistList: state.apiadd.SpecialistList,
    typeFacilityList: state.apiadd.typeFacilityList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveSpecialist,
      retrieveTypeOfFacility,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Specialist);
