import React, { useRef, useEffect } from 'react'
import rootStyle from '../../dipay.module.css'
import styles from './login.module.css'
import { Phone } from '../icons'

const Intro = ({ onClick }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    btnRef.current.focus();
  }, [])
  
  return (
    <div>
      <div className={styles.phoneIcon}>
        <Phone />
      </div>
      <h2 className={rootStyle.modalTitle}>Lebih mudah pakai Dipay</h2>
      <p className={styles.helperText}>Yuk gunakan Dipay untuk pembayaran yang lebih mudah dan berbagai penawaran lainnya</p>
      <p className={styles.agreeText}>Dengan Aktivasi Anda telah setuju dengan <a href="https://dipay.id/terms-conditions" target="_blank">Syarat dan Ketentuan</a> & <a href="https://dipay.id/privacy-policy" target="_blank">Kebijakan Privasi</a> Dipay</p>
      <button onClick={onClick} ref={btnRef} className={`${rootStyle.btn} ${rootStyle.btnPrimary} ${styles.btnActivate}`}>Aktivasi</button>
    </div>
  )
}


export default Intro