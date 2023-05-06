import { Request } from 'express';
import multer, { FileFilterCallback, Options } from 'multer';
import { resolve } from 'path';

interface IUpload {
  folder: string;
  fileFilter?(
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ): void;
}
const upload = ({ folder, fileFilter }: IUpload) => {
  const options: Options = {
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', `${folder}`),
      filename: (req, file, cb) => {
        const fileName = `${file.fieldname}-${Date.now()}.${file.originalname
          .split('.')
          .pop()}`;
        cb(null, fileName);
      },
    }),
    fileFilter,
  };
  return options;
};

export { upload };
