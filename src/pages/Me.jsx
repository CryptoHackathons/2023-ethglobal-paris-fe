import React from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { LotteryItem } from '../components/LotteryItem';

export function MePage() {
  return (
    <>
      <Stack
        gap={3}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Image
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
          width={150}
          roundedCircle
        />
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          E0x71C7656EC7ab88b098defB751B7401B5f6d8976F
        </h2>
      </Stack>
      <h3>Joined Lottery</h3>
      <Row>
        {[1, 2, 3, 4, 5, 6, 7].map((_item, j) => {
          return (
            <Col key={j} xs={12} sm={6} md={4} lg={3} className="g-4">
              <LotteryItem isShowFooter={true} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
