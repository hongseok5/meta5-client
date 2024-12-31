import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  birth!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  position!: string;

  @CreateDateColumn()
  create_dt!: Date;

  @UpdateDateColumn()
  modify_dt!: Date;
  //tsconfig   "strictPropertyInitialization": false 가 필요할수 있다
}
