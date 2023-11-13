import { Module } from '@nestjs/common';
import { EntranceController } from './entrance.controller';
import { EntranceService } from './entrance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contacts, ContactSchema } from 'src/model/contact.schema';
import { Guests, GuestSchema } from 'src/model/guest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guests.name, schema: GuestSchema },
      { name: Contacts.name, schema: ContactSchema },
    ]),
  ],
  controllers: [EntranceController],
  providers: [EntranceService],
  exports: [EntranceService],
})
export class EntranceModule {}
