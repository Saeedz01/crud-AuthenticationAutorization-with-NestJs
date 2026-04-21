import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  const user = this.userRepository.create({
    ...createUserDto,
    password: hashedPassword,
  });

  return this.userRepository.save(user);
}

  findAll() {
  return this.userRepository.find();
}

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
  await this.userRepository.update(id, updateUserDto);

  return this.userRepository.findOne({
    where: { id },
  });
}

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
