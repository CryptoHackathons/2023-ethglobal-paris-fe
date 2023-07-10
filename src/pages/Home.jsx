import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LotteryItem } from '../components/LotteryItem';

export function HomePage() {
  return (
    <>
      <Carousel>
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
        {[1, 2, 3, 4, 5, 6, 7].map((_item, j) => {
          return (
            <Col key={j} xs={12} sm={6} md={4} lg={3} className="g-4">
              <LotteryItem isShowFooter={false} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
