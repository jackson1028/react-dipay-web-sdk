import React, { useRef, useEffect } from 'react'
import rootStyle from '../../dipay.module.scss'
import styles from './login.module.scss'
import { Phone } from '../icons'
import LoadingButton from '../LoadingButton'

const Intro = ({ onClick, immediateLoading }) => {
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
      <LoadingButton loading={immediateLoading} onClick={onClick} ref={btnRef} className={`${rootStyle.btn} ${rootStyle.btnPrimary} ${styles.btnActivate}`}>Aktivasi</LoadingButton>
    </div>
  )
}


export default Intro
