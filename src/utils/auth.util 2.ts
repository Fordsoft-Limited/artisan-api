// BaseAdminController.ts
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { GetUserMiddleware } from 'src/middleware/get-user.middleware';

@UseGuards(GetUserMiddleware, AuthenticationGuard)
  @ApiBearerAuth()
export class BaseAuthController {
  constructor(){}
}
