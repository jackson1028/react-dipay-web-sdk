import React, { useState } from 'react'
import Intro from './Intro'
import PreLogin from './PreLogin';
import OTP from './OTP';
import Success from './Success';

const Login = ({ preLogin, login, onSuccess, onClose }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLoginSuccess = data => {
    if (typeof onSuccess === 'function') onSuccess(data);
    setStep(4);
  }

  const handleLoginDone = () => {
    if (typeof onClose === 'function') onClose();
  }
  
  if (step === 1) {
    return <Intro onClick={() => setStep(2)} />
  } else if (step === 2) {
    return <PreLogin onSuccess={() => setStep(3)} preLogin={preLogin} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
  } else if (step === 3) {
    return <OTP onSuccess={handleLoginSuccess} login={login} phoneNumber={phoneNumber} />
  } else if (step === 4) {
    return <Success onClick={handleLoginDone} />
  } else {
    return null
  }
}

export default Login;