import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';


function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};

@Injectable()
export class AppService {
  getHello(): string {
    return "Salam"
  }
}
