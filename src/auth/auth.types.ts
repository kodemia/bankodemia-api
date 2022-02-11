
export type JWTPayload = {
  sub: string // user._id
}

export enum ExpiresInEnum {
  '1m' = '1m',
  '5m' = '5m',
  '10m' = '10m',
  '1h' = '1h',
  '24h' = '24h'
}

export type ExpiresIn = '1m' | '5m' | '10m' | '1h' | '24h'

export const ExpiresInTypes = [ '1m', '5m', '10m', '1h', '24h' ] as const
export type ExpiresInType = typeof ExpiresInTypes[number]
