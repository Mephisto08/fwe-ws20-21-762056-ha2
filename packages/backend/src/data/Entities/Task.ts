import {Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import {Label} from './Label';
import {Tracking} from './Tracking';

// eslint-disable-next-line new-cap
@Entity()
/**
 * Klasse Task
 */
export class Task {
  /**
   * Auto Inkrement
   */
    // eslint-disable-next-line new-cap
    @PrimaryGeneratedColumn()
    id: number;

    // eslint-disable-next-line new-cap
    @Column()
    name: string;

    // eslint-disable-next-line new-cap
    @Column()
    description: string;

    // eslint-disable-next-line new-cap
    @CreateDateColumn()
    created: string;

    // eslint-disable-next-line new-cap
    @UpdateDateColumn()
    updated: string;

    // eslint-disable-next-line new-cap
    @ManyToMany(() => Label, (label) => label.tasks)
    // eslint-disable-next-line new-cap
    @JoinTable()
    labels: Label[];

    // eslint-disable-next-line new-cap
    @OneToMany(() => Tracking, (tracking) => tracking.task, {nullable: true})
    trackings: Tracking[];
}
