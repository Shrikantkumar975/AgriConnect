require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Testing Cloudinary Connection...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Castle_Neuschwanstein.jpg",
    { public_id: "test_upload" },
    function (error, result) {
        if (error) {
            console.error('❌ Cloudinary Error:', error);
        } else {
            console.log('✅ Cloudinary Success:', result);
        }
    }
);
