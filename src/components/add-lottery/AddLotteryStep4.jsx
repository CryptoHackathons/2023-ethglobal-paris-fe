import React, { useCallback, useMemo, useState } from 'react';
import axiosClient from '../../utils/axiosClient';
import { Badge, Button, Form, Image } from 'react-bootstrap';
import { AddLotteryMissionList, AddLotteryRewardList } from './general';
import { useNavigate } from 'react-router-dom';
import { addLotteryAtom, globalAtom } from '../../model';
import { useAtom, useSetAtom } from 'jotai';
import { getDemoDateString } from '../../utils/functions';
import { ButtonSubmit } from '../common/button';
import { useContractWrite } from 'wagmi';
import contract from '../../utils/contract';

export function AddLotteryStep4() {
  // form states
  const [validated, setValidated] = useState(false);

  const setErrorToast = useSetAtom(globalAtom.errorToast);
  const [submitting, setSubmitting] = useAtom(addLotteryAtom.submitting);
  const [infoDraft] = useAtom(addLotteryAtom.lotteryDraft.infoDraft);
  const [rewardsDraft] = useAtom(addLotteryAtom.lotteryDraft.rewardsDraft);
  const [missionDraft] = useAtom(addLotteryAtom.lotteryDraft.missionDraft);

  const { write } = useContractWrite({
    ...contract,
    functionName: 'listLottery',
  });

  const navigate = useNavigate();

  // Date objects for Lottery
  const dtFrom = useMemo(() => new Date(infoDraft.startTime), [infoDraft]);
  const dtTo = useMemo(() => new Date(infoDraft.endTime), [infoDraft]);

  const handleSubmitLottery = useCallback(
    async (event) => {
      const form = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();
      setValidated(true);

      if (form.checkValidity() === false) return;

      setSubmitting(true);

      const addLotteryResponse = await axiosClient
        .post('/lottery', {
          ...infoDraft,
        })
        .catch((err) => {
          console.log(err);
          return { ...err, status: 999 };
        });

      if (addLotteryResponse.status !== 200) {
        setSubmitting(false);
        setErrorToast({
          show: true,
          message:
            addLotteryResponse.status === 999
              ? addLotteryResponse.message
              : 'Create Lottery Error',
        });
        return;
      }

      const lotteryID = addLotteryResponse.data;

      const rewardsJSON = JSON.stringify(rewardsDraft);
      const missionJSON = JSON.stringify(missionDraft);

      const [rewardsResponse, missionResponse] = await Promise.all([
        axiosClient.post(`/lottery/${lotteryID}/prizes`, {
          data: rewardsJSON,
        }),
        axiosClient.post(`/lottery/${lotteryID}/missions`, {
          data: missionJSON,
        }),
      ]);

      if (rewardsResponse.status !== 200 || missionResponse.status !== 200) {
        setSubmitting(false);
        setErrorToast({
          show: true,
          message: 'Create Rewards and Missions Error',
        });
        return;
      }

      const fd = new FormData(form);
      const { tokenAddress, amount } = {
        tokenAddress: fd.get('address'),
        amount: parseInt(fd.get('amount')),
      };

      console.log(tokenAddress, amount); // TODO: remove after contract integration implemented

      try {
        await write({
          args: [tokenAddress, amount],
        });
      } catch (error) {
        setErrorToast({
          show: true,
          message: error.message,
        });
        return;
      }

      setSubmitting(false);
      window.location.href = '/';
    },
    [write, infoDraft, missionDraft, rewardsDraft, setErrorToast, setSubmitting]
  );

  return (
    <>
      <div className="d-grid gap-5">
        <Image className="w-100 object-fit-cover" src={infoDraft.bannerURL} />
        <div id="lottery-title">
          <h3 className="fw-bold">{infoDraft.title}</h3>
          <p className="m-0">
            {getDemoDateString(dtFrom)} ~ {getDemoDateString(dtTo)} (GMT+2)
          </p>
        </div>
        <div id="lottery-rewards">
          <h3 className="fw-bold mb-3">
            Rewards <Badge pill>{rewardsDraft.totalQuantity}</Badge>
          </h3>
          <AddLotteryRewardList rewards={rewardsDraft.contents} />
        </div>
        <div id="lottery-mission">
          <div className="d-flex align-items-center gap-3 mb-3">
            <h3 className="fw-bold m-0 flex-fill">Missions</h3>
            <p className="m-0">
              Required Missions: {missionDraft.totalRequiredMissions}
            </p>
          </div>
          <AddLotteryMissionList missions={missionDraft.missionList} />
        </div>
        <div id="lottery-description">
          <h3 className="fw-bold mb-3">Description</h3>
          <p>{infoDraft.description}</p>
        </div>
        <Form
          id="addLottery.contract"
          className="d-grid gap-3"
          noValidate
          validated={validated}
          onSubmit={handleSubmitLottery}
        >
          <Form.Group controlId="addLottery.contract.address">
            <Form.Label>Token Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="0x..."
              required
            />
          </Form.Group>
          <Form.Group controlId="addLottery.contract.amount">
            <Form.Label>Token Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder="0"
              min={0}
              required
            />
          </Form.Group>
        </Form>
        <div className="d-grid gap-1 w-50 mx-auto">
          <Button onClick={() => navigate('../missions')} variant="secondary">
            Back
          </Button>
          <ButtonSubmit
            type="submit"
            form="addLottery.contract"
            loading={submitting}
          >
            Submit
          </ButtonSubmit>
        </div>
      </div>
    </>
  );
}
