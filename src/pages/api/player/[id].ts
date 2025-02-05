import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../../../ormconfig"
import { Player } from "@/entities/Player"
import { authOptions } from "@/pages/api/auth/[...nextauth]"; // next-auth 설정
import { getServerSession } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await AppDataSource.initialize();
  const playerRepository = AppDataSource.getRepository(Player);

  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions  );
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  switch (req.method) {
    case "GET":
      try {
        const player = await playerRepository.findOneBy({ id: Number(id) });
        if (!player) {
          return res.status(404).json({ message: "Player not found" });
        }
        return res.status(200).json(player);
      } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
      }

    case "PUT":
      try {
        const data = req.body;
        await playerRepository.update(Number(id), data);
        const updatedPlayer = await playerRepository.findOneBy({ id: Number(id) });
        return res.status(200).json(updatedPlayer);
      } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
      }

    case "DELETE":
      try {
        await playerRepository.delete(Number(id));
        return res.status(200).json({ message: "Player deleted" });
      } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
