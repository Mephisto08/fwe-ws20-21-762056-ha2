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
    @Column({type: 'time', default: 0})
    timeStart: string;

    // eslint-disable-next-line new-cap
    @Column({type: 'time', default: 0})
    timeEnd: string;

    // eslint-disable-next-line new-cap
    @ManyToOne(() => Task, (task) => task.trackings, {onDelete: 'CASCADE'})
    task: Task;
}
