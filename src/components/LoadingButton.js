import React, { Fragment } from 'react'
import styles from '../dipay.module.scss'
import { Spinner } from './icons'

const LoadingButton = ({ type = 'submit', className, disabled, loading, onClick, children }) => (
  <Fragment>
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btnLoading}${className ? ' ' + className : ''}`}
      disabled={disabled || loading}
    >
      {loading &&
        <div className={styles.btnProgressWrapper}>
          <Spinner />
        </div>
      }
      <div>
        {children}
      </div>
    </button>
  </Fragment>
)

export default LoadingButton
