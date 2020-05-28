import React, { useState } from 'react'
import Success from './Success';
import PINComponent from './PIN';

const Pay = ({ pay, onSuccess, onClose, productCode, amount }) => {
  const [step, setStep] = useState(1);

  const handlePaySuccess = data => {
    if (typeof onSuccess === 'function') onSuccess(data);
    setStep(2);
  }
  
  if (step === 1) {
    return <PINComponent pay={pay} onSuccess={handlePaySuccess} productCode={productCode} amount={amount} />
  } else if (step === 2) {
    return <Success onClick={onClose} />
  } else {
    return null
  }
}

export default Pay;