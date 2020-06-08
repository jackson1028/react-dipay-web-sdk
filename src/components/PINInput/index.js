import React, { useEffect, forwardRef, useRef } from 'react';
import styles from './pin.module.css';

function setCaretPosition(ctrl) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(10, 10);

    // IE8 and below
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', 10);
    range.moveStart('character', 10);
    range.select();
  }
}

function disableKeys(e) {
  if ([16, 17, 18, 32, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}

const PINInput = forwardRef(({
  value,
  onChange,
  length = 6,
  loading,
  error,
  disabled,
  autoFocus = true,
  numberOnly = true,
  show,
  setShow
}, ref) => {
  const input = useRef(null);
  const pinMaskRef = useRef(null);

  const handleChange = e => {
    const { target, target: { value } } = e;
    if (numberOnly && !value.match(/^[0-9]*$/g)) return;
    if (pinMaskRef.current) pinMaskRef.current.classList.remove(styles.PINMaskError);
    onChange(value);
    setCaretPosition(target);
  }

  const handleFocus = e => {
    const target = e.target;
    if (pinMaskRef.current) pinMaskRef.current.classList.add(styles.PINMaskFocus);
    setCaretPosition(target);
  }

  const handleBlur = e => {
    if (pinMaskRef.current) pinMaskRef.current.classList.remove(styles.PINMaskFocus);
  }

  const renderMask = () => {
    let view = [];
    for (let i = 0; i < length; i++) {
      view.push(
        <div className={`${styles.PINValue}${value.length === i || value.length === length ? ' ' + styles.PINValueActive : ''}${value && value.length > i ? ' ' + styles.PINHasValue : ''}`} key={i}>
          <div className={styles.value}>{value ? value.charAt(i) : ''}</div>
          <div className={styles.dot}></div>
        </div>
      )
    }
    return view
  }

  const focusInput = () => {
    if (input.current) input.current.focus()
  }

  const handleVisibleChange = () => {
    if (typeof setShow === 'function') setShow();
    focusInput()
  }

  useEffect(() => {
    if (autoFocus) focusInput();
    if (input.current) input.current.addEventListener("keydown", disableKeys);
    return () => {
      if (input.current) input.current.removeEventListener("keydown", disableKeys);
    }
  }, [])

  return (
    <div className={styles.PINRoot}>
      <div className={styles.PINWrapper}>
        <input
          className={styles.PINInput}
          type="password"
          maxLength={length}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          autoCorrect="off"
          disabled={disabled || loading}
          ref={(r) => {
            ref.current = r;
            input.current = r;
          }}
        />
        <div className={`${styles.PINMaskInputContainer}${show ? ` ${styles.showPIN}` : ''}`}>
          <div
            className={`${styles.PINMask}${error ? ' ' + styles.PINMaskError : ''}${loading ? ' ' + styles.PINMaskLoading : ''}`}
            ref={pinMaskRef}
            onClick={focusInput}
          >
            {renderMask()}
          </div>
          <button tabIndex="-1" type="button" className={styles.showToggler} onClick={handleVisibleChange}>
            <VisibleIcon size={24} show={show} />
          </button>
        </div>
        {error &&
          <p className={styles.helperText}>{error}</p>
        }
      </div>
    </div>
  )
})

const VisibleIcon = ({ size, show }) => (
  <svg fill="currentColor" width={size} height={size} viewBox="0 0 24 24">
    {show
      ? <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
      : <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
    }
  </svg>
)

export default PINInput