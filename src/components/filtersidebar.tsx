import Filters from "./filters";
import styles from "@/styles/Filters.module.css";

export const FilterSidebar = ({ isOpen, onClose }: any) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.filterheading}>
        <p className={styles.heading}>Filters</p>
        <button
          className={`${styles.button} ${styles.crossButton}`}
          onClick={onClose}
        >
          X
        </button>
      </div>

      <Filters />
    </div>
  );
};
