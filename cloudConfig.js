const cloundinary = require('cloudinary').v2;
// const { fileLoader } = require('ejs');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloundinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary : cloundinary,
    params : {
        folder :'wanderlust_DEV',
        allowedFormats : ['png' , 'jpg' , 'jpeg']
      
    }
});

module.exports ={
    cloundinary,
    storage
}







