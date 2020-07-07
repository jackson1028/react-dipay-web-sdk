import React, { useEffect } from 'react'
import styles from '../dipay.module.css'
import ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group';
import { Close } from './icons';

const duration = {
  enter: 225,
  exit: 195,
};

const defaultStyle = {
  visibility: "hidden",
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1, visibility: "visible", transition: `opacity ${duration.enter}ms ease-in-out` },
  entered: { opacity: 1, visibility: "visible", transition: `opacity ${duration.enter}ms ease-in-out` },
  exiting: { opacity: 0, visibility: "visible", transition: `opacity ${duration.exit}ms ease-in-out` },
  exited: { opacity: 0, visibility: "hidden", transition: `opacity ${duration.exit}ms ease-in-out` },
};

const Modal = ({ in: inProp, onClose, children, unmountOnExit }) => {
  const body = document.body;

  const handleClose = () => {
    if (typeof onClose === 'function') onClose();
  }

  const onEscKeyDown = e => {
    if (e.key !== "Escape") return;
    handleClose();
  };

  useEffect(() => {
    if (inProp) window.addEventListener("keydown", onEscKeyDown, false);
    return () => {
      if (inProp) window.removeEventListener("keydown", onEscKeyDown, false);
    }
  }, [inProp])

  return ReactDOM.createPortal(
    <Transition in={inProp} timeout={duration} mountOnEnter onEnter={node => node.offsetHeight} unmountOnExit={unmountOnExit}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
          className={styles.modalRoot}
        >
          <div className={styles.modalBackdrop} onClick={handleClose}></div>
          <div className={styles.modalBody}>
            <button className={styles.modalCloseBtn} onClick={handleClose}>
              <Close />
            </button>
            <div className={styles.modalContent}>
              {children}
            </div>
          </div>
        </div>
      )}
    </Transition>
    , body
  )
}

export default Modal