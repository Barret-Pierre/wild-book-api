import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from "typeorm";
import { Wilder } from "./Wilder";
import { Skill } from "./Skill";

@Entity()
@Index(["wilder", "skill"], { unique: true })
export class Upvote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vote: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.upvotes, { onDelete: "CASCADE" })
  wilder: Wilder;

  @ManyToOne(() => Skill, (skill) => skill.upvotes, { onDelete: "CASCADE" })
  skill: Skill;
}

// // création d'une entité Wilder (Table base de donnée)
// const EntityShema = typeorm.EntitySchema;

// // Export du modèle de la table Wilder
// module.exports = new EntityShema({
//   name: "UpVote",
//   indices: [
//     {
//       name: "skillId_wilderId_unique",
//       columns: ["wilder", "skill"],
//       unique: true,
//     },
//   ],
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     vote: {
//       type: "int",
//     },
//   },
//   relations: {
//     skill: {
//       target: "Skill",
//       type: "many-to-one",
//       inverseSide: "upvotes",
//       onDelete: "CASCADE"
//     },
//     wilder: {
//       target: "Wilder",
//       type: "many-to-one",
//       inverseSide: "upvotes",
//       onDelete: "CASCADE"
//     },
//   },
// });
