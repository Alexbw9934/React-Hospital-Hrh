import React from "react";
 import { withRouter } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
 // CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  //history
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { isEmail } from "validator";
import { FormFeedback } from "reactstrap";

class Confirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    data: {
      userName: "",
      email: "",
      password: "",
       newPassword: "",
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
    if (data.newPassword==="") errors.newPassword = "Passwords must match.";

    return errors;
  };

  handleSubmit = (e) => {
    alert("hellos")
    e.preventDefault();

    const { data } = this.state;

    const errors = this.validate();

    if (Object.keys(errors).length === 0) {
      console.log(data);
      //Call an api here
      fetch("http://5.9.111.198:13880/api/Users/change-password", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      }).then((res) => {
        res.json().then((result) => {
          // message: response.data.message;
          // successful: true;
          console.log("result", result);
          this.props.history.push("/");
        });
      });
      //Resetting the form
      this.setState(this.getInitialState());
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;
    // console.log(data)
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={this.handleSubmit}>
                    <h1>Forget Password</h1>
                    <p className="text-muted">Create your New Password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
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
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        id="email"
                        name="email"
                        type="text"
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
                        autoComplete="password"
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
                       id="newPassword"
                       name="newPassword"
                         type="password"
                         placeholder="New Password"
                         autoComplete="New Password"
                         // onChange={(event)=> this.setState({ password: event.target.value })  }
                         onChange={this.handleChange}
                         invalid={errors.newPassword ? true : false}
                       /><br/>
                       <FormFeedback>{errors.newPassword}</FormFeedback>
                    </CInputGroup>
                    {/* <Link to="/Confirm"> */}
                    <CButton color="success" block type="submit">
                      Change Password
                    </CButton>
                    <CButton color="success" block onClick={()=> this.props.history.push("/Register")}>
                      Click to Registration
                    </CButton>
                    {/* </Link> */}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}
export default withRouter(Confirm);
