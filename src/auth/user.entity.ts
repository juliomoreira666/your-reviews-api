import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Company } from '../company/company.entity';
import { CompanyReview } from '../company-reviews/company-reviews.entity';

@Entity()
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Company, (company) => company.user)
  companies: Company[];

  @OneToMany(() => CompanyReview, (review) => review.user)
  reviews: CompanyReview[];
}
