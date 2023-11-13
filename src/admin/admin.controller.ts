import { Controller, Get, Param } from '@nestjs/common';
import { EntranceService } from 'src/entrance/entrance.service';
import { ArtisanApiResponse } from 'src/model/app.response.model';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}

    @Get("visitors")
    async getPaginatedVisitors(
        @Param()
        page: number,
        @Param()
        limit: number
      ): Promise<ArtisanApiResponse> {
return await this.adminService.getPaginatedVisitors(page, limit)
      }
}
