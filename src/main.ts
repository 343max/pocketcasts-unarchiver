import { config } from "../config.ts"
import { pocketCastsLogin } from "./pocketCasts/api.ts"

const main = async () => {
  const pocketcasts = await pocketCastsLogin(config.email, config.password)
  const podcasts = await pocketcasts.podcastList()
  const figarino = podcasts.podcasts.filter(({ title }) => title.includes("Figarino"))[0]
  const bookmarks = await pocketcasts.bookmarks(figarino.uuid)
  const archivedEpisodes = bookmarks.episodes.filter(({ isDeleted }) => isDeleted).map(({ uuid }) => uuid)
  await pocketcasts.archive(
    false,
    archivedEpisodes.map((uuid) => ({ uuid, podcast: figarino.uuid }))
  )
  console.log(`unarchived ${archivedEpisodes.length} episodes of '${figarino.title}'`)
}

main()
