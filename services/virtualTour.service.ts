import { db } from "@/lib/db";
import { VirtualTour as PrismaVirtualTour } from "@prisma/client";
import { AuthService } from "./auth.service";

export type VirtualTour = Omit<PrismaVirtualTour, "id" | "updatedAt" | "createdAt" | "userId">

export type UpdateVirtualTour = Partial<VirtualTour>

export class VirtualTourService {

  static async getVirtualTour({
    userId
  }: { userId: string, }) {
    return await db.virtualTour.findMany({
      where: {
        userId
      }
    });
  }

  static async createVirtualTour(values: VirtualTour) {
    const user = await AuthService.getSelf()
    console.log(values)
    return await db.virtualTour.create({
      data: {
        ...values,
        userId: user.id
      }
    });
  }

  static async updateVirtualTour({
    id,
    values
  }: { id: string, values: UpdateVirtualTour }) {
    return await db.virtualTour.update({
      where: {
        id
      },
      data: values
    });
  }

  static async deleteVirtualTour({
    ids
  }: { ids: string[] }) {
    return await db.virtualTour.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
}