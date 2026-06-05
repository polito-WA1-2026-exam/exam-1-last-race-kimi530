# Exam #N: "Last Reace"
## Student: s355079 Mosaferi Kimia 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- POST `/api/something`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `stations` - contains all metro stations (id, name)
- Table `lines` - contains all metro lines (id, name)
- Table `line_stations` - maps stations to lines with their position order (line_id, station_id, position)
- Table `events` - contains random events with their coin effects (id, description, effect)
- Table `users` - contains registered users with encrypted credentials (id, username, hash, salt)
- Table `games` - contains completed games with scores (id, user_id, start_station_id, end_station_id, score, started_at)
- Table `game_segments` - contains each step of a game with the event that occurred (id, game_id, step_order, from_station_id, to_station_id, event_id, coins_after)

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)

## Use of AI Tools
Briefly describe whether you used any AI tools (e.g., ChatGPT, GitHub Copilot, Claude) while working on this project, for which purposes (e.g., clarifying concepts, debugging, generating code), and how you verified or adapted their output.
If you did not use any AI tools, simply state so.
