import  { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
  };

  const pause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor((time / 3600000) % 24);
    return `${hours}:${minutes}:${seconds}:${getMilliseconds}`;
  };

  return (
    <div className="flex flex-col items-center mt-12 h-screen ">
      <h1 className="text-4xl font-bold mb-8">Stopwatch</h1>
      <div className="text-6xl font-mono mb-8">{formatTime(time)}</div>
      <div className="flex space-x-4 mb-8">
        <button onClick={start} className="bg-green-500 text-white py-2 px-4 rounded-3xl hover:bg-green-700">Start</button>
        <button onClick={pause} className="bg-yellow-500 text-white py-2 px-4 rounded-3xl hover:bg-yellow-700">Pause</button>
        <button onClick={reset} className="bg-red-500 text-white py-2 px-4 rounded-3xl hover:bg-red-700">Reset</button>
        <button onClick={lap} className="bg-blue-500 text-white py-2 px-4 rounded-3xl hover:bg-blue-700">Lap</button>
      </div>
      <div className="w-64">
        {laps.map((lapTime, index) => (
          <div key={index} className="flex justify-between bg-gray-100 p-2 mb-2 rounded shadow">
            <span>Lap {index + 1}</span>
            <span>{formatTime(lapTime)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
