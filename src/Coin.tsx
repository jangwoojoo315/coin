import { useCallback, useEffect, useRef } from "react";

interface CoinProps {
  setOpen: (value: boolean) => void;
}

const COIN_URL = "./coin.png";
const CANVAS_WIDTH = 50;
const CANVAS_HEIGHT = 70;

const INTERVAL = 1000 / 60; //60fps
const COUNT = 10;
const Coin = (props: CoinProps) => {
  const { setOpen } = props;

  const count = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameX = useRef(0);
  const then = useRef<number>(new Date().getTime());

  const coinY = useRef(50);
  const coinYCount = useRef(1);

  const curCount = useRef(0);

  const drawImage = useCallback(() => {
    requestAnimationFrame(drawImage);

    const now = new Date().getTime();
    const delta = now - then.current;
    if (delta < INTERVAL) return;

    count.current++;
    count.current = 0;
    if (frameX.current > 8) {
      frameX.current = 0;
    } else {
      frameX.current += 1;
    }

    const ctx = canvasRef.current?.getContext("2d");
    const image = new Image();
    image.src = COIN_URL;

    if (!ctx) return;

    image.onload = () => {
      coinYCount.current += 0.01;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (frameX.current === 0) curCount.current += 1;
      if (curCount.current > COUNT) {
        coinY.current += 2;
        if (coinY.current > 50) {
          setOpen(false);
          return;
        }
      } else {
        coinY.current =
          Number(coinY.current.toFixed(0)) === 0
            ? 0
            : coinY.current / coinYCount.current;
      }

      ctx.drawImage(
        image,
        (image.width / 10) * frameX.current,
        0,
        image.width / 10,
        image.height,
        0,
        coinY.current,
        CANVAS_WIDTH,
        CANVAS_WIDTH
      );
    };

    then.current = now - (delta % INTERVAL);
  }, [setOpen]);
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = CANVAS_WIDTH;
    canvasRef.current.height = CANVAS_HEIGHT;

    const requestId = requestAnimationFrame(drawImage);
    return () => cancelAnimationFrame(requestId);
  }, [drawImage]);
  return <canvas ref={canvasRef}></canvas>;
};
export default Coin;
