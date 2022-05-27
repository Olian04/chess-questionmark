# Chess?

## Production

Visit either:

* ~~<https://kth.codes> (DNS License lasts untill May 2022)~~
* <https://iprog-tw3.web.app>

Known limitation:

* Limited daily DB reads/writes due to limitation put on the firebase free tier.
* There an issue caused by the browser cache in regards to the random puzzle api. The api is a REST API and always uses the same REST endpoint. This means that the browser will cache any requests sent to the API and reuse their responses for rapid successive requests. This is in accordance with the REST spec, however it might cause unintended behaviour if you requests multiple puzzles within a short amount of time (for example if you resign for a match instantly, and then start a new match straight away). This issue could have been solved by appending a random NONCE string to each request, however since that might be interpreted as a brute force attack on the API, we decided against this.

## Development

### Prerequisite

* Node 14.13+
* Npm 7.9+ (npm comes bundled with Node)

### Build for dev

1. Clone down this repository
2. Navigate to the `app` folder
3. Install dependencies using `npm install`
4. Run dev server using `npm run dev`
5. If your OS didn't open a browser tab for you, then open a browser and navigate to `localhost:3000`

### Build for prod

__Extra prerequisite:__

* Firebase CLI
* Firebase account

1. Clone down this repository
2. Navigate to the `app` folder
3. Install dependencies using `npm install`
4. Update `/app/src/services/firebase/config.ts` with your own firebase configuration
5. Sign into the firebase cli using `firebase login` and follow the wizard
6. Build and deploy by running `npm run deploy`
