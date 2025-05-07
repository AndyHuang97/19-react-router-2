import { useLoaderData, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventsPage() {
  // fetch the data from closest component, any children of the component with
  // the loader can access the data (e.g. access directly inside EventsList)
  const { events } = useLoaderData();

  return (
    // Suspense: show a fallback while waiting children data
    // Await: wait for events Promise to be resolved
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

async function loadEvents() {
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
    // return response;

    // with defer, the payload is not extracted. Need to do it manually:
    const resData = await response.json();
    return resData.events;
  }
}

// loader functions can call browser API, but not hooks because we are not in a React component
export const loader = async () => {
  // NOTE: to defer, return an object with Promises
  return {
    events: loadEvents(), // events is a promise!
  };
};
