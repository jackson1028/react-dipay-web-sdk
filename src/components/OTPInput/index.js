import React, { useEffect, forwardRef } from 'react';
import styles from './otp.module.css';

function setCaretPosition(ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);

    // IE8 and below
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

const OTPInput = forwardRef(({
  value,
  onChange,
  length = 4,
  loading,
  error,
  disabled,
  autoFocus = true,
  numberOnly = true,
}, ref) => {
  const handleChange = e => {
    const v = e.target.value;
    if (numberOnly && !v.match(/^[0-9]*$/g)) return;
    const wrapper = document.getElementById("OTPMask");
    wrapper.classList.remove(styles.OTPMaskError);
    onChange(v);
  }

  const handleFocus = e => {
    const target = e.currentTarget;
    const index = target.value.length;
    const wrapper = document.getElementById("OTPMask");
    wrapper.classList.add(styles.OTPMaskFocus);
    setCaretPosition(target, index);
  }

  const handleBlur = e => {
    const wrapper = document.getElementById("OTPMask");
    wrapper.classList.remove(styles.OTPMaskFocus);
  }

  const renderMask = () => {
    let view = [];
    for (let i = 0; i < length; i++) {
      view.push(
        <div className={`${styles.OTPValue}${value.length === i || value.length === length ? ' ' + styles.OTPValueActive : ''}`} key={i}>
          {value ? value.charAt(i) : ''}
        </div>
      )
    }
    return view
  }

  const handleClick = () => {
    const input = document.getElementById("OTPInput");
    input.focus()
  }

  const disableArrowKeys = (e) => {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    const input = document.getElementById("OTPInput");
    input.addEventListener("keydown", disableArrowKeys);
    if (autoFocus) input.focus();
  }, [])

  return (
    <div className={styles.OTPRoot}>
      <div className={styles.OTPWrapper} id="OTPWrapper">
        <input
          id="OTPInput"
          className={styles.OTPInput}
          type="text"
          maxLength={length}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          autoCorrect="off"
          disabled={disabled || loading}
          ref={ref}
        />
        <div className={styles.OTPMaskInputContainer}>
          <div className={`${styles.OTPMask}${error ? ' ' + styles.OTPMaskError : ''}${loading ? ' ' + styles.OTPMaskLoading : ''}`} id="OTPMask" onClick={handleClick}>
            {renderMask()}
          </div>
        </div>
        {error &&
          <p className={styles.helperText}>{error}</p>
        }
      </div>
    </div>
  )
})

export default OTPInput