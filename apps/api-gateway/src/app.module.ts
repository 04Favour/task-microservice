import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from '@app/shared';
import { TasksModule } from './tasks/tasks.module';
import { ValidationScript } from './common/validate.common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: ValidationScript,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        host: configService.get<string>('DB_HOST'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    SharedModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
