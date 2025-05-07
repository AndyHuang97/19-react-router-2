import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  // fetch the data from closest component
  const events = useLoaderData();

  return (
    <EventsList events={events} />
  );
}

export default EventsPage;