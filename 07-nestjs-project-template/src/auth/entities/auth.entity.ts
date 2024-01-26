import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserStateEnum } from "../enum/state-user.enum";
import { RoleUser } from "./role-user.entity";
import { PermissionUser } from "./permissions-user";

@Entity({
    name:"TCK_AUTH_USUARIO"
})
export class UserAuth {
    @PrimaryGeneratedColumn('increment', {name: "AUT_ID"})
    id:number;

    @ApiProperty({
        example:"jperez@domain.com",
        description: "enter a username in lowercase",
        required: true,
        uniqueItems: true,
    })
    @Column({
        type: 'text', //FOR postgresql ---> 'text', 
        nullable: false,
        unique: true,
        name:"AUT_USUARIO"
    })
    username: string;

    @ApiProperty({
        example:"Abc123@",
        description: "enter a password, it must have an uppercase letter, lowercase letter and a number",
        required: true
    })
    @Column({
        type: 'text', //FOR postgresql ---> 'text', 
        nullable: false,
        name:"AUT_PASSWORD",
        select: false
    })
    password: string;

    @Column({
        type:'numeric', //FOR postgresql ---> 'numeric',  
        precision: 1,
        scale: 0, 
        default: UserStateEnum.ACTIVO,
        name:"AUT_ESTADO",
    })
    isActive: number;

    @OneToMany(
        ()=> RoleUser,
        (roleUser) => roleUser.user,
        {cascade:true,eager:true},
    )
    listRolesUser:RoleUser[];

    @OneToMany(
        ()=> RoleUser,
        (roleUser) => roleUser.user,
        {cascade:true,eager:true},
    )
    listPermissions:PermissionUser[];

    @BeforeInsert()
    CheckUsername(){
        this.username = this.username.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    CheckUsernameUpdate(){
        this.CheckUsername();
    }
}
