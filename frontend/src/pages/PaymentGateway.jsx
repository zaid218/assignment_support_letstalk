import React, { useState } from 'react';
import axios from 'axios';

const PaymentGateway = () => {
	const baseUrl = "http://localhost:8800/api/";
	const originalUrl = "https://react-crud-v3am.onrender.com/api/";

	const [buy, setBuy] = useState({
		amount: 10
	});

	// Remove this line as it's not needed
	// setBuy();

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_1OXW88PjbXA5Iu",
			amount: data.amount,
			currency: data.currency,
			description: "Test Transaction",
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = `${baseUrl}payment/verify`;
					const { data } = await axios.post(verifyUrl, response
						//send token along with post   by using const accessToken = Cookies.get("access_token"); and using import Cookies from "js-cookie"; 

					);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = `${baseUrl}payment`;
			const { data } = await axios.post(orderUrl, { amount: buy.amount }
				//send token along with post  by using const accessToken = Cookies.get("access_token"); and using import Cookies from "js-cookie"; 

			)
			initPayment(data.data);
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<div>
			<h2 data-aos="slide-down" style={{ "display": "flex", "justifyContent": "center", "marginBottom": "2em", "marginTop": "5em" }}>
				If you like our work, Please Donate
			</h2>
			<div className='payment' data-aos="zoom-in">
				<div className='pymnt-container'>
					<p className='pymnt-price'> Donate : <span> &#x20B9; {buy.amount} </span></p>
					<button onClick={handlePayment} className="dnt-btn">Donate</button>
				</div>
			</div>
		</div>
	);
}

export default PaymentGateway;
