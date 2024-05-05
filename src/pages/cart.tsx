import { AppContext } from "@/context";
import styles from "@/styles/Home.module.css";
import { ProductResponse, ProductToCart } from "@/types/productsResponse";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaFaceSadTear } from "react-icons/fa6";

const Cart = () => {
  const { cart, toggleCartQuantity, deleteCartItem } = useContext(AppContext);

  return (
    <div className={`${styles.main} ${styles.cartContainer}`}>
      {cart.length > 0 ? (
        <>
          <p className={styles.productName}>Cart</p>
          {cart.map((eachItem: ProductToCart) => {
            return (
              <div key={eachItem.id} className={styles.cartItem}>
                <div className={styles.innerCartDesc}>
                  <Image
                    alt="cart image"
                    src={eachItem.imageURL}
                    width={150}
                    height={150}
                    className={styles.cartImage}
                  />
                  <div className={styles.descContainer}>
                    <p className={styles.productName}>{eachItem.name}</p>
                    <p className={styles.desc}>₹{eachItem.price}</p>
                    <div className={styles.quantity}>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => toggleCartQuantity("-", eachItem.id)}
                      >
                        -
                      </button>
                      <p className={styles.productName}>
                        {eachItem.cartQuantity}
                      </p>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => toggleCartQuantity("+", eachItem.id)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => deleteCartItem(eachItem.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <p>₹{eachItem.price * eachItem.cartQuantity}</p>
              </div>
            );
          })}
          <div className={styles.cartTotal}>
            <p className={styles.productName}>Total Value</p>
            <p className={styles.productName}>
              ₹
              {cart.reduce((total, currentItem) => {
                return total + currentItem.price * currentItem.cartQuantity;
              }, 0)}
            </p>
          </div>
        </>
      ) : (
        <div className={styles.notMatch}>
          <FaFaceSadTear className={styles.dissappoint} />
          <p>
            No items present. Add from{" "}
            <Link href={"/"} className={styles.linkItem}>
              Products
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};
export default Cart;
