const CSRF_TOKEN = document.querySelector('input[name="_csrf"]').value;

const deleteProduct = productId => fetch(`/admin/product/${productId}`, {
	headers: {
		'csrf-token': CSRF_TOKEN,
	},

	method: 'DELETE',
})

	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error(err));

document.addEventListener('click', e => {
	const deleteProductBtn = e.target.closest('#delete-product-btn');

	if(deleteProductBtn)
		deleteProduct(deleteProductBtn.dataset.productId)

			.then(() => {
				const productEl = deleteProductBtn.closest('.card');
				productEl.parentNode.removeChild(productEl);
			});
});
