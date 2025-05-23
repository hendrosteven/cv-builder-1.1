import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const twoFactorSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "Code must be a 6 digit number" })
    .regex(/^\d+$/, { message: "Code must be a 6 digit number" }),
});

export class TwoFactorDto extends createZodDto(twoFactorSchema) {}

export const backupCodesSchema = z.object({
  backupCodes: z.array(z.string().length(10)),
});

export class BackupCodesDto extends createZodDto(backupCodesSchema) {}

export const twoFactorBackupSchema = z.object({
  code: z.string().length(10),
});

export class TwoFactorBackupDto extends createZodDto(twoFactorBackupSchema) {}
