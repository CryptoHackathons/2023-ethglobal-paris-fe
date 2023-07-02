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
        src="https://static.accupass.com/eventbanner/2306261712589032454360.jpg"
      />
      <Row>
        <Col md={7} className="px-4 py-5">
          <div className="d-grid gap-5">
            <div id="lottery-title">
              <div className="gap-4 d-flex align-items-center mb-4">
                <Image
                  className="border"
                  roundedCircle
                  width={64}
                  src="https://static.accupass.com/org/2105221437371944440174.jpg"
                />
                <h4 className="m-0 fw-bold">Skyline Film</h4>
              </div>
              <div>
                <h3 className="fw-bold">
                  Skyline Film 屋頂電影院 7月台北屋頂放映 7/21(Fri) - 7/23(Sun)
                  贈票活動
                </h3>
                <p className="m-0">
                  08-07-2023 07:00 ~ 20-07-2023 07:00 (GMT+2)
                </p>
              </div>
            </div>
            <div id="lottery-mission">
              <div className="d-flex align-items-center gap-3 mb-3">
                <h3 className="fw-bold m-0 flex-fill">Missions</h3>
                <p className="m-0">Finished (1/2)</p>
              </div>
              <LotteryMissionList />
            </div>
            <div id="lottery-description">
              <h3 className="fw-bold mb-3">Description</h3>
              <p>
                7月的盛夏，沒什麼比在屋頂喝杯冰涼透心的啤酒，吃著香嫩多汁的美式燻肉，伴著徐徐微風與好電影，還要來得痛快。穿越時空與平行宇宙，經典中的經典，還有讓你捧腹大笑的絕妙好戲。台北7月屋頂，滿足你對好電影的所有想像。
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
                Rewards <Badge pill>6</Badge>
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
