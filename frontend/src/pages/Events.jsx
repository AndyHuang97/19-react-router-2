import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

export default function EventsPage() {
  // fetch the data from closest component, any children of the component with
  // the loader can access the data (e.g. access directly inside EventsList)
  const data = useLoaderData();
  const events = data.events;

  if (data.isError) {
    return <p>{data.message}</p>;
  }

  return <EventsList events={events} />;
}

// loader functions can call browser API, but not hooks because we are not in a React component
export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events."}

    // React Router forwards the error to closest error page
    // Use a Response as a return object to have the status field so that ErroPage
    // can be a generic error handler
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    // const resData = await response.json();
    // return resData.events;

    // NOTE: loader accepts any kind of data, in particular it handles the Response
    // class that is normally returned by fetch() function, and it extracts and
    // returns the payload automatically for you
    return response;
  }
};
