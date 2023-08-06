import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';

interface LoginResponse {
  access_token: string;
  user_id: string;
  user_email: string;
  name: string;
  username: string; // Adicione a propriedade username
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findUser(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async validateUserNotExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    return true;
  }

  async createUser(
    email: string,
    password: string,
    username: string,
    name: string,
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email }],
    });
    if (existingUser) {
      throw new BadRequestException('Parece que essa conta já foi criada...');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      username,
      name,
    });

    return this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateUserEmail(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user.id };
    return {
      username: user.username,
      name: user.name,
      access_token: this.jwtService.sign(payload),
      user_id: user.id,
      user_email: user.email,
    };
  }

  async getUserFromJwt(token: string): Promise<User> {
    try {
      const decodedToken = this.jwtService.verify<JwtPayload>(token);
      const user = await this.userRepository.findOne({
        where: { id: decodedToken.sub },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
