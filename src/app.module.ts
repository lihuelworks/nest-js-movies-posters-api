import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MovieDbService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [MovieDbService],
})
export class AppModule {}
