import { FilterTypes, ProductResponse, ProductToCart } from "@/types/productsResponse";
import { Dispatch, SetStateAction, createContext } from "react";

export type ContextProps={
    filteredData:ProductResponse[],
    setSearchString:Dispatch<SetStateAction<string>>,
    resetFilters:()=>void,
    setFilters:Dispatch<SetStateAction<FilterTypes>>,
    filters:FilterTypes,
    setCart:Dispatch<SetStateAction<ProductToCart[]>>,
    cart:ProductToCart[],
    toggleCartQuantity:(x:string,y:number)=>void,
    addItemToCart:(x:ProductResponse)=>void,
    deleteCartItem:(id:number)=>void

}

export const AppContext=createContext<ContextProps>({
    filteredData:[],
    setSearchString:()=>{},
    resetFilters:()=>{},
    setFilters:()=>{},
    filters:{
        colour: [],
        type: [],
        price: [],
        gender: []
    },
setCart:()=>{},
cart:[],
toggleCartQuantity:()=>{},
addItemToCart:()=>{},
deleteCartItem:()=>{}

});

