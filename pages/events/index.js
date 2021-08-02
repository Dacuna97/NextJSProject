import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';

import { getAllEvents } from '../../dummy-data';

function AllEventsPage() {
  const router = useRouter();

  const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
