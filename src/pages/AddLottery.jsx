import React, { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {
  AddLotteryStep1,
  AddLotteryStep2,
  AddLotteryStep3,
  AddLotteryStep4,
  AddLotteryStepper,
} from '../components/add-lottery';
import { useAccount } from 'wagmi';

export function AddLotteryPage() {
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();
  const isChecked = useRef(false);

  useEffect(() => {
    if (!isChecked.current) {
      isChecked.current = true;
      return;
    }

    if (!isConnected || !address) {
      window.confirm(
        'Please connect your wallet, we will redirect you to home page'
      );
      navigate('/');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
