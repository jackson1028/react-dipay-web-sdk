import React from 'react'
import styles from '../dipay.module.css';
import { Spinner } from './icons';

const Loading = () => (
  <div className={styles.loadingRoot}>
    <Spinner size={48} />
  </div>
)

export default Loading