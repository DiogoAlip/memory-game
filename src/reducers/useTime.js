import { useReducer } from "react";
import { timeReducer } from "./timeReducer";

export const useTime = (initialTime) => {
  const initialMinutes = Math.round(initialTime / 2);
  const initialSeconds = initialTime % 2 === 0 ? 30 : 0;

  const [time, timeDispatch] = useReducer(timeReducer, {
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  const onSetTime = ({
    newMinutes = time.minutes,
    newSeconds = time.seconds,
  }) => {
    const action = {
      type: "Set Time",
      payload: {
        minutes: newMinutes < 0 ? 0 : newMinutes,
        seconds: newSeconds < 0 ? 0 : newSeconds,
      },
    };

    timeDispatch(action);

    return action.payload;
  };

  const onSetTimeByNumber = (number) => {
    const newMinutes = Math.round(number / 2);
    const newSeconds = parseInt(number) % 2 === 0 ? 30 : 0;
    const action = {
      type: "Set Time",
      payload: {
        minutes: newMinutes,
        seconds: newSeconds,
      },
    };
    timeDispatch(action);

    return action.payload;
  };

  const onSetSeconds = (newSeconds) => {
    const action = {
      type: "Set Second",
      payload: newSeconds <= 0 ? 0 : newSeconds % 59,
    };

    timeDispatch(action);
  };

  const onSetMinute = (newMinutes) => {
    const action = {
      type: "Set Minute",
      payload: newMinutes <= 0 ? 0 : newMinutes,
    };

    timeDispatch(action);
  };

  const timeString = `${time.minutes}:${time.seconds <= 9 ? "0" : ""}${
    time.seconds
  }`;

  const timeNumber = Math.abs(time.minutes * 2 - (time.seconds > 0 ? 0 : 1));

  return {
    minutes: time.minutes,
    seconds: time.seconds,
    timeString,
    timeNumber,
    onSetTime,
    onSetSeconds,
    onSetMinute,
    onSetTimeByNumber,
  };
};
