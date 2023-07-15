import React from 'react';
// import Image from 'react-bootstrap/Image';
// import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
// import Stack from 'react-bootstrap/Stack';
// import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { LotteryPropType } from '../../model/type';
import { getDemoDateString } from '../../utils/functions';
import { Link } from 'react-router-dom';
import RedeemButton from './RedeemButton';

function LotteryItem(props) {
  const { lottery, isShowFooter } = props;

  return (
    <Link to={`/lottery/${lottery.id}`}>
      <Card>
        {/* <Card.Header className="bg-white border-0 py-3">
        <Stack direction="horizontal" gap={2}>
          <Image src={lottery.bannerUrl} roundedCircle width={30} />
          <h1 className="lead m-0">
            <strong>{lottery.title}</strong>
          </h1>
        </Stack>
      </Card.Header> */}

        <Card.Img src={lottery.bannerUrl} className="px-3" />
        <Card.Body>
          <Card.Title>{lottery.title}</Card.Title>
          <Card.Text>
            {getDemoDateString(lottery.startTime)} ~{' '}
            {getDemoDateString(lottery.endTime)} (GMT+2)
          </Card.Text>

          {/* <Stack direction="horizontal" gap={2}>
          <Badge bg="primary" className="py-2">
            音樂
          </Badge>
          <Badge bg="primary" className="py-2">
            娛樂
          </Badge>
        </Stack> */}
        </Card.Body>
        {isShowFooter && (
          <Card.Footer>
            <RedeemButton lotteryId={lottery.id} />
          </Card.Footer>
        )}
      </Card>
    </Link>
  );
}

LotteryItem.propTypes = {
  lottery: LotteryPropType,
  isShowFooter: PropTypes.bool,
};

export default LotteryItem;
