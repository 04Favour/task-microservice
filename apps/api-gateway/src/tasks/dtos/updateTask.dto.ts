import { ApiProperty } from "@nestjs/swagger";
import { CreateTaskDto } from "./createTask.dto";
import {PartialType} from "@nestjs/mapped-types"

export class UpdateTaskDto extends PartialType(CreateTaskDto){
    @ApiProperty({description: 'Title for update'})
    title: string
}