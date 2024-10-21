import { Request } from 'express';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { tokenTypes } from '../token/token.constants';
import config from '@config/config';
import { userService } from '../user';
import { IPayload } from '../token/token.interfaces';
import { Types } from 'mongoose';
import { adminService } from '@modules/admin';

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: (req: any) => {
      const token = req.headers['authorization'].replace(/^Bearer\s/, '');
      return token;
    },
  },
  async (payload: IPayload, done) => {
    try {
      if (payload.type !== tokenTypes.ACCESS) {
        throw new Error('Invalid token type');
      }
      let user: any;
      user = await userService.getUserById(new Types.ObjectId(payload.sub));
      if (!user) {
        user = await adminService.getAdminById(new Types.ObjectId(payload.sub));
      }
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);
export default jwtStrategy;
