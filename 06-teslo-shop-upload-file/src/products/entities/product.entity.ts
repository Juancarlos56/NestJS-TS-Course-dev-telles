import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from '.';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        example:'1dfc572e-aacc-4018-b8dc-4a4956a38be7',
        uniqueItems: true,
        description: 'Product ID'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ApiProperty({
        example:'T-Shirt Teslo',
        uniqueItems: true,
        description: 'Product Title'
    })
    @Column('text', {
        unique: true,
    })
    title: string;
    
    @ApiProperty({
        example:0,
        default: 0,
        description: 'Product price'
    })   
    @Column('float',{
        default: 0
    })
    price: number;
    
    @ApiProperty({
        example: 'lorem' ,
        default: null,
        description: 'Product description'
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
    
    @ApiProperty({
        example: 't-shirt-teslo' ,
        uniqueItems: true,
        description: 'Product slug for seo'
    })
    @Column('text', {
        unique: true
    })
    slug: string;
    
    @ApiProperty({
        example: 10,
        default: 0,
        description: 'Product stock'
    })
    @Column('int', {
        default: 0
    })
    stock: number;
    
    @ApiProperty({
        example: ['s','m', 'l'],
        default: [],
        description: 'Product sizes'
    })
    @Column('text',{
        array: true
    })
    sizes: string[];
    
    @ApiProperty({
        example:'female|men',
        description: 'product gender'
    })
    @Column('text')
    gender: string;

    
    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];
    
    @ApiProperty()
    // images
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.products,
        {  onDelete: 'CASCADE' }
    )
    user: User


    @BeforeInsert()
    checkSlugInsert() {

        if ( !this.slug ) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')

    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }


}
