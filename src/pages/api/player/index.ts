import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../../../ormconfig"
import { Player } from "../../../entities/Player";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"; // next-auth 설정
import {  } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const playerRepository = AppDataSource.getRepository(Player);

  switch (req.method) {
    case "GET":
      try {
        const session = await getServerSession(req, res, authOptions  );
        if (!session) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const players = await playerRepository.find();
        return res.status(200).json(players);
      } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
      }

    case "POST":
      try{
        const session = await getServerSession(req, res, authOptions  );
        //const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const data = req.body;
        const newPlayer = playerRepository.create(data);
        const savedPlayer = await playerRepository.save(newPlayer);
        return res.status(201).json(savedPlayer);
      } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
