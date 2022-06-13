import React, { useState, useEffect } from 'react';
import '../App.css';
import { forwardRef } from 'react';



import AddBox from '@mui/icons-material/Add';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import axios from 'axios'
import { Alert } from '@mui/material';
import { Grid } from '@mui/material';
import MaterialTable from '@material-table/core';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


function validateEmail(email){
  const emailRegex = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return emailRegex.test(String(email).toLowerCase());
}

function isNumber(field){
    const digitRegex = /^\d+\.?\d*$/;
    return digitRegex.test(String(field));
}

export default function ManageBookingPage() {

  var columns = [
    {title: "id", field: "id", hidden: true}, 
    {title: "Movie Title", field: "movieName", editable: false},   
    {title: "First Name", field: "firstName"},
    {title: "Last Name", field: "lastName"},
    {title: "Email", field: "email"},
    {title: "Phone", field: "phone"},
    {title: "Seats", field: "seats"},
    {title: "Booking Date", field: "bookingDate"},
    {title: "Booking Status", field: "bookingStatus", lookup: {'BOOKED':'BOOKED', 'CANCELLED':'CANCELLED'}}
    
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  //for success updates
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessages, setSuccessMessages] = useState([])

  useEffect(() => { 
    axios.get(`http://localhost:8080/api/booking`) 
        .then(res => {     
            let data = res.data;
            data = data.map(record => {
              if (!record.bookingStatus) {
                record.bookingStatus = 'BOOKED';
              }
              return record;
            })
            setData(data)
         })
         .catch(error=>{
          setErrorMessages(["Not Able to fetch Booking Details. Please try again later"])
          setIserror(true)
         })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.firstName === ""){
      errorList.push("Please enter first name")
    }
    if(newData.lastName === ""){
      errorList.push("Please enter last name")
    }
    if(newData.email === "" || validateEmail(newData.email) === false){
      errorList.push("Please enter a valid email")
    }
    if(newData.phone === "" || isNumber(newData.phone) === false){
        errorList.push("Please enter a valid phone number")
    }
    if(newData.seats === "" || isNumber(newData.seats) === false){
        errorList.push("Please enter valid seats")
    }  
    if(newData.bookingDate === "" ){
        errorList.push("Please enter a valid booking date")
    }  

    if(errorList.length < 1){
      console.log("getting the booking id " + newData.id);  
      axios.put("http://localhost:8080/api/booking/"+newData.id, newData)
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
        setIsSuccess(true)
        setSuccessMessages(["Booking updated successfully !!!"])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        setIsSuccess(false)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      setIsSuccess(false)
      resolve()

    }
    
  }

  return (
    <div >
      
      <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={12}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
          <div>
            {isSuccess && 
              <Alert severity="success">
                  {successMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
            <MaterialTable
              title="Manage Bookings"
              columns={columns}
              data={data}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                      
                  }),
              }}
            />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
    </div>
  );
}