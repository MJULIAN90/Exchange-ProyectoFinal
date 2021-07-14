import "./cryptoGraphics.css";
import { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@material-ui/core";

import btcIcon from "./cryptoIcons/bitcoin.png";
import ethIcon from "./cryptoIcons/ethereum2.png";
import chzIcon from "./cryptoIcons/chili.jpg";
import filIcon from "./cryptoIcons/filecoin.png";
import adaIcon from "./cryptoIcons/ada2.png";
import bnbIcon from "./cryptoIcons/binance.png";
import CryptoCard from "./cryptoCard";

let ethSocket;
let btcSocket;
let chzSocket;
let filSocket;
let adaSocket;
let bnbSocket;

export const CryptoGraphics = () => {
  // Coins states
  const [eth, setEth] = useState({
    symbol: "ETH",
    prevPrice: 0,
    price: 0,
    color: "equal",
    img: ethIcon,
  });
  const [btc, setBtc] = useState({
    symbol: "BTC",
    prevPrice: 0,
    price: 0,
    color: "equal",
    img: btcIcon,
  });
  const [chz, setChz] = useState({
    symbol: "CHZ",
    prevPrice: 0,
    price: 0,
    color: "equal",
    img: chzIcon,
  });
  const [fil, setFil] = useState({
    symbol: "FIL",
    prevPrice: 0,
    price: 0,
    color: "equal",
    img: filIcon,
  });
  const [ada, setAda] = useState({
    symbol: "ADA",
    prevPrice: 0,
    price: 0,
    color: "equal",
    img: adaIcon,
  });
  const [bnb, setBnb] = useState({
    symbol: "BNB",
    prevPrice: 0,
    price: 0,
    color: "equal",
    img: bnbIcon,
  });
  const [connection, setConnection] = useState(true);

  let renderData = [eth, btc, chz, fil, ada, bnb];

  function handleConnection() {
    if (connection === true) {
      ethSocket = new WebSocket(
        "wss://stream.binance.com:9443/ws/ethusdt@trade"
      );
      btcSocket = new WebSocket(
        "wss://stream.binance.com:9443/ws/btcusdt@trade"
      );
      chzSocket = new WebSocket(
        "wss://stream.binance.com:9443/ws/chzusdt@trade"
      );
      filSocket = new WebSocket(
        "wss://stream.binance.com:9443/ws/filusdt@trade"
      );
      adaSocket = new WebSocket(
        "wss://stream.binance.com:9443/ws/adausdt@trade"
      );
      bnbSocket = new WebSocket(
        "wss://stream.binance.com:9443/ws/bnbusdt@trade"
      );

      // websockets errors handlers
      ethSocket.onerror = (event) => {
        console.log(event);
      };
      btcSocket.onerror = (event) => {
        console.log(event);
      };
      chzSocket.onerror = (event) => {
        console.log(event);
      };
      filSocket.onerror = (event) => {
        console.log(event);
      };
      adaSocket.onerror = (event) => {
        console.log(event);
      };
      bnbSocket.onerror = (event) => {
        console.log(event);
      };

      ethSocket.onmessage = (event) => {
        let dataEth = JSON.parse(event.data);
        updateQuote(dataEth, setEth);
      };

      bnbSocket.onmessage = (event) => {
        let dataBnb = JSON.parse(event.data);
        updateQuote(dataBnb, setBnb);
      };

      btcSocket.onmessage = (event) => {
        let dataBtc = JSON.parse(event.data);
        updateQuote(dataBtc, setBtc);
      };

      adaSocket.onmessage = (event) => {
        let dataAda = JSON.parse(event.data);
        updateQuote(dataAda, setAda);
      };

      chzSocket.onmessage = (event) => {
        let dataChz = JSON.parse(event.data);
        updateQuote(dataChz, setChz);
      };

      filSocket.onmessage = (event) => {
        let dataFil = JSON.parse(event.data);
        updateQuote(dataFil, setFil);
      };

      return;
    } else {
      return alert("no connection");
    }
  }

  useEffect(() => {
    handleConnection();
    return () => {
      ethSocket.close();
      btcSocket.close();
      chzSocket.close();
      filSocket.close();
      adaSocket.close();
      bnbSocket.close();
      setConnection(false);
    };
    //Do not delete following code, avoid unrrelevant error
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // UPDATE DATA COINS (info, coinState and setCoinState)
  const updateQuote = (dato, setCoin) => {
  
    let numberPrice = parseFloat(dato.p);
    setCoin((prevState) => {
      return {
        ...prevState,
        prevPrice: numberPrice,
      };
    });

    setCoin((prevState) => {
      if (prevState.prevPrice > prevState.price)
        return { ...prevState, price: numberPrice, color: "major" };
      else if (prevState.prevPrice < prevState.price)
        return { ...prevState, price: numberPrice, color: "minor" };
      else {
        return { ...prevState, color: "equal" };
      }
    });
  };

  return (
    <Container>
      <Typography variant="h3">Crypto USD trade</Typography>
      <Grid container className="currencyValues" spacing={2}>
        {renderData.map((e, i) => (
          <CryptoCard
            key={i}
            i={i}
            price={e.price}
            symbol={e.symbol}
            img={e.img}
            color={e.color}
          />
        ))}
      </Grid>
    </Container>
  );
};