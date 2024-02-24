# pocketcasts-unarchiver

This is a docker image that will restore a Pockets Casts podcast feed of your choice to a pristine state once every night: it will remove the "archived" flag from every episode and reset the current position to the start of every episode.

# Why though?

My son listens to multiple episodes of his favorite [podcast](https://www.mdr.de/tweens/podcast/figarino/fahrradladen102.html) every day. He listens them on the Sonos speaker in his room using the Pocket Casts integration for Sonos. Unfortunately episodes will be marked as archived after palying even when the setting in Pocket Casts to archive completed episodes is turned off. Archived episodes won't appear in in the Sonos app anymore so fewer and fewer episodes would be available for listening.

Another problem is: Pocket Casts will remember the position where he stopped listening the last time and restart from there. But he wants to listen to his episodes from the beginning.

To fix these issues now this script will unarchive every episode and reset it to the start once every night.

# Usage

## Docker Compose

here is an example docker compose file:

```yaml
version: "3.8"

services:
  unarchiver:
    image: ghcr.io/343max/pocketcasts-unarchiver:latest
    environment:
      POCKET_CASTS_EMAIL: $POCKET_CASTS_EMAIL
      POCKET_CASTS_PASSWORD: $POCKET_CASTS_PASSWORD
      POCKET_CASTS_PODCAST_TITLE: $POCKET_CASTS_PODCAST_TITLE
```

Then add this `.env` file:

```
POCKET_CASTS_EMAIL=account@pocket.casts
POCKET_CASTS_PASSWORD=your-v3ry-secre7-p4ssw0rd
POCKET_CASTS_PODCAST_TITLE=My kids favorite podcasts name!
```

then run `docker compose up -d` and hopefully your podcasts will be fixed every night.

If you want to try your configuration without waiting the whole night you can try this in your `docker-compose.yml`:

```yaml
version: "3.8"

services:
  unarchiver:
    image: ghcr.io/343max/pocketcasts-unarchiver:latest
    environment:
      POCKET_CASTS_EMAIL: $POCKET_CASTS_EMAIL
      POCKET_CASTS_PASSWORD: $POCKET_CASTS_PASSWORD
      POCKET_CASTS_PODCAST_TITLE: $POCKET_CASTS_PODCAST_TITLE
    command: ["bun", "run", "main"]
```

This will run the service once right away instead of launching a cron job that waits till 1am.
