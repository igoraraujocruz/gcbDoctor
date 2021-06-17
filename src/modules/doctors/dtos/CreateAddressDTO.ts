export default interface ICreateAddressDTO {
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complementary?: string;
}
