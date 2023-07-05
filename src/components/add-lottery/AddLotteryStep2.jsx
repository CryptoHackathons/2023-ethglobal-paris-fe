import React, { useState } from 'react';
import { Button, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddLoteeryRewardSetter from './general/AddLoteeryRewardSetter';
// import PropTypes from 'prop-types';

export function AddLotteryStep2() {
  const navigate = useNavigate();
  const emptyReward = {
    photoPath: '',
    Title: '',
    Description: '',
    RewardAmount: 0,
  };
  const [rewards, setRewards] = useState([emptyReward]);

  const handleDeleteReward = (id) => {
    setRewards((prev) => {
      return prev.filter((_, index) => index !== id);
    });
  };

  const handleAddReward = () => {
    setRewards((prev) => {
      return [...prev, emptyReward];
    });
  };

  return (
    <>
      <div className="d-grid gap-4">
        <Accordion defaultActiveKey="0" alwaysOpen>
          {rewards.map((r, idx) => (
            <>
              <Accordion.Item eventKey={idx}>
                <Accordion.Header>Reward {idx + 1}</Accordion.Header>
                <AddLoteeryRewardSetter
                  idx={idx}
                  reward={r}
                  onDeleteReward={() => handleDeleteReward(idx)}
                />
              </Accordion.Item>
            </>
          ))}
        </Accordion>
        <Button onClick={() => handleAddReward()}> Add Prize</Button>
        <div className="d-grid gap-1 w-50 mx-auto">
          <Button
            onClick={() => navigate('../lottery-info')}
            variant="secondary"
          >
            Back
          </Button>
          <Button onClick={() => navigate('../missions')}>Next</Button>
        </div>
      </div>
    </>
  );
}

AddLotteryStep2.propTypes = {};
