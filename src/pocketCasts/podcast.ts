import { z } from "zod"

export const podcastSchema = z.object({
  uuid: z.string(),
  episodesSortOrder: z.number(),
  autoStartFrom: z.number(),
  title: z.string(),
  author: z.string(),
  description: z.string(),
  url: z.string(),
  lastEpisodePublished: z.string(),
  unplayed: z.boolean(),
  lastEpisodeUuid: z.string(),
  lastEpisodePlayingStatus: z.number(),
  lastEpisodeArchived: z.boolean(),
  autoSkipLast: z.number(),
  folderUuid: z.string(),
  sortPosition: z.number(),
  dateAdded: z.string(),
})

export type PodcastSchema = z.infer<typeof podcastSchema>

export const podcastListResponseSchema = z.object({ podcasts: z.array(podcastSchema) })
