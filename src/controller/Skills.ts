import dataSource from "../utils";
import { Skill } from "../entity/Skill";
import { Repository } from "typeorm";
import { Request, Response } from "express";

const repository: Repository<Skill> = dataSource.getRepository(Skill);

interface IController {
  [key: string]: (arg1: Request, arg2: Response) => {};
}

export const skillController: IController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware de vérification du body
      if (typeof req.body.name !== "string") {
        throw new Error("Body is not valide", { cause: "body" });
      }
      const skill: Partial<Skill> = req.body;
      const savedSkill = await repository.save(skill);
      console.log("Skill created !");
      res.status(201).json({ savedSkill });
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined
            ? error.message
            : "Error while creating skill",
      });
    }
  },

  readAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const allSkills = await repository.find();
      console.log("Skills found");
      res.status(200).json({ allSkills });
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .json({ succes: false, message: "Error skills not found" });
    }
  },

  readOne: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware de vérification des params
      if (
        typeof req.params.skillId !== "number" ||
        !Number.isInteger(Number(req.params.skillId))
      ) {
        throw new Error("Ther's not a skill Params valide", {
          cause: "params",
        });
      }
      const oneSkill = await repository.findOneByOrFail({
        id: parseInt(req.params.skillId),
      });
      console.log("Skill found");
      res.status(200).json({ oneSkill });
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined
            ? error.message
            : "Error while creating skill",
      });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware de vérification des params
      if (
        typeof Number(req.params.skillId) !== "number" ||
        !Number.isInteger(Number(req.params.skillId))
      ) {
        throw new Error("Ther's not a skill Params valide", {
          cause: "params",
        });
      }

      // Middleware de vérification du body
      if (typeof req.body.name !== "string") {
        throw new Error("Body is not valide", { cause: "body" });
      }

      const oneSkill = await repository.findOneByOrFail({
        id: parseInt(req.params.skillId),
      });
      console.log("Skill found");
      try {
        oneSkill.name = req.body.name;
        const savedSkill = await repository.save(oneSkill);
        console.log("Skill updated");
        res.status(201).json({ savedSkill });
      } catch (error) {
        console.error(error);
        res
          .status(404)
          .json({ succes: false, message: "Error while updating skill" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined ? error.message : "Error skill not found",
      });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware de vérification des params
      if (
        typeof Number(req.params.skillId) !== "number" ||
        !Number.isInteger(Number(req.params.skillId))
      ) {
        throw new Error("Ther's not a skill Params valide", {
          cause: "params",
        });
      }
      const oneSkill = await repository.findOneByOrFail({
        id: parseInt(req.params.skillId),
      });
      console.log("Skill found");
      try {
        await repository.remove(oneSkill);
        console.log("Skill removed");
        res.status(201).json({ succes: true });
      } catch (error) {
        console.error(error);
        res.json({ succes: false, message: "Error skill not removed" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined ? error.message : "Error skill not found",
      });
    }
  },
};
