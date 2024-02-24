import { config } from "../config.ts"
import { pocketCastsLogin } from "./pocketCasts/api.ts"

const main = async () => {
  const pocketcasts = await pocketCastsLogin(config.email, config.password)
  const podcasts = await pocketcasts.podcastList()
  console.log(podcasts.podcasts.filter(({ title }) => title.includes("Figarino")))
}

main()
