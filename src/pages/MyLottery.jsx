import React, { useEffect, useRef, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import LotteryItem from '../components/LotteryItem';
import client from '../utils/axiosClient';
import { useAccount } from 'wagmi';
import { serializeLotteries } from '../utils/functions';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { globalAtom } from '../model';

export function MyLotteryPage() {
  const setErrorToast = useSetAtom(globalAtom.errorToast);
  const { address, isConnected } = useAccount();
  const [lotteries, setLotteries] = useState([]);
  const isChecked = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isChecked.current) {
      return;
    }

    if (!isConnected || !address) {
      window.confirm(
        'Please connect your wallet, we will redirect you to home page'
      );
      navigate('/');
      return;
    }

    async function getUserLotteries() {
      try {
        await client.post(`/user/${address}`);
        const res = await client.get(`/user/${address}/lotteries`);
        console.log(res.data);
        const lotteries = serializeLotteries(
          res.data.map((item) => item.lottery)
        );
        setLotteries(lotteries);
      } catch (error) {
        setErrorToast({
          show: true,
          message: error.message,
        });
      }
    }
    isChecked.current = true;
    getUserLotteries();
  }, [navigate, isConnected, address, setErrorToast]);

  if (!isConnected || !address) {
    return null;
  }

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
        className="my-5"
      >
        <Image
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
          width={150}
          roundedCircle
        />
        <Alert variant="primary">{address}</Alert>
      </Stack>
      <h3>Joined Lottery</h3>
      <Row>
        {lotteries.map((lottery, j) => {
          return (
            <Col key={j} xs={12} sm={6} md={4} lg={3} className="g-4">
              <LotteryItem lottery={lottery} isShowFooter={true} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
