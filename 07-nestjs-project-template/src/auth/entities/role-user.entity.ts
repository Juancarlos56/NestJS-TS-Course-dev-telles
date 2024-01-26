import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAuth } from "./auth.entity";
import { Role } from "./role.entity";
import { UserStateEnum } from "../enum/state-user.enum";

@Entity({
    name:"TCK_ROLES_USUARIO"
})
export class RoleUser {
    @PrimaryGeneratedColumn('increment', {name: "TRI_ID"})
    id:number;

    @Column({
        type: 'numeric', //FOR postgresql ---> 'text', 
        nullable: true,
        precision: 1,
        scale: 0, 
        name:"TRI_ESTADO",
        default: UserStateEnum.ACTIVO,
    })
    state: number;

    @ManyToOne(
        ()=> UserAuth,
        (user)=> user.listRolesUser,
    )
    @JoinColumn({
        name: 'AUT_ID',
        foreignKeyConstraintName: 'fk_user-roleifi',
        referencedColumnName: 'id',
    })
    user: UserAuth;

    @ManyToOne(
        ()=> Role,
        (role)=> role.listRolesUser,
        {eager:true}
    )
    @JoinColumn({
        name: 'TRO_ID',
        foreignKeyConstraintName: 'fk_role-roleifi',
        referencedColumnName: 'id',
    })
    role: Role;
}