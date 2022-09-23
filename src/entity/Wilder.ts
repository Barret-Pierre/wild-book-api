import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Photo } from "./Photo";
import { Upvote } from "./Upvote";

// création d'une entité Wilder (Table base de donnée)
// const EntityShema = typeorm.EntitySchema;

@Entity()
export class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Upvote, (upvotes) => upvotes.wilder)
  upvotes: Upvote[];

  @OneToOne(() => Photo, (photo) => photo.wilder)
  @JoinColumn()
  photo: Photo;
}

// Export du modèle de la table Wilder
// module.exports = new EntityShema({
//   name: "Wilder",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     name: {
//       type: "text",
//     },
//     description: {
//       type: "text",
//     },
//   },
//   relations: {
//     // photo: {
//     //   target: "Photo",
//     //   type: "one-to-one",
//     //   joinTable: true,
//     //   joinColumn: true,
//     //   eager: true,
//     // },
//     upvotes: {
//       target: "UpVote",
//       type: "one-to-many",
//       inverseSide: "wilder",
//     },
//   },
// });
