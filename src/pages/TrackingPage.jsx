import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import './TrackingPage.css';
import axios from 'axios';
import dayjs from 'dayjs';

export default function TrackingPage({ cart }) {
	const { orderId, productId } = useParams();
	const [order, setOrder] = useState(null);

	useEffect(() => {
		; (async () => {
			const response = await axios.get(`/api/orders/${orderId}?expand=products`);
			setOrder(response.data);
		})();
	}, [orderId])


	if (!order) return null;

	const trackProduct = order.products.find((product) => {
		return (productId === product.productId);
	});

	const totalDeliveryTimeMs = trackProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
	const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

	let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
	if (deliveryPercent > 100) {
		deliveryPercent = 100;
	}

	return (
		<>
			<title>Tracking</title>
			<link rel="icon" type="image/svg+xml" href="favicons/orders-favicon.png" />

			<Header cart={cart} />

			<div className="tracking-page">
				<div className="order-tracking">
					<Link className="back-to-orders-link link-primary" to="/orders">
						View all orders
					</Link>

					<div className="delivery-date">
						{deliveryPercent === 100 ? 'Delivered On' : 'Arriving on'} {dayjs(trackProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
					</div>

					<div className="product-info">
						{trackProduct.product.name}
					</div>

					<div className="product-info">Quantity: {trackProduct.quantity}</div>

					<img
						className="product-image"
						src={trackProduct.product.image}
					/>

					<div className="progress-labels-container">
						<div className={`progress-label ${(deliveryPercent < 33) ? 'current-status' : ''}`}>
							Preparing
						</div>
						<div className={`progress-label ${(deliveryPercent >= 33 && deliveryPercent < 100) ? 'current-status' : ''}`}>
							Shipped
						</div>
						<div className={`progress-label ${deliveryPercent === 100 ? 'current-status' : ''}`}>
							Delivered
						</div>
					</div>

					<div className="progress-bar-container">
						<div 
							className="progress-bar"
							style={{
								width: `${deliveryPercent}%`
							}}
						></div>
					</div>
				</div>
			</div>
		</>
	);
}