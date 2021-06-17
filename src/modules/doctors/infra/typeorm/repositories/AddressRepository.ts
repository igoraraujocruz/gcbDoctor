import FindAddressDTO from '@modules/doctors/dtos/FindAddressDTO';
import Address from '@modules/doctors/infra/typeorm/entities/Address';
import IAddressRepository from '@modules/doctors/repositories/IAddressRepository';
import { getRepository, Repository, SelectQueryBuilder } from 'typeorm';

export default class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findByCepNumberAndComplementary({
    cep,
    number,
    complementary,
  }: FindAddressDTO): Promise<Address | undefined> {
    const address = this.ormRepository.findOne({
      where: (qb: SelectQueryBuilder<Address>) => {
        qb.andWhere('Address.cep = :cep', { cep });
        qb.andWhere('Address.number = :number', { number });

        if (complementary) {
          qb.andWhere('Address.complementary = :complementary', {
            complementary,
          });
        } else {
          qb.andWhere('Address.complementary isnull');
        }
      },
    });

    return address;
  }

  public async create(addressData: Partial<Address>): Promise<Address> {
    const address = this.ormRepository.create(addressData);

    await this.ormRepository.save(address);

    return address;
  }
}
