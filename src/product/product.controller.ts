import { Controller, Get, Post,Delete, Put, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto.ts';
import { FilterProductDTO } from './dtos/filter-product.dto.ts';
@Controller('store/products')   //* set the part of url shared by all endpoints
export class ProductController {
    constructor(private productService : ProductService) {} //? injecting the product service 

    @Get('/')
    async getProducts(@Query() filterProductDTO : FilterProductDTO) {
        if(Object.keys(filterProductDTO).length){
            const filteredProducts = await this.productService.getfilteredProducts(filterProductDTO)
            return filteredProducts; 
        }else {
            const allProducts  =  await this.productService.getAllProducts();
            return allProducts;
        }
    }

    @Get('/:id')
    async getProduct(@Param('id') id: string){
        const product = await this.productService.getProduct(id);
        if(!product) throw new NotFoundException('Product does not Exist!!');
        return product;
    }

    @Post('/')
    async addProduct(@Body() createProductDTO : CreateProductDTO) {
        const product  = await this.productService.addProduct(createProductDTO);
        return product;
    }

    @Put('/:id')
    async updateProduct(@Param('id') id : string, @Body() createProductDTO : CreateProductDTO){
        const product = await this.updateProduct(id, createProductDTO);
        if(!product) throw new NotFoundException('Product does not exist');
        return product;
    }

    @Delete('/:id')
    async deleteproduct(@Param('id') id : string ){
        const product = await this.productService.deleteProduct(id);
        if(!product) throw new NotFoundException('Product does not exists');
        return product;
    }
}


