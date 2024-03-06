import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(Company) private companyRepo: Repository<Company>) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Object> {
    const [ company ] =  await this.companyRepo.findBy({ name: createCompanyDto.name });
  
    if(company) return { status: HttpStatus.CONFLICT, message: "Company name already exists" } 

    const new_company = await this.companyRepo.save({ ...createCompanyDto });  
    
    return { status: HttpStatus.CREATED, company: new_company };
  }

  async findAll(): Promise<Object> {
    const companies = await this.companyRepo.find();

    if(companies.length === 0) return { status: HttpStatus.NOT_FOUND, message: 'Companies not found' }
    
    return { status: HttpStatus.OK, companies }
  }

  async findOne(id: number): Promise<Object> {
    const [ company ] = await this.companyRepo.findBy({ id });

    if(!company) return { status: HttpStatus.NOT_FOUND, message: 'Company not found' }

    return { status: HttpStatus.OK, company };
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Object> {
    const [ company ] = await this.companyRepo.findBy({ id });
        
    if(!company) return { status: HttpStatus.NOT_FOUND, message: 'Company not found' }

    const [ company_name ] = await this.companyRepo.findBy({ name: updateCompanyDto.name });

    if (company_name.id == id) {
      await this.companyRepo.update({ id }, { ...updateCompanyDto });
  
      const updated_company = await this.companyRepo.findBy({ id });
  
      return { status: HttpStatus.OK, updated_company };
    } else {
      return { status: HttpStatus.CONFLICT, message: "Company name already exists" };
    }
  }

  async remove(id: number): Promise<Object | HttpStatus> {
    const [ company ] = await this.companyRepo.findBy({ id });

    if(!company) return { status: HttpStatus.NOT_FOUND, message: 'Company not found' }
  
    await this.companyRepo.delete({ id });

    return HttpStatus.OK;
  }
}
