import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginIsExistConstraint } from './infrastructure/decorators/validate/login-is-exist.decorator';
import { EmailIsExistConstraint } from './infrastructure/decorators/validate/email-is-exist.decorator';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { BlogIsExistConstraint } from './infrastructure/decorators/validate/blog-is-exist.decorator';
import configuration, { ConfigurationType } from './settings/configuration';
import { validate } from './settings/env/configuration-validation';
import { UsersModule } from './features/users/users.module';
import { SessionsModule } from './features/sessions/sessions.module';
import { AuthModule } from './features/auth/auth.module';
import { AdaptersModule } from './infrastructure/adapters/adapters.module';
import { CoreModule } from './infrastructure/core.module';
import { TestingsModule } from './features/testing/testings.module';
import { BloggersPlatformModule } from './features/bloggers_platform/bloggersPlatform.module';

const modules = [TestingsModule, UsersModule, AuthModule, SessionsModule, AdaptersModule, CoreModule, BloggersPlatformModule];// импортировать! 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validate,
      // ignoreEnvFile:
      // process.env.ENV !== Environments.DEVELOPMENT &&
      // process.env.ENV !== Environments.TEST,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync(
      {
        useFactory: () => {
          return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'dk',// скрыть через useFactory
            database: 'newDBforBloggersPlatform',
            autoLoadEntities: true,
            synchronize: true,
          }
        }
      }),
    // TypeOrmModule.forFeature([User]),
    // MongooseModule.forRootAsync({
    //   useFactory: (configService: ConfigService<ConfigurationType, true>) => {
    //     const environmentSettings = configService.get('environmentSettings', {infer: true,});
    //     const databaseSettings = configService.get('databaseSettings', {infer: true,});
    //     const uri = environmentSettings.isTesting // для тестов
    //       ? databaseSettings.MONGO_CONNECTION_URI_FOR_TESTS
    //       : databaseSettings.MONGO_CONNECTION_URI;
    //     // console.log(uri);
    //     return {uri: uri};
    //   },
    //   inject: [ConfigService],
    // }),
    // // MongooseModule.forRoot(SETTINGS.MONGO_URL),
    // MongooseModule.forFeature([
    //   { name: User.name, schema: UserSchema },//-
    //   // { name: Comment.name, schema: CommentSchema },
    //   // { name: Blog.name, schema: BlogSchema },
    //   // { name: Post.name, schema: PostSchema },
    //   // { name: Session.name, schema: SessionSchema },//-
    //   // { name: ApiInfo.name, schema: ApiSchema },//-
    //   // { name: Like.name, schema: LikesSchema },
    // ]),
    JwtModule.registerAsync({
      global: true,
      useFactory:(configService: ConfigService<ConfigurationType, true>) => {
        const secret = configService.get('jwtSecretSettings.JWT_SECRET_KEY', {infer: true,});// несоответствие типов !!!
        // console.log(secret, " secret")
        return {secret};
      },
      inject:[ConfigService]
    }),
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 5,
    }]),
    PassportModule,
    ...modules
  ],
  controllers: [
    AppController,
  ],
  providers: [
    // {
    //   provide: Types.IUserService,
    //   useClass: UserService
    // },
    AppService,
    LoginIsExistConstraint, EmailIsExistConstraint, BlogIsExistConstraint,
  ]
})
export class AppModule {}