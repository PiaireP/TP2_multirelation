import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarqueVoitureModule } from './marque-voiture/marque-voiture.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ModelVoitureModule } from './model-voiture/model-voiture.module';
import { MyloggerMiddleware } from './mylogger/mylogger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), 
    MarqueVoitureModule, ModelVoitureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyloggerMiddleware).forRoutes('*');
  }
}
