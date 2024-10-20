import { randomUUID } from "crypto";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Product } from "src/modules/products/models/product.model";
import { User } from "src/modules/users/models/user.model";
import { Shipping } from "src/modules/shippings/models/shipping.model";

export enum TypeStatus {
    PENDING = 'PENDIENTE',
    PAID = 'PAGADO',
    CANCELED = 'CANCELADO'
}

@Table({
    tableName: 'sales',
    modelName: 'Sale',
    timestamps: true
})
export class Sale extends Model {

    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: randomUUID(),
        field: 'id_sale'
    })
    declare idSale: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'price_net',
        validate: {
            min: 1000
        }
    })
    declare priceNet: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'price_iva',
        validate: {
            min: 100
        }
    })
    declare priceIva: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'price_total',
        validate: {
            min: 1000
        }
    })
    declare priceTotal: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'discount_applied',
        validate: {
            min: 0
        }
    })
    declare discountApplied: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'products_quantity',
        validate: {
            min: 1
        }
    })
    declare productsQuantity: number;

    @Column({
        type: DataType.ENUM(TypeStatus.PENDING, TypeStatus.PAID, TypeStatus.CANCELED),
        allowNull: false
    })
    declare status: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'id_user'
    })
    declare idUser: number;

    @HasMany(() => SaleProduct)
    declare saleProducts: SaleProduct[];

    @HasOne(() => Shipping)
    declare shipping: Shipping;
}


@Table({
    tableName: 'saleProduct',
    modelName: 'SaleProduct',
    timestamps: false
})
export class SaleProduct extends Model {

    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        field: 'id_sale_product'
    })
    declare idSaleProduct: number;

    @ForeignKey(() => Sale)
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        field: 'id_sale'
    })
    declare idSale: string;

    @ForeignKey(() => Product)
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        field: 'id_product'
    })
    declare idProduct: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare quantity: number;

    @BelongsTo(() => Product)
    declare product: Product;
};
