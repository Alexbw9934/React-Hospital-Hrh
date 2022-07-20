// import React, { Component } from "react";
// import {
//   // CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   // CInput,
//   CRow,
//   // CSelect,
// } from "@coreui/react";
// import axios from "axios";
// const config=localStorage.getItem('token')

// // const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWIiLCJqdGkiOiI2MmFjNWE1Yy00NTA1LTQ2OGYtYWRkYS1kMmUwZDlkMDVhYTYiLCJleHAiOjE2MjIxOTMwODYsImlzcyI6Imh0dHA6Ly8qOjUwMDAiLCJhdWQiOiJVc2VyIn0.4NjIX2KdysrZyx_MW0ScyFb7ph0s2ekVCEMCuivDXvo";
// export class Country extends Component {
//   constructor() {
//     super();
//     this.state = {
//       users:{},

//     };
//   }
//   componentDidMount() {
//     console.log(config)
//     axios.get("http://5.9.111.198:13880/api/SalesChannelTypes"
//     ,
//       {
//         headers: {
//           "Authorization":`Bearer ${config}`,
//           "Accept": "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(this.state),
//       }
//     )
//       .then((res) =>{
//         console.log(res)
//         let data=res.data;
//         console.log(data)
//         this.setState({users:data})
//       })

//   }
//   render() {
//     return (
//       <div>
//         <CRow>
//           <CCol xs="12" sm="12">
//             <CCard>
//               <CCardHeader>
//                 <h4>Country</h4>
//               </CCardHeader>
//               <CCard >
//                 <CCardBody >
//                   <table className="table striped bordered">
//                     <tr>
//                     <th>
//                         <b>ID</b>
//                       </th>
//                       <th>
//                         <b>Name</b>
//                       </th>


//                       {/* <th>
//                         <b>Phone</b>
//                       </th> */}

//                       {/* <th><b>Status</b></th>
//                       <th><b>Status</b></th> */}
//                     </tr>
//                     {this.state.users.length > 0 ? (
//                       this.state.users.map((user, index) => {
//                         return (
//                           <tr key={index}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>

//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan="5">Loading...</td>
//                       </tr>
//                     )}
//                   </table>
//                 </CCardBody>
//               </CCard>
//             </CCard>
//           </CCol>
//         </CRow>
//       </div>
//     );
//   }
// }

// export default Country;
