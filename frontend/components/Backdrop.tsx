import styles from "@styles/Backdrop.module.css";

export const Backdrop = () => {
  return (
    <div className={styles.backdrop}>
      {/* <div className={styles.ellipse}></div> */}
      <div className={styles.background}></div>
    </div>
  );
};
