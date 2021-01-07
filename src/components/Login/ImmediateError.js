import React from 'react'
import rootStyle from '../../dipay.module.scss'
import styles from './login.module.scss'

const ImmediateError = () => {
  return (
    <div>
      <h2 className={rootStyle.modalTitle}>Aktivasi Dipay</h2>
      <p className={styles.helperText}>Oops, nomor ini belum terdaftar sebagai akun pengguna Dipay</p>
      <a href="https://dipay.id/download" target="_blank" className={`${rootStyle.btn} ${rootStyle.btnOutlinePrimary}`}>Download & Daftar Sekarang</a>
    </div>
  )
}

export default ImmediateError
