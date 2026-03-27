import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

class RecommendationDto {
  activity: string;
}

@Controller('recommendations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Roles('MEMBER')
  @Post()
  async getRecommendations(@Body() dto: RecommendationDto) {
    return this.aiService.recommendEquipment(dto.activity);
  }
}