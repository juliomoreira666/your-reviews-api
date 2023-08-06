import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { CompanyReview } from '../company-reviews/company-reviews.entity';

@Entity()
@Unique(['cnpj'])
export class Company {
  @PrimaryGeneratedColumn('uuid')
  company_id: string;

  @Column()
  name: string;

  @Column()
  industry: string;

  @Column()
  location: string;

  @Column()
  foundation_year: number;

  @Column()
  website: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image_url: string;

  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: 'user_registred' })
  user: User;

  @Column() // This field will not be selected by default
  user_registred: string; // Adding a new field to store the user ID

  @Column()
  cnpj: string;

  @OneToMany(() => CompanyReview, (review) => review.company)
  reviews: CompanyReview[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  overallRating?: number;
}
