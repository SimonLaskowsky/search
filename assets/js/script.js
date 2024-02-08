document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('form input');
    const placeholder = document.querySelector('.placeholder');
    const spinner = document.querySelector('.spinner');
    const button = document.querySelector('.search-button');
    const resultsContainer = document.querySelector('.results-container');
    const API_LINK = 'https://dummyjson.com/products/search?q=';
    const API_SEARCH = '&limit=5&delay=1000';

    // Click on input handler
    input.addEventListener('click', function () {
        if (input.value.trim() === '') {
            placeholder.classList.add('active');
        }
    });

    // Click outside of input handler
    document.body.addEventListener('click', function (event) {
        if (!input.contains(event.target) && input.value.trim() === '') {
            placeholder.classList.remove('active');
            spinner.classList.remove('visible');
            resultsContainer.innerHTML = '';
        }
    });

    // Writing status hanlder
    input.addEventListener('input', function () {
        const isInputEmpty = input.value.trim() === '';

        if (isInputEmpty) {
            spinner.classList.remove('visible');
        } else {
            spinner.classList.add('visible');
        }
    });

    // Search button click handler
    button.addEventListener('click', function (event) {
        event.preventDefault();
        spinner.classList.remove('visible');
        getProduct();
  
    });

    input.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            getProduct();
        }
    });

    // API
    const getProduct = () => {
        const searchData = input.value || 'XXX';
        const URL = API_LINK + searchData + API_SEARCH;

        axios.get(URL).then(response => {
            const products = response.data.products;

            resultsContainer.innerHTML = '';

            if (products.length === 0 && searchData !== 'XXX') {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `<p>Brak wyników dla ${searchData}</p>`;
                resultsContainer.appendChild(resultItem);
                
            } else {
                products.forEach(product => {
                    const productName = product.title;
                    const productPrice = product.price;
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `<p class="product-name">${productName}</p><p class="product-price">${productPrice}$</p>`;
                    resultsContainer.appendChild(resultItem);
                });
            }
        }).catch(() => console.error('Wystąpił błąd podczas pobierania danych z API.'));
    }
});