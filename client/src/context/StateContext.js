import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast"

const Context = createContext()

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        if (localData) {
            const cartItems = JSON.parse(localData);
            return cartItems.reduce((total, item) => total + item.quantity, 0);
        }
        return 0;
    });
    const [qty, setQty] = useState(1)

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if(storedCartItems) {
            setCartItems(storedCartItems)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])

    const onAdd = (postDetails, quantity, selectedFlavor) => {
        const checkProductInCart = cartItems.find(
          (item) => item._id === postDetails._id && item.selectedFlavor === selectedFlavor
        );
      
        const priceToAdd = postDetails.price * quantity;
        const updatedTotalPrice = totalPrice + priceToAdd;
      
        setTotalPrice(updatedTotalPrice);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
      
        if (checkProductInCart) {
          const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id === postDetails._id && cartProduct.selectedFlavor === selectedFlavor) {
              return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity,
              };
            }
            return cartProduct;
          });
          setCartItems(updatedCartItems);
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
          const newProduct = { ...postDetails, quantity, selectedFlavor };
          const newCartItems = [...cartItems, newProduct];
          setCartItems(newCartItems);
          localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        }
      
        localStorage.setItem('totalPrice', JSON.stringify(updatedTotalPrice));
      
        toast.success(`${qty} ${postDetails.title} ${selectedFlavor} added to cart`);
    };
      
    const onRemove = (postDetails, selectedFlavor) => {
        const foundProduct = cartItems.find((item) => item._id === postDetails._id && item.selectedFlavor === selectedFlavor);
        const newCartItems = cartItems.filter((item) => item._id !== postDetails._id || item.selectedFlavor !== selectedFlavor);
      
        const priceToRemove = foundProduct.price * foundProduct.quantity;
        const updatedTotalPrice = totalPrice - priceToRemove;
      
        setTotalPrice(updatedTotalPrice);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
      
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      
        localStorage.setItem('totalPrice', JSON.stringify(updatedTotalPrice));
    };
      
    const toggleCartItemQuantity = (id, selectedFlavor, value) => {
        const newCartItems = [...cartItems];
        const foundProductIndex = newCartItems.findIndex(
          (item) => item._id === id && item.selectedFlavor === selectedFlavor
        );
    
        if (foundProductIndex > -1) {
            const foundProduct = newCartItems[foundProductIndex];
            let newTotalPrice = totalPrice;
    
            if (value === "inc") {
                newCartItems[foundProductIndex] = {
                    ...foundProduct,
                    quantity: foundProduct.quantity + 1,
                };
          
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
                newTotalPrice += foundProduct.price;
            } else if (
                value === "dec" &&
                foundProduct.quantity > 1
            ) {
                newCartItems[foundProductIndex] = {
                    ...foundProduct,
                    quantity: foundProduct.quantity - 1,
                };
          
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
                newTotalPrice -= foundProduct.price;
            }
          
            setTotalPrice(newTotalPrice);
            localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));
          
            setCartItems(newCartItems);
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }
    };
    
      

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                setQty,
                incQty,
                decQty,
                onRemove,
                onAdd,
                toggleCartItemQuantity
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)





