import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ConfigModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    AuthModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
