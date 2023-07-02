import React from 'react';
import { Badge, Button, Col, Image, Row } from 'react-bootstrap';
import {
  LotteryAttendeeList,
  LotteryBadgeHolder,
  LotteryCounter,
  LotteryMissionList,
  LotteryRewardList,
} from '../components/lottery';
// import PropTypes from 'prop-types';

export function LotteryPage() {
  return (
    <>
      <Image
        className="w-100 object-fit-cover"
        style={{ aspectRatio: '3.2 / 1' }}
        src="https://dummyimage.com/2560x720/d9d9d9/000000&text=banner"
      />
      <Row>
        <Col md={7} className="px-4 py-5">
          <div className="d-grid gap-5">
            <div id="lottery-title">
              <div className="gap-4 d-flex align-items-center mb-4">
                <Image
                  roundedCircle
                  width={64}
                  src="https://dummyimage.com/128x128/d9d9d9/000000&text=thumbnail"
                />
                <h4 className="m-0 fw-bold">Lottery Host</h4>
              </div>
              <div>
                <h3 className="fw-bold">Lottery ABCDE</h3>
                <p className="m-0">
                  08-07-2023 07:00 ~ 22-07-2023 07:00 (GMT+2)
                </p>
              </div>
            </div>
            <div id="lottery-mission">
              <div className="d-flex align-items-center gap-3 mb-3">
                <h3 className="fw-bold m-0 flex-fill">Mission</h3>
                <p className="m-0">Finished (2/2)</p>
              </div>
              <LotteryMissionList />
            </div>
            <div id="lottery-description">
              <h3 className="fw-bold mb-3">Description</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et
                ligula cursus, tempor ante egestas, dignissim elit. Vivamus
                tellus orci, facilisis eget erat sit amet, vestibulum malesuada
                mauris. Morbi eu pretium turpis. Cras consequat ullamcorper
                interdum. Proin finibus cursus fringilla. Vestibulum efficitur
                rutrum laoreet. Donec placerat purus vel facilisis elementum.
                Pellentesque pharetra augue vitae leo accumsan iaculis. Quisque
                imperdiet velit vitae orci fermentum euismod. Cras non ex quis
                leo ornare sagittis nec non nisi. Nam pellentesque tincidunt
                efficitur. Sed id quam eget nisi aliquet auctor eu non neque.
                Aliquam luctus lectus at eleifend pulvinar. Sed gravida auctor
                orci, quis auctor mi iaculis quis. Etiam nulla elit, consequat
                vel ipsum sit amet, accumsan malesuada velit.
              </p>
            </div>
            <div id="lottery-attendee">
              <div className="d-flex align-items-center gap-3 mb-3">
                <h3 className="fw-bold m-0 flex-fill">Attendee</h3>
                <p className="m-0">89225 Users</p>
              </div>
              <LotteryAttendeeList />
            </div>
          </div>
        </Col>
        <Col md={5} className="border-start border-dark px-4 py-5">
          <div className="d-grid gap-5">
            <div id="lottery-info-and-action" className="d-grid gap-4">
              <LotteryBadgeHolder />
              <Button>Draw</Button>
              <LotteryCounter />
            </div>
            <div id="lottery-rewards">
              <h3 className="fw-bold mb-3">
                Rewards <Badge pill>3</Badge>
              </h3>
              <LotteryRewardList />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

LotteryPage.propTypes = {};
