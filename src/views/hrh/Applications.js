import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  // CInput,
  CRow,
  // CSelect,
} from "@coreui/react";
// import Pdf from "react-to-pdf";
import axios from "axios";
import { withRouter } from "react-router";
const config=localStorage.getItem('token')
// const ref = React.createRef();
 class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[]
    };
  }



  StoreCollector=(id)=>{
    // alert(id)
    localStorage.setItem('document',JSON.stringify(id));
    this.props.history.push('/hrh/PersonalInformation');
  }

  componentDidMount() {
    axios({
      url: `${process.env.REACT_APP_API_URL}Applications`,
      method: "GET",
    }).then((response) => {
      this.setState({users: response.data});
    });
    // axios.get("ApplicationForms",
    //   {
    //     headers: {
    //       "Authorization":`Bearer ${config}`,
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(this.state),
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     let data = res.data;
    //     console.log(data);
    //     this.setState({ users: data });
    //   });
  }
  render() {
    return (
      <div>
        {/* <Pdf targetRef={ref} filename="Applications.pdf">
        {({ toPdf }) => <button onClick={()=>this.props.history.push("/hrh/PdF")}>Generate Pdf</button>}
      </Pdf> */}
        <div>
          <CRow>
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                  <h4>Applications</h4>
                </CCardHeader>
                <CCard>
                  <CCardBody>
                    <table className="table striped bordered">
                      <tr>
                        <th>
                          <b>Registration No.</b>
                        </th>
                        <th>
                          <b>Name</b>
                        </th>
                        <th>
                          <b>Email</b>
                        </th>
                        <th>
                          <b>State</b>
                        </th>
                        <th>
                          <b>District</b>
                        </th>
                        <th>
                          <b>Action</b>
                        </th>
                      </tr>
                      {this.state.users.length > 0 ? (
                        this.state.users.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td>{user.registrationNo}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.statePref1}</td>
                              <td>{user.districPref1}</td>
                              <td>
                                <CButton
                                  style={{ backgroundColor: "blue" }}
                                  onClick={() => this.StoreCollector(user.id)}
                                >
                                  <b style={{ color: "aquamarine" }}>Open</b>
                                </CButton>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5">Loading...</td>
                        </tr>
                      )}
                    </table>
                    {/* <CButton onClick={()=>this.props.history.push("/hrh/PdF")}>Generate Pdf</CButton> */}
                  </CCardBody>
                </CCard>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    );
  }
}

export default withRouter(Applications);

//  export class Example extends React.PureComponent {
//   render() {
//     return (
//       <div>
//       <ReactToPrint
//         trigger={() => <button>Print this out!</button>}
//         content={() => this.componentRef}
//       />
//       <Applications ref={(el) => (this.componentRef = el)} />
//     </div>
//     );
//   }
// }
// export default withRouter(Example);
