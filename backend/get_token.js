const axios = require('axios');
const fs = require('fs');

const login = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'buyeralice@example.com',
            password: 'password123'
        });
        fs.writeFileSync('token.txt', res.data.token);
        console.log('Token saved to token.txt');
    } catch (error) {
        console.error(error);
    }
};

login();
