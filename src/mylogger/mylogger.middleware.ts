import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction  } from 'express';

@Injectable()
export class MyloggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;
      switch (statusCode) {
        case 200:
        case 202:
          this.logger.log(`[${req.method}] ${req.url} - ${statusCode}`);
          break;
        case 401:
        case 404:
        case 405:
          this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}`);
          break;
        case 500:
        case 503:
        case 505:
          this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}`);
          break;
        default:
          break;
      }
      
      // if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
      //   this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}`);
      // } else if
    })
    next();
  }
}
