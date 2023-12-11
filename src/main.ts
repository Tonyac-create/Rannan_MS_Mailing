import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from "dotenv"
import { join } from 'path';
config({ path: join(__dirname, '../.env') })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: [`nats://${process.env.NATS_IP}:${process.env.NATS_PORT}`]
      }
    }
  )

	await app.listen(process.env.PORT);
  await app.startAllMicroservices()
  console.log(`Server NATS start at : http://localhost:${process.env.PORT}`)
}
bootstrap();
