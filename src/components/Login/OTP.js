import React, { useState, useRef, useEffect } from 'react'
import rootStyle from '../../dipay.module.scss'
import styles from './login.module.scss'
import LoadingButton from '../LoadingButton';
import OTPInput from '../OTPInput';

const numberRegex = /^[0-9]*$/;

const OTP = ({ onSuccess, login, phoneNumber }) => {
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState();
  const [process, setProcess] = useState(false);
  const OTPRef = useRef(null);

  const validate = (val) => {
    if (!val) {
      setError("OTP tidak boleh kosong")
    } else if (!val.match(numberRegex)) {
      setError("OTP hanya boleh berisi angka")
    } else if (val.length != 4) {
      setError("OTP harus 4 angka")
    } else {
      setError(undefined)
      return true
    }
  }

  const submitOTP = e => {
    if (e) e.preventDefault();

    if (validate(OTP)) {
      setProcess(true);
      const data = {
        phoneNumber: `+62${phoneNumber}`,
        oneTimePin: OTP
      };

      login(data)
        .then((res) => {
          const status = res.statusCode;
          setProcess(false);

          if (status === 200) {
            onSuccess(res.data)
          } else {
            setOTP('');
            OTPRef.current.focus();
            setError(res.message || "")
          }
        })
    }
  }

  useEffect(() => {
    if (OTP.length >= 4) submitOTP()
  }, [OTP])

  return (
    <div>
      <form onSubmit={submitOTP}>
        <h2 className={rootStyle.modalTitle}>Masukkan Kode Verifikasi</h2>
        <p className={styles.helperText}>Kode verifikasi telah dikirimkan ke<br /><span className={rootStyle.fontWeightMedium}>{`+62${phoneNumber}`}</span></p>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          length={4}
          loading={process}
          error={error}
          ref={OTPRef}
        />
        <LoadingButton loading={process} className={`${rootStyle.btn} ${rootStyle.btnPrimary} ${styles.btnVerifikasi}`}>Verifikasi</LoadingButton>
        <p className={styles.resendText}>Silahkan menunggu <span className={rootStyle.textPrimary}>30 detik</span> untuk mengirim ulang</p>
      </form>
    </div>
  )
}

export default OTP
