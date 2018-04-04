// Calculate Total Amount
export function totalAmount(payloadArr) {
	const totalAmount = payloadArr.map(function(cartArr) {
		let price = cartArr.price;
		let quantity = cartArr.quantity;
		return price * quantity;
	}).reduce(function(a, b) {
		return a + b;
	}, 0); // start sum from index 0

	const totalQty = payloadArr.map(function(qty) {
		return qty.quantity;
	}).reduce(function(a, b) {
		return a + b;
	}, 0)

	return { amount: totalAmount.toFixed(2), qty: totalQty};
}
