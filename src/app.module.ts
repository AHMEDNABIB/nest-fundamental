import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ 
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  PostsModule, 
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'rabbi',
    database: 'nestjs',
    autoLoadEntities: true,
    synchronize: true,
  }),
  // DatabaseModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
