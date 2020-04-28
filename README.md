# React Dipay Integration

[![NPM](https://img.shields.io/npm/v/react-dipay.svg)](https://www.npmjs.com/package/react-dipay) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation and usage

Install with npm:
```bash
npm install react-dipay
```

Then import styles to your app:
```jsx
// Import style in Root Component such as <App>
import 'react-dipay/dist/index.css'
```

## Example

```jsx
import React, { useState, useEffect } from 'react'
import { DipayLogin, DipayPay, getUser } from 'react-dipay'
import 'react-dipay/dist/index.css' // Import style in your Root file such as <App>

const App = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    getUser("{YOUR_CLIENT_ID}}", "{SECRET_KEY}")
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
        clientId="{YOUR_CLIENT_ID}" // Contact us for your Client ID
        open={open1}
        onClose={() => setOpen1(false)}
        onSuccess={data => console.log('Response', data)}
      />
      <DipayPay
        clientId="{YOUR_CLIENT_ID}" // Contact us for your Client ID
        secretKey="{SECRET_KEY}" // To determine user
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

```


## Component

### `DipayLogin` Props
| Key | Required | Type | Description
| --- | -------- | ---- | ----------- |
| `clientId` | `true` | `string` | As credential to integrate with Dipay
| `open` | `true` | `boolean` | Control whether the menu is open
| `onClose` | `true` | `function` | Subscribe to close events
| `onSuccess` | `false` | `function` | Subscribe to Login Success event
| `dev` | `false` | `boolean` | Set development mode<br>Default `process.env.NODE_ENV` or `true`

### `DipayPay` Props
| Key | Required | Type | Description
| --- | -------- | ---- | ----------- |
| `clientId` | `true` | `string` | As credential to integrate with Dipay
| `secretKey` | `true` | `string` | As credential to integrate with Dipay
| `open` | `true` | `boolean` | Control whether the menu is open
| `onClose` | `true` | `function` | Subscribe to close events
| `onSuccess` | `false` | `function` | Subscribe to Login Success event
| `productCode` | `true` | `string` | Product code / id to be saved in Dipay
| `amount` | `true` | `number` | Amount to be paid
| `dev` | `false` | `boolean` | Set development mode<br>Default `process.env.NODE_ENV` or `true`


## Methods

| Name | Return | Description
| ---- | ------ | ----------- |
| `getUser(clientId, secretKey, dev)` | [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | Get user data<br>`dev` default value `process.env.NODE_ENV` or `true`


## License

MIT © [hendra-foo](https://github.com/hendra-foo)
