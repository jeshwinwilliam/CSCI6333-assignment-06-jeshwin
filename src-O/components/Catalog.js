
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const PRODUCTS = [
  { id: 1, name: 'Notebook', price: 4.5 },
  { id: 2, name: 'Markers', price: 6.0 },
  { id: 3, name: 'Backpack', price: 29.99 },
  { id: 4, name: 'Water Bottle', price: 12.99 },
];

export default function Catalog() {
  const dispatch = useDispatch();

  return (
    <div>
      {PRODUCTS.map((p) => (
        <div key={p.id} style={{display:'flex',justifyContent:'space-between',padding:'8px',borderBottom:'1px solid #ddd'}}>
          <span><strong>{p.name}</strong> (${p.price.toFixed(2)})</span>
          <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
