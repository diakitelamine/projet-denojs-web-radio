import type { roleTypes } from '../types/roleTypes.ts';
import type { userUpdateTypes } from '../types/userUpdateTypes.ts';

export default interface UserInterfaces {

    _id: { $oid: string } | null | string;

    email: string;
    password: string;
    lastname: string;
    firstname: string;
    phoneNumber ? : string;

    dateNaiss: Date;
    role: roleTypes;

    getAge(): Number;
    fullName(): string;
    insert(): Promise < void > ;
    update(update: userUpdateTypes): void;
    delete(): Promise < any > ;
}