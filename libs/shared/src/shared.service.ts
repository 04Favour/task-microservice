import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    getMessage(){
        console.log("This is coming from the shared library")
    }
}
