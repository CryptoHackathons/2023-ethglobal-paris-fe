import React, { useCallback, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { globalAtom, lotteryAtom } from '../model';
import { serializeLotteries } from '../utils/functions';
import client from '../utils/axiosClient';
import { LotteryContainer, LotteryMissionModal } from '../components/lottery';
import { useWalletClient } from 'wagmi';

export function LotteryPage() {
  const { lotteryID } = useParams();
  const [loading, setLoading] = useAtom(lotteryAtom.loading);
  const [missionModal, setMissionModal] = useAtom(lotteryAtom.missionModal);
  const setLottery = useSetAtom(lotteryAtom.lottery);
  const setSubmitting = useSetAtom(lotteryAtom.submitting);
  const setErrorToast = useSetAtom(globalAtom.errorToast);
  const { data: walletClient } = useWalletClient();

  const fetchLottery = useCallback(async () => {
    setLoading(true);
    try {
      const response = await client.get(`/lottery/${lotteryID}`);
      const [l] = serializeLotteries([response?.data]);

      setLottery((prev) => ({
        ...prev,
        ...l,
        attendee: { ...prev.attendee },
        host: { ...prev.host },
        missions:
          l.missions === null
            ? {
                totalCompletedMissions: 0,
                totalRequiredMissions: 0,
                missionList: [],
              }
            : {
                totalCompletedMissions: 0,
                ...l.missions,
              },
        prizes:
          l.prizes === null
            ? {
                totalQuantity: 0,
                contents: [],
              }
            : l.prizes,
      }));
      setLoading(false);
    } catch (error) {
      setErrorToast({
        show: true,
        message: error.message,
      });
      setLoading(false);
    }
  }, [lotteryID, setErrorToast, setLoading, setLottery]);

  const getDrawnState = useCallback(async () => {
    setSubmitting(true);
    try {
      const drawnStateResponse = await client.get(
        `/user/${walletClient.account.address}/lottery/${lotteryID}`
      );

      setLottery((prev) => ({
        ...prev,
        drawn: drawnStateResponse.data,
      }));
      setSubmitting(false);
    } catch (error) {
      setErrorToast({
        show: true,
        message: error.message,
      });
      setSubmitting(false);
      return;
    }
  }, [lotteryID, setErrorToast, setLottery, setSubmitting, walletClient]);

  const updateLotteryMission = useCallback(
    async (mission) => {
      try {
        const missionJSON = JSON.stringify(mission);
        const missionResponse = await client.post(
          `/lottery/${lotteryID}/missions`,
          {
            data: missionJSON,
          }
        );

        if (missionResponse.status !== 200) {
          setErrorToast({
            show: true,
            message: 'Update Mission Data Error',
          });
        }
      } catch (error) {
        setErrorToast({
          show: true,
          message: `Update Mission Data Error: ${error.message}`,
        });
      }
    },
    [lotteryID, setErrorToast]
  );

  useEffect(() => {
    fetchLottery();
  }, [fetchLottery]);

  useEffect(() => {
    if (walletClient === undefined) return;

    getDrawnState();
  }, [getDrawnState, walletClient]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: '4rem', height: '4rem' }}
          />
        </div>
      ) : (
        <LotteryContainer
          onRefresh={() => {
            fetchLottery();
            if (walletClient !== undefined) getDrawnState();
          }}
        />
      )}
      <LotteryMissionModal
        show={missionModal.show}
        missionID={missionModal.missionID}
        onUpdateMission={updateLotteryMission}
        onClose={() => setMissionModal((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
}

LotteryPage.propTypes = {};
