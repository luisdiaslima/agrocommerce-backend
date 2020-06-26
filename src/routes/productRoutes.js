import { Router } from 'express';
import { resolve } from 'path';
import multer from 'multer';
import ProductController from '../controllers/ProductController';
import loginRequired from '../middlewares/loginRequired';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, resolve(__dirname, '..', 'uploads', 'images'));
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});

const router = new Router();


router.get('/', ProductController.index);
router.get('/:id', ProductController.show);
router.post('/', loginRequired, upload.single('productImage'), ProductController.store);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
