import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import MedicalSpecialty from './MedicalSpecialty';

@Entity('doctors')
export default class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  crm: string;

  @Column()
  landline: string;

  @Column({ name: 'mobile_phone' })
  mobilePhone: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({ name: 'medical_specialty' })
  medicalSpecialty: string;

  @OneToMany(
    () => MedicalSpecialty,
    medicalSpecialty => medicalSpecialty.doctor,
  )
  @JoinColumn({ name: 'medicalSpecialty' })
  medicalSpecialties: MedicalSpecialty[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
