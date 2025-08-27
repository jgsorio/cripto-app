import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CoinProps } from '../home';
import styles from './detail.module.css';
import { FaArrowLeft } from "react-icons/fa6";

export function Detail() {
  const [coin, setCoin] = useState<CoinProps|null>(null);
  const { currency } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/")
  }

  useEffect(() => {
    async function getCoin() {
    try {
      await fetch(`https://rest.coincap.io/v3/assets/${currency?.toLowerCase()}?apiKey=${import.meta.env.VITE_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if ("error" in data) {
          navigate("/");
        }

        setCoin(data.data)
      })
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }
    getCoin();
  }, [currency]);
  return (
    <div className={styles.container}>

      <div className={styles.coinInfo}>
        <span className={styles.logo}>
          <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} alt="Logo" />
        </span>
        <span>{coin?.name} | {coin?.symbol}</span>
        <span>Preço: {Number(Number(coin?.priceUsd) * 5.50).toLocaleString('pt-br', { currency: 'BRL', style: 'currency'})}</span>
      </div>
      <div className={styles.back}>
        <button onClick={handleBack}><FaArrowLeft size={20} color="#FFF"/> Voltar</button>
      </div>
    </div>
  )
}
