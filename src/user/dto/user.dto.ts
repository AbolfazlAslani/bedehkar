import { ApiProperty } from "@nestjs/swagger";

export class loginType {

    @ApiProperty({
        type: 'string',
        required: true,
        description: 'username for login',
      })
    username?:string;
    
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'password for login',
      })
    password?:string;
    
  }