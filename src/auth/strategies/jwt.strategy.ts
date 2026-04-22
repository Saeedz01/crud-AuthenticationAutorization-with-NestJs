import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.access_token,
      ]),
      secretOrKey: 'JWT_SECRET_KEY',
    });
  }
// The validate(its name is fixed) method is called by Passport after it verifies the JWT. It receives the decoded payload(passport passes payload when call validate()) of the token and should return an object that will be attached to the request as req.user. In this case, we are returning an object containing the userId, email, and role extracted from the payload.
// we can say req.user = validate(payload), passport automatically set the data in req.user and we can access it in our controllers and guards to check the user's role and permissions.
  validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}