import React, { useState, useEffect } from 'react'
import Success from './Success';
import PINComponent from './PIN';
import PayConfirmation from './PayConfirmation';
import Loading from '../../components/Loading';

const Pay = ({ pay, getConfirmationData, onSuccess, onClose, productCode, amount }) => {
  const [step, setStep] = useState(1);
  const [fee, setFee] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePaySuccess = data => {
    if (typeof onSuccess === 'function') onSuccess(data);
    setStep(3);
  };

  useEffect(() => {
    setIsLoading(true);
    getConfirmationData()
      .then(({ data: { adminFee } }) => setFee(adminFee))
      .catch(() => { })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />
  }

  if (step === 1) {
    return <PayConfirmation productCode={productCode} amount={amount} fee={fee} onNext={() => setStep(step + 1)} onClose={onClose} />
  } else if (step === 2) {
    return <PINComponent pay={pay} onSuccess={handlePaySuccess} productCode={productCode} amount={amount} />
  } else if (step === 3) {
    return <Success onClick={onClose} />
  } else {
    return null
  }
}

export default Pay;