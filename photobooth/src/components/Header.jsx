import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>✿ Vintage Photobooth ✿</h1>
      <p className={styles.subtitle}>film · filters · forever memories</p>
    </header>
  )
}
