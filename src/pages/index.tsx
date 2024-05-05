import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Filters from "@/components/filters";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context";
import { ProductResponse } from "@/types/productsResponse";
import SearchBar from "@/components/searchbar";
import { FaFaceSadTear } from "react-icons/fa6";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { filteredData, addItemToCart, cart, toggleCartQuantity } =
    useContext(AppContext);

  useEffect(() => {
    console.log({ filteredData }, "home page");
  }, [filteredData]);

  return (
    <>
      <Head>
        <title>TeeRex Store</title>
        <meta name="description" content="Online Shopping" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className={styles.homeContianer}> */}
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.containerGrid}>
          <div className={styles.filterContainer}>
            <Filters />
          </div>
          <div className={styles.homeContianer}>
            <SearchBar />
            <div className={styles.cardContainer}>
              {filteredData.length > 0 ? (
                filteredData.map((eachProduct: ProductResponse) => {
                  return (
                    <div className={styles.card} key={eachProduct.id}>
                      <p className={styles.productName}>{eachProduct.name}</p>
                      <Image
                        src={eachProduct.imageURL}
                        alt={eachProduct.name}
                        width={500}
                        height={500}
                        className={styles.cardImage}
                      />
                      <p>Rs.{eachProduct.price}</p>

                      {cart.find((item) => item.id === eachProduct.id) ? (
                        <div className={styles.quantity}>
                          <button
                            type="button"
                            className={styles.button}
                            onClick={() =>
                              toggleCartQuantity("-", eachProduct.id)
                            }
                          >
                            -
                          </button>
                          <p className={styles.productName}>
                            {
                              cart.find((item) => item.id === eachProduct.id)
                                ?.cartQuantity
                            }
                          </p>
                          <button
                            type="button"
                            className={styles.button}
                            onClick={() =>
                              toggleCartQuantity("+", eachProduct.id)
                            }
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <div className={styles.addCart}>
                          <button
                            type="button"
                            className={styles.cartButton}
                            onClick={() => addItemToCart(eachProduct)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className={styles.notMatch}>
                  <FaFaceSadTear className={styles.dissappoint} />
                  <p>Filters Does not match,Please try other.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* </div> */}
    </>
  );
}
