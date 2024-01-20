import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[],
  providers: [ConversationService, JwtService],
  controllers: [ConversationController]
})
export class ConversationModule {}
