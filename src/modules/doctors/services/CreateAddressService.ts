import { injectable, inject } from 'tsyringe';
import Address from '@modules/doctors/infra/typeorm/entities/Address';
import IAddressRepository from '@modules/doctors/repositories/IAddressRepository';
import axios from 'axios';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(zip_code: string): Promise<Address> {
    const { data } = await axios(`https://viacep.com.br/ws/${zip_code}/json/`);

    if (data.erro) {
      throw new AppError('Cannot return any value, please check the Zip Code');
    }

    return this.addressRepository.create({
      cep: data.cep,
      city: data.localidade,
      complementary: data.complemento,
      state: data.uf,
      street: data.logradouro,
    });
  }
}
