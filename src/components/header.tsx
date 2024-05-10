import { AppContext } from "@/context";
import styles from "@/styles/header.module.css";
import Link from "next/link";
import router from "next/router";
import { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
  const { cart } = useContext(AppContext);
  const handleLinkClick = (event: any) => {
    event.preventDefault(); // Prevent default anchor tag navigation behavior

    // Perform navigation programmatically to the new route
    router.push("/cart", undefined, { shallow: true }); // Adjust the route and options as needed
  };
  return (
    <div className={styles.header}>
      <div className={styles.headerDiv}>
        <Link href="/">TeeRex Store</Link>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/cart" onClick={(e) => handleLinkClick(e)}>
          <div className={styles.cart}>
            <FaCartShopping />
            <p className={styles.cartNumber}>{cart.length}</p>
          </div>
        </a>
      </div>
    </div>
  );
};
export default Header;
