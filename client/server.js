const express = require('express');
const path = require('path');
const app = express();

const accessories = [
    { id: 1, name: 'Phone Case', price: 10.99, image:'/images/phone-case.jpg' },
    { id: 2, name: 'Screen Protector', price: 5.99, image: '/images/screen-protector.jpg' },
    { id: 3, name: 'Headphones', price: 29.99, image: '/images/headphones.jpg' },
    { id: 4, name: 'Power Bank', price: 19.99, image: '/images/power-bank.jpg' },
    { id: 5, name: 'Phone Wallet', price: 14.99, image: '/images/phone-wallet.jpg' },
    { id: 6, name : 'Earbuds' , price: 9.99 , image: '/images/earbuds.jpg'},
    { id: 7, name: 'Phone Stand', price: 7.99, image: '/images/phone-stand.jpg' },
    { id: 8, name: 'Screen Cleaning Cloth', price: 4.99, image: '/images/screen-cleaning-cloth.jpg' },
    { id: 9, name: 'Phone Grip', price: 6.99, image: '/images/phone-grip.jpg' },
    { id: 10, name: 'Wireless Charger', price: 24.99, image: '/images/wireless-charger.jpg' },
  ];



// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/accessories', (req, res) => {
    // const filteredAccessories = accessories.filter(accessory => accessory.name !== 'Earbuds');

    // res.json(filteredAccessories);
    res.json(accessories);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: File not found');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
