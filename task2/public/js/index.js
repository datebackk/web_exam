const renderOilCardComponent = (data, brand) => {
    data.series = data.series[0];

    const lastIndex = data.series.length - 1;
    const price = data.series[lastIndex];
    const priceChangeOn = Math.abs(price - data.series[lastIndex - 1]);
    const isPriceGrew = data.series[lastIndex] >=  data.series[lastIndex - 1];

    const cardContainer = document.getElementById('oil-card-container');
    const cardComponent = `
        <div class="oil-card">
            <label class="oil-card__title">
                ${brand} $/баррель ${data.labels[lastIndex]}
            </label>
            <span class="oil-card__price--big">
                ${price}
            </span>
            <small class="oil-card__price--small">
                <i class="${isPriceGrew ? "bi bi-arrow-up" : "bi bi-arrow-down"}" style="color: ${isPriceGrew ? "green" : "red"}"></i>
                ${priceChangeOn}
            </small>
        </div>
    `;

    cardContainer.innerHTML = cardComponent;
}

const onChange = (value) => {
    getOilPrice(value);
}

const getOilPrice = (brand) => {
    axios.get(`getOil/${brand}`).then((res) => renderOilCardComponent(res.data, brand));
}

getOilPrice('brent');

