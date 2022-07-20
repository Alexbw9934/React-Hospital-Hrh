// import React, { Component } from 'react'
// import AsyncSelect from 'react-select';
// const config = localStorage.getItem("token");
// export class ReadSelectAsync extends Component {
//   constructor(props){
//     super(props);
//     this.state={
//       selectedOption:{}
//     }
//   }

//   fetchData=(inputValue,Callback)=>{
//     debugger ;
//     if (!inputValue) {
//      Callback([]);
//     }else{
//       setTimeout(() => {
//         console.log("hello")
//       fetch('http://5.9.111.198:13880/api/currencies?id='+ inputValue,{
//         method:"Get",
//         headers: {
//           "Authorization":`Bearer ${config}`,
//           "Accept": "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(this.state),
//       }).then((resp)=>{
//         console.log(resp)
//         return resp.jsom()
//       }).then((data)=>{
//         const tempArray=[];
//         data.forEach(e => {
//            tempArray.push({lable:`${e.name}`,value:e.id});
//         });
//         Callback(tempArray);
//         // this.setState({suggestion:data})
//       })
//       .catch((error)=>{
//         console.log(error,"catch the loop")
//       })
//       },[]);
//     }
//   }
//   onSearchChange=(selectOption)=>{
//     if (selectOption) {
//     this.setState({
//       selectOption
//     });
//     }
//   }
//   render() {
//     const data=this.state
//     console.log(data)
//     return (
//       <div>
//         <h3>welcome to AsyncSelect</h3>
//         <AsyncSelect
//         value={this.state.SelectedOption}
//         loadOptions={this.fetchData}
//         palceholder="Admin Name"
//         className="venueadminControl"
//         onChange={(e)=>{
//           this.onSearchChange(e);
//         }}
//         defaultOptions={false}
//         />

//       </div>
//     )
//   }
// }

// export default ReadSelectAsync
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
const config = localStorage.getItem("token");
function  ReadSelectAsync() {
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }

  // load options using API call
  const loadOptions = (inputValue) => {
    console.log("hello")
    const data={selectedValue}
    return fetch(`http://5.9.111.198:13880/api/currencies?id=${inputValue}`,{
      headers: {
        "Authorization":`Bearer ${config}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(res =>{
      // console.log(res)
      return res.json()
    });
  };

  return (
    <div className="App">
      <h3>React-Select Async Dropdown - <a href="https://www.cluemediator.com/" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3>
      <pre>Input Value: "{inputValue}"</pre>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={e => e.title}
        getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre>
    </div>
  );
}

export default  ReadSelectAsync;
