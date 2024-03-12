## Demo-MovieDB-test

### Configuration
1. Insert your Access Token Auth from themoviedb.org (https://developer.themoviedb.org/reference/intro/authentication) inside a API_KEY key in an .env file
2. Run `pnpm install` inside project folder
3. Run project with `pnpm run start`
4. Using Postman, Insomnia or other services, ping to the following URLs
  - `localhost:3000/movies` (This retrieves a list of recent and popular movies)
  - `localhost:3000/movies/poster` (This retrieves an image of said movie, suitable for printing)

### What does it do?
The project is a simple demo showcasing RxJs + NestJS, using themoviedb to retrieve information from said API, giving and endpoint for popular movies, and another to retrieve a random image from this popular movie list, suitable for a poster. I wanted to make this simple demo to show adaptability with RxJS and NestJS