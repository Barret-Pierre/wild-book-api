import { DataSource } from "typeorm";
import { Wilder } from "./entity/Wilder";
import { Skill } from "./entity/Skill";
import { Upvote } from "./entity/Upvote";
import { Photo } from "./entity/Photo";

// Identifiant de connexion à la base de donnée et choix des tables à récupérer
const dataSource = new DataSource({
  type: "sqlite",
  database: "./test.db",
  // permet de construire le chemin et les tables si elle ne sont pas créée
  synchronize: true,
  entities: [Wilder, Skill, Upvote, Photo],
  // option d'affichage des erreur et requête SQL dans la console
  logging: ["query", "error"],
});

export default dataSource;
