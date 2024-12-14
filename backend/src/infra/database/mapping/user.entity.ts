import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

@Entity('users') // O nome da tabela no banco
@Unique(['uuid', 'email']) // Garante as colunas únicas
export class UserEntity {
  @PrimaryGeneratedColumn('increment') // Coluna SERIAL
  id: number;

  @Column({ type: 'uuid', unique: true }) // Coluna UUID
  uuid: string;

  @Column({ type: 'varchar', unique: true }) // Coluna UNIQUE
  email: string;

  @Column({ type: 'varchar' }) // Coluna UNIQUE
  salt: string;

  @Column({ type: 'varchar' }) // Coluna UNIQUE
  password: string;

  @CreateDateColumn({ name: 'created_at' }) // Coluna DEFAULT CURRENT_TIMESTAMP
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // Atualizado automaticamente
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true }) // Suporta exclusão lógica
  deletedAt: Date | null;
}
