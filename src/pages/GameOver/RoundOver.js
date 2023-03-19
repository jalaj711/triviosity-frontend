import React from "react";
import styles from "./GameOver.module.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Congratulations!</h1>
        <div className={styles.message}>You have completed this round of Triviosity</div>
        <div className={styles.message}>Head to the other themes for more fun!</div>
        <button className={styles.btn} onClick={() => navigate("/theme")}>Select new theme</button>
        <div className={styles.message}>Click below to view the leaderboard</div>
        <button className={styles.btn} onClick={() => navigate("/leaderboard")}>Go to Leaderboard</button>
      </div>
    </div>
  );
};

export default Login;
