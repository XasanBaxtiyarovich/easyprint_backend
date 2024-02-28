import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Users } from './entities';
import { SignInDto, SignUpDto, UpdatePassDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private jwtService: JwtService,
    ) {}

    async user_signup(signUpDto: SignUpDto): Promise<Object> {
        const [ user ] =  await this.userRepository.findBy({ email: signUpDto.email });
  
        if(user) return { status: HttpStatus.CONFLICT, message: "Email already exists" }

        const hashed_password = await bcrypt.hash(signUpDto.password, 7);

        await this.userRepository.save({ ...signUpDto, hashed_password });

        const new_user = await this.userRepository.findOne({ where: { email: signUpDto.email }, relations: { role: true }});
        
        const token = await this.getToken(new_user);

        return { status: HttpStatus.CREATED, user: new_user, token };
    }

    async user_signin(signInDto: SignInDto): Promise<Object> {
      const user = await this.userRepository.findOne({ where: { email: signInDto.email }, relations: { role: true }});

      if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
  
      const pass = await bcrypt.compare(signInDto.password, user.hashed_password);

      if(!pass) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
  
      const token = await this.getToken(user);
  
      return { status: HttpStatus.OK, user, token };

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

    async update_user_date(id: number, updateUserDto: UpdateUserDto): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ id });
        
        if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' }

        await this.userRepository.update({ id }, { ...updateUserDto });

        const updated_user = await this.userRepository.findOne({ where: { id }, relations: { role: true }})

        return { status: HttpStatus.OK, updated_user };
    }

    async update_user_pass(id: number, updatePassDto: UpdatePassDto): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ id });

        if (!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
    
        const pass = await bcrypt.compare(updatePassDto.password, user.hashed_password);
        if (!pass) return { status: HttpStatus.FORBIDDEN, message: 'Wrong password' };
    
        if (updatePassDto.new_password != updatePassDto.confirm_password) 
            return { status: HttpStatus.UNAUTHORIZED, message: 'Confirm password error' };
    
        const hashed_password = await bcrypt.hash(updatePassDto.new_password, 7);
    
        await this.userRepository.update({ id }, { hashed_password });
    
        const updatePasswordUser = await this.userRepository.findOne({ where: { id }, relations: { role: true }});
    
        return updatePasswordUser;
    }

    async remove_user(id: number): Promise<Object | HttpStatus> {
        const [ user ] = await this.userRepository.findBy({ id });
        if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' }
      
        await this.userRepository.delete({ id });

        return HttpStatus.OK;
    }


    async getToken(user: Users){
      const jwtPayload={ id: user.id };

      const [accessToken] = await Promise.all([    
          this.jwtService.signAsync(jwtPayload,{
              secret: process.env.ACCES_TOKEN_KEY_PERSON,
              expiresIn: process.env.ACCESS_TOKEN_TIME
          })
      ])
      
      return { token: accessToken };  
    }
}
