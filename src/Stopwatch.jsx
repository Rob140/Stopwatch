import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [products, setProducts] = useState(null);
  const { id } = useParams();

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
  //   an api data fetching
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <h1>stopwatch</h1>
      <h3>{formattime()}</h3>
      <button onClick={startstop}>{isRaning ? "stop" : "start"}</button>
      <button onClick={reset}>reset</button>

      {/* rendering an api data */}

      <h2>Products{id}</h2>
      <p>{products && products.description}</p>

      {/* {products.map((prod) => (
        <div key={prod.id}>
          <h3>{prod.title}</h3>
        </div>
      ))} */}
    </>
  );
};

export default Stopwatch;
