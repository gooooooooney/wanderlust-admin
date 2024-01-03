"use server"

import { TagService } from "@/services/tag.service"

export const getTags = async () => {
    return await TagService.getTags()
}

export const createTag = async (name: string) => {
    return await TagService.createTag(name)
}

export const deleteTag = async (id: string) => {
    return await TagService.deleteTag(id)
}