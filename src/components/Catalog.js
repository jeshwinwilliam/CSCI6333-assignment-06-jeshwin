
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const PRODUCTS = [
  { id: 1, name: 'Notebook', price: 4.5 },
  { id: 2, name: 'Markers (Set of 4)', price: 6.0 },
  { id: 3, name: 'Backpack', price: 29.99 },
  { id: 4, name: 'Water Bottle', price: 12.99 },
];

export default function Catalog() {
  const dispatch = useDispatch();

  return (
    <div className="catalog">
      {PRODUCTS.map((p) => (
        <div
          key={p.id}
          className="cart-item"
          style={{ padding: '0.6rem 0' }}
        >
          <div>
            <div className="cart-item-title">{p.name}</div>
            <div className="cart-item-meta">
              Price per unit: ${p.price.toFixed(2)}
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(addToCart(p))}
          >
            <span>+</span>
            <span>Add</span>
          </button>
        </div>
      ))}
    </div>
  );
}
