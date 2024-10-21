import { Document, Model } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface IToken {
  token: string;
  user: string;
  type: string;
  expires: Date;
  code?: number;
  blacklisted: boolean;
  provider?: string;
}

export type NewToken = Omit<IToken, 'blacklisted'>;

export interface ITokenDoc extends IToken, Document {}

export interface ITokenModel extends Model<ITokenDoc> {}

export interface IPayload extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}

export interface TokenPayload {
  token: string;
  expires: Date;
}

export interface AccessToken {
  accessToken: TokenPayload;
}
