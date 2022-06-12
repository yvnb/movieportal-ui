import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import DateTimePicker from './DateTimePicker';
import Textfield from './TextField';
import Button from './Button';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    formWrapper: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(8),
    },
  }));

  const BOOKING_FORM_INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bookingDate: '',
    seats: ''
  }; 

  const BOOKING_FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string()
      .required('Required'),
    lastName: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email.')
      .required('Required'),
    phone: Yup.number()
      .integer()
      .typeError('Please enter a valid phone number')
      .required('Required'),
    seats: Yup.number()
        .integer()
        .typeError('Please enter Valid Seats')
        .min(1, 'Min value 1')
        .max(10, 'Max value 10')
        .required('Required'),
    bookingDate: Yup.date()
      .required('Required'),

  });

  export const MovieBookingForm = () => {
    const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>

            <Formik
              initialValues={{
                ...BOOKING_FORM_INITIAL_STATE
              }}
              validationSchema={BOOKING_FORM_VALIDATION}
              onSubmit={values => {
                console.log(JSON.stringify(values, null, 2));
                const bookingData = JSON.stringify(values, null, 2);
                axios.post('http://localhost:8080/api/booking', bookingData, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                }
                  )
                  .then((response) => {
                    console.log(response);
                  }, (error) => {
                    console.log(error);
                  });
              }}
            >
              <Form>

                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <Typography>
                      Booking details
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                      name="firstName"
                      label="First Name"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                      name="lastName"
                      label="Last Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="email"
                      label="Email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="phone"
                      label="Phone"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <DateTimePicker
                      name="bookingDate"
                      label="Booking Date"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="seats"
                      label="Number Of Seats"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button>
                      Book Now
                    </Button>
                  </Grid>


                </Grid>

              </Form>
            </Formik>

          </div>
        </Container>
      </Grid>
    </Grid>
  );
};  
