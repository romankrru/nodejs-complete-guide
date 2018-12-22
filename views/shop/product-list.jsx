const React = require('react');
const DefaultLayout = require('../layouts/default');

const Shop = props => <DefaultLayout
	path={props.path}
	pageTitle={props.pageTitle}
	styles={['/css/product.css']}
>
	{props.prods.length
		? <div className="grid">
			{props.prods.map((product, i) => <article className="card product-item" key={i}>
				<header className="card__header">
					<h1 className="product__title">{product.title}</h1>
				</header>
				<div className="card__image">
					<img src="https://duskrider3740.files.wordpress.com/2016/12/red-book.jpg" alt="A Book" />
				</div>
				<div className="card__content">
					<h2 className="product__price">$19.99</h2>
					<p className="product__description">A very interesting book about so many even more interesting things!</p>
				</div>
				<div className="card__actions">
					<button className="btn">Add to Cart</button>
				</div>
			</article>)}
		</div>

		: <h1>No products to display</h1>}
</DefaultLayout>;

module.exports = Shop;
