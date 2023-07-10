import React from 'react';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function LotteryItem(props) {
  const { isShowFooter } = props;

  return (
    <Card>
      <Card.Header className="bg-white border-0 py-3">
        <Stack direction="horizontal" gap={2}>
          <Image
            src="https://static.accupass.com/org/2305181130321522473685.jpg"
            roundedCircle
            width={30}
          />
          <h1 className="lead m-0">
            <strong>彌鷹文創</strong>
          </h1>
        </Stack>
      </Card.Header>

      <Card.Img
        src="https://static.accupass.com/eventbanner/2306161725198697152320.jpg"
        className="px-3"
      />
      <Card.Body>
        <Card.Title>東方水戰亞特蘭-夏日比基尼音樂祭</Card.Title>
        <Card.Text>2023.07.08 (六) 16:00 - 23:00</Card.Text>

        <Stack direction="horizontal" gap={2}>
          <Badge bg="primary" className="py-2">
            音樂
          </Badge>
          <Badge bg="primary" className="py-2">
            娛樂
          </Badge>
        </Stack>
      </Card.Body>
      {isShowFooter && (
        <Card.Footer>
          <Button
            style={{
              width: '100%',
            }}
          >
            Redeem
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}

LotteryItem.propTypes = {
  isShowFooter: PropTypes.bool,
};
