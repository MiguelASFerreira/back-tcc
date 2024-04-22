import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: number;
}

@Injectable()
export class AuthMiddleware implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json('Token não fornecido');
      return false;
    }

    const token = authHeader.substring(7);

    try {
      const SECRET_KEY = process.env.SECRET_KEY;

      if (!SECRET_KEY) {
        throw new Error('Chave secreta não fornecida!');
      }

      const decodedToken = jwt.verify(token, SECRET_KEY) as DecodedToken;

      req.user = { id: decodedToken.userId };

      return true;
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Token Inválido' });
      return false;
    }
  }
}
