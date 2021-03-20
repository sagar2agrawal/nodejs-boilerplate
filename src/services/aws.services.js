import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import fs from 'fs';
import config from '../config/index.js';

aws.config.update({
  secretAccessKey: config.AWS.AWS_ACCESS_KEY,
  accessKeyId: config.AWS.AWS_KEY,
  region: config.AWS.S3.REGION,
});

const s3 = new aws.S3();

export const uploadProfilePicRoute = multer({
  storage: multerS3({
    s3,
    bucket: 'marsilex',
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('File types allowed .jpeg, .jpg and .png!'));
      }
    },
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, Date.now().toString()),
  }),
}).single('profilepic');

export const getSignedUrlForObject = async (s3ObjectSignedDTO) => {
  const signedurlParams = {
    Bucket: s3ObjectSignedDTO.bucket,
    Key: s3ObjectSignedDTO.key,
  };

  const url = await s3.getSignedUrlPromise('getObject', signedurlParams);
  return url;
};

export const profilePicUpload = async (profilePicUploadDTO) => {
  const { filename } = profilePicUploadDTO;
  return new Promise((resolve, reject) => {
    s3.putObject(profilePicUploadDTO, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const resumeUpload = async () => 'not implemented';

// export const resumeUpload = multer({
//   storage: multerS3({
//     acl: 'public-read',
//     s3,
//     bucket: config.AWS.S3.PROFILE_PIC,
//   }),
// });

// export const getSignedUrlForObject = async () => {

// };
