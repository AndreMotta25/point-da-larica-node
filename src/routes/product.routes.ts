import { Router } from 'express';
import multer from 'multer';
import { upload } from 'src/utils/upload';

import { CreateProductController } from '@modules/orders/useCases/CreateProduct/CreateProductController';
import { GetProductController } from '@modules/orders/useCases/GetProduct/GetProductController';
import { ListProductController } from '@modules/orders/useCases/ListProducts/ListProductController';
import { UpdateProductController } from '@modules/orders/useCases/UpdateProduct/UpdateProductController';
import { productValidate } from '@modules/orders/validations/productCreate.validation';

const multerUpload = multer(
  upload({
    folder: 'images',
    fileFilter(req, file, callback) {
      if (
        !file.originalname.endsWith('.jpg') &&
        !file.originalname.endsWith('.png')
      ) {
        callback(null, false);
        return callback(new Error('Formato de arquivo não aceito'));
      }
      return callback(null, true);
    },
  })
);
const productRoutes = Router();

const createProductController = new CreateProductController();
const getProductController = new GetProductController();
const listProductController = new ListProductController();
const updateProduct = new UpdateProductController();

productRoutes.post(
  '/',
  multerUpload.single('image'),
  productValidate,
  createProductController.handler
);

productRoutes.get('/:id', getProductController.handle);
productRoutes.get('/', listProductController.handle);
productRoutes.put('/:id', multerUpload.single('image'), updateProduct.handle);

export { productRoutes };
