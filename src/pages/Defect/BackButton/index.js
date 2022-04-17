import React from 'react'
import { Link } from 'react-router-dom'
import styles from './style.module.css'

export default (props) => {
  const { children } = props
  return (
    <h2 className={styles.backBtnWrapper}>
      <Link to={'/defect'} className={styles.title}>
        缺陷管理
      </Link>
      <span className={styles.divider}>/</span>
      <span className={styles.title}>{children}</span>
    </h2>
  )
}