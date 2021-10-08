import React, { useState, useEffect } from 'react'
import { DipayLogin, DipayPay, getUser } from 'react-dipay-web-sdk'
import 'react-dipay-web-sdk/dist/index.css'

const clientId = "indofund";
const secretKey = "dd82f82c148788ed308a15e4eb0d6ede:34d30d7c13886b798f51efa3696739e294fb810d355d8b2d2cf5149fc675f820fcf1e7bef687108a73423f3ea41b2ef7ce095063ec65162e430d6f0335f7dcbab7dba6fade482c71f4fd0dca4ca7062f9bfac4a0c211f340c82c54802cb485521975f93af445d8aee5a879c0001bd870";

const App = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    getUser(clientId, secretKey, true)
      .then(res => {
        console.log('Get User Success', res)
      })
      .catch(err => {
        console.log('Get User Error', err)
      })
  }, [])

  return (
    <div>
      <button onClick={e => setOpen1(true)}>Activate Dipay</button>
      <button onClick={e => setOpen2(true)}>Pay with Dipay</button>
      <DipayLogin
        clientId={clientId}
        open={open1}
        onClose={() => setOpen1(false)}
        onSuccess={data => console.log('Response', data)}
        identificationNumber={1234567890}
      />
      <DipayPay
        clientId={clientId}
        secretKey={secretKey}
        open={open2}
        onClose={() => setOpen2(false)}
        onSuccess={data => console.log('Response', data)}
        productCode="PRODUCT_TEST_ID"
        amount={100000}
      />
    </div>
  )
}

export default App
