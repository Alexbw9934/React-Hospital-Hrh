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
  retrieveTypeOfPositions,
  retrievePlaceOfPost,
  retrieveTypeOfFacility,
} from "../../actions/apiadd";
import { retrievePost } from "../../actions/masterapi";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CIcon from "@coreui/icons-react";
import { FormFeedback } from "reactstrap";
const { confirm } = Modal;
const config = localStorage.getItem("token");
class TypeofFacility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: 0,
        facilityType: "",
        typeofPositionId: 0,
        programTypeId: 0,
        placeofPostId: 0,
        status: 0,
        typeofPostId: 0,
      },
      districtCategory: [],
      stateCategory: [],
      states: [],
      editValue: {
        id: 0,
        facilityType: "",
        typeofPositionId: 0,
        programTypeId: 0,
        placeofPostId: 0,
        status: 0,
        typeofPostId: 0,
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
    this.props.retrieveTypeOfPositions();
    this.props.retrieveProgramType();
    this.props.retrievePlaceOfPost();
    this.props.retrieveTypeOfFacility();
    this.props.retrievePost();
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
    // if (value.placeofPostId === 0)
    //   errors.placeofPostId = "Select the Place of post.";
    if (value.facilityType === "")
      errors.facilityType = "Please enter Facility Type.";
    if (value.typeofPostId === 0)
      errors.typeofPostId = "Please enter Type of Post.";
    return errors;
  };
  submitData = (e) => {
    e.preventDefault();
    const value = this.state;
    const errors = this.validate();
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
      console.log("########", value.value);
      let check = this.props.typeFacilityList.map((data) => {
        if (value.value.facilityType === data.facilityType) return false;
      });
      if (check.includes(false)) {
        this.setState({
          checkingMsg: true,
        });
      } else {
        this.setState({
          checkingMsg: false,
        });
        console.log("########", value.value);
        fetch("http://5.9.111.198:13880/api/TypeofFacilityOffices", {
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
              facilityType: "",
              typeofPosition: 0,
              programTypeId: 0,
              placeofPostId: 0,
            },
          });
          this.props.retrieveTypeOfFacility();
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
      .get(`http://5.9.111.198:13880/api/TypeofFacilityOffices/${id}`)
      .then((res) => {
        console.log(res.data, "edit");
        let data = res.data;
        this.setState({ editValue: data });
      });
  };
  updateValidate = () => {
    let errors = {};
    if (this.state.editValue.facilityType === "")
      errors.facilityType = "Please enter the name.";
    if (this.state.editValue.programTypeId === 0)
      errors.programTypeId = "Select the Program Type.";
    if (this.state.editValue.placeofPostId === 0)
      errors.placeofPostId = "Select the Program Type.";
    if (this.state.editValue.typeofPostId === 0)
      errors.typeofPostId = "Please enter Type of Post.";
    return errors;
  };
  updateData = (e, id) => {
    e.preventDefault();
    const errors = this.updateValidate();
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {},
      });
      fetch(`http://5.9.111.198:13880/api/TypeofFacilityOffices/${id}`, {
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
            facilityType: "",
            typeofPosition: 0,
            programTypeId: 0,
            placeofPostId: 0,
          },
          edit: false,
          checkingMsg: false,
        });
        console.log("result", resp);
        this.props.retrieveTypeOfFacility();
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
    fetch(`http://5.9.111.198:13880/api/TypeofFacilityOffices/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(operation),
    }).then((resp) => {
      this.setState({
        checkingMsg: false,
      });
      setTimeout(() => {
        this.setState({
          edit: false,
          errors: {},
        });
      }, 5000);
      console.log("result", resp);
      this.props.retrieveTypeOfFacility();
    });
  };
  render() {
    const { errors, editValue } = this.state;
    // console.log(this.props.postList,'#############')
    return (
      <div>
        <CRow>
          <CCol xs="12" sm="12">
            <CCard>
              <CCardHeader>
                <h4>Type of Facility/Office</h4>
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
                        <CLabel htmlFor="text-input">Facility Type</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="facilityType"
                          name="facilityType"
                          onChange={this.updateChange}
                          defaultValue={editValue.facilityType || ""}
                          value={editValue.facilityType || ""}
                          invalid={errors.facilityType ? true : false}
                        />
                        <FormFeedback>{errors.facilityType}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of post</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="typeofPostId"
                          name="typeofPostId"
                          placeholder="Select"
                          onChange={this.updateChange}
                          value={editValue.typeofPostId || ""}
                          invalid={errors.typeofPostId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.postList &&
                            this.props.postList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.typeofPostId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Program Type</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="programTypeId"
                          name="programTypeId"
                          placeholder="Select"
                          disabled={editValue.typeofPostId === 2 ? false : true}
                          onChange={this.updateChange}
                          value={editValue.programTypeId || ""}
                          invalid={
                            this.state.value.typeofPostId === 2 &&
                            errors.programTypeId
                              ? true
                              : false
                          }
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
                    </CFormGroup>
                    {/* <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of Position</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="typeofPosition"
                          name="typeofPosition"
                          placeholder="Select"
                          readOnly
                          value={editValue.typeofPosition || ""}
                          //   invalid={errors.typeofPosition ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.typeOfPositionList &&
                            this.props.typeOfPositionList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.typeofPosition}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Place of Post</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="placeofPostId"
                          name="placeofPostId"
                          placeholder="Select"
                          onChange={this.updateChange}
                          value={editValue.placeofPostId || ""}
                          invalid={errors.placeofPostId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.placeOfPostList &&
                            this.props.placeOfPostList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.placeofPostId}</FormFeedback>
                      </CCol>
                    </CFormGroup> */}
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
                        <CLabel htmlFor="text-input">Facility Type </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CInput
                          id="facilityType"
                          name="facilityType"
                          placeholder="Facility type"
                          value={this.state.value.facilityType || ""}
                          onChange={(e) => this.handleChange(e)}
                          invalid={errors.facilityType ? true : false}
                        />
                        <FormFeedback>{errors.facilityType}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of post</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="typeofPostId"
                          name="typeofPostId"
                          placeholder="Select"
                          onChange={(e) => this.handleChange(e)}
                          value={this.state.value.typeofPostId || ""}
                          invalid={errors.typeofPostId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.postList &&
                            this.props.postList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.typeofPostId}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Program Type</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="programTypeId"
                          name="programTypeId"
                          placeholder="Select"
                          disabled={
                            this.state.value.typeofPostId === 2 ? false : true
                          }
                          onChange={(e) =>
                            this.state.value.typeofPostId === 2
                              ? this.handleChange(e)
                              : ""
                          }
                          value={this.state.value.programTypeId || ""}
                          invalid={
                            this.state.value.typeofPostId === 2 &&
                            errors.programTypeId
                              ? true
                              : false
                          }
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
                    </CFormGroup>
                    {/* <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Type of Position</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="typeofPosition"
                          name="typeofPosition"
                          placeholder="Select"
                          readOnly
                          value={this.state.value.typeofPosition || ""}
                          //   invalid={errors.typeofPosition ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.typeOfPositionList &&
                            this.props.typeOfPositionList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.typeofPosition}</FormFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Place of Post</CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="placeofPostId"
                          name="placeofPostId"
                          placeholder="Select"
                          onChange={this.handleChange}
                          value={this.state.value.placeofPostId || ""}
                          invalid={errors.placeofPostId ? true : false}
                        >
                          <option value="0">-Select-</option>
                          {this.props.placeOfPostList &&
                            this.props.placeOfPostList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))}
                        </CSelect>
                        <FormFeedback>{errors.placeofPostId}</FormFeedback>
                      </CCol>
                    </CFormGroup> */}
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Status </CLabel>
                      </CCol>
                      <CCol xs="12" sm="12">
                        <CSelect
                          id="status"
                          name="status"
                          placeholder="Select"
                          onChange={(e) => this.handleStatus(e)}
                          value={this.state.value.status || ""}
                        >
                          <option value="0">Inactive</option>
                          <option value="1">Active</option>
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                    {/* end */}
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
                  <h4>Type of Facility/Office List</h4>
                </CCardHeader>
                  <CCardBody>
                    <Table
                      dataSource={this.props.typeFacilityList.sort((a, b) =>
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
                        title="Facility Type"
                        dataIndex="facilityType"
                        key="facilityType"
                      ></Table.Column>
                      <Table.Column
                        title="Type of post"
                        dataIndex="typeofPostId"
                        key="typeofPostId"
                        render={(text, user) => (
                          <>
                            {this.props.postList
                              .filter((data) => data.id === user.typeofPostId)
                              .map((id) => {
                                return id.name;
                              })}
                          </>
                        )}
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
    typeOfPositionList: state.apiadd.typeOfPositionList,
    placeOfPostList: state.apiadd.placeOfPostList,
    typeFacilityList: state.apiadd.typeFacilityList,
    postList: state.masterapi.postList,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      retrieveProgramType,
      retrieveTypeOfPositions,
      retrievePlaceOfPost,
      retrieveTypeOfFacility,
      retrievePost,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TypeofFacility);
