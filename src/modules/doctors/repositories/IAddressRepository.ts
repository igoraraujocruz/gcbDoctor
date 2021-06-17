import Address from '@modules/doctors/infra/typeorm/entities/Address';
import FindAddressDTO from '@modules/doctors/dtos/FindAddressDTO';

export default interface IAddressRepository {
  create(address: Partial<Address>): Promise<Address>;
  findByCepNumberAndComplementary(
    address: FindAddressDTO,
  ): Promise<Address | undefined>;
}
