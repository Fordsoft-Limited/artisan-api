import { Module } from '@nestjs/common';
import { EntranceModule } from './entrance/entrance.module';
import { VisitorModule } from './visitor/visitor.module';
import { BlogModule } from './blog/blog.module';
import { GuestsModule } from './guests/guests.module';
import { ArtisanModule } from './artisan/artisan.module';
import { ContactsModule } from './contacts/contacts.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SettingModule } from './setting/setting.module';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { MediaModule } from './media/media.module';
import { ServiceModule } from './service/service.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [EntranceModule, VisitorModule, BlogModule, GuestsModule, ArtisanModule, ContactsModule, UsersModule, RolesModule, SettingModule, AdvertisementModule, MediaModule, ServiceModule, RatingModule]
})
export class AppModule {}
