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
import { retrieveStatusOfVacancyAdvertisement } from "../../actions/apiadd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
import "./style.css";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class StatusOfVacancyAdvertisement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      value: {
        id: 0,
        name: "",
        status: 0,
      },
      editValue: {
        id: 0,
        name: "",
        status: 0,
      },
      edit: false,
      updateMsg: false,
      postMsg: false,
      deleteMsg: false,
      checkingMsg: false,
      errors: {},
    };
  }
  componentDidMount() {
    this.props.retrieveStatusOfVacancyAdvertisement();
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
    if (value.name === "") errors.name = "Please enter the name.";
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
      let check = this.props.statusofVacancyAdverstisementList.map((data) => {
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
        fetch("http://5.9.111.198:13880/api/StatusofVacancyAdvertisements", {
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
            },
          });
          this.props.retrieveStatusOfVacancyAdvertisement();
          console.log("result", resp);
        });
      }
    } else {
      this.setState({ errors });
    }
  };
  editForm = (id) => {
    console.log(id);
    this.setState({ edit: true,add:true, errors: {}, checkingMsg: false });
    axios
      .get(`http://5.9.111.198:13880/api/StatusofVacancyAdvertisements/${id}`)
      .then((res) => {
        console.log(res.data, "edit");
        let data = res.data;
        this.setState({ editValue: data });
      });
  };
  updateValidate = () => {
    let errors = {};
    if (this.state.editValue.name === 0) errors.name = "Please enter the name.";
    return errors;
  };
  updateData = (e, id) => {
    e.preventDefault();
    const errors = this.updateValidate();
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
      fetch(
        `http://5.9.111.198:13880/api/StatusofVacancyAdvertisements/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.editValue),
        }
      ).then((resp) => {
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
          },
          edit: false,
          checkingMsg: false,
        });
        console.log("result", resp);
        this.props.retrieveStatusOfVacancyAdvertisement();
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
        value: status === 0 ? "1" : "0",
      },
    ];
    fetch(`http://5.9.111.198:13880/api/StatusofVacancyAdvertisements/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      if (resp.status === 200) {
        this.setState({
          checkingMsg: false,
        });
        console.log("result", resp);
        this.props.retrieveStatusOfVacancyAdvertisement();
      } else {
        console.log("result", resp);
      }
    });
  };
  render() {
    const { errors, editValue } = this.state;
    return (
      <div>
        <div>
          {this.state.add? (
            <CRow>
              <CCol xs="12" sm="12">
                <CCard>
                  <CCardHeader>
                    <h4>Status of Vacancy Adverstisement</h4>
                  </CCardHeader>
                  <CCardBody>
                    {this.state.checkingMsg ? (
                      <CAlert
                        color="warning"
                        className="d-flex align-items-center"
                      >
                        <CIcon
                          name="cilWarning"
                          className="flex-shrink-0 me-2"
                          width={24}
                          height={24}
                        />
                        <div>This name is already exist</div>
                      </CAlert>
                    ) : this.state.updateMsg ? (
                      <CAlert
                        color="success"
                        className="d-flex align-items-center"
                      >
                        <CIcon
                          name="cilCheckCircle"
                          className="flex-shrink-0 me-2"
                          width={24}
                          height={24}
                        />
                        <div>Updated Successfully</div>
                      </CAlert>
                    ) : this.state.postMsg ? (
                      <CAlert
                        color="success"
                        className="d-flex align-items-center"
                      >
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
                            <CLabel htmlFor="text-input">
                              Status of Vacancy Adverstisement
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
                        </CFormGroup>
                        {/* <CFormGroup row>
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
                        </CFormGroup> */}
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
                            <CLabel htmlFor="text-input">
                              Status of Vacancy Adverstisement{" "}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="12">
                            <CInput
                              id="name"
                              name="name"
                              placeholder="Status of Vacancy Adverstisement"
                              value={this.state.value.name}
                              onChange={this.handleChange}
                              invalid={errors.name ? true : false}
                            />
                            <FormFeedback>{errors.name}</FormFeedback>
                          </CCol>
                        </CFormGroup>
                        {/* <CFormGroup row>
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
                        </CFormGroup> */}
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
          ) : (
            <CRow>
              <CCol xs="12" sm="12">
                <CCard>
                  <CCardHeader>
                    <h4>Status of Vacancy Adverstisement List</h4>
                  </CCardHeader>
                  <CCardBody>
                    <CButton color="primary" onClick={()=>this.setState({ add: true })}>
                      Add New
                    </CButton>
                    <Table
                      dataSource={this.props.statusofVacancyAdverstisementList.sort(
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
                        title="Status of Vacancy Adverstisement"
                        dataIndex="name"
                        key="name"
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
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    statusofVacancyAdverstisementList:
      state.apiadd.statusofVacancyAdverstisementList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveStatusOfVacancyAdvertisement,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusOfVacancyAdvertisement);
