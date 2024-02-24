import { z } from "zod"

export const bookmarkSchema = z.object({
  uuid: z.string().uuid(),
  playingStatus: z.number(),
  playedUpTo: z.number().int().nonnegative(),
  isDeleted: z.boolean(),
  starred: z.boolean(),
  duration: z.number().int().nonnegative(),
  bookmarks: z.array(z.unknown()),
})

export const bookmarksResponseSchema = z.object({
  episodes: z.array(bookmarkSchema),
  autoStartFrom: z.number().int().nonnegative(),
  episodesSortOrder: z.number().int(),
  autoSkipLast: z.number().int().nonnegative(),
})
