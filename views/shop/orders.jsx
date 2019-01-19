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
		<h5>Order {order._id.toString()}:</h5>

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
				{_.map(order.items, (item, j) => <tr>
					<td>{j}</td>
					<td>{item.title}</td>
					<td>${item.price}</td>
					<td>x{item.quantity}</td>
				</tr>)}
			</tbody>
		</table>
	</React.Fragment> )}
</DefaultLayout>;

module.exports = Orders;
