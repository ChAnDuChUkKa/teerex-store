import { useEffect, useState } from "react";
import { AppContext, ContextProps } from ".";
import axios from "axios";
import {
  FilterTypes,
  ProductResponse,
  ProductToCart,
} from "@/types/productsResponse";
import { Store } from "react-notifications-component";

export const AppProvider = ({ children }: any) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredData, setFilteredData] = useState<ProductResponse[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [filters, setFilters] = useState<FilterTypes>({
    colour: [],
    type: [],
    gender: [],
    price: [],
  });
  const [cart, setCart] = useState<ProductToCart[]>([]);

  useEffect(() => {
    axios
      .get(
        " https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) =>
        Store.addNotification({
          title: "Error!",
          message: "Unable to fetch products data",
          type: "danger",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        })
      );
  }, []);

  const searcProducts = (search: string) => {
    if (search === "") {
      return products;
    } else {
      const filteredProducts = products.filter(
        (productItem: ProductResponse) => {
          return (
            productItem.name.toLowerCase().includes(search.toLowerCase()) ||
            productItem.color.toLowerCase().includes(search.toLowerCase()) ||
            productItem.type.toLowerCase().includes(search.toLowerCase())
          );
        }
      );
      return filteredProducts;
    }
  };

  useEffect(() => {
    setFilteredData(searcProducts(searchString));
  }, [searchString, products]);

  useEffect(() => {
    const limitFn = () => {
      const pricesList = filters.price;
      const pricesArray: number[] = [];
      for (let index = 0; index < pricesList.length; index++) {
        const priceRange = pricesList[index].includes("-")
          ? pricesList[index].split("-")
          : [pricesList[index], "9999"];

        priceRange.forEach((item: string) => {
          const price = parseInt(item);
          if (!isNaN(price)) {
            pricesArray.push(price);
          }
        });
      }

      console.log(pricesArray, "prices array");
      const higherLimit = Math.max(...pricesArray);
      const lowerLimit = Math.min(...pricesArray);
      if (higherLimit === lowerLimit) {
        return { higherLimit: Number.MAX_VALUE, lowerLimit };
      } else {
        return { higherLimit, lowerLimit };
      }
    };

    const allFiltersData = (products: ProductResponse[]) => {
      return products.filter((product) => {
        if (
          filters.colour.length > 0
            ? filters.colour.includes(product.color)
            : true
        ) {
          if (
            filters.gender.length > 0
              ? filters.gender.includes(product.gender)
              : true
          ) {
            if (
              filters.type.length > 0
                ? filters.type.includes(product.type)
                : true
            ) {
              if (filters.price.length === 0) {
                return product;
              } else if (
                product.price >= limitFn().lowerLimit &&
                product.price <= limitFn().higherLimit
              ) {
                return product;
              }
            }
          }
        }
      });
    };

    if (searchString === "") {
      const filteredItemsData = allFiltersData(products);
      setFilteredData(filteredItemsData);
    } else {
      const resultData: ProductResponse[] = searcProducts(searchString);
      const filteredItemsData = allFiltersData(resultData);
      setFilteredData(filteredItemsData);
    }
  }, [filters, searchString]);

  const addItemToCart = (product: ProductResponse) => {
    const cartPresentItem = cart.find((item) => item.id === product.id);

    if (cartPresentItem) {
      const updatedCart = cart.map((item) =>
        item.id === cartPresentItem.id
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, cartQuantity: 1 }]);
    }
  };

  const toggleCartQuantity = (operation: string, id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === id) {
          if (operation === "+") {
            const updatedItem = {
              ...item,
              cartQuantity: item.cartQuantity + 1,
            };
            if (updatedItem.cartQuantity > updatedItem.quantity) {
              Store.addNotification({
                title: "Warning!",
                message: `only ${updatedItem.quantity} available`,
                type: "warning",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                },
              });
              return item;
            } else {
              return updatedItem;
            }
          } else if (operation === "-" && item.cartQuantity >= 0) {
            const updatedItem = {
              ...item,
              cartQuantity: item.cartQuantity - 1,
            };
            if (updatedItem.cartQuantity === 0) {
              Store.addNotification({
                title: "Warning!",
                message: "Removed from cart",
                type: "warning",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                },
              });
            }
            return updatedItem;
          }
        }
        return item;
      });
      return updatedCart.filter((item) => item.cartQuantity > 0);
    });
  };

  const deleteCartItem = (id: number) => {
    Store.addNotification({
      title: "Warning!",
      message: "Removed from cart",
      type: "warning",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const resetFilters = () => {
    setFilters({
      colour: [],
      type: [],
      gender: [],
      price: [],
    });
  };

  const contextProperties: ContextProps = {
    filteredData,
    setSearchString,
    resetFilters,
    setFilters,
    filters,
    setCart,
    cart,
    toggleCartQuantity,
    addItemToCart,
    deleteCartItem,
  };

  return (
    <AppContext.Provider value={contextProperties}>
      {children}
    </AppContext.Provider>
  );
};
