type Params = {
  to?: number
  from?: number
}
export const getTimeDiffrenceForTimer = (params: Params) => {
  const currentTime = new Date().getTime();
  const timeDiffrence = params?.to ? params.to - currentTime : currentTime - params.from;
  let days =
    Math.floor(timeDiffrence / (24 * 60 * 60 * 1000)) >= 10
      ? `${Math.floor(timeDiffrence / (24 * 60 * 60 * 1000))}`
      : `0${Math.floor(timeDiffrence / (24 * 60 * 60 * 1000))}`;
  const hours =
    Math.floor((timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)) >= 10
      ? `${Math.floor(
          (timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        )}`
      : `0${Math.floor(
          (timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
        )}`;
  const minutes =
    Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60)) >= 10
      ? `${Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60))}`
      : `0${Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60))}`;
  const seconds =
    Math.floor((timeDiffrence % (60 * 1000)) / 1000) >= 10
      ? `${Math.floor((timeDiffrence % (60 * 1000)) / 1000)}`
      : `0${Math.floor((timeDiffrence % (60 * 1000)) / 1000)}`;
  if (timeDiffrence < 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  } else {
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
};
