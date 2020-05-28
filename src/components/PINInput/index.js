import React, { useEffect, forwardRef } from 'react';
import styles from './pin.module.css';

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

const PINInput = forwardRef(({
  value,
  onChange,
  length = 6,
  loading,
  error,
  disabled,
  autoFocus = true,
  numberOnly = true,
}, ref) => {
  const handleChange = e => {
    const v = e.target.value;
    if (numberOnly && !v.match(/^[0-9]*$/g)) return;
    const wrapper = document.getElementById("PINMask");
    wrapper.classList.remove(styles.PINMaskError);
    onChange(v);
  }

  const handleFocus = e => {
    const target = e.currentTarget;
    const index = target.value.length;
    const wrapper = document.getElementById("PINMask");
    wrapper.classList.add(styles.PINMaskFocus);
    setCaretPosition(target, index);
  }

  const handleBlur = e => {
    const wrapper = document.getElementById("PINMask");
    wrapper.classList.remove(styles.PINMaskFocus);
  }

  const renderMask = () => {
    let view = [];
    for (let i = 0; i < length; i++) {
      view.push(
        <div className={`${styles.PINValue}${value.length === i || value.length === length ? ' ' + styles.PINValueActive : ''}${value && value.length > i ? ' ' + styles.PINHasValue : ''}`} key={i}>
          {/* {value ? value.charAt(i) : ''} */}
          <div></div>
        </div>
      )
    }
    return view
  }

  const handleClick = () => {
    const input = document.getElementById("PINInput");
    input.focus()
  }

  const disableArrowKeys = (e) => {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    const input = document.getElementById("PINInput");
    input.addEventListener("keydown", disableArrowKeys);
    if (autoFocus) input.focus();
  }, [])

  return (
    <div className={styles.PINRoot}>
      <div className={styles.PINWrapper} id="PINWrapper">
        <input
          id="PINInput"
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
          ref={ref}
        />
        <div className={styles.PINMaskInputContainer}>
          <div className={`${styles.PINMask}${error ? ' ' + styles.PINMaskError : ''}${loading ? ' ' + styles.PINMaskLoading : ''}`} id="PINMask" onClick={handleClick}>
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

export default PINInput