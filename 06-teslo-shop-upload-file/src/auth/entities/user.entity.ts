import { Product } from "src/products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column({
        type:'text', 
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type:'text', 
        nullable: false,
        select: false
    })
    password: string;

    @Column({
        type:'text', 
    })
    fullname: string; 

    @Column({
        type:'bool', 
        default: true
    })
    isActive: boolean;
   
    @Column({
        type: 'text',
        array: true,
        default: ['user'] 
    })
    roles: string[];

    @OneToMany(
        () => Product,
        (product) => product.user,
        {eager: true }
    )
    products?: Product[];


    @BeforeInsert()
    CheckEmail(){
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    CheckEmailUpdate(){
        this.CheckEmail();
    }
}
