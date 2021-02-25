import React, { useEffect, useState } from 'react'
import Login from './components/Login';
import Modal from './components/Modal';
import Pay from './components/Pay';
import Loading from './components/Loading';
import InvalidClient from './components/InvalidClient';
import InvalidUser from './components/InvalidUser';
import PropTypes from 'prop-types';

const CheckCredential = ({ checkCredential, withUser, dev, onClose, children }) => {
  const [loading, setLoading] = useState(true);
  const [isClientValid, setIsClientValid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(withUser ? false : true);

  useEffect(() => {
    checkCredential()
      .then((res) => {
        const clientId = res?.data?.status?.clientId;
        const userKey = res?.data?.status?.secretKey;
        if (typeof clientId !== 'undefined') setIsClientValid(clientId);
        if (withUser && typeof userKey !== 'undefined') setIsUserValid(userKey);
        setLoading(false);

        // if (status === 200) {
        //   onSuccess()
        // } else {
        //   setError(res.message || "")
        // }
      })
  }, [])

  const renderContent = () => {
    if (!isClientValid) {
      return <InvalidClient dev={dev} onClick={onClose} />
    } else if (!isUserValid) {
      return <InvalidUser dev={dev} onClick={onClose} />
    } else {
      return children
    }
  }

  return (
    loading
      ? <Loading />
      : renderContent()
  )
}

export const DipayLogin = ({ clientId, dev: overwriteDev, open, onClose, onSuccess, immediate, onImmediateError }) => {
  const dev = typeof overwriteDev === 'boolean'
    ? overwriteDev
    : process?.env?.NODE_ENV !== 'production';
  const endPoint = dev ? "https://development-app.mareco.id/api" : "https://app.dipay.id/api";

  const checkCredential = async () => {
    const res = await fetch(`${endPoint}/integration/check-credential`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-id': clientId,
      },
    })
    return res.json();
  }

  const preLogin = async (data) => {
    const res = await fetch(`${endPoint}/integration/pre-login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-id': clientId
      },
      body: JSON.stringify(data)
    })
    return res.json();
  }

  const login = async (data) => {
    const res = await fetch(`${endPoint}/integration/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-id': clientId
      },
      body: JSON.stringify(data)
    })
    return res.json();
  }

  return (
    <Modal in={open} onClose={onClose}>
      <CheckCredential checkCredential={checkCredential} dev={dev} onClose={onClose}>
        <Login
          preLogin={preLogin}
          login={login}
          onClose={onClose}
          onSuccess={onSuccess}
          immediate={immediate}
          onImmediateError={onImmediateError}
        />
      </CheckCredential>
    </Modal>
  )
}

DipayLogin.propTypes = {
  clientId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  dev: PropTypes.bool,
  immediate: PropTypes.string,
  onImmediateError: PropTypes.func
}

export const DipayPay = ({ clientId, dev: overwriteDev, open, onClose, onSuccess, secretKey: userKey = "", productCode, amount }) => {
  const dev = typeof overwriteDev === 'boolean'
    ? overwriteDev
    : process?.env?.NODE_ENV !== 'production';
  const endPoint = dev ? "https://development-app.mareco.id/api" : "https://app.dipay.id/api";

  const checkCredential = async () => {
    const res = await fetch(`${endPoint}/integration/check-credential`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-id': clientId,
        'x-secret-key': userKey,
      },
    })
    return res.json();
  }

  const pay = async (data) => {
    const res = await fetch(`${endPoint}/integration/pre-payment`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-id': clientId,
        'x-secret-key': userKey
      },
      body: JSON.stringify(data)
    })
    return res.json();
  }

  const getConfirmationData = async () => {
    const res = await fetch(`${endPoint}/integration/confirmation`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-id': clientId,
        'x-secret-key': userKey,
      },
    })
    return res.json();
  }

  return (
    <Modal in={open} onClose={onClose} unmountOnExit={true}>
      <CheckCredential checkCredential={checkCredential} withUser dev={dev} onClose={onClose}>
        <Pay
          pay={pay}
          getConfirmationData={getConfirmationData}
          onClose={onClose}
          onSuccess={onSuccess}
          productCode={productCode}
          amount={amount}
        />
      </CheckCredential>
    </Modal>
  )
}

DipayPay.propTypes = {
  clientId: PropTypes.string.isRequired,
  secretKey: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  productCode: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  dev: PropTypes.bool
}

export const getUser = (clientId, userKey = "", overwriteDev) => new Promise((resolve, reject) => {
  const dev = typeof overwriteDev === 'boolean'
    ? overwriteDev
    : process?.env?.NODE_ENV !== 'production';
  const endPoint = dev ? "https://development-app.mareco.id/api" : "https://app.dipay.id/api";

  fetch(`${endPoint}/integration/get-user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-client-id': clientId,
      'x-secret-key': userKey,
    },
  }).then((response) => response.json())
    .then((res) => {
      if (res.statusCode >= 200 && res.statusCode <= 204) {
        resolve(res?.data?.user);
      } else {
        reject(res?.message || "Terjadi Kesalahan")
      }
    })
    .catch((error) => {
      reject('Terjadi Kesalahan');
    });
});
