import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; //? import the mongoose module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/store'),ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
