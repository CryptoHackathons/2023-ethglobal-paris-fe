import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { AddLotteryMissionList, AddLotteryRewardList } from './general';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

export function AddLotteryStep4() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-grid gap-5">
        <Image
          className="w-100 object-fit-cover"
          src="https://static.accupass.com/eventbanner/2306261712589032454360.jpg"
        />
        <div id="lottery-title">
          <h3 className="fw-bold">
            Skyline Film 屋頂電影院 7月台北屋頂放映 7/21(Fri) - 7/23(Sun)
            贈票活動
          </h3>
          <p className="m-0">08-07-2023 07:00 ~ 20-07-2023 07:00 (GMT+2)</p>
        </div>
        <div id="lottery-rewards">
          <h3 className="fw-bold mb-3">Rewards</h3>
          <AddLotteryRewardList />
        </div>
        <div id="lottery-mission">
          <h3 className="fw-bold mb-3">Missions</h3>
          <AddLotteryMissionList />
        </div>
        <div id="lottery-description">
          <h3 className="fw-bold mb-3">Description</h3>
          <p>
            7月的盛夏，沒什麼比在屋頂喝杯冰涼透心的啤酒，吃著香嫩多汁的美式燻肉，伴著徐徐微風與好電影，還要來得痛快。穿越時空與平行宇宙，經典中的經典，還有讓你捧腹大笑的絕妙好戲。台北7月屋頂，滿足你對好電影的所有想像。
          </p>
        </div>
        <div className="d-grid gap-1 w-50 mx-auto">
          <Button onClick={() => navigate('../missions')} variant="secondary">
            Back
          </Button>
          <Button>Submit</Button>
        </div>
      </div>
    </>
  );
}

AddLotteryStep4.propTypes = {};
