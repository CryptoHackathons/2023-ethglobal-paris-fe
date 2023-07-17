import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LotteryItem from '../components/LotteryItem';
import client from '../utils/axiosClient';
import { serializeLotteries } from '../utils/functions';
import { useSetAtom } from 'jotai';
import { globalAtom } from '../model';

export function HomePage() {
  const setErrorToast = useSetAtom(globalAtom.errorToast);
  const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    async function getLotteries() {
      try {
        const res = await client.get('/lotteries');
        const lotteries = serializeLotteries(res?.data);
        console.log(lotteries);
        setLotteries(lotteries);
      } catch (error) {
        setErrorToast({
          show: true,
          message: error.message,
        });
      }
    }
    getLotteries();
  }, []);

  return (
    <>
      <Carousel>
        {lotteries.map((lottery) => {
          return (
            <Carousel.Item
              key={lottery.id}
              as="a"
              href={`/lottery/${lottery.id}`}
            >
              <img
                className="d-block w-100"
                src={lottery.bannerURL}
                alt={lottery.title}
              />
              <Carousel.Caption>
                <h3 style={{ color: 'white' }}>{lottery.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Row>
        {lotteries.map((lottery) => {
          return (
            <Col key={lottery.id} xs={12} sm={6} md={4} lg={3} className="g-4">
              <LotteryItem lottery={lottery} isShowFooter={false} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
