import MedicalSpecialty from '../infra/typeorm/entities/MedicalSpecialty';

export default interface DoctorDTO {
  id?: string;
  name: string;
  crm: string;
  landline: string;
  mobilePhone: string;
  zipCode: string;
  medicalSpecialty: MedicalSpecialty[];
}
