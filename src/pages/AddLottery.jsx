import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import {
  AddLotteryStep1,
  AddLotteryStep2,
  AddLotteryStep3,
  AddLotteryStep4,
  AddLotteryStepper,
} from '../components/add-lottery';
// import PropTypes from 'prop-types';

export function AddLotteryPage() {
  return (
    <Row>
      <Col md={7} className="px-4 py-5">
        <Routes>
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
