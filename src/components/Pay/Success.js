import React from 'react'
import rootStyle from '../../dipay.module.scss'
import { Check } from '../icons'

const Success = ({ onClick }) => (
  <div>
    <div className={rootStyle.checkIcon}>
      <Check />
    </div>
    <h2 className={rootStyle.modalTitle}>Pembayaran sedang di proses</h2>
    <button onClick={onClick} className={`${rootStyle.btn} ${rootStyle.btnPrimary} ${rootStyle.btnClose}`}>Tutup</button>
  </div>
)

export default Success
