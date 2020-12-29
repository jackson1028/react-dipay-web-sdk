import React, { useState, useEffect, useRef } from 'react'
import rootStyle from '../../dipay.module.scss'
import styles from './login.module.scss'
import { IDFlag } from '../icons'
import LoadingButton from '../LoadingButton';

const numberRegex = /^[0-9]*$/;

const PreLogin = ({ onSuccess, preLogin, phoneNumber, setPhoneNumber }) => {
  const [error, setError] = useState();
  const [validated, setValidated] = useState(false);
  const [process, setProcess] = useState(false);
  const inputRef = useRef(null);

  const validate = (val) => {
    setValidated(true);
    if (!val) {
      setError("Nomor Handphone tidak boleh kosong")
    } else if (!val.match(numberRegex)) {
      setError("Nomor Handphone hanya boleh berisi angka")
    } else if (val.length < 9) {
      setError("Nomor Handphone minimal 9 angka")
    } else {
      setError(undefined)
      return true
    }
  }

  const handleChange = e => {
    const val = e.target.value;
    if (validated) validate(val);
    setPhoneNumber(val);
  }

  const handleBlur = e => {
    const val = e.target.value;
    if (!validated) validate(val);
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (validate(phoneNumber)) {
      setProcess(true);
      const data = {
        phoneNumber: `+62${phoneNumber}`
      };

      preLogin(data)
        .then((res) => {
          const status = res.statusCode;
          setProcess(false);

          if (status === 200) {
            onSuccess()
          } else {
            setError(res.message || "")
          }
        })
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className={rootStyle.modalTitle}>Aktivasi Dipay</h2>
        <p className={styles.helperText}>Silakan masukkan nomor handphone yang terdaftar pada aplikasi Dipay</p>
        <div className={`${styles.formGroup}${error ? ' ' + styles.formGroupError : ''}`}>
          <div className={styles.phoneNumberGroup}>
            <div className={styles.countryCode}>
              <IDFlag />
              <div className={styles.code}>+62</div>
            </div>
            <input
              type="text"
              placeholder="Nomor Handphone"
              autoComplete="off"
              spellCheck="false"
              value={phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={inputRef}
            />
          </div>
          {error
            ? <p className={styles.formHelper}>{error}</p>
            : null
          }
        </div>
        <LoadingButton loading={process} className={`${rootStyle.btn} ${rootStyle.btnPrimary} ${styles.btnLogin}`}>Hubungkan</LoadingButton>
        <p className={styles.accountInfo}>belum memiliki akun Dipay?</p>
        <a href="https://dipay.id/download" target="_blank" className={`${rootStyle.btn} ${rootStyle.btnOutlinePrimary}`}>Download & Daftar Sekarang</a>
      </form>
    </div>
  )
}

export default PreLogin
