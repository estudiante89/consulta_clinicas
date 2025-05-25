import { IsString, IsDateString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  fullName: string;

  @IsString()
  identityDocument: string;

  @IsDateString()
  birthDate: Date;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  healthCoverage?: string;

  @IsOptional()
  @IsString()
  healthCoverageNumber?: string;
}