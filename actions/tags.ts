"use server"

import { TagService } from "@/services/tag.service"

export const getTags = async () => {
    return await TagService.getTags()
}