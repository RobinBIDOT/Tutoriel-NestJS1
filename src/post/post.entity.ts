import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import {User} from "../user/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly title: string;

    @Column({type : "text"})
    readonly content: string;

    @CreateDateColumn()
    readonly created_at : Date

    @UpdateDateColumn()
    readonly updated_at : Date

    @ManyToOne(() => User, (user) => user.posts)
    user : User
}