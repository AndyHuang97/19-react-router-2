import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

export default function EventsPage() {
  // fetch the data from closest component, any children of the component with
  // the loader can access the data (e.g. access directly inside EventsList)
  const data = useLoaderData();
  const events = data.events

  return <EventsList events={events} />;
}

export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // ...
  } else {
    // const resData = await response.json();
    // return resData.events;

    // NOTE: loader accepts any kind of data, in particular it handles the Response
    // class that is normally returned by fetch() function, and it extracts and
    // returns the payload automatically for you
    return response;
  }
};
