import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserAuth } from "../entities/auth.entity";
import { JWTPayload } from "../interfaces/jwt-payload.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserStateEnum } from "../enum/state-user.enum";

@Injectable()
export class JWTStrategy extends PassportStrategy( Strategy ){

    constructor(
        @InjectRepository(UserAuth)
        private readonly userRepository: Repository<UserAuth>,
        configService: ConfigService,
        ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: JWTPayload): Promise<UserAuth>{
        const {id} = payload;
        const user = await this.userRepository.findOneBy({id})
        if (!user) {
            throw new UnauthorizedException('Token not valid')
        }
        if (+user.isActive === UserStateEnum.INACTIVO) {
            throw new UnauthorizedException('User is inactive, talk with an admin')
        }
        return user;
    }
}