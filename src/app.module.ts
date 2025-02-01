import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { ConfigModule } from '@nestjs/config';
import { HeaderCheckMiddleware } from './middleware/header-check.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: String(process.env.POSTGRES_USER),
      password: String(process.env.POSTGRES_PASSWORD),
      database: String(process.env.POSTGRES_DB),
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderCheckMiddleware).forRoutes('*'); // Apply to all routes
  }
}
