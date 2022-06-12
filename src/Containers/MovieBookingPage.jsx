import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MovieBookingForm } from "../Components/MovieBookingForm";
import { TextField } from "../Components/TextField";



export default function MovieBookingPage() {
  
  return ( 
    <div>
      <MovieBookingForm />
    </div>
  );
}