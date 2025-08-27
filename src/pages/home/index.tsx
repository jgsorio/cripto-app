import { Link, useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState, type FormEvent } from 'react';

export interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  maxSupply: string;
  changePercent24Hr: string;
  marketCapUsd: string;
}

export function Home() {
  const [input, setInput] = useState('');
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0)

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [offset]);

  const getData = async () => {
    await fetch(`https://rest.coincap.io/v3/assets?apiKey=${import.meta.env.VITE_API_KEY}&limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => setCoins(data.data))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    navigate(`/details/${input}`);
  }

  const handleGetMore = async () => {
    if (offset === 0) {
      setOffset(10);
      return;
    }

    setOffset(offset + 10);
  }


  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Digite o nome da moeda.. Ex: bitcoin'
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit'>
          <BsSearch size={30} />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Valor Mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
            <th scope='col'>Mudança 24h</th>
          </tr>
        </thead>
        <tbody id='tbody'>
          {coins.map((coin) => (
            <tr className={styles.tr} key={coin.id}>
              <td className={`${styles.tdLabel} ${styles.currency}`} data-label="Moeda">
                <img src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} alt={`Coin ${coin.symbol}`} />
                <Link to={`/details/${coin.name}`}>
                  <span>{coin.name}</span>
                </Link>
              </td>

              <td className={styles.tdLabel} data-label="Valor Mercado">
                {Number(coin.marketCapUsd).toFixed(2)}
              </td>

              <td className={styles.tdLabel} data-label="Preço">
                {Number(Number(coin.priceUsd) * 5.50).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>

              <td className={styles.tdLabel} data-label="Volume">
                {Number(coin.maxSupply).toFixed(2)}
              </td>

              <td className={styles.tdLabel} data-label="Mudança 24h">
                <span className={Number(coin.changePercent24Hr) < 0 ? styles.tdLoss : styles.tdProfite}>{Number(coin.changePercent24Hr).toFixed(2)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" className={styles.more} onClick={handleGetMore}>Carregar Mais</button>
    </main>
  )
}
