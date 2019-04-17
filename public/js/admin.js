const CSRF_TOKEN = document.querySelector('input[name="_csrf"]').value;

const deleteProduct = productId => {
	console.log('clicked', productId, CSRF_TOKEN);
};

document.addEventListener('click', e => {
	const deleteProductBtn = e.target.closest('#delete-product-btn');

	if(deleteProductBtn)
		deleteProduct(deleteProductBtn.dataset.productId);
});
