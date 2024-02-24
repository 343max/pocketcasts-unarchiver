import { configSchema } from "./configType.ts"
import { pocketCastsLogin } from "./pocketCasts/api.ts"

const config = configSchema.parse(process.env)

const main = async () => {
  const pocketcasts = await pocketCastsLogin(config.POCKET_CASTS_EMAIL, config.POCKET_CASTS_PASSWORD)
  const podcasts = await pocketcasts.podcastList()
  const podcast = podcasts.podcasts.filter(({ title }) => title.includes(config.POCKET_CASTS_PODCAST_TITLE))[0]
  const bookmarks = await pocketcasts.bookmarks(podcast.uuid)
  const archivedEpisodes = bookmarks.episodes.filter(({ isDeleted }) => isDeleted).map(({ uuid }) => uuid)
  await pocketcasts.archive(
    false,
    archivedEpisodes.map((uuid) => ({ uuid, podcast: podcast.uuid }))
  )
  console.log(`unarchived ${archivedEpisodes.length} episodes of '${podcast.title}'`)
  const startedEpisodes = bookmarks.episodes.filter(({ playedUpTo }) => playedUpTo > 0).map(({ uuid }) => uuid)
  console.log(`resetting ${startedEpisodes.length} episodes of '${podcast.title}'`)
  for (const episodeUuid of startedEpisodes) {
    await pocketcasts.updateEpisode(episodeUuid, podcast.uuid, { position: "0", status: 2 })
    process.stdout.write(".")
  }
  console.log()
  console.log(`reset ${startedEpisodes.length} episodes of '${podcast.title}'`)
}

main()
