import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HeaderCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);

    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.GLOBAL_API_KEY) {
      throw new UnauthorizedException('Invalid API Key');
    }
    next();
  }
}
