export type TAuthTokens = {
  access: string
  refresh: string
}
export type TRequestOtpData = {
  sid: number
  wait: number
}
export type TCheckEmailData = {
  exists: boolean
}
