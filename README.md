# Chess?

## Production

Visit either:

* <https://kth.codes> (DNS License lasts untill May 2022)
* <https://iprog-tw3.web.app>

Known limitation:

* Limited DB reads/writes due to limitation put on the firebase free tier.

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
