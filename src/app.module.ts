import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HermesModule } from './hermes/hermes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HermesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
