import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    id: string

    @Column({unique: true})
    title: string

    @Column()
    description: string
}