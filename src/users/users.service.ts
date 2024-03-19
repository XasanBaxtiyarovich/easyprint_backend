import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Users } from './entities';
import { FilesService } from 'src/files/files.service';
import { SignInDto, SignUpDto, UpdatePassDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private jwtService: JwtService,
        private fileService: FilesService
    ) {}

    async user_signup(signUpDto: SignUpDto, image: any): Promise<Object> {
      
        const [ user ] =  await this.userRepository.findBy({ email: signUpDto.email });
  
        if(user) return { status: HttpStatus.CONFLICT, message: "Email already exists" } 

        const file = await this.fileService.createFile(image);

        const hashed_password = await bcrypt.hash(signUpDto.password, 7);

        const userNew = await this.userRepository.save({ ...signUpDto, hashed_password, image: process.env.API_URL+file });  
      
        const { token } = await this.getToken(userNew);

        await this.userRepository.update({ id: userNew.id }, { token })

        const new_user = await this.userRepository.findOne({ where: { email: signUpDto.email }, relations: { role: true }});
        

        return { status: HttpStatus.CREATED, user: new_user, token };
    }

    async user_signin(signInDto: SignInDto): Promise<Object> {
      const user = await this.userRepository.findOne({ where: { email: signInDto.email, is_active: true }, relations: { role: true }});

      if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
  
      const pass = await bcrypt.compare(signInDto.password, user.hashed_password);

      if(!pass) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
  
      const { token } = await this.getToken(user);

      await this.userRepository.update({ id: user.id }, { token })

      const update_user = await this.userRepository.findOne({ where: { email: user.email }, relations: { role: true }});

      return { status: HttpStatus.OK, user: update_user, token };

    }

    async find_users(): Promise<Object> {
        const users = await this.userRepository.find({ relations: { role: true }});
        if(users.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Users not found' }
        
        return { status: HttpStatus.OK, users }
    }

    async find_user(id: number): Promise<Object> {
        const user = await this.userRepository.findOne({ where: { id }, relations: { role: true }});

        if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' }

        return { status: HttpStatus.OK, user };
    }

    async update_user_date(id: number, updateUserDto: UpdateUserDto, image: any): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ id });
        
        if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' }

        
        if (image != undefined && image != null) {
          const file = await this.fileService.createFile(image);
          
          await this.userRepository.update({ id }, { ...updateUserDto, image: process.env.API_URL+file  });
        } else {
          await this.userRepository.update({ id }, { ...updateUserDto });
        }

        const updated_user = await this.userRepository.findOne({ where: { id }, relations: { role: true }});

        return { status: HttpStatus.OK, updated_user };
    }

    async update_user_pass(updatePassDto: UpdatePassDto, token: string): Promise<Object> {
      const [ user ] = await this.userRepository.findBy({ token });

        if (!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
    
        const pass = await bcrypt.compare(updatePassDto.password, user.hashed_password);
        if (!pass) return { status: HttpStatus.UNAUTHORIZED, message: 'Wrong password' };
    
        if (updatePassDto.new_password != updatePassDto.confirm_password) 
            return { status: HttpStatus.UNAUTHORIZED, message: 'Confirm password error' };
    
        const hashed_password = await bcrypt.hash(updatePassDto.new_password, 7);
    
        await this.userRepository.update({ id: user.id }, { hashed_password });
    
        const updatePasswordUser = await this.userRepository.findOne({ where: { id: user.id }, relations: { role: true }});
    
        return { status: HttpStatus.OK, updatePasswordUser };
    }

    async remove_user(id: number): Promise<Object | HttpStatus> {
        const [ user ] = await this.userRepository.findBy({ id });
        if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' }
      
        await this.userRepository.delete({ id });

        return HttpStatus.OK;
    }

    async active(token: string): Promise<Object | HttpStatus> {
      const [ user ] = await this.userRepository.findBy({ token: token });
  
      if (!user) return { message: 'User Not Found', status: HttpStatus.NOT_FOUND };
      
      if (user.is_active) {
        await this.userRepository.update({ id: user.id }, { is_active: false });
        return {
          message: 'User not activeted',
          status: HttpStatus.OK
        }
      } else {
        await this.userRepository.update({ id: user.id }, { is_active: true });
        return {
          message: 'User activeted',
          status: HttpStatus.OK
        }
      }
  }

  async active_id(id: number): Promise<Object | HttpStatus> {
    const [ user ] = await this.userRepository.findBy({ id });

    if (!user) return { message: 'User Not Found', status: HttpStatus.NOT_FOUND };
    
    if (user.is_active) {
      await this.userRepository.update({ id: user.id }, { is_active: false });
      return {
        message: 'User not activeted',
        status: HttpStatus.OK
      }
    } else {
      await this.userRepository.update({ id: user.id }, { is_active: true });
      return {
        message: 'User activeted',
        status: HttpStatus.OK
      }
    }
}


async getToken(user: Users) {
  const expiresInDate = new Date();
  expiresInDate.setDate(expiresInDate.getDate() + 3);

  const jwtPayload = { id: user.id, role: user.role, expiresInDate };

  try {
      const accessToken = await this.jwtService.signAsync(jwtPayload, {
          secret: process.env.ACCES_TOKEN_KEY_PERSON,
          expiresIn: process.env.ACCESS_TOKEN_TIME || '1d', // Установка значения по умолчанию на один день, если переменная не установлена
      });

      return { token: accessToken };
  } catch (error) {
      // Обработка ошибок подписи токена
      console.error('Ошибка при создании токена:', error);
      throw new Error('Ошибка при создании токена');
  }
}

}
