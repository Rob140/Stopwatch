import { useState, useEffect, useRef } from "react";
import styles from "./Stopwatch.module.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);

  const [isRaning, setIsraning] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (isRaning) {
      ref.current = setInterval(() => {
        setTime((pre) => pre + 1);
      }, 10);
    } else {
      clearInterval(ref.current);
    }
    return () => {
      clearInterval(ref.current);
    };
  }, [isRaning]);
  function startstop() {
    setIsraning(!isRaning);
  }
  function reset() {
    setIsraning(false);
    setTime(0);
  }
  function formattime() {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const miliseconds = Math.floor((time / 10) % 100);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(miliseconds).padStart(2, "0")}`;
  }

  return (
    <section className={styles.stopwatch}>
      <header className={styles.header}>
        <h1 className={styles.title}>Stopwatch</h1>
      </header>

      <div className={styles.display} aria-live="polite">
        {formattime()}
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.button} ${isRaning ? styles.stop : styles.start}`}
          onClick={startstop}
          aria-pressed={isRaning}
        >
          {isRaning ? "Stop" : "Start"}
        </button>

        <button className={`${styles.button} ${styles.reset}`} onClick={reset}>
          Reset
        </button>
      </div>
    </section>
  );
};

export default Stopwatch;
