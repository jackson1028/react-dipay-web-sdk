import React from 'react'
import styles from '../dipay.module.scss';
import { Spinner } from './icons';

const Loading = () => (
  <div className={styles.loadingRoot}>
    <Spinner size={48} />
  </div>
)

export default Loading
