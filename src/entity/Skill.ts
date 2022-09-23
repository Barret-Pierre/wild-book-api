import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Upvote } from "./Upvote";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Upvote, (upvotes) => upvotes.skill)
  upvotes: Upvote[];
}

// // création d'une entité Wilder (Table base de donnée)
// const EntityShema = typeorm.EntitySchema;

// // Export du modèle de la table Wilder
// module.exports = new EntityShema({
//   name: "Skill",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     name: {
//       type: "text",
//       unique: true,
//     },
//   },
//   relations: {
//     upvotes: {
//       target: "UpVote",
//       type: "one-to-many",
//       inverseSide: "skill",
//     }
//   },
// });
