import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { Modal, Card } from "antd";
import "./Login.css";
import { data } from "jquery";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
      email:'',
      password: "",},
      login: false,
      token: null,
      modalShow: false,
      candidateType: "",
      type: 0,
      errorMsg:false,
      typeList: [
        { id: "1", name: "Candidate" },
        { id: "2", name: "National" },
        { id: "3", name: "State" },
        { id: "4", name: "District" },
      ],
    };
  }
handleChange=(e)=>{
  this.setState({data:{
    ...this.state.data,
    [e.target.name]:e.target.value
  }})
}
  onSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}Users/login`,this.state.data)
    .then((resp) => {
      console.log(resp)
      if(resp.status===200){
      if (resp.data.user.roleId===1) {
      localStorage.setItem("access_role", "admin_role");
      this.props.history.push("/Dashboard");
    } else if (
      resp.data.user.roleId===2
    ) {
      localStorage.setItem("access_role", "state_role");
      this.props.history.push("/StateDashboard");
    } else if (
      resp.data.user.roleId===3
    ) {
      localStorage.setItem("access_role", "district_role");
      this.props.history.push("DistrictDashboard");
    } 
    // else if (
    //   this.state.email === "candidate@hrh.com" &&
    //   this.state.password === "candidate123"
    // ) {
    //   localStorage.setItem("access_role", "candidate_role");
    //   this.props.history.push("CandidateDashboard");
    // } 
  }
    else {
      console.log(resp,"error")
      this.setState({errorMsg:true})
      setTimeout(() => {
        this.setState({
          errorMsg: false,
        });
      }, 10000);
    }
    }).catch((error) => {
      console.log(error.message);
      this.setState({errorMsg:true})
      setTimeout(() => {
        this.setState({
          errorMsg: false,
        });
      }, 10000);
    });
  };
  forGot = () => {
    this.props.history.push("/Confirm");
  };
  render() {
    return (
      <div>
        {
          !this.state.login ? (
            <div className="c-app c-default-layout flex-row align-items-center">
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md="8">
                    <CCardGroup>
                      <CCard className="p-4">
                        <CCardBody>
                        {this.state.errorMsg ? (
                  <div className="text-danger">Email or Password is incorrect</div>
                ):null}
                          <CForm onSubmit={this.onSubmit}>
                            <h1>Login</h1>
                            <p className="text-muted">
                              Sign In to your account
                            </p>
                            {/* <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-pencil" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CSelect
                                id="type"
                                placeholder="Select"
                                onChange={(event) =>
                                  this.setState({ type: event.target.value })
                                }
                                required
                              >
                                <option value="0">-Select-</option>
                                {this.state.typeList &&
                                  this.state.typeList.map((user) => (
                                    <option key={user.id} value={user.id}>
                                      {user.name}
                                    </option>
                                  ))}
                              </CSelect>
                            </CInputGroup> */}
                            <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={this.state.data.email||""}
                                onChange={this.handleChange }
                                required
                              />
                            </CInputGroup>
                            <CInputGroup className="mb-4">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.data.password||""}
                                onChange={this.handleChange}
                                autoComplete="current-password"
                                required
                              />
                            </CInputGroup>
                            <CRow>
                              <CCol xs="6">
                                {/* <Link to="/Dashboard"> */}
                                <CButton
                                  color="primary"
                                  className="px-4"
                                  // onClick={this.login}
                                  type="submit"
                                >
                                  Login
                                </CButton>
                                {/* </Link> */}
                              </CCol>
                              <CCol xs="6" className="text-right">
                                <CButton
                                  color="link"
                                  className="px-0"
                                  onClick={this.forGot}
                                >
                                  Forgot password?
                                </CButton>
                              </CCol>
                            </CRow>
                          </CForm>
                          <CRow>
                            <p style={{ padding: ".5rem" }}>
                              First Users Please Sign Up/Register first."
                            </p>
                          </CRow>
                        </CCardBody>
                      </CCard>
                      <CCard
                        className="text-white bg-primary py-5 d-md-down-none"
                        style={{ width: "44%" }}
                      >
                        <CCardBody className="text-center">
                          <div>
                            <h2>Sign up</h2>
                            <p>Welcome to HRH Portal</p>
                            <p>First Users Please Sign Up/Register first."</p>
                            {/* <Link to="/register"> */}
                            <CButton
                              onClick={() => this.setState({ modalShow: true })}
                              color="primary"
                              className="mt-3"
                              active
                              tabIndex={-1}
                            >
                              Register Now!
                            </CButton>
                            {/* </Link> */}
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCardGroup>
                  </CCol>
                </CRow>
              </CContainer>
            </div>
          ) : (
            this.props.history.push("/Dashboard")
          )
          // <a href="file:///F:/React-system/poc-web-react/src/views/formbuilder/Drag.html">drag and drop</a>
        }

        <Modal
          width={1000}
          centered
          visible={this.state.modalShow}
          onOk={() => this.setState({ modalShow: false })}
          onCancel={() => this.setState({ modalShow: false })}
          footer={[]}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Card
              style={{
                width: 200,
                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
              cover={
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",

                    marginTop: "10px",
                  }}
                  alt="example"
                  src={`${process.env.PUBLIC_URL}avatars/Surgeon.jpg`}
                />
              }
            >
              <p style={{ marginBottom: 0, fontWeight: "bold" }}>Specialist Doctor</p>
              <Link to="/register/specialist">
                <CButton
                  // onClick={() => {
                  //   this.setState({ candidateType: "specialist" });
                  // }}
                  color="primary"
                  className="mt-3"
                  active
                  tabIndex={-1}
                >
                  <CIcon name="cil-pencil" className="text-white" />
                  Register
                </CButton>
              </Link>
            </Card>
            <Card
              style={{
                width: 200,
                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
              cover={
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",

                    marginTop: "10px",
                  }}
                  alt="example"
                  src={`${process.env.PUBLIC_URL}avatars/MedicalOfficer.jpg`}
                />
              }
            >
              <p style={{ marginBottom: 0, fontWeight: "bold" }}>
                {/* Medical Officer */}
                Doctors
              </p>
              <Link to="/register/medical_officer">
                <CButton color="primary" className="mt-3" active tabIndex={-1}>
                  <CIcon name="cil-pencil" className="text-white" />
                  Register
                </CButton>
              </Link>
            </Card>
            <Card
              style={{
                width: 200,
                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
              cover={
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",

                    marginTop: "10px",
                  }}
                  alt="example"
                  src={`${process.env.PUBLIC_URL}avatars/Nurse.jpg`}
                />
              }
            >
              <p style={{ marginBottom: 0, fontWeight: "bold" }}> Nurse</p>
              <Link to="/register/nurse">
                <CButton color="primary" className="mt-3" active tabIndex={-1}>
                  <CIcon name="cil-pencil" className="text-white" />
                  Register
                </CButton>
              </Link>
            </Card>
            <Card
              style={{
                width: 200,
                boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
              cover={
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",

                    marginTop: "10px",
                  }}
                  alt="example"
                  src={`${process.env.PUBLIC_URL}avatars/Paramedic.jpg`}
                />
              }
            >
              <p style={{ marginBottom: 0, fontWeight: "bold" }}>Paramedics</p>
              <Link to="/register/paramedics">
                <CButton color="primary" className="mt-3" active tabIndex={-1}>
                  <CIcon name="cil-pencil" className="text-white" />
                  Register
                </CButton>
              </Link>
            </Card>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Login);
