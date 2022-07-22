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
import { FormFeedback } from "reactstrap";
import axios from "axios";
import { Modal, Table, Space } from "antd";
import { retrieveEducationQualification } from "../../actions/masterapi";
import { retrievePosition } from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import './style.css';
const { confirm } = Modal;
const config = localStorage.getItem("token");
class EducationQualifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: 0,
        name: "",
        educationqualicode: 0,
        status: 0,
      },
      errors: {},
      stateCategory: [],
      editValue: {
        id: 0,
        name: "",
        educationqualicode: 0,
        status: 0,
      },
      statusData: {
        path: "status",
        op: "replace",
        value: 0,
      },
      edit: false,
      updateMsg: false,
      postMsg: false,
      deleteMsg: false,
      checkingMsg: false,
      users: [],
    };
  }
  componentDidMount() {
    this.props.retrievePosition();
    this.props.retrieveEducationQualification();
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
    if (value.name == "") errors.name = "Please enter the name.";
    if (value.educationqualicode == 0)
      errors.educationqualicode = "Select the Education Category.";
    return errors;
  };
  submitData = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length == 0) {
      this.setState({
        errors: {},
      });
      let check = this.props.educationQualificationList.map((data) => {
        if (this.state.value.name == data.name) return false;
      });
      if (check.includes(false)) {
        this.setState({
          checkingMsg: true,
        });
      } else {
        this.setState({
          checkingMsg: false,
        });
        fetch("http://5.9.111.198:13880/api/EducationQualifications", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.value),
        }).then((resp) => {
          this.setState({
            postMsg: true,
          });
          setTimeout(() => {
            this.setState({
              postMsg: false,
            });
          }, 5000);
          this.props.retrieveEducationQualification();
          this.setState({
            value: {
              name: "",
              educationqualicode: 0,
            },
          });
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
      .get(`http://5.9.111.198:13880/api/EducationQualifications/${id}`)
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        this.setState({ editValue: data });
      });
  };
  updateValidate = () => {
    let errors = {};
    if (this.state.editValue.name == "") errors.name = "Please enter the name.";
    if (this.state.editValue.educationqualicode == 0)
      errors.educationqualicode = "Select the Education Category.";
    return errors;
  };
  updateData = (e, id) => {
    e.preventDefault();
    const errors = this.updateValidate();
    if (Object.keys(errors).length == 0) {
      this.setState({
        errors: {},
      });
      fetch(`http://5.9.111.198:13880/api/EducationQualifications/${id}`, {
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
          editValue: { id: 0, name: "", educationqualicode: 0 },
          edit: false,
        });
        this.props.retrieveEducationQualification();
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
        status.toString() == 0
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
        value: status.toString() == 0 ? "1" : "0",
      },
    ];
    fetch(`http://5.9.111.198:13880/api/EducationQualifications/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      console.log("result", resp);
      this.setState({
        checkingMsg: false,
        value: { name: "", educationqualicode: 0 },
        editValue: { name: "", educationqualicode: 0 },
        edit: false,
      });
      this.props.retrieveEducationQualification();
    });
  };
  render() {
    const { errors, editValue } = this.state;
    // console.log(this.props.positionList, "@@@@@@@@@@");
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Education Qualifications</h4>
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
                            Education Category
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="form"
                            name="name"
                            onChange={this.updateChange}
                            defaultValue={editValue.name || ""}
                            value={editValue.name || ""}
                            invalid={errors.name ? true : false}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    {/* country */}
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            Education Category
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="educationqualicode"
                            name="educationqualicode"
                            placeholder="Select"
                            onChange={this.updateChange}
                            value={editValue.educationqualicode || ""}
                            invalid={errors.educationqualicode ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.positionList &&
                              this.props.positionList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>
                            {errors.educationqualicode}
                          </FormFeedback>
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
                    </CFormGroup>
                    <CFormGroup>
                      <CCol sm="4">
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
                            {" "}
                            Education Qualification{" "}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CInput
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={this.state.value.name || ""}
                            onChange={this.handleChange}
                            invalid={errors.name ? true : false}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
                        </CCol>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol>
                        <CCol md="4">
                          <CLabel htmlFor="text-input">
                            Education Category
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="12">
                          <CSelect
                            id="educationqualicode"
                            name="educationqualicode"
                            placeholder="Select"
                            onChange={this.handleChange}
                            defaultValue={
                              this.state.value.educationqualicode || ""
                            }
                            value={this.state.value.educationqualicode || ""}
                            invalid={errors.educationqualicode ? true : false}
                          >
                            <option value="0">-Select-</option>
                            {this.props.positionList &&
                              this.props.positionList.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                          </CSelect>
                          <FormFeedback>
                            {errors.educationqualicode}
                          </FormFeedback>
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
                    </CFormGroup>
                    {/* end */}
                    <CFormGroup>
                      <CCol sm="4">
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
                  <h4>Education Qualification List</h4>
                </CCardHeader>
                <CCardBody>
                  <Table
                    dataSource={this.props.educationQualificationList.sort(
                      (a, b) => (a.id < b.id ? 1 : -1)
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
                      title="Education Qualification"
                      dataIndex="name"
                      key="name"
                    ></Table.Column>
                    <Table.Column
                      title="Education Category"
                      dataIndex="educationqualicode"
                      key="educationqualicode"
                      render={(text, user) => (
                        <>
                          {this.props.positionList &&
                            this.props.positionList
                              .filter(
                                (data) => data.id == user.educationqualicode
                              )
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
                        <>{status.toString() == 0 ? "Inactive" : "Active"}</>
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
                          {user.status.toString() == 1 ? (
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
    positionList: state.apiadd.positionList,
    educationQualificationList: state.masterapi.educationQualificationList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrievePosition,
      retrieveEducationQualification,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationQualifications);
