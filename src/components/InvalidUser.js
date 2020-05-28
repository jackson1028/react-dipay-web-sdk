import React from 'react'
import rootStyle from '../dipay.module.css'

const InvalidUser = ({ dev, onClick }) => (
  !dev
    ?
    <div>
      <h2 className={rootStyle.modalTitle}>Terjadi kesalahan</h2>
      <p>Harap hubungi pihak yang bersangkutan</p>
      <button onClick={onClick} className={`${rootStyle.btn} ${rootStyle.btnPrimary} ${rootStyle.btnClose}`}>Tutup</button>
    </div>
    :
    <div>
      <h2 className={rootStyle.modalTitle}>Secret Key tidak valid</h2>
      <p>Secret key yang anda masukkan tidak terdaftar di sistem kami</p>
      <button onClick={onClick} className={`${rootStyle.btn} ${rootStyle.btnPrimary} ${rootStyle.btnClose}`}>Tutup</button>
    </div>
)

export default InvalidUser