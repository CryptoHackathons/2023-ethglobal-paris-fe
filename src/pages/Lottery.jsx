import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { globalAtom, lotteryAtom } from '../model';
import { serializeLotteries } from '../utils/functions';
import client from '../utils/axiosClient';
import { LotteryContainer, LotteryMissionModal } from '../components/lottery';

export function LotteryPage() {
  const { lotteryID } = useParams();
  const [loading, setLoading] = useAtom(lotteryAtom.loading);
  const [missionModal, setMissionModal] = useAtom(lotteryAtom.missionModal);
  const setLottery = useSetAtom(lotteryAtom.lottery);
  const setErrorToast = useSetAtom(globalAtom.errorToast);

  useEffect(() => {
    const fetchLottery = async () => {
      setLoading(true);
      try {
        const response = await client.get(`/lottery/${lotteryID}`);
        const [l] = serializeLotteries([response?.data]);

        setLottery((prev) => ({
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
              : l.missions,
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
    };
    fetchLottery();
  }, [lotteryID, setErrorToast, setLoading, setLottery]);

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
        <LotteryContainer />
      )}
      <LotteryMissionModal
        show={missionModal.show}
        missionID={missionModal.missionID}
        onClose={() => setMissionModal((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
}

LotteryPage.propTypes = {};
