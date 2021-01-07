import React, { forwardRef, Fragment } from 'react'
import styles from '../dipay.module.scss'
import { Spinner } from './icons'

const LoadingButton = forwardRef(({ type = 'submit', className, disabled, loading, onClick, children }, ref) => (
  <button
    type={type}
    onClick={onClick}
    className={`${styles.btnLoading}${className ? ' ' + className : ''}`}
    disabled={disabled || loading}
    ref={ref}
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
))

export default LoadingButton
