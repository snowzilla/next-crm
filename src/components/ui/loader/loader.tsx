"use client"

import styles from "./loader.module.css"

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}/>
    </div>
  )
}
