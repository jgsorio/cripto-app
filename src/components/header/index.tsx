import styles from './header.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className={styles.container}>
      <Link to="/">
        <img src={logo} alt='logo' className={styles.logo} />
        <span>CriptoApp</span>
      </Link>
    </header>
  )
}
