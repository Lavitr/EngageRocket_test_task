import styles from "../app/page.module.css";

const ButtonsBlock = ({ page, total_pages, setPage }) => (
  <div className={styles.buttonContainer}>
    <button
      onClick={() => setPage((old) => Math.max(old - 1, 1))}
      disabled={page === 1}
    >
      &lt;
    </button>
    {new Array(total_pages).fill(null).map((i, index) => (
      <button
        key={index}
        disabled={page === index + 1}
        className={page === index + 1 ? styles.active : ""}
        onClick={() => setPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => setPage((old) => (page < total_pages ? old + 1 : old))}
      disabled={!(page < total_pages)}
    >
      &gt;
    </button>
  </div>
);

export default ButtonsBlock;
