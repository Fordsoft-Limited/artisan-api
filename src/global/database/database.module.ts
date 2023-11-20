import { Global, Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { MongooseModule } from "@nestjs/mongoose";
import { AppConfig } from "src/config/app.config";
import {
  Advertisement,
  AdvertisementSchema,
} from "src/model/advertisement.schema";
import { Blogs, BlogsSchema } from "src/model/blog.schema";
import { Contacts, ContactSchema } from "src/model/contact.schema";
import { Guests, GuestSchema } from "src/model/guest.schema";
import { Media, MediaSchema } from "src/model/media.schema";
import { Rating, RatingSchema } from "src/model/rating.schema";
import { Role, RoleSchema } from "src/model/role.schema";
import { Setting, SettingSchema } from "src/model/setting.shema";
import { User, UserSchema } from "src/model/user.schema";

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>(
          AppConfig.MONGO_CONNECTION_ARTISAN
        );
        Logger.log(`MongoDB Connection URI: ${uri}`);
        return { uri };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Advertisement.name, schema: AdvertisementSchema },
      { name: Guests.name, schema: GuestSchema },
      { name: Contacts.name, schema: ContactSchema },
      { name: Media.name, schema: MediaSchema },
      { name: Rating.name, schema: RatingSchema },
      { name: Blogs.name, schema: BlogsSchema },
      { name: Setting.name, schema: SettingSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
