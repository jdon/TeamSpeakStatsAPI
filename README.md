# TeamSpeak stats api

Pulls data from postgres and return json.

Requires a `.env` file in the following format:

```
dataBaseURI=postgresql://dbUserNaME:dBPassword@host:port/database
port=9081
bugsnagcode=adoi9uw28y5fiuoh8y3rqtu13q-09utf1
DEBUG=TeamSpeakStats-statsRouter
DEBUG_DEPTH=99
```

For running the docker you can also use the `.env` file. e.g

`docker run -p 9081:9081 --env-file .env -d jdon/teamspeakstatsapi`

GitHub: https://github.com/jdon/TeamSpeakStatsAPI

Docker Hub: https://hub.docker.com/r/jdon278/teamspeakstatsapi/
