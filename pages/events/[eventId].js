import React, { Fragment } from 'react';
import Head from 'next/head';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const {
    params: { eventId }
  } = context;
  const event = await getEventById(eventId);

  return {
    props: {
      event
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    //fallback: false // because I specified all events possible
    // fallback: true // there are more pages than the ones prerendered
    fallback: 'blocking' // won´t render until get static props has finished
  };
}

export default EventDetailPage;
