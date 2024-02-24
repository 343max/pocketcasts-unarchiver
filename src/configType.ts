import { z } from "zod"

export const configSchema = z.object({
  POCKET_CASTS_EMAIL: z.string(),
  POCKET_CASTS_PASSWORD: z.string(),
  POCKET_CASTS_PODCAST_TITLE: z.string(),
})
