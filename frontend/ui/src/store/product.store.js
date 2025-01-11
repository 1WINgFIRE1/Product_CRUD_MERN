import {create} from "zustand"

//creating a store for product(global state)
export const useProduct = create((set)=>({
    products:[],  //initial state
    setProduct: (product)=>set({product}), //setProduct action
    addProduct: async (product)=>{          //addProduct action
        //validation
        if(!product.name || !product.price || !product.image){
            return {success:false,message:"Fill all the product details!"}
        }
        //fetching data from backend after adding product to backend
        const res = await fetch("http://localhost:9000/api/products",{ 
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(product)
        })
        //convert the data from HTTP json string to JS json onject
        const data= await res.json()
        //updating state(products array) after fetching(here state is bascially products array which is updated)
        set((state)=>({products:[...state.products,data.data]}));
        return {success:true,message:"Product Successfully added!"}
    },
    fetchProducts: async()=>{
        const res = await fetch("http://localhost:9000/api/products")
        const data = await res.json()
        set({products:data.data})
    },
    //to delete product from database
    deleteProduct: async(product_id)=>{
        const res = await fetch(`http://localhost:9000/api/products/${product_id}`,{method:"DELETE"})
        const data = await res.json()
    
        if(!data.success){
            return {success:false, message:"Error on Deleting..."}
        }
        //update the products state(products array) after deleting the product from backend database 
        //Also it trigger re-rendering of the component as products state is updated **(important)**
        set((state)=>({products:state.products.filter(product=> product_id!==product._id)}))
        return {success:true, message:"Deleted!"}
    },
    //to update product in database
    updateProduct: async(product_id,updatedproduct)=>{
        const res = await fetch(`http://localhost:9000/api/products/${product_id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedproduct)
        })

        const data = await res.json();
        if(!data.success){
            return {success:false, message:"Error on Updating..."}
        }
        //Re-rendering happens if we update the products array
        set((state)=>({products:state.products.map(product=> product._id === product_id? data.data:product)}))
        return {success:true,message:"Updated Successfully!"}
    }
}))