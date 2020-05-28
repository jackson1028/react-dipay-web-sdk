import React, { useState, useEffect, useRef } from 'react'
import rootStyle from '../../dipay.module.css'
import styles from './pay.module.css'
import PINInput from '../PINInput';
import LoadingButton from '../LoadingButton';

const numberRegex = /^[0-9]*$/;

const PINComponent = ({ pay, onSuccess, productCode, amount }) => {
  const [PIN, setPIN] = useState("");
  const [error, setError] = useState();
  const [validated, setValidated] = useState(false);
  const [process, setProcess] = useState(false);
  const inputRef = useRef(null);

  const validate = (PIN) => {
    setValidated(true);
    if (!PIN) {
      setError("PIN tidak boleh kosong")
    } else if (!PIN.match(numberRegex)) {
      setError("PIN hanya boleh berisi angka")
    } else if (PIN.length != 6) {
      setError("PIN harus 6 angka")
    } else {
      setError(undefined)
      return true
    }
  }

  const handleChange = val => {
    if (validated) validate(val);
    setPIN(val);
  }

  const submit = e => {
    if (e) e.preventDefault();

    if (validate(PIN)) {
      setProcess(true);
      const data = {
        transactionDate: new Date().toISOString(),
        productCode,
        totalPrice: amount,
        pin: PIN
      };

      pay(data)
        .then((res) => {
          const status = res.statusCode;
          setProcess(false);

          if (status === 200) {
            onSuccess(res.data)
          } else {
            setPIN('');
            inputRef.current.focus();
            setError(res.message || "")
          }
        })
    }
  }

  useEffect(() => {
    if (PIN.length >= 6) submit()
  }, [PIN])

  return (
    <div>
      <form onSubmit={submit}>
        <h2 className={rootStyle.modalTitle}>PIN Dipay</h2>
        <p className={styles.helperText}>Silahkan masukkan 6 digit kode PIN Dipay Anda</p>
        <PINInput
          value={PIN}
          onChange={handleChange}
          length={6}
          loading={process}
          error={error}
          ref={inputRef}
        />
        <LoadingButton loading={process} className={`${rootStyle.btn} ${rootStyle.btnPrimary} ${styles.btnBayar}`}>Bayar</LoadingButton>
      </form>
    </div>
  )
}

export default PINComponent