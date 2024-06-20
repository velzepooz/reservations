import { registerAs } from '@nestjs/config';

export default registerAs('auth-token', () => ({
  signOptions: {
    expiresIn: '1d',
  },
  secret: process.env.JWT_SECRET,
}));
