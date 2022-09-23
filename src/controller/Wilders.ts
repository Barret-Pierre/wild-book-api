import dataSource from "../utils";
import { Request, Response } from "express";
import { Wilder } from "../entity/Wilder";

const repository = dataSource.getRepository(Wilder);

interface IController {
  [key: string]: (arg1: Request, arg2: Response) => {};
}

export const wilderController: IController = {
  // Insertion d'un nouveau wilder dans le repository Wilder (table wilder)
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware de vérification du body
      if (
        typeof req.body.name !== "string" ||
        typeof req.body.description !== "string"
      ) {
        throw new Error("Body is not valide", { cause: "body" });
      }
      const wilder: Partial<Wilder> = req.body;
      const savedWilder = await repository.save(wilder);
      console.log("Wilders created !");
      res.status(201).json({ savedWilder });
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined
            ? error.message
            : "Error while creating wilder",
      });
    }
  },

  readAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const allWilders = await repository.find({
        relations: ["upvotes", "upvotes.skill", "photo"],
      });
      console.log("Wilders found");
      res.status(200).json({ allWilders });
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .json({ succes: false, message: "Error wilders not found" });
    }
  },

  readOne: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware de vérification des params number et Int
      if (
        typeof Number(req.params.wilderId) !== "number" ||
        !Number.isInteger(Number(req.params.wilderId))
      ) {
        throw new Error("Ther's not a wilderId Params valide", {
          cause: "params",
        });
      }
      console.log();
      const oneWilder = await repository.findOneByOrFail({
        id: Number(req.params.wilderId),
      });
      console.log("Wilder found");
      res.status(200).json({ oneWilder });
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined ? error.message : "Error wilder not found",
      });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware de vérification des params
      if (
        typeof Number(req.params.wilderId) !== "number" ||
        !Number.isInteger(Number(req.params.wilderId))
      ) {
        throw new Error("Ther's not a wilderId Params valide", {
          cause: "params",
        });
      }

      // Middleware de vérification du body
      if (
        typeof req.body.name !== "string" ||
        typeof req.body.description !== "string"
      ) {
        throw new Error("Body is not valide", { cause: "body" });
      }
      const oneWilder = await repository.findOneByOrFail({
        id: Number(req.params.wilderId),
      });

      console.log("Wilder found");
      try {
        oneWilder.name = req.body.name;
        oneWilder.description = req.body.description;
        oneWilder.photo = req.body.photo;
        const savedWilder = await repository.save(oneWilder);
        console.log("Wilder updated");
        res.status(201).json({ savedWilder });
      } catch (error) {
        console.error(error);
        res
          .status(404)
          .json({ succes: false, message: "Error while updating wilder" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined ? error.message : "Error wilder not found",
      });
    }
  },

  delete: async (req, res) => {
    try {
      // Middleware de vérification des params
      if (
        typeof Number(req.params.wilderId) !== "number" ||
        !Number.isInteger(Number(req.params.wilderId))
      ) {
        throw new Error("Ther's not a wilderId Params valide", {
          cause: "params",
        });
      }
      const oneWilder = await repository.findOneByOrFail({
        id: Number(req.params.wilderId),
      });
      console.log("Wilder found");
      try {
        await repository.remove(oneWilder);
        console.log("Wilder removed");
        res.status(201).json({ succes: true });
      } catch (error) {
        console.error(error);
        res.json({ succes: false, message: "Error wilder not removed" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined ? error.message : "Error wilder not found",
      });
    }
  },
};
