import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AddLotteryStep1,
  AddLotteryStep2,
  AddLotteryStep3,
  AddLotteryStep4,
  AddLotteryStepper,
} from '../components/add-lottery';
import { useAtom } from 'jotai';
import { addLotteryAtom } from '../model';
// import PropTypes from 'prop-types';

export function AddLotteryPage() {
  const [infoDraft] = useAtom(addLotteryAtom.lotteryDraft.infoDraft);
  const [rewardsDraft] = useAtom(addLotteryAtom.lotteryDraft.rewardsDraft);
  const [missionDraft] = useAtom(addLotteryAtom.lotteryDraft.missionDraft);

  useEffect(() => {
    console.log('updated infoDraft Atom', infoDraft);
  }, [infoDraft]);

  useEffect(() => {
    console.log('updated rewardsDraft Atom', rewardsDraft);
  }, [rewardsDraft]);

  useEffect(() => {
    console.log('updated missionDraft Atom', missionDraft);
  }, [missionDraft]);

  return (
    <Row>
      <Col md={7} className="px-4 py-5">
        <Routes>
          <Route path="/" element={<Navigate replace to="./lottery-info" />} />
          <Route path="/lottery-info" element={<AddLotteryStep1 />} />
          <Route path="/rewards" element={<AddLotteryStep2 />} />
          <Route path="/missions" element={<AddLotteryStep3 />} />
          <Route path="/confirmation" element={<AddLotteryStep4 />} />
        </Routes>
      </Col>
      <Col md={5} className="px-4 py-5">
        <AddLotteryStepper />
      </Col>
    </Row>
  );
}

AddLotteryPage.propTypes = {};
