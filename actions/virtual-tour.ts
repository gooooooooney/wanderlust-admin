"use server"

import { AddVirtualTourSchema } from "@/schemas";
import { VirtualTour, VirtualTourService } from "@/services/virtualTour.service"
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const addNewVirtualTour = async (values: z.infer<typeof AddVirtualTourSchema>) => {
  const params = {
    ...values,
    order: parseInt(values.order),
  }
  const result = await VirtualTourService.createVirtualTour(params)
  revalidatePath("/console/story")
  return result
}

export const updateVirtualTour = async (id: string, values: Partial<z.infer<typeof AddVirtualTourSchema>>) => {
  const { order, ...rest } = values
  const params = {
    ...rest,
  } as (typeof rest & { order?: number })
  if (values.order) {
    params.order = parseInt(values.order)
  }
  const result = await VirtualTourService.updateVirtualTour({
    id,
    values: params
  })
  revalidatePath("/console/story")
  return result
}

export const deleteVirtualTour = async (ids: string[]) => {
  const result = await VirtualTourService.deleteVirtualTour({
    ids
  })
  revalidatePath("/console/story")
  return result
}