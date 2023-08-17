import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PlanEntity } from "./plan.entity";
import { UserEntity } from "./user.entity";

@Entity("programs")
export class ProgramEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;
    
    @Column()
    userId!: string;

    @ManyToOne(() => UserEntity)
    user!: UserEntity;

    @ManyToOne(() => PlanEntity)
    plan!: PlanEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
