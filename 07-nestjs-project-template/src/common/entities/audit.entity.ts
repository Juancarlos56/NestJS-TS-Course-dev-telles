import { Injectable } from "@nestjs/common";
import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

@Injectable()
export class Audit {
    @CreateDateColumn({ name: 'AUD_FECHA_CREACION', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)'}) // FOR postgres ---> timestamp
    createdAt: Date;

    @UpdateDateColumn({ name: 'AUD_FECHA_ACTUALIZACION',type: 'timestamptz' , default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: "CURRENT_TIMESTAMP(6)"}) // FOR postgres ---> timestamp
    updatedAt: Date;

    @DeleteDateColumn({ name: 'AUD_FECHA_ELIMINACION' ,type: 'timestamptz'}) // FOR postgres ---> timestamp
    deletedAt: Date;

    @Column({  name: 'AUD_IS_ACTIVE', type: 'numeric', default: 1 })
    isActive: number;

}
