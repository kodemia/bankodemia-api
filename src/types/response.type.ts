import { ApiProperty } from "@nestjs/swagger"

export class ControllerResponse {
  @ApiProperty({ example: true})
  success: boolean

  @ApiProperty()
  data: any
}

export class BadPostRequest {
  @ApiProperty({ example: 400 })
  statusCode: number

  @ApiProperty({ 
    type: [String],
    description: 'Error messages',
    example: [
      "attribute must be of certain type",
      "attribute must be one of the following values: OPTION_ONE, OPTION_TWO, OPTION_THREE"
    ]
  })
  message: string
  
  @ApiProperty({ 
    description: 'Error name',
    example: 'Bad Request',
  })
  error: string
}