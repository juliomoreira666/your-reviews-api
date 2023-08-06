import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CompanyReviewsModule } from './company-reviews/company-reviews.module';
import { ConnectOptions } from 'typeorm';
import { SharedModule } from './services/shared.module';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.ymoswpprafbgrlxvoqzk.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'OILUJ@a475896',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      timezone: 'America/Sao_Paulo',
    } as ConnectOptions),
    AuthModule,
    CompanyModule,
    CompanyReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
