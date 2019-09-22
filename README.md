# TeamSpeak stats api

Pulls data from postgres and return json.

Requires a `.env` file in the following format:

```
dataBaseURI=postgresql://dbUserNaME:dBPassword@host:port/database
DEBUG=TeamSpeakStats-statsRouter
DEBUG_DEPTH=99
```

For running the docker you can also use the `.env` file. e.g

`docker run -p 8081:8081 --env-file .env -d jdon/teamspeakstatsapi`

GitHub: https://github.com/jdon/TeamSpeakStatsAPI

Docker Hub: https://hub.docker.com/r/jdon278/teamspeakstatsapi/
