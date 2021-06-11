import faker from 'faker';

export default class FakerData {
    public generateName(): string {
        return faker.name.firstName();
    }

    public generateWord(): string {
        return faker.lorem.word();
    }

    public generateUuid(): string {
        return faker.datatype.uuid();
    }

    public generateWords(): string {
        return faker.lorem.lines();
    }

    public generateNumber(): string {
        return faker.random.alphaNumeric(11);
    }

    public generateFloat(): number {
        return faker.datatype.number();
    }

    public generatePhoneNumber(): string {
        return faker.phone.phoneNumber();
    }

    public generateAddress(): string {
        return faker.address.streetName();
    }

    public generateAddressComplement(): string {
        return faker.address.streetPrefix();
    }

    public generateCep(): string {
        return faker.address.zipCode();
    }

    public generateCity(): string {
        return faker.address.city();
    }

    public generateState(): string {
        return faker.address.state();
    }
}
