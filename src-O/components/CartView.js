
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems, selectCartSummary,
  incrementItem, decrementItem, removeItem, clearCart
} from '../features/cart/cartSlice';

export default function CartView() {
  const items = useSelector(selectCartItems);
  const summary = useSelector(selectCartSummary);
  const dispatch = useDispatch();

  if (!items.length) return <p>Your cart is empty.</p>;

  return (
    <div>
      <ul style={{ listStyle:'none', padding:0 }}>
        {items.map(item => (
          <li key={item.id} style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
            <div>
              <strong>{item.name}</strong> (${item.price.toFixed(2)})<br/>
              <small>Line total: ${(item.price * item.quantity).toFixed(2)}</small>
            </div>
            <div>
              <button onClick={() => dispatch(decrementItem(item.id))}>-</button>
              <span style={{margin:'0 8px'}}>{item.quantity}</span>
              <button onClick={() => dispatch(incrementItem(item.id))}>+</button>
              <button style={{marginLeft:'8px',backgroundColor:'red',color:'#fff'}} onClick={() => dispatch(removeItem(item.id))}>x</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Items: {summary.itemCount}</p>
      <p>Subtotal: ${summary.subtotal.toFixed(2)}</p>
      <p>Tax: ${summary.tax.toFixed(2)}</p>
      <h4>Total: ${summary.total.toFixed(2)}</h4>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
}
