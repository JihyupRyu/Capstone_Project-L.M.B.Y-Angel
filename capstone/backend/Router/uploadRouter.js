const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');

const router = express.Router();

const s3 = new aws.S3({
 accessKeyId: process.env.ACCESSKEYID,
 secretAccessKey: process.env.SECRETACCESSKEY,
 Bucket: process.env.BUCKET
});

const profileImgUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: 'cpshpupload',
  acl: 'public-read',
  key: function (req, file, cb) {
   cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  }
 }),
 limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).single('profileImage');

function checkFileType( file, cb ){
 const filetypes = /jpeg|jpg|png|gif/;
 const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
 const mimetype = filetypes.test( file.mimetype );
if( mimetype && extname ){
  return cb( null, true );
 } else {
  cb( 'Error: Images Only!' );
 }
}

router.post( '/profile-img-upload', ( req, res ) => {
profileImgUpload( req, res, ( error ) => {
  if( error ){
   res.json( { error: error } );
  } else {
   if( req.file === undefined ){
    res.json( 'Error: No File Selected' );
   } else {
    const imageName = req.file.key;
    const imageLocation = req.file.location;
res.json( {
     image: imageName,
     location: imageLocation
    } );
   }
  }
 });
});

module.exports = router;
