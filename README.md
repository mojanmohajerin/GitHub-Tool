# GitHub Playground (beta)

Welcome!

This application is a convenient way to view a summary of the pull request information for SquareKicker's GitHub repositories.

## Before you get started!

You need to update the environment variables to use your personalised GitHub token.

- Head across to your GitHub.
- Click on your user icon in the top right of the screen, and click `Settings`.
- Find and click `Developer settings` at the bottom of the tabs.
- Open the `Personal access tokens` tab and click `Tokens (classic)`.
- Click `Generate new token` then `Generate new token (classic)`.
- Enter your GitHub password.
  - Add any note such as `GitHub Hackery` or the like.
  - Select expiration period.
  - Tick:
    - `repo` (all fields)
    - `read:user` (under `user`, don't really need the other fields)
  - Click `Generate token`.
- Create a new .env file in the app folder, copy and paste the access token into the .env file beside `REACT_APP_GITHUB_TOKEN`.
- Save.

## Run the App!

In the project directory, you can run:

`npm install --force`

No questions please.

`npm run build` or `yarn build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

`npm start` or `yarn start`

Runs the app in the development mode. Open [http://localhost:9999](http://localhost:9999) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

## Tips

- Click on a pull request to view in more detail.
- Use the filter button to filter through
  - Dependabots
  - Open pull requests
  - Assignees
  - Assigned reviewers
- Update the repositories you see or the order you see them in at `app/src/inputs/repositories.tsx`.

## Future Improvements

- Bug: Fix overflow issues
- Bug: Fix responsiveness issues on mobile
- Host on Github, add url
- Migrate to utilise chrome extension (notification summary -> button leads to app)
- Move text into translation file
