
import Catalog from '../components/Catalog';
import CartView from '../components/CartView';

export default function ShoppingCartPage() {
  return (
    <div>
      <div className="page-heading">
        <h2 className="page-title">Shopping Cart</h2>
        <p className="page-subtitle">
          Add items to your cart, adjust quantities, and see subtotal, tax, and total update in real-time.
        </p>
      </div>

      <div className="grid-2">
        <section className="card">
          <div className="card-header">
            <h3 className="card-title">Product Catalog</h3>
            <span className="card-tag">Select items</span>
          </div>
          <Catalog />
        </section>

        <section className="card">
          <div className="card-header">
            <h3 className="card-title">Your Cart</h3>
            <span className="card-tag">Live summary</span>
          </div>
          <CartView />
        </section>
      </div>
    </div>
  );
}
