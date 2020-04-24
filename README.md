# React Dipay Integration

[![NPM](https://img.shields.io/npm/v/react-dipay.svg)](https://www.npmjs.com/package/react-dipay) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-dipay
```

## Login Example

```jsx
import React, { useState } from 'react'
import { DipayLogin } from 'react-dipay'
import 'react-dipay/dist/index.css' // Import style in your Root file such as <App>

const App = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <button onClick={e => setOpen(true)}>Activate Dipay</button>
      <DipayLogin
        clientId="{YOUR_CLIENT_ID}" // Contact us for your client ID
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={data => console.log('Login Response', data)}
      />
    </div>
  )
}

export default App

```

## License

MIT © [hendra-foo](https://github.com/hendra-foo)
