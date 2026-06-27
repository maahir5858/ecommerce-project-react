import axios from 'axios';
import { useState, useEffect } from 'react';
import CheckoutHeader from './CheckoutHeader';
import formatMoney from '../../utils/money'
import dayjs from 'dayjs'
import './CheckoutPage.css';
import { useNavigate } from 'react-router';
import CartItemDetails from '../../components/CartItemDetails';

export default function Checkout({ cart, getCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    ; (async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(response.data);
    })();
  }, [])

  useEffect(() => {
    ; (async () => {
      const response = await axios.get('/api/payment-summary')
      setPaymentSummary(response.data);
    })();
  }, [cart])

  const placeOrder = async () => {
    await axios.post('/api/orders');
    navigate('/orders')
  }

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="favicons/cart-favicon.png" />

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
              let selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                return (deliveryOption.id === cartItem.deliveryOptionId)
              });
              return (
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                  </div>

                  <div className="cart-item-details-grid">
                    <CartItemDetails cartItem={cartItem} getCart={getCart} />

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((deliveryOption) => {
                        const updateDeliveryOption = async () => {
                          axios.put(`/api/cart-items/${cartItem.productId}`, {
                            deliveryOptionId: deliveryOption.id
                          })
                        }
                        return (
                          <div key={deliveryOption.id} className="delivery-option"
                            onClick={updateDeliveryOption} >
                            <input type="radio"
                              checked={deliveryOption.id === cartItem.deliveryOptionId}
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`}
                              onChange={() => { }} />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                              </div>
                              <div className="delivery-option-price">
                                {deliveryOption.priceCents === 0 ? 'FREE Shipping' : formatMoney(deliveryOption.priceCents) + ' - Shipping'}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                </div>

                <button className="place-order-button button-primary"
                  onClick={placeOrder}>
                  Place your order
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}