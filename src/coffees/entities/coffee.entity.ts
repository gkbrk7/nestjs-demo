import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";

@Entity('coffee') // sql table === 'demo'
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    brand: string;

    @Column({ default: 0 })
    recommendations: number;

    // @Column('json', { nullable: true })
    @JoinTable()
    @ManyToMany(type => Flavor, flavor => flavor.coffees, {
        cascade: true // ['insert]
    })
    flavors: Flavor[];
}