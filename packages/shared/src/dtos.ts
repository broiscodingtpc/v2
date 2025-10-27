import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum, IsObject, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class TelegramAuthDto {
  @IsString()
  nonce!: string;

  @IsString()
  initData!: string;
}

export class AddWatchlistDto {
  @IsString()
  mint!: string;

  @IsObject()
  @IsOptional()
  alertPrefs?: Record<string, any>;
}

export class TokensQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 50;
}

export class TrendingQueryDto extends TokensQueryDto {
  @IsOptional()
  @IsString()
  window?: string = '10m';
}

export class SignalsQueryDto {
  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class AlertPreferencesDto {
  @IsBoolean()
  volumeSpike!: boolean;

  @IsBoolean()
  liquidityDrop!: boolean;

  @IsBoolean()
  socialSpike!: boolean;

  @IsBoolean()
  newPair!: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceThreshold?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  volumeThreshold?: number;
}