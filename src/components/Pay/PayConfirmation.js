import React from 'react';
import rootStyle from '../../dipay.module.scss';
import styles from './pay.module.css';

const currency = Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });

const toIDR = (v) => {
  let modV = v;

  if (!isNaN(v)) {
    modV = currency.format(v)
  }

  return modV
}

const PayConfirmation = ({ productCode, amount, fee, onClose, onNext }) => {
  return (
    <div className={styles.payConfimation}>
      <h2 className={rootStyle.modalTitle}>Konfirmasi Pembayaran</h2>
      <div className={styles.infoWrapper}>
        <div className={styles.blockInfo}>
          <p>{productCode}</p>
          <p>{toIDR(amount)}</p>
        </div>
        <div className={styles.blockInfo}>
          <p>Biaya Admin</p>
          <p>{toIDR(fee)}</p>
        </div>
        <hr />
        <div className={styles.blockInfo}>
          <p className={rootStyle.fontWeightMedium}>Total Pembayaran</p>
          <p className={rootStyle.fontWeightMedium}>{toIDR(+amount + +fee)}</p>
        </div>
      </div>
      <button className={`${rootStyle.btn} ${rootStyle.btnPrimary}`} onClick={onNext}>Bayar</button>
      <button className={`${rootStyle.btn} ${styles.btnCancel}`} onClick={onClose}>Batal</button>
    </div>
  )
}

export default PayConfirmation;
