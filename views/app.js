const stripe = Stripe('pk_test_51IZ48eHk1AFEuSGZ9mZmaXR3o20taotb45cikPorHM1EzkeKUivRJSNPE3Q63j0NwWYozsG9mCtMKfq2t8QfzccP00S5YWmvZA');
const elements = stripe.elements();

const card = elements.create('card', {
  style: {
    base: {
        color: "#fff"
    }
  },
  hidePostalCode: true,
});

card.mount('#card-element');

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

const stripeTokenHandler = token => {
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    console.log(form);
    form.submit();
}

form.addEventListener('submit', e => {
    e.preventDefault();

    stripe.createToken(card).then(res => {
        if (res.error) errorEl.textContent = res.error.message;
        else {
            console.log(res.token)
            stripeTokenHandler(res.token);
        }
    })
})

