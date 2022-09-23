import express from "express";
import cors from "cors";
import dataSource from "./utils";
import { wilderController } from "./controller/Wilders";
import { skillController } from "./controller/Skills";
import { upvoteController } from "./controller/Upvotes";
import { photoController } from "./controller/Photos";
import multer from "multer";
const app = express();
// middleware permettant l'upload des images
const upload = multer({ dest: "uploads/" });

// middleware permettant la serialization JSON des requettes HTTP
app.use(express.json());
app.use(cors());

//   Requete http get sur la route d'accueil "/"
app.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Bienvenue");
});

/*
  Requete http Wilders
*/
app.get("/api/wilders", wilderController.readAll);
app.post("/api/wilders", wilderController.create);
app.put("/api/wilders/:wilderId", wilderController.update);
app.get("/api/wilders/:wilderId", wilderController.readOne);
app.delete("/api/wilders/:wilderId", wilderController.delete);

/*
Requete http Skills
*/
app.get("/api/skills", skillController.readAll);
app.post("/api/skills", skillController.create);
app.get("/api/skills/:skillId", skillController.readOne);
app.put("/api/skills/:skillId", skillController.update);
app.delete("/api/skills/:skillId", skillController.delete);

/*
Requete http Upvotes
*/
app.post("/api/upvotes", upvoteController.create);
app.get("/api/upvotes", upvoteController.readAll);
app.put("/api/upvotes/:upVoteId", upvoteController.update);
// app.get("/api/upvotes/:upVoteId", upvoteController.readOne);
app.delete("/api/upvotes/:upVoteId", upvoteController.delete);

/*
Requete http Photos
*/
app.get("/api/photos/:photoId", photoController.readOne);
app.post("/api/photos", upload.single("file"), photoController.create);
// app.get("/api/photos", photoController.readAll);
// app.put("/api/photos/:photoId", photoController.update);
// app.get("/api/photos/:photoId", photoController.readOne);
// app.delete("/api/photos/:photoId", photoController.delete);

app.listen(3001, async (): Promise<void> => {
  // Connexion à la base de donnée (Attente de la connexion avant de passer à la suite)
  await dataSource.initialize().then(() => {
    console.log("DB connected");
  });

  //   Démarrage du server
  console.log("Server started");
});

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send("Error 404 not found !");
  }
);
