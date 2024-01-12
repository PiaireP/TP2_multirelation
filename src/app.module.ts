import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarqueVoitureModule } from './marque-voiture/marque-voiture.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ModelVoitureModule } from './model-voiture/model-voiture.module';
// import { MyloggerMiddleware } from './mylogger/mylogger.middleware';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    WinstonModule.forRoot({
        transports: [
          new DailyRotateFile({
            filename: `logs/%DATE%-allLevel.log`,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: false,
            maxFiles: '5d',
          }),
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.cli(),
              winston.format.splat(),
              winston.format.timestamp(),
              winston.format.printf((info) => {
                return `${info.timestamp} ${info.level}: ${info.message}`;
              }),
            ),
          }),
        ],
      }),
    MongooseModule.forRoot(process.env.MONGO_URI), 
    MarqueVoitureModule, ModelVoitureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(MyloggerMiddleware).forRoutes('*');
  // }
}
