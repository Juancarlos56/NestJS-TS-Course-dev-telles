import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAuth } from "./auth.entity";
import { Role } from "./role.entity";
import { UserStateEnum } from "../enum/state-user.enum";
import { PermissionStateEnum } from "../enum/state_permission.enum";
import { Permission } from "./permission";

@Entity({
    name:"TCK_PERMISOS_USUARIO"
})
export class PermissionUser {
    @PrimaryGeneratedColumn('increment', {name: "TPU_ID"})
    id:number;

    @Column({
        type: 'numeric', //FOR postgresql ---> 'text', 
        nullable: true,
        precision: 1,
        scale: 0, 
        name:"TPU_ESTADO",
        default: PermissionStateEnum.INACTIVO,
    })
    state: number;

    @ManyToOne(
        ()=> UserAuth,
        (user)=> user.listPermissions,
    )
    @JoinColumn({
        name: 'AUT_ID',
        foreignKeyConstraintName: 'fk_user-permissions',
        referencedColumnName: 'id',
    })
    user: UserAuth;

    @ManyToOne(
        ()=> Permission,
        (permission)=> permission.listPermissionsUser,
        {eager:true}
    )
    @JoinColumn({
        name: 'TPE_ID',
        foreignKeyConstraintName: 'fk_role-roleifi',
        referencedColumnName: 'id',
    })
    permission: Permission;
}