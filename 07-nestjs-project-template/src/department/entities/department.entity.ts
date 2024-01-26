import { ApiProperty } from "@nestjs/swagger";
import { Audit } from "src/common/entities/audit.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"TCK_JEFATURA"
})
export class Department extends Audit{
    @ApiProperty({
        example: '1',
        description: "ID del departamento",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('increment',{
        name:"TJE_ID"
    })
    id: number;

    @ApiProperty({
        example: 'Jefatura Comercial',
        description: "Nombre de la Jefatura"
    })
    @Column({
        type: 'text', //FOR postgresql ---> 'text', 
        nullable: false,
        name:"TJE_NOMBRE",
    })
    name: string;
    
}

