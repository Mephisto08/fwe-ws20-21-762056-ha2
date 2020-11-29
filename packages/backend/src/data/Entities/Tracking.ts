import {Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';
import {Task} from './Task';

// eslint-disable-next-line new-cap
@Entity()
/**
 * Klasse Tracking
 */
export class Tracking {
  /**
   * Auto Inkrement
   */
    // eslint-disable-next-line new-cap
    @PrimaryGeneratedColumn()
    id: number;

    // eslint-disable-next-line new-cap
    @Column()
    description: string;

    // eslint-disable-next-line new-cap
    @CreateDateColumn()
    created: string;

    // eslint-disable-next-line new-cap
    @UpdateDateColumn()
    updatet: string;

    // eslint-disable-next-line new-cap
    @Column({default: new Date('2020-01-01').toString()})
    timeStart: string;

    // eslint-disable-next-line new-cap
    @Column({default: new Date('2020-01-01').toString()})
    timeEnd: string;

    // eslint-disable-next-line new-cap
    @ManyToOne(() => Task, (task) => task.trackings, {onDelete: 'CASCADE'})
    task: Task;
}
