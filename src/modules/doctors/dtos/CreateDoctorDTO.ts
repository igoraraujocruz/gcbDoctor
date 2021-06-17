import Address from '@modules/doctors/infra/typeorm/entities/Address';

export default interface DoctorDTO {
  id?: string;
  name: string;
  crm: string;
  landline: string;
  mobilePhone: string;
  address: Address;
  medicalSpecialty: string[];
}
