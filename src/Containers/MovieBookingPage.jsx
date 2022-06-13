import { useSearchParams } from "react-router-dom";
import { MovieBookingForm } from "../Components/MovieBookingForm";

export default function MovieBookingPage() {
const [search] = useSearchParams();
const title = search.get("title");    

  return ( 
    <div>
      <MovieBookingForm title = {title}/>
    </div>
  );
}