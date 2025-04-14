import React from "react";
import styles from "./FullScreenLoading.module.scss";

export default function FullScreenLoading() {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
}
