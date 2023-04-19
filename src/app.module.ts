import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { OmdbModule } from './providers/omdb/omdb.module';
import { AuthModule } from './providers/authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI, { dbName: process.env.DB_NAME }),
    CacheModule.register({ isGlobal: true }),
    UserModule,
    MovieModule,
    OmdbModule,
    AuthModule,
  ]
})
export class AppModule {}