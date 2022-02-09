import { ApiProperty } from "@nestjs/swagger"

export type JWTPayload = {
  sub: string // user._id
}

export enum ExpiresInEnum {
  '1m' = '1m',
  '5m' = '5m',
  '10m' = '10m',
  '1h' = '1h'
}
