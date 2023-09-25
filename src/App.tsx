import { useEffect, useRef, useState } from "react";
import Coin from "./Coin";

function App() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          ref={boxRef}
          style={{
            position: "relative",
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -70,
              left: (boxRef.current?.clientWidth ?? 0) / 2 - 25,
            }}
          >
            {open && <Coin setOpen={setOpen} />}
          </div>
          <button
            style={{
              backgroundColor: "greenyellow",
              border: "0",
              width: 100,
              height: 30,
              borderRadius: 6,
              color: "green",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            coin pop!
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
