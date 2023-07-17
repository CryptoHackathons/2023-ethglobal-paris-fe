import React, { useCallback, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAccount, useContractWrite } from 'wagmi';
import client from '../../utils/axiosClient';
import { LotteryPropType } from '../../model/type';
import { lotteryContract } from '../../utils/contract';
import { useSetAtom } from 'jotai';
import { globalAtom } from '../../model';
import { waitForTransaction } from '@wagmi/core';

const GET_PROOF = 'Get Proof';
const REDEEM = 'Redeem';
const REDEEMED = 'Redeemed';

function RedeemButton(props) {
  const { lotteryId } = props;
  const setErrorToast = useSetAtom(globalAtom.errorToast);
  const [proof, setProof] = useState(null);
  const [drawerId, setDrawerId] = useState(null);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [isShowGetProofModal, setShowGetProofModal] = useState(false);
  const [isShowSetProofModal, setShowSetProofModal] = useState(false);
  const { address } = useAccount();
  const { write } = useContractWrite({
    ...lotteryContract,
    functionName: 'redeemLotteryPrize',
  });
  const [status, setStatus] = useState(GET_PROOF);

  const getLotteryPoof = useCallback(async () => {
    setButtonLoading(true);
    try {
      const { data } = await client.get(
        `/lottery/${lotteryId}/redeem/${address}`
      );
      console.log('data', data);
      const { user_id, proof } = data;
      setDrawerId(user_id);
      setProof(proof.data);
      setShowGetProofModal(true);
      setStatus(REDEEM);
    } catch (error) {
      console.log(error);
      setErrorToast({
        show: true,
        message: error.message,
      });
    } finally {
      setButtonLoading(false);
    }
  }, [lotteryId, address, setErrorToast]);

  const showRedeemLotteryModal = useCallback(() => {
    setShowSetProofModal(true);
  }, []);

  const redeemLottery = useCallback(async () => {
    setButtonLoading(true);
    setShowSetProofModal(false);
    try {
      const redeemTxn = await write({
        args: [lotteryId, address, drawerId, proof],
      });
      await waitForTransaction(redeemTxn);
    } catch (error) {
      console.log(error);
      // setErrorToast({
      //   show: true,
      //   message: error.message,
      // });
    } finally {
      setStatus(REDEEMED);
      setButtonLoading(false);
    }
  }, [write, lotteryId, address, drawerId, proof, setErrorToast]);

  if (!address) {
    return (
      <Button
        style={{
          width: '100%',
        }}
        disabled
      >
        {GET_PROOF}
      </Button>
    );
  }

  const handler = {
    [GET_PROOF]: getLotteryPoof,
    [REDEEM]: showRedeemLotteryModal,
  };

  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <Button
        style={{
          width: '100%',
        }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handler[status]();
        }}
        isLoading={isButtonLoading}
        disabled={status === REDEEMED}
      >
        {status}
      </Button>
      <Modal
        show={isShowGetProofModal}
        onHide={() => setShowGetProofModal(false)}
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Here is your proof, save it</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            value={JSON.stringify(proof, null, 2)}
            style={{ height: '300px' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowGetProofModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={isShowSetProofModal}
        onHide={() => setShowSetProofModal(false)}
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Put your proof here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            value={JSON.stringify(proof, null, 2)}
            style={{ height: '300px' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSetProofModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={redeemLottery}>
            Redeem
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

RedeemButton.propTypes = {
  lotteryId: LotteryPropType.id,
};

export default RedeemButton;
