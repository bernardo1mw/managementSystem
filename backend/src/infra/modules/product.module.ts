import { Module } from '@nestjs/common';
// import { ProductService } from '../../product/product.service';
import { ProductController } from '../controllers/product.controller';
import { productProviders } from '../providers/product/product.providers';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  providers: productProviders,
  controllers: [ProductController],
})
export class ProductModule {}
