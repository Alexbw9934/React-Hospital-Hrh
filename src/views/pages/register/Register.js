import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link, withRouter } from "react-router-dom";
import { isEmail,isMobilePhone } from "validator";
import { FormFeedback } from "reactstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    data: {
      userName: [],
      email: [],
      password: [],
      confirmPassword: [],
      candidateType: this.props.match.params.candidateType,
      mobileNumber:[],
    },
    errors: {},
  });

  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };

  validate = () => {
    const { data } = this.state;
    let errors = {};

    //    if (data.firstName === '') errors.firstName = 'First Name can not be blank.';
    if (data.userName === "") errors.userName = "User Name can not be blank.";
    if (!isEmail(data.email)) errors.email = "Email must be valid.";
    if (data.email === "") errors.email = "Email can not be blank.";
    if (data.password === "") errors.password = "Password must be valid.";
    if (data.confirmPassword != data.password)
      errors.confirmPassword = "Passwords must match.";
    // if (
    //   this.props.match.params.candidateType != "specialist" ||
    //   this.props.match.params.candidateType != "medical_officer" ||
    //   this.props.match.params.candidateType != "nurse" ||
    //   this.props.match.params.candidateType != "paramedics"
    // ) {
    //   errors.candidateType =
    //     "Candidate Type is not valid, go to Login page and select Candidate Type by clicking Register.";
    // }
    if(!isMobilePhone(data.mobileNumber)) errors.mobileNumber = "Mobile Number is nt valid"

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { data } = this.state;
    const errors = this.validate();

    console.log("DATA ", data);
    console.log("ERRORS ", errors, Object.keys(errors).length);

    if (Object.keys(errors).length === 0) {
      console.log(data);
      //Call an api here
      fetch("http://5.9.111.198:13880/api/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((res) => {
          console.log("DATA ", res);
          res.json().then((result) => {
            // message: response.data.message;
            // successful: true;
            console.log("result", result);
            this.props.history.push("/");
          });
        })
        .catch((err) => console.log("Errors ", err));
      //Resetting the form
      this.setState(this.getInitialState());
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Name of the candidate"
                        autoComplete="username"
                        id="userName"
                        name="userName"
                        onChange={this.handleChange}
                        invalid={errors.userName ? true : false}
                        value={data.userName}
                      />
                      <FormFeedback>{errors.userName}</FormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-phone" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="Number"
                        placeholder="Mobile Number"
                        autoComplete="mobileNumber"
                        id="mobileNumber"
                        name="mobileNumber"
                        onChange={this.handleChange}
                        invalid={errors.mobileNumber ? true : false}
                        value={data.mobileNumber}
                      />
                      <FormFeedback>{errors.mobileNumber}</FormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        // onChange={(event)=> this.setState({ email: event.target.value })  }
                        onChange={this.handleChange}
                        invalid={errors.email ? true : false}
                        value={data.email}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        // onChange={(event)=> this.setState({ password: event.target.value })  }
                        onChange={this.handleChange}
                        invalid={errors.password ? true : false}
                        value={data.password}
                      />
                      <br />
                      <FormFeedback>{errors.password}</FormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="confirmPassword"
                        autoComplete="confirmPassword"
                        // onChange={(event)=> this.setState({ password: event.target.value })  }
                        onChange={this.handleChange}
                        invalid={errors.confirmPassword ? true : false}
                      />
                      <br />
                      <FormFeedback>{errors.confirmPassword}</FormFeedback>
                    </CInputGroup>
                    {/* <Link to="/Confirm"> */}
                    <CButton color="success" block type="submit">
                      Create Account
                    </CButton>
                    {/* </Link> */}
                  </CForm>
                </CCardBody>
                <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" sm="6">
                      <Link to="/login">
                        <CButton className="btn-facebook mb-1" block>
                          <span>Login</span>
                        </CButton>
                      </Link>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <CButton className="btn-twitter mb-1" block>
                        <span>twitter</span>
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default withRouter(Register);
