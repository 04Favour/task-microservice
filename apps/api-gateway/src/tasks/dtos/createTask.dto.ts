import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@ApiSchema({description: 'This collects values required to create a task'})
export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'The title of the task'})
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'The description of task'})
    description: string;
}