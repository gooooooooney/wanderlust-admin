import { getTags } from "@/actions/tags"
import { Tag } from "@prisma/client"
import { useEffect, useState } from "react"

export const useGetTags = () => {
  const [tags, setTags] = useState<Tag[]>([])

  const fetchTags = () => {
    getTags().then(data => {
      setTags(data)
    })
  }
  useEffect(() => {
    fetchTags()
  }, [])

  return { tags, fetchTags }
}