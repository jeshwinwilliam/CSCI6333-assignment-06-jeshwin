
import Catalog from '../components/Catalog';
import CartView from '../components/CartView';

export default function ShoppingCartPage() {
  return (
    <div>
      <h2>Shopping Cart (Redux)</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        <div><h3>Catalog</h3><Catalog /></div>
        <div><h3>Cart</h3><CartView /></div>
      </div>
    </div>
  );
}
