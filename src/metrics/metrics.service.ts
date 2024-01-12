import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Registry, collectDefaultMetrics, register } from 'prom-client';

@Injectable()
export class MetricsService {
    private readonly register: Registry;

    private apiCallCounter: Counter;
    private apiResponeTimeHistogram: Histogram;

    constructor() {
        this.register = new Registry();

        this.register.clear()
        this.register.setDefaultLabels({
            app:"tp2_perdigues"
        });

        this.apiCallCounter = new Counter({
            name: 'api_call_count_tp2',
            help: 'Total number of API calls',
            labelNames: ['status_code']
        });

        this.apiResponeTimeHistogram = new Histogram({
            name: 'api_rep_sec_duration',
            help: 'Temps de rep de l api',
        });

        this.register.registerMetric(this.apiCallCounter);
        this.register.registerMetric(this.apiResponeTimeHistogram);

        collectDefaultMetrics({register: this.register})
    }

    async getMetrics(): Promise<string> {
        return this.register.metrics()
    }

    getContentType(): string {
        return this.register.contentType
    }

    incrementApiCallCounter(statusCode: number): void {
        this.apiCallCounter.inc({status_code: statusCode})
    }

    incrementApiResponseCounter(duration: number): void {
        this.apiResponeTimeHistogram.observe(duration)
    }
}