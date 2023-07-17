import React, { useCallback, useState } from 'react';
import { Button, Accordion, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddLotteryRewardSetter from './general/AddLotteryRewardSetter';
import { useAtom } from 'jotai';
import { addLotteryAtom } from '../../model/addLottery';
// import PropTypes from 'prop-types';

const EMPTY_REWARD = {
  imageURL: '',
  title: '',
  description: '',
  quantity: 0,
};

export function AddLotteryStep2() {
  const navigate = useNavigate();
  const [rewardsDraft, setRewardsDraft] = useAtom(
    addLotteryAtom.lotteryDraft.rewardsDraft
  );

  const [validated, setValidated] = useState(false);
  const [rewards, setRewards] = useState(rewardsDraft.contents);

  const handleDeleteReward = useCallback((id) => {
    setRewards((prev) => {
      return prev.filter((_, index) => index !== id);
    });
  }, []);

  const handleAddReward = useCallback(() => {
    setRewards((prev) => {
      return [...prev, { ...EMPTY_REWARD }];
    });
    setValidated(false);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      const form = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();
      setValidated(true);

      if (form.checkValidity() === false) return;

      const fd = new FormData(form);
      const r = rewards.map((r, idx) => ({
        ...r,
        imageURL: fd.get(`imageURL.${idx}`),
        title: fd.get(`title.${idx}`),
        description: fd.get(`description.${idx}`),
        quantity: parseInt(fd.get(`quantity.${idx}`)),
      }));

      console.log('data from rewards form:', r);

      setRewardsDraft((prev) => ({
        ...prev,
        totalQuantity: r.reduce((i, acc) => i + acc.quantity, 0),
        contents: [...r],
      }));
      navigate('../missions');
    },
    [navigate, rewards, setRewardsDraft]
  );

  return (
    <Card>
      <Card.Body>
        <div className="d-grid gap-4">
          <Accordion defaultActiveKey="0">
            <Form
              id="addLottery.rewards"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              {rewards.map((r, idx) => (
                <Accordion.Item key={idx} eventKey={idx.toString()}>
                  <Accordion.Header>Reward {idx + 1}</Accordion.Header>
                  <AddLotteryRewardSetter
                    idx={idx}
                    isLast={rewards.length === 1 && idx === 0}
                    reward={r}
                    onDeleteReward={() => handleDeleteReward(idx)}
                  />
                </Accordion.Item>
              ))}
            </Form>
          </Accordion>
          <Button onClick={handleAddReward}>Add Prize</Button>
          <div className="d-grid gap-1 w-50 mx-auto">
            <Button
              onClick={() => navigate('../lottery-info')}
              variant="secondary"
            >
              Back
            </Button>
            <Button type="submit" form="addLottery.rewards">
              Next
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

AddLotteryStep2.propTypes = {};
