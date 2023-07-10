import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { addLotteryAtom } from '../../model/AddLottery';
import { useNavigate } from 'react-router-dom';

// get current local time string for datetime-local input
const getLocalTimeString = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -8);
};

// transform datetime-local input value into ISO time string
const getISOTimeString = (localTimeString) =>
  new Date(localTimeString).toISOString();

export function AddLotteryStep1() {
  const [infoDraft, setInfoDraft] = useAtom(
    addLotteryAtom.lotteryDraft.infoDraft
  );
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [timeFrom, setTimeFrom] = useState(() => {
    const now = new Date();
    const initial = new Date(infoDraft.timeFrom);
    return initial < now
      ? getLocalTimeString(now)
      : getLocalTimeString(initial);
  });
  const [timeTo, setTimeTo] = useState(() => {
    const now = new Date();
    const initial = new Date(infoDraft.timeTo);
    return initial < now
      ? getLocalTimeString(now)
      : getLocalTimeString(initial);
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === false) return;

    const fd = new FormData(form);
    const info = {
      bannerURL: fd.get('banner'),
      title: fd.get('title'),
      timeFrom: getISOTimeString(timeFrom),
      timeTo: getISOTimeString(timeTo),
      description: fd.get('description'),
    };

    console.log('data from info form:', info);

    setInfoDraft((prev) => ({
      ...prev,
      ...info,
    }));
    navigate('../rewards');
  };

  // if new valule is in the past, set it to now
  const handleSetTimeFrom = (value) => {
    setTimeFrom(() => {
      const now = new Date();
      const valueDate = new Date(value);
      return valueDate < now
        ? getLocalTimeString(now)
        : getLocalTimeString(valueDate);
    });
  };

  // if new value is before timeFrom value, set it to timeFrom value
  const handleSetTimeTo = (value) => {
    setTimeTo(() => {
      const fromDate = new Date(timeFrom);
      const valueDate = new Date(value);
      return valueDate < fromDate
        ? getLocalTimeString(fromDate)
        : getLocalTimeString(valueDate);
    });
  };

  // set an one-minute interval to update the time and datetime-local values
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeFrom((prev) => {
        const prevDate = new Date(prev);
        return prevDate < now
          ? getLocalTimeString(now)
          : getLocalTimeString(prevDate);
      });
      setTimeTo((prev) => {
        const prevDate = new Date(prev);
        return prevDate < now
          ? getLocalTimeString(now)
          : getLocalTimeString(prevDate);
      });
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="d-grid gap-4">
        <Form
          id="addLottery.info"
          className="d-grid gap-3"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          {/* <Form.Group controlId="addLottery.info.banner">
            <Form.Label>Lottery Banner</Form.Label>
            <Form.Control
              type="file"
              name="banner"
              accept="image/jpg, image/png"
            />
          </Form.Group> */}
          <Form.Group controlId="addLottery.info.banner">
            <Form.Label>Lottery Banner URL</Form.Label>
            <Form.Control
              type="url"
              name="banner"
              defaultValue={infoDraft.bannerURL}
              placeholder="Enter lottery banner URL..."
              required
            />
          </Form.Group>
          <Form.Group controlId="addLottery.info.title">
            <Form.Label> Lottery Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              defaultValue={infoDraft.title}
              placeholder="Enter lottery title..."
              required
            />
          </Form.Group>
          <Form.Group controlId="addLottery.info.description">
            <Form.Label> Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              defaultValue={infoDraft.description}
              rows={6}
              placeholder="Enter lottery description..."
              required
            />
          </Form.Group>
          <div className="mb-3 d-flex gap-3">
            <Form.Group
              className="flex-grow-1"
              controlId="addLottery.info.timeFrom"
            >
              <Form.Label>From</Form.Label>
              <Form.Control
                type="datetime-local"
                name="timeFrom"
                defaultValue={getLocalTimeString(new Date(infoDraft.timeFrom))}
                value={timeFrom}
                onChange={(event) => handleSetTimeFrom(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group
              className="flex-grow-1"
              controlId="addLottery.info.timeTo"
            >
              <Form.Label>To</Form.Label>
              <Form.Control
                type="datetime-local"
                name="timeTo"
                min={timeFrom}
                defaultValue={getLocalTimeString(new Date(infoDraft.timeTo))}
                value={timeTo}
                onChange={(event) => handleSetTimeTo(event.target.value)}
                required
              />
            </Form.Group>
          </div>
        </Form>
        <div className="d-grid gap-1 w-50 mx-auto">
          <Button type="submit" form="addLottery.info">
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
