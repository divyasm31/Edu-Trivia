import { useState, useEffect, useRef } from 'react';

const useTimer = (initialTime, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    const tick = () => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          if (savedCallback.current) savedCallback.current();
          return 0;
        }
      });
    };

    if (timeLeft > 0) {
      const timerId = setInterval(tick, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const resetTimer = (newTime) => {
    setTimeLeft(newTime);
  };

  return [timeLeft, resetTimer];
};

export default useTimer;