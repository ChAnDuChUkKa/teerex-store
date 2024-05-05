import styles from "@/styles/searchbar.module.css";
import filterStyles from "@/styles/Filters.module.css";
import { useContext, useEffect, useState } from "react";
import { FilterSidebar } from "./filtersidebar";
import { FaMagnifyingGlass, FaCartShopping, FaFilter } from "react-icons/fa6";
import { AppContext } from "@/context";

const SearchBar = () => {
  const { setSearchString } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSearch = () => {
    setSearchString(searchText);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    searchText === "" ? handleSearch() : null;
  }, [searchText]);

  return (
    <div className={`${styles.searchFilter}`}>
      <div className={styles.searchItems}>
        <div className={styles.inputContainer}>
          <input
            type="search"
            placeholder="Search"
            className={styles.searchInput}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            className={`${styles.searchButton} search-button-container`}
            onClick={handleSearch}
          >
            {/* <FaMagnifyingGlass className={styles.searchIcon} /> */}
            Search
          </button>
        </div>
        <button
          type="button"
          onClick={() => toggleSidebar()}
          className={` ${styles.searchButton} ${styles.filterButton}`}
        >
          <FaFilter className={styles.searchIcon} />
        </button>
        {isSidebarOpen && (
          <div className={filterStyles.overlay} onClick={closeSidebar}></div>
        )}
        <FilterSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>
    </div>
  );
};
export default SearchBar;
