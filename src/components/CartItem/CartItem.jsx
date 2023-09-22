import classes from './CartItem.module.css'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'

const CartItem = ({ id, category, objeto, nombre, imagen, precio, quantity}) => {

  const { removeItem } = useContext(CartContext);
    
    return (
        <>
        <section>
          <div className={classes.productContent}>
              <img className={classes.cartImg} src={imagen}/>
                      <h3>{objeto}</h3>
                      <h3>{nombre}</h3>
                      <p className={classes.productPrice}>${precio}</p>
                      <div className={classes.counter}>
                          <span className={classes.productQuantity}>{quantity} u.</span>
                      </div>
              <button onClick={() => removeItem(id)} className={classes.remove}>Eliminar</button>
          </div>
        </section>
        </>
    )
}
export default CartItem
