import { Router } from 'express';
import multer from 'multer';
import { hasPermission } from 'src/middleware/hasPermission';
import { isAuthenticated } from 'src/middleware/isAuthenticated';
import { isWorking } from 'src/middleware/isWorking';
import { upload } from 'src/utils/upload';

import { CreateProductController } from '@modules/orders/useCases/CreateProduct/CreateProductController';
import { GetProductController } from '@modules/orders/useCases/GetProduct/GetProductController';
import { ListProductController } from '@modules/orders/useCases/ListProducts/ListProductController';
import { UpdateProductController } from '@modules/orders/useCases/UpdateProduct/UpdateProductController';
import { productValidator } from '@modules/orders/validations/productCreate.validation';
import { updateProductValidator } from '@modules/orders/validations/updateProduct.validation';
import { verifyProduct as verifyProductValidator } from '@modules/orders/validations/verifyProduct.validation';

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
  productValidator,
  isAuthenticated,
  hasPermission('create_product'),
  isWorking,
  createProductController.handler
);

productRoutes.get(
  '/:id',
  verifyProductValidator(),
  isAuthenticated,
  hasPermission('get_product'),
  isWorking,
  getProductController.handle
);
productRoutes.get(
  '/',
  isAuthenticated,
  hasPermission('get_product'),
  isWorking,
  listProductController.handle
);
productRoutes.put(
  '/:id',
  multerUpload.single('image'),
  updateProductValidator,
  isAuthenticated,
  hasPermission('create_product'),
  isWorking,
  updateProduct.handle
);

export { productRoutes };
