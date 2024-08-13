import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDTO } from './dtos/create-product.dto.ts';
import { FilterProductDTO } from './dtos/filter-product.dto.ts';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getfilteredProducts(
    filteredProductDTO: FilterProductDTO,
  ): Promise<Product[]> {
    const { category, search } = filteredProductDTO;
    let products = await this.getAllProducts();

    if (search) {
      products = products.filter(
        (product) =>
          product.name.includes(search) || product.description.includes(search),
      );
    }

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    return products;
  }

  async getAllProducts() : Promise<Product[]> {
    const products = await this.productModel.find().exec(); 
    return products
  }

  async getProduct(id : string) : Promise<Product> {
    const product =  await this.productModel.findById(id).exec();
    return product ;  
  }

  async addProduct(createProductDto : CreateProductDTO ) : Promise<Product> {
    const newProduct = await this.productModel.create(createProductDto);
    return newProduct.save();
  }

  async updateProduct(id : string , createProductDto : CreateProductDTO) : Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, createProductDto, {new : true});
    return updatedProduct ; 
  }

  async deleteProduct(id : string ) : Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}
