import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import classes from './event-list.module.css';

const EventList = ({ items }) => {
  return (
    <div>
      <ul className={classes.list}>
        {items.map((item) => (
          <EventItem
            key={item.id}
            id={item.id}
            title={item.title}
            location={item.location}
            date={item.date}
            image={item.image}
          />
        ))}
      </ul>
    </div>
  );
};

EventList.propTypes = {
  items: PropTypes.array.isRequired
};

export default EventList;
