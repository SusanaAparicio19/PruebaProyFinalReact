import { createContext, useState, useContext } from "react"
import Swal from "sweetalert2"

export const CartContext = createContext({
    cart: []
})

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    console.log(cart)

    const addItem = (item, quantity) => {
        if(!isInCart(item.id)) {
            setCart(prev => [...prev, {...item, quantity}])
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cargado Al Carrito',
                showConfirmButton: false,
                timer: 1000,
            })
        }else {
            console.error('Ya agregaste este producto')
        }
    }

    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId)
        setCart(cartUpdated)
    }

    const clearCart = () => {
        setCart([])
    }

    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId)
    }

    const getTotalQuantity = () => {
        let totalQuantity = 0

        cart.forEach(prod => {
            totalQuantity += prod.quantity
        })

        return totalQuantity
    }

    const totalQuantity = getTotalQuantity()

    
    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity }}>
            { children }
        </CartContext.Provider>
    )

}

export const useCart = () => {
    return useContext(CartContext)
}

