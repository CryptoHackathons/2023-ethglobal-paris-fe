import React, { useCallback, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAccount, useContractWrite, useWalletClient } from 'wagmi';
import client from '../../utils/axiosClient';
import { LotteryPropType } from '../../model/type';
import {
  // lotteryContract,
  lotteryContract2,
  usdtTestContract,
} from '../../utils/contract';
import { useSetAtom } from 'jotai';
import { globalAtom } from '../../model';
import { waitForTransaction } from '@wagmi/core';
import { ButtonSubmit } from '../common/button';

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
  const { data: walletClient } = useWalletClient();
  // const { writeAsync: redeemLotteryPrize } = useContractWrite({
  //   ...lotteryContract,
  //   functionName: 'redeemLotteryPrize',
  //   walletClient,
  // });
  console.log(drawerId);
  const { writeAsync: redeemLotteryPrize2 } = useContractWrite({
    ...lotteryContract2,
    functionName: 'redeemLotteryPrize2',
    walletClient,
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
      setProof(JSON.parse(proof));
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
      const redeemTxn = await redeemLotteryPrize2({
        args: [usdtTestContract.address, 100000000000000000],
      });
      // const redeemTxn = await redeemLotteryPrize({
      //   args: [lotteryId, address, drawerId, proof],
      // });
      console.log(redeemTxn);
      await waitForTransaction(redeemTxn);
      setStatus(REDEEMED);
    } catch (error) {
      console.log(error);
      setErrorToast({
        show: true,
        message: error.message,
      });
    } finally {
      setButtonLoading(false);
    }
  }, [setErrorToast, redeemLotteryPrize2]);

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
      <ButtonSubmit
        style={{
          width: '100%',
        }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handler[status]();
        }}
        loading={isButtonLoading}
        disabled={status === REDEEMED}
      >
        {status}
      </ButtonSubmit>
      <Modal
        show={isShowGetProofModal}
        onHide={() => setShowGetProofModal(false)}
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Here is your proof, copy and save it</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            defaultValue={JSON.stringify(proof, null, 2)}
            style={{ height: '300px' }}
            disabled={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowGetProofModal(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(proof, null, 2))
            }
          >
            Copy
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
            defaultValue={JSON.stringify(proof, null, 2)}
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
