import './checkout.styles.scss';
import CheckoutItem from "../../components/checkout-item/checkout-item";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";
import PaymentForm from "../../components/payment-form/payment-form";

const Checkout = () => {
    const cartTotal = useSelector(selectCartTotal);
    const cartItems = useSelector(selectCartItems);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => {
                return (
                    <CheckoutItem cartItem={cartItem} />
                )
            })}
            <span className="total">Total: ${cartTotal}</span>
            <PaymentForm />
        </div>
    )
}

export default Checkout;