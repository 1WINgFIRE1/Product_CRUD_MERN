import React from 'react'
import { Heading,Container,Button,Input,useColorModeValue,Box,VStack,useToast } from "@chakra-ui/react";
import {useState} from "react";
//importing useProduct store
import {useProduct} from "../store/product.store.js";

export default function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    
    //using addProduct action from useProduct store
    const {addProduct} = useProduct();
    const toast = useToast()
    //addProduct function
    async function onAddProduct() {
        const {success, message} = await addProduct(newProduct);
        if(success){
            toast({
                title: "Product Added",
                description: message,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
        else{
            toast({
                title: "Failed to add product",
                description: message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
        //to refresh the form after adding product
        setNewProduct({ name: "", price: "", image: "" });
    }
    return (
        <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>

            <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                    <Input
                        placeholder='Product Name'
                        name='name'
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <Input
                        placeholder='Price'
                        name='price'
                        type='number'
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <Input
                        placeholder='Image URL'
                        name='image'
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />

                    <Button colorScheme='blue' onClick={onAddProduct} w='full'>
                        Add Product
                    </Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
    )
  }