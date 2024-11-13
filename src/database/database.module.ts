import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true, // Be cautious about using synchronize in production
                connectTimeoutMS: 10000, // Timeout for each connection attempt (in ms)
                retryAttempts: 5,        // Number of retry attempts
                retryDelay: 3000,        // Delay between each retry attempt (in ms)
            
                logging: true, 
              }),
              inject: [ConfigService],
           
        })
    ]
})
export class DatabaseModule {}
