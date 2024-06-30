import React, { useEffect, useState } from 'react'
import { getTimeDiffrenceForTimer } from '~/utils/time'


type Props = {
  to?: number
  from?: number
}

export const Timer: React.FC<Props> = ({ to, from }) => {
  const [diff, setDiff] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (to) {
        setDiff(getTimeDiffrenceForTimer({ to }));
      } else if (from) {
        setDiff(getTimeDiffrenceForTimer({ from }));
      }
    }, 1000);

    return () => clearInterval(interval);
  })

  return (
    <div className="flex flex-row gap-4 items-center relative">
      <div className="text-center">
        <div className="text-xl">{diff.days}</div>
        <div className="text-xs">Days</div>
      </div>
      <div className="text-xl">:</div>
      <div className="text-center">
        <div className="text-xl">{diff.hours}</div>
        <div className="text-xs">Hours</div>
      </div>
      <div className="text-xl">:</div>
      <div className="text-center">
        <div className="text-xl">{diff.minutes}</div>
        <div className="text-xs">Minutes</div>
      </div>
      <div className="text-xl">:</div>
      <div className="text-center">
        <div className="text-xl">{diff.seconds}</div>
        <div className="text-xs">Seconds</div>
      </div>
    </div>
  )
}
