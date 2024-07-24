document.addEventListener('DOMContentLoaded', () => {
    const currency1Select = document.getElementById('currency1');
    const currency2Select = document.getElementById('currency2');
    const convertBtn = document.getElementById('convertBtn');

    // Fetch the list of currencies from the exchange rate API
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                option2.value = currency;
                option2.textContent = currency;
                currency1Select.appendChild(option1);
                currency2Select.appendChild(option2);
            });
        })
        .catch(error => console.error('Error fetching the list of currencies:', error));

    // Add event listener to the convert button
    convertBtn.addEventListener('click', () => {
        const currency1 = currency1Select.value;
        const currency2 = currency2Select.value;
        const amount = document.getElementById('input_currency1').value;

        if (currency1 && currency2 && amount) {
            fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.rates[currency2];
                    const convertedAmount = amount * rate;
                    document.getElementById('input_currency2').value = convertedAmount.toFixed(2);
                })
                .catch(error => console.error('Error fetching exchange rate:', error));
        } else {
            alert('Please fill in all fields');
        }
    });
});
