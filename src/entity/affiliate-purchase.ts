import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AffiliatePurchase {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public purchaseId: string;

    @Column()
    public aidKey: number;

    @Column()
    public pidKey: number;

    @Column()
    public sidKey: string;
}
