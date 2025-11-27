
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartSummary,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} from '../features/cart/cartSlice';

export default function CartView() {
  const items = useSelector(selectCartItems);
  const summary = useSelector(selectCartSummary);
  const dispatch = useDispatch();

  if (!items.length) {
    return (
      <div className="empty-state">
        Your cart is empty right now. Add an item from the catalog to get started.
      </div>
    );
  }

  return (
    <div>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <div>
              <div className="cart-item-title">{item.name}</div>
              <div className="cart-item-meta">
                ${item.price.toFixed(2)} each · Line total: $
                {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>

            <div className="cart-qty-controls">
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => dispatch(decrementItem(item.id))}
                disabled={item.quantity === 1}
                title="Decrease quantity"
              >
                −
              </button>
              <span style={{ minWidth: 24, textAlign: 'center' }}>
                {item.quantity}
              </span>
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => dispatch(incrementItem(item.id))}
                title="Increase quantity"
              >
                +
              </button>
              <button
                className="btn btn-danger btn-circle"
                style={{ marginLeft: '0.25rem' }}
                onClick={() => dispatch(removeItem(item.id))}
                title="Remove item"
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="summary-grid">
        <span className="summary-label">Items</span>
        <span className="summary-value">{summary.itemCount}</span>

        <span className="summary-label">Subtotal</span>
        <span className="summary-value">
          ${summary.subtotal.toFixed(2)}
        </span>

        <span className="summary-label">Tax (8%)</span>
        <span className="summary-value">
          ${summary.tax.toFixed(2)}
        </span>
      </div>

      <div className="summary-total">
        <div className="summary-grid">
          <span className="summary-label">Total</span>
          <span className="summary-value">
            ${summary.total.toFixed(2)}
          </span>
        </div>
      </div>

      <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}
