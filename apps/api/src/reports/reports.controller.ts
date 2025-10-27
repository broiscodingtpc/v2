import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  async getReports(
    @Query('tokenAddress') tokenAddress?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;
    
    return await this.reportsService.getReports(tokenAddress, parsedLimit, parsedOffset);
  }

  @Get('latest')
  async getLatestReports(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return await this.reportsService.getLatestReports(parsedLimit);
  }

  @Get('tags')
  async getReportTags() {
    return await this.reportsService.getReportTags();
  }

  @Get('by-tag/:tag')
  async getReportsByTag(
    @Param('tag') tag: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;
    
    return await this.reportsService.getReportsByTag(tag, parsedLimit, parsedOffset);
  }

  @Get(':id')
  async getReportById(@Param('id') reportId: string) {
    const report = await this.reportsService.getReportById(reportId);
    
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }
}