import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LotteryItem from '../components/LotteryItem';
import client from '../utils/axiosClient';
import { serializeLotteries } from '../utils/functions';

export function HomePage() {
  const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    async function getLotteries() {
      try {
        const res = await client.get('/lotteries');
        const lotteries = serializeLotteries(res?.data);
        console.log(lotteries);
        setLotteries(lotteries);
      } catch (error) {
        console.log(error.message);
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
                src={lottery.bannerUrl}
                alt={lottery.title}
              />
              <Carousel.Caption>
                <h3>{lottery.title}</h3>
                {/* <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p> */}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
        <Carousel.Item
          as="a"
          href="/lottery/c5f9fbf6-7690-4b0f-a532-48e1937edde7"
        >
          <img
            className="d-block w-100"
            src="https://static.accupass.com/eventbanner/2306261712589032454360.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item
          as="a"
          href="/lottery/c5f9fbf6-7690-4b0f-a532-48e1937edde7"
        >
          <img
            className="d-block w-100"
            src="https://static.accupass.com/eventbanner/2306230802461133375493.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item
          as="a"
          href="/lottery/c5f9fbf6-7690-4b0f-a532-48e1937edde7"
        >
          <img
            className="d-block w-100"
            src="https://static.accupass.com/eventbanner/2306150331581341146149.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
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
