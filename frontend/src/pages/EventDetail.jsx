import { useLoaderData, useParams } from "react-router-dom";
import EventItem from "../components/EventItem"
export default function EventDetailPage() {
  const data = useLoaderData();
  
  return (
    <EventItem event={data.event}/>
  );
}

export async function loader({request, params}) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id)

  if (!response.ok){
    throw  new Response(JSON.stringify({ message: "Could not fetch details for selected event." }), {
      status: 500,
    })
  } else {
    return response
  }
  
}
