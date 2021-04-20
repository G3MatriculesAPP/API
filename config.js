const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'matriculesapp', 
    api_key: '369193188672646', 
    api_secret: 'so54IGOFNqjL0aTZcY4FSr-MQ3Y' 
});

module.exports = {
    port: process.env.PORT || 5000,
    db: "mongodb+srv://Xavi-PL:PugFbYLxaY2jGUIo@g3matriculesapp.rdhaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    SECRET_TOKEN: '55b104ea00cfaea535901cd151cdbb1a', // [NOTE] - "matriculesIETI" en MD5 :D
    cloudinary
}
