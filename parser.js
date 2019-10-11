const nightmare = require('nightmare')();

const args = process.argv.slice(2);
const url = args[0];
// https://www.amazon.com/dp/B071FJHNCN  Men's loose fit shorts
const minPrice = args[1];

checkPrice();

async function checkPrice() {
    const priceString = await nightmare
        .goto(url)
        .wait('#priceblock_ourprice')
        .evaluate(
            () => document.getElementById('priceblock_ourprice').innerText
        )
        .end();
    const priceNumber = parseFloat(priceString.replace('$', ''));

    if (priceNumber < minPrice) {
        console.log('cheap');
    } else {
        console.log('expensive');
    }
}
