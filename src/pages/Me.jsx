import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import LotteryItem from '../components/LotteryItem';
import client from '../utils/axiosClient';
import { useAccount } from 'wagmi';
import { serializeLotteries } from '../utils/functions';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { globalAtom } from '../model';

export function MePage() {
  const setErrorToast = useSetAtom(globalAtom.errorToast);
  const { address, isConnected } = useAccount();
  const [lotteries, setLotteries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected || !address) {
      window.confirm(
        'Please connect your wallet, we will redirect you to home page'
      );
      navigate('/');
      return;
    }

    async function getUserLotteries() {
      try {
        const res = await client.get(`/user/${address}`);
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
          {address}
        </h2>
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
