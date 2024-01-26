import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleUser } from "./role-user.entity";

@Entity({
    name:"TCK_ROL"
})
export class Role {
    @PrimaryGeneratedColumn('increment', {name: "TRO_ID"})
    id:number;

    @Column({
        type: 'text', //FOR postgresql ---> 'text', 
        nullable: false,
        unique: true,
        name:"TRO_NOMBRE"
    })
    rolName: string;

    @OneToMany(
        ()=> RoleUser,
        (roleUser) => roleUser.role,
        {cascade:true},
    )
    listRolesUser:RoleUser[];
}