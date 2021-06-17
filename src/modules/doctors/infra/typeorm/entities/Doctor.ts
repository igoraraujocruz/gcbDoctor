import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import MedicalSpecialty from './MedicalSpecialty';
import Address from './Address';

@Entity('doctors')
export default class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 120,
  })
  name: string;

  @Column({
    length: 7,
  })
  crm: string;

  @Column()
  landline: string;

  @Column({ name: 'mobile_phone' })
  mobilePhone: string;

  @ManyToOne(() => Address, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ManyToMany(() => MedicalSpecialty)
  @JoinTable({
    name: 'doctors_medical_specialities',
    joinColumn: {
      name: 'doctor_id',
    },
    inverseJoinColumn: {
      name: 'medical_specialty_id',
    },
  })
  medicalSpecialty: MedicalSpecialty[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
