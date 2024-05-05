import { AppContext } from "@/context";
import styles from "@/styles/Filters.module.css";
import { FilterTypes, FiltersEnum } from "@/types/productsResponse";
import { FiltersList } from "@/utils/filterConstants";
import { useContext, useEffect } from "react";

const Filters = () => {
  const { setFilters, filters, resetFilters } = useContext(AppContext);

  const handleFilters = (filter: string, value: string, event: any) => {
    const currentFilters: FilterTypes = { ...filters };
    const lowerCaseFilter: string = filter.toLowerCase();
    if (!currentFilters[lowerCaseFilter].includes(value)) {
      if (event.target.checked) {
        currentFilters[lowerCaseFilter].push(value);
      }
    } else {
      currentFilters[lowerCaseFilter].splice(
        currentFilters[lowerCaseFilter].indexOf(value),
        1
      );
    }
    setFilters({ ...currentFilters });
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterElements}>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${styles.reset}`}
            type="button"
            onClick={() => resetFilters()}
          >
            Reset
          </button>
          {/* <button className={`${styles.button} ${styles.apply}`} type="submit">
          Apply
        </button> */}
        </div>
        {/* color filter */}
        <p className={styles.heading}>{FiltersEnum.colour}</p>
        <div className={styles.filterItem}>
          {FiltersList.color.map((eachColor: string) => {
            return (
              <div className={styles.filterType} key={eachColor}>
                <label
                  htmlFor={eachColor}
                  className={`${styles.desc} ${styles.filterType}`}
                >
                  <input
                    type="checkbox"
                    name={eachColor}
                    id={eachColor}
                    onChange={(e: any) =>
                      handleFilters(FiltersEnum.colour, eachColor, e)
                    }
                    checked={filters.colour.includes(eachColor)}
                  />
                  {eachColor}
                </label>
              </div>
            );
          })}
        </div>
        {/* Gender */}
        <p className={styles.heading}>{FiltersEnum.gender}</p>
        <div className={styles.filterItem}>
          {FiltersList.gender.map((eachGender: string) => {
            return (
              <div className={styles.filterType} key={eachGender}>
                <label
                  htmlFor={eachGender}
                  className={`${styles.desc} ${styles.filterType}`}
                >
                  <input
                    type="checkbox"
                    name={eachGender}
                    id={eachGender}
                    onChange={(e: any) =>
                      handleFilters(FiltersEnum.gender, eachGender, e)
                    }
                    checked={filters.gender.includes(eachGender)}
                  />
                  {eachGender}
                </label>
              </div>
            );
          })}
        </div>
        <div className={styles.filterItem}>
          <p className={styles.heading}>{FiltersEnum.price}</p>

          {FiltersList.price.map((eachPrice: string) => {
            return (
              <div className={styles.filterType} key={eachPrice}>
                <label
                  htmlFor={eachPrice}
                  className={`${styles.desc} ${styles.filterType}`}
                >
                  <input
                    type="checkbox"
                    name={eachPrice}
                    id={eachPrice}
                    onChange={(e: any) =>
                      handleFilters(FiltersEnum.price, eachPrice, e)
                    }
                    checked={filters.price.includes(eachPrice)}
                  />
                  Rs.{eachPrice}
                </label>
              </div>
            );
          })}
        </div>

        <p className={styles.heading}>{FiltersEnum.type}</p>
        <div className={styles.filterItem}>
          {FiltersList.type.map((eachType: string) => {
            return (
              <div className={styles.filterType} key={eachType}>
                <label
                  htmlFor={eachType}
                  className={`${styles.desc} ${styles.filterType}`}
                >
                  <input
                    type="checkbox"
                    name={eachType}
                    id={eachType}
                    onChange={(e: any) =>
                      handleFilters(FiltersEnum.type, eachType, e)
                    }
                    checked={filters.type.includes(eachType)}
                  />
                  {eachType}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Filters;
