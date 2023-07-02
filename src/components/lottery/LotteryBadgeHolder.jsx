import React from 'react';
import { Badge } from 'react-bootstrap';
// import PropTypes from 'prop-types'

export function LotteryBadgeHolder() {
  return (
    <div style={{ lineHeight: 1.8 }} className="h4 m-0">
      {['Free', 'Ongoing', 'Event Tickets'].map((tag, idx) => (
        <Badge className="me-2" key={idx} bg="secondary" pill>
          {tag}
        </Badge>
      ))}
    </div>
  );
}

LotteryBadgeHolder.propTypes = {};
