import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
    constructor(private metricsService: MetricsService) {}

    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            this.metricsService.incrementApiCallCounter(res.statusCode);
        });
        next();
    }
}
