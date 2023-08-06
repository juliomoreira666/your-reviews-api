import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Company } from '../company/company.entity';

@Entity()
export class CompanyReview {
  @PrimaryGeneratedColumn('uuid')
  review_id: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Company, (company) => company.reviews)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  culture_rating: number;

  @Column()
  leadership_rating: number;

  @Column()
  compensation_rating: number;

  @Column()
  work_life_balance_rating: number;

  @Column()
  career_development_rating: number;

  @Column()
  work_environment_rating: number;

  @Column()
  interpersonal_relations_rating: number;

  @Column()
  project_management_rating: number;

  @Column()
  innovation_rating: number;

  @Column()
  social_responsibility_rating: number;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  username_user: string;
}
