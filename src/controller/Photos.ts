import dataSource from "../utils";
import { Photo } from "../entity/Photo";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import path from "path";

const repository: Repository<Photo> = dataSource.getRepository(Photo);

interface IController {
  [key: string]: (arg1: Request, arg2: Response) => {};
}

export const photoController: IController = {
  create: async (req: Request, res: Response): Promise<void> => {
    console.log("file", req.file?.path);
    console.log("body", req.body);
    try {
      const photo = { url: req.file?.path };
      const savedPhoto = await repository.save(photo);
      console.log("Photo created !");
      res.status(201).json({ savedPhoto });
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .json({ succes: false, message: "Error while creating Photo" });
    }
  },

  // create: async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const photo: Photo = req.body;
  //     const savedPhoto = await repository.save(photo);
  //     console.log("Photo created !");
  //     res.status(201).json({ savedPhoto });
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(404)
  //       .json({ succes: false, message: "Error while creating Photo" });
  //   }
  // },

  readAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const allPhotos = await repository.find();
      console.log("Photos found");
      res.status(200).json({ allPhotos });
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .json({ succes: false, message: "Error photos not found" });
    }
  },

  readOne: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware de vérification des params
      if (
        typeof Number(req.params.photoId) !== "number" ||
        !Number.isInteger(Number(req.params.photoId))
      ) {
        throw new Error("Ther's not a photo Params valide", {
          cause: "params",
        });
      }
      const onePhoto = await repository.findOneByOrFail({
        id: Number(req.params.photoId),
      });
      console.log("Skill found");
      console.log(__dirname + `/../../${onePhoto.url}`);
      res.sendFile(path.resolve(__dirname + `/../../${onePhoto.url}`));
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined
            ? error.message
            : "Error while finding photo doesn't exist",
      });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const onePhoto = await repository.findOneByOrFail({
        id: parseInt(req.params.photoId),
      });
      console.log("Photo found");
      onePhoto.url = req.body.url;
      try {
        const savedPhoto = await repository.save(onePhoto);
        console.log("Photo updated");
        res.status(201).json({ savedPhoto });
      } catch (error) {
        console.error(error);
        res
          .status(404)
          .json({ succes: false, message: "Error while updating Photo" });
      }
    } catch (error) {
      console.error(error);
      res.status(404).json({ succes: false, message: "Error Photo not found" });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const onePhoto = await repository.findOneByOrFail({
        id: parseInt(req.params.photoId),
      });
      console.log("Photo found");
      try {
        await repository.remove(onePhoto);
        console.log("Photo removed");
        res.status(201).json({ succes: true });
      } catch (error) {
        console.error(error);
        res.json({ succes: false, message: "Error Photo not removed" });
      }
    } catch (error) {
      console.error(error);
      res.status(404).json({ succes: false, message: "Error Photo not found" });
    }
  },
};
