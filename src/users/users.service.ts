import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Users } from './entities';
import { FilesService } from 'src/files/files.service';
import { PersonalInfo } from 'src/personal_infos/entities';
import { SignInDto, CreateUser, UpdatePassDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
      private jwtService: JwtService,
      private fileService: FilesService,
        @InjectRepository(Users) private userRepository: Repository<Users>,
        @InjectRepository(PersonalInfo) private personalInfoRepository: Repository<PersonalInfo>
    ) {}

    async user_signup(createUser: CreateUser, image: any): Promise<Object> {
      const [ user ] =  await this.userRepository.findBy({ email: createUser.email });

      if(user) return { status: HttpStatus.CONFLICT, message: "Email already exists" } 

      const file = await this.fileService.createFile(image);
      
      const password = await bcrypt.hash(createUser.password, 7);

      try {
        const personalInfo = await this.personalInfoRepository.save({
          first_name: createUser.first_name,
          last_name: createUser.last_name,
          middle_name: createUser.middle_name,
          phone_number: createUser.phone_number,
          avatar: process.env.API_URL+file,
          gender: createUser.gender,
          birth_date: createUser.birth_date,
          email: createUser.email
        })

      if (createUser.company_id) {
          const userNew = await this.userRepository.save({ 
              email: createUser.email,
              phone_number: createUser.phone_number,
              password: password,
              company_id: createUser.company_id,
              role: createUser.role,
              personal_info: personalInfo
          });  
          const { token } = await this.getToken(userNew);
          
          await this.userRepository.update({ id: userNew.id }, { token });
      } else {
          const userNew = await this.userRepository.save({ 
              email: createUser.email,
              phone_number: createUser.phone_number,
              password: password,
              role: createUser.role,
              personal_info: personalInfo
          });  
          const { token } = await this.getToken(userNew);
      
          await this.userRepository.update({ id: userNew.id }, { token });
      }

        return { status: HttpStatus.CREATED };
      } catch (error) {
        console.log(error);
      }
    }

    async user_signin(signInDto: SignInDto): Promise<Object> {
      const user = await this.userRepository.findOne({ where: { email: signInDto.email }, relations: { role: true, personal_info: true }});

      if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
  
      const pass = await bcrypt.compare(signInDto.password, user.password);

      if(!pass) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
  
      const { token } = await this.getToken(user);

      await this.userRepository.update({ id: user.id }, { token })

      const update_user = await this.userRepository.findOne({ where: { email: user.email }, relations: { role: true, personal_info: true }});

      return { status: HttpStatus.OK, user: update_user, token };
    }

    async find_users(): Promise<Object> {
        const users = await this.userRepository.find({ relations: { role: true, personal_info: true }});

        if(users.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Users not found' };
        
        return { status: HttpStatus.OK, users }
    }

    async find_user(id: number): Promise<Object> {
        const user = await this.userRepository.findOne({ where: { id }, relations: { role: true, personal_info: true }});

        if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };

        return { status: HttpStatus.OK, user };
    }

    async update_user_data(id: number, updateUserDto: UpdateUserDto, image: any): Promise<Object> {
      try {
          const user = await this.userRepository.findOne({ where: { id }, relations: ['role', 'personal_info'] });
  
          if (!user) {
              return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
          }
  
          if (image) {
              const file = await this.fileService.createFile(image);
              const personalInfo = await this.personalInfoRepository.findOne({ where: { id: user.personal_info.id } });
  
              if (!personalInfo) {
                  return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Personal info not found' };
              }
  
              const avatarFileName = personalInfo.avatar.split('/').pop();
              const status = await this.fileService.removeFile(avatarFileName);
  
              if (status !== HttpStatus.OK) {
                  return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to remove old avatar' };
              }
  
              await this.personalInfoRepository.update({ id: user.personal_info.id }, {
                first_name: updateUserDto.first_name ? updateUserDto.first_name : personalInfo.first_name,
                last_name: updateUserDto.last_name ? updateUserDto.last_name : personalInfo.last_name,
                middle_name: updateUserDto.middle_name ? updateUserDto.middle_name : personalInfo.middle_name,
                phone_number: updateUserDto.phone_number ? updateUserDto.phone_number : personalInfo.phone_number,
                gender: updateUserDto.gender ? updateUserDto.gender : personalInfo.gender,
                birth_date: updateUserDto.birth_date ? updateUserDto.birth_date : personalInfo.birth_date,
                email: updateUserDto.email ? updateUserDto.email : personalInfo.email,
                avatar: `${process.env.API_URL}${file}`,
              });
          } else {
            const personalInfo = await this.personalInfoRepository.findOne({ where: { id: user.personal_info.id } });

            await this.personalInfoRepository.update({ id: user.personal_info.id }, {
              first_name: updateUserDto.first_name ? updateUserDto.first_name : personalInfo.first_name,
              last_name: updateUserDto.last_name ? updateUserDto.last_name : personalInfo.last_name,
              middle_name: updateUserDto.middle_name ? updateUserDto.middle_name : personalInfo.middle_name,
              phone_number: updateUserDto.phone_number ? updateUserDto.phone_number : personalInfo.phone_number,
              gender: updateUserDto.gender ? updateUserDto.gender : personalInfo.gender,
              birth_date: updateUserDto.birth_date ? updateUserDto.birth_date : personalInfo.birth_date,
              email: updateUserDto.email ? updateUserDto.email : personalInfo.email,
            });
          }
  
          if (updateUserDto.company_id) {
            await this.userRepository.update({ id: user.id }, {
              email: updateUserDto.email ? updateUserDto.email : user.email,
              phone_number: updateUserDto.phone_number ? updateUserDto.phone_number : user.phone_number,
              company_id: updateUserDto.company_id,
              role: updateUserDto.role ? updateUserDto.role : user.role,
            });
          } else {
            await this.userRepository.update({ id: user.id }, {
              email: updateUserDto.email ? updateUserDto.email : user.email,
              phone_number: updateUserDto.phone_number ? updateUserDto.phone_number : user.phone_number,
              company_id: null,
              role: updateUserDto.role ? updateUserDto.role : user.role,
            });
          }
  
          const updated_user = await this.userRepository.findOne({ where: { id }, relations: ['role', 'personal_info'] });
  
          return { status: HttpStatus.OK, updated_user };
      } catch (error) {
          console.error(error);
          return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' };
      }
    }

    async update_user_pass(updatePassDto: UpdatePassDto, token: string): Promise<Object> {
      const [ user ] = await this.userRepository.findBy({ token });

        if (!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
    
        const pass = await bcrypt.compare(updatePassDto.password, user.password);
        if (!pass) return { status: HttpStatus.UNAUTHORIZED, message: 'Wrong password' };
    
        if (updatePassDto.new_password != updatePassDto.confirm_password) 
            return { status: HttpStatus.UNAUTHORIZED, message: 'Confirm password error' };
    
        const password = await bcrypt.hash(updatePassDto.new_password, 7);
    
        await this.userRepository.update({ id: user.id }, { password });
    
        const updatePasswordUser = await this.userRepository.findOne({ where: { id: user.id }, relations: { role: true, personal_info: true }});
    
        return { status: HttpStatus.OK, updatePasswordUser };
    }

    async remove_user(id: number): Promise<Object | HttpStatus> {
        const user = await this.userRepository.findOne({ where: { id }, relations: { personal_info: true }});
        
        if(!user) return { status: HttpStatus.NOT_FOUND, message: 'User not found' };
        
        const personalInfo = await this.personalInfoRepository.findOne({ where: { id: user.personal_info.id }});
      
        const status = await this.fileService.removeFile(personalInfo.avatar.split('/')[3])

        if (status == 500) return HttpStatus.INTERNAL_SERVER_ERROR;

        await this.userRepository.delete({ id });

        await this.personalInfoRepository.delete({ id: user.personal_info.id });

        return HttpStatus.OK;
    }

  async getToken(user: Users) {
    const expiresInDate = new Date();
    expiresInDate.setDate(expiresInDate.getDate() + 3);

    const jwtPayload = { id: user.id, role: user.role, expiresInDate };

    try {
      const accessToken = await this.jwtService.signAsync(jwtPayload, {
          secret: process.env.ACCES_TOKEN_KEY_PERSON,
          expiresIn: process.env.ACCESS_TOKEN_TIME || '1d',
      });

      return { token: accessToken };
    } catch (error) {
      console.error('Ошибка при создании токена:', error);
      throw new Error('Ошибка при создании токена');
    }
  }
}