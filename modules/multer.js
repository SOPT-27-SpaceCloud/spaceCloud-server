const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'sopt-27-osj', // bucket으로 변경 sopt-27-epitone -> sopt-27-osj
        acl: 'public-read',
        key: function(req, file, cb){
            cb(null, 'images/origin/' + Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
        }
    })
});
module.exports = upload;
