import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const RawHeaders = createParamDecorator(
    (data: string, ctx: ExecutionContext)=>{
        const req = ctx.switchToHttp().getRequest();
        const header = req.rawHeaders;
        if (!header) {
            throw new InternalServerErrorException('Header not found (request)');
        }
    
        return (!data)? header: header[data];
    }
);