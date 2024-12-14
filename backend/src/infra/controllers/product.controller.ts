// produto.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UpdateProductDto } from './dtos/updateProductDto';
import { CreateProductDto } from './dtos/createProductDto';
import { ProductProviderEnum } from '../providers/product/product.providers';
import { FindAllProductsQuery } from 'src/app/commands/product/find-all-products.query';
import { GetProductQuery } from 'src/app/commands/product/get-product.query';
import { AuthGuard } from '../guards/auth.guard';
import { CreateProductCommand } from 'src/app/commands/product/create-product.command';
import { UpdateProductCommand } from 'src/app/commands/product/update-product.command';
import { DeleteProductCommand } from 'src/app/commands/product/delete-product.command';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(
    @Inject(ProductProviderEnum.FindAllProductsQuery)
    private findAllProductsQuery: FindAllProductsQuery,
    @Inject(ProductProviderEnum.GetProductQuery)
    private getProductQuery: GetProductQuery,
    @Inject(ProductProviderEnum.CreateProductCommand)
    private createProductCommand: CreateProductCommand,
    @Inject(ProductProviderEnum.UpdateProductCommand)
    private updateProductCommand: UpdateProductCommand,
    @Inject(ProductProviderEnum.DeleteProductCommand)
    private deleteProductCommand: DeleteProductCommand,
  ) {}

  @Get('all')
  findAll(@Request() req) {
    return this.findAllProductsQuery.execute({ userId: req.user });
  }

  @Get(':productId')
  findOne(@Request() req, @Param('productId') productId: number) {
    return this.getProductQuery.execute({
      userId: req.user,
      productId: productId,
    });
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Request() req,
    @Body() { description, price, stock }: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.createProductCommand.execute({
      userId: req.user,
      description: description,
      price: price,
      stock: stock,
      images: files,
    });
  }

  @Put(':productId')
  update(
    @Request() req,
    @Param('productId') productId: number,
    @Body() { description, price, stock }: UpdateProductDto,
  ) {
    return this.updateProductCommand.execute({
      userId: req.user,
      productId: productId,
      description: description,
      price: price,
      stock: stock,
    });
  }

  @Delete(':productId')
  delete(@Request() req, @Param('productId') productId: number) {
    return this.deleteProductCommand.execute({
      userId: req.user,
      productId: productId,
    });
  }
}
