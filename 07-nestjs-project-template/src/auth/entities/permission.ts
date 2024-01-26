import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleUser } from "./role-user.entity";
import { PermissionUser } from "./permissions-user";

@Entity({
    name:"TCK_PERMISO"
})
export class Permission {
    @PrimaryGeneratedColumn('increment', {name: "TPE_ID"})
    id:number;

    @Column({
        type: 'text', //FOR postgresql ---> 'text', 
        nullable: false,
        unique: true,
        name:"TPE_NOMBRE"
    })
    rolName: string;

    @OneToMany(
        ()=> PermissionUser,
        (permissionUser) => permissionUser.permission,
        {cascade:true},
    )
    listPermissionsUser:PermissionUser[];
}