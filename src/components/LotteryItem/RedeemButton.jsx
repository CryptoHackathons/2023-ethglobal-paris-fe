import React, { useCallback, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAccount, useContractWrite } from 'wagmi';
import client from '../../utils/axiosClient';
import { LotteryPropType } from '../../model/type';
import contract from '../../utils/contract';

const GET_PROOF = 'Get Proof';
const REDEEM = 'Redeem';
const REDEEMED = 'Redeemed';

function RedeemButton(props) {
  const { lotteryId } = props;
  const [proof, setProof] = useState(null);
  const [drawerId, setDrawerId] = useState(null);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [isShowGetProofModal, setShowGetProofModal] = useState(false);
  const [isShowSetProofModal, setShowSetProofModal] = useState(false);
  const { address } = useAccount();
  const { write } = useContractWrite({
    ...contract,
    functionName: 'redeemLotteryPrize',
  });
  const [status, setStatus] = useState(GET_PROOF);

  const getLotteryPoof = useCallback(async () => {
    setButtonLoading(true);
    try {
      const { data } = client.get(`/lottery/${lotteryId}/redeem/${address}`);
      const { user_id, proof } = data;
      setDrawerId(user_id);
      setProof(proof);
      setStatus(REDEEM);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  }, [lotteryId, address]);

  const redeemLottery = useCallback(async () => {
    setButtonLoading(true);
    try {
      write({
        args: [lotteryId, address, drawerId, proof],
      });
      setStatus(REDEEMED);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  }, [write, lotteryId, address, drawerId, proof]);

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
    GET_PROOF: getLotteryPoof,
    REDEEM: redeemLottery,
  };

  return (
    <>
      <Button
        style={{
          width: '100%',
        }}
        onClick={handler[status]}
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
            value={proof}
            // style={{ height: '100px' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onHide={() => setShowGetProofModal(false)}
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
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control as="textarea" value={proof} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onHide={() => setShowSetProofModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

RedeemButton.propTypes = {
  lotteryId: LotteryPropType.id,
};

export default RedeemButton;
