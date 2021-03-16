# Examples of usage

### Command Examples

Working with the theme specified in `config.yml` under the `development` key
(Since `development` is the default key)

```bash
yarn deploy

yarn watch

yarn start

yarn download
```

Working with the theme specified in `config.yml` under the key `production`

```bash
yarn deploy -e production

yarn watch -e production

yarn start -e production

yarn download -e production
```

### Development process

This process is divided into two stages:

First step. Developing a feature locally using the `yarn watch` command.
During development locally, when you change `*.liquid | *.scss` files, they are deploying directly into the theme,
but the `*.js` files do not deploy into the theme when they change, and only compiles locally.
This was done in order to reduce the speed of compilation of` *.js` files and increase developer productivity.

* For hot fixes, you can do without local development, for example, make changes in the code and deploy them into the theme.

Second step. Deploying your changes into the theme via the `yarn deploy` command.
First, the project is fully compiled into the `dist/` folder, and then all the contents of the folder are deploying into the theme.
