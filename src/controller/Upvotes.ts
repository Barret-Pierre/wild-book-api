import dataSource from "../utils";
import { Request, Response } from "express";
import { Upvote } from "../entity/Upvote";

const repository = dataSource.getRepository(Upvote);

interface IController {
  [key: string]: (arg1: Request, arg2: Response) => {};
}

export const upvoteController: IController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware verification body
      if (
        typeof req.body.wilder.id !== "number" ||
        typeof req.body.wilder === "undefined" ||
        typeof req.body.wilder.id !== "number" ||
        typeof req.body.skill === "undefined" ||
        !Number.isInteger(Number(req.body.skill.id)) ||
        !Number.isInteger(Number(req.body.wilder.id))
      ) {
        throw new Error("Body is not valide", { cause: "body" });
      }
      const upvote: Partial<Upvote> = {
        ...req.body,
        vote: 0,
      };
      const savedUpVote = await repository.save(upvote);
      console.log("Upvote created !");
      res.status(201).json({ savedUpVote });
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
      const allUpVotes = await repository.find({});
      console.log("Upvotes found");
      res.status(200).json({ allUpVotes });
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .json({ succes: false, message: "Error upvotes not found" });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      // Middleware verification params
      if (
        typeof Number(req.params.upVoteId) !== "number" ||
        !Number.isInteger(Number(req.params.upVoteId))
      ) {
        throw new Error("Body is not valide", { cause: "params" });
      }
      const oneUpVote = await repository.findOneByOrFail({
        id: Number(req.params.upVoteId),
      });
      console.log("Upvote found");
      oneUpVote.vote++;
      try {
        const savedUpVote = await repository.save(oneUpVote);
        console.log("Upvote updated");
        res.status(201).json({ savedUpVote });
      } catch (error) {
        console.error(error);
        res
          .status(404)
          .json({ succes: false, message: "Error while upvote skill" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined ? error.message : "Error upvote not found",
      });
    }
  },

  // readAll: async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const allUpVotes = await repository.find({});
  //     console.log("Upvotes found");
  //     res.status(200).json({ allUpVotes });
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(404)
  //       .json({ succes: false, message: "Error upvotes not found" });
  //   }
  // },

  // readOne: async (req, res) => {
  //   try {
  //     const oneUpVote = await repository.findOneByOrFail({
  //       id: req.params.upVoteId,
  //     });
  //     console.log("Upvote found");
  //     res.status(200).json({ oneUpVote });
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(404)
  //       .json({ succes: false, message: "Error upvote not found" });
  //   }
  // },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      if (
        typeof Number(req.params.upVoteId) !== "number" ||
        !Number.isInteger(Number(req.params.upVoteId))
      ) {
        throw new Error("Body is not valide", { cause: "params" });
      }
      const oneUpVote = await repository.findOneByOrFail({
        id: Number(req.params.skillId),
      });
      console.log("Upvote found");
      try {
        await repository.remove(oneUpVote);
        console.log("Upvote removed");
        res.status(201).json({ succes: true });
      } catch (error) {
        console.error(error);
        res.json({ succes: false, message: "Error upvote not removed" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(404).json({
        succes: false,
        message:
          error.cause !== undefined ? error.message : "Error upvote not found",
      });
    }
  },
};
