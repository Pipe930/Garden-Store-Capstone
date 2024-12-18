import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Commune } from "./locates.model";
import { User } from "src/modules/users/models/user.model";
import { Branch } from "src/modules/branch/models/branch.model";
import { Supplier } from "src/modules/suppliers/models/supplier.model";

@Table({
    tableName: "address",
    modelName: "Address",
    timestamps: false
})
export class Address extends Model<Address> {

    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        field: "id_address"
    })
    declare idAddress: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "address_name",
        validate: {
            notEmpty: true
        }
    })
    declare addressName: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: true,
        field: "num_department"
    })
    declare numDepartment: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    declare city: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    declare description: string;

    @ForeignKey(() => Commune)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare idCommune: number;

    @BelongsTo(() => Commune)
    declare commune: Commune;

    @HasMany(() => AddressUser)
    declare addressUser: AddressUser[];

    @HasMany(() => Supplier)
    declare supplier: Supplier[];

    @HasOne(() => Branch)
    declare branch: Branch;
}


@Table({
    tableName: "address_user",
    modelName: "AddressUser",
    timestamps: false
})
export class AddressUser extends Model {

    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        field: "id_address_user"
    })
    declare idAddressUser: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    declare name: string;

    @ForeignKey(() => Address)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "id_address"
    })
    declare idAddress: number;
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "id_user"
    })
    declare idUser: number;

    @BelongsTo(() => Address)
    declare address: Address;
}