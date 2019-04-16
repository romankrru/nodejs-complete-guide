const React = require('react');
const _ = require('lodash');

const DefaultLayout = require('../layouts/default');

const Orders = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
>
	<h1>Orders</h1>

	<hr/>

	{_.map(props.orders, order => <React.Fragment key={order._id.toString()}>
		<h5>Order - #{order._id.toString()}</h5>
		<a href={`/orders/${order._id.toString()}`}>Download Invoice</a>

		<table key={order._id} className="table table-bordered">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Product Title</th>
					<th scope="col">Price</th>
					<th scope="col">Quantity</th>
				</tr>
			</thead>

			<tbody>
				{_.map(order.products, (productItem, j) => <tr key={j}>
					<td>{j}</td>
					<td>{productItem.product.title}</td>
					<td>${productItem.product.price}</td>
					<td>x{productItem.quantity}</td>
				</tr>)}
			</tbody>
		</table>
	</React.Fragment> )}
</DefaultLayout>;

module.exports = Orders;
