# Shopify Builder

## Usage
**Node.js version 14.0.0 or higher**

* Install all dependencies with [yarn](https://yarnpkg.com/)
```bash
yarn add --dev @the-utd/themeplify
```

* Add and configure your config.yml file. You can copy the example from the file [config.example.yml](./config.example.yml)

```yaml
development:
  password: XXXXXXXXXXXXXX
  theme_id: XXXXXXXXXXXXXX
  store: XXXXXXXXXXXXXX.myshopify.com
  preview_url: XXXXXXXXXXXXXX.shopifypreview.com <= [NOT REQUIRED]
  ignore_files:
    - config/settings_data.json
```

* Download your working theme
```bash
yarn download
```

* Use [basic commands](#basic-commands) for work with your theme

## Basic commands

`yarn build` - Build files

`yarn deploy` - Build and deploy files

`yarn start` - Build, deploy and watch files

`yarn watch` - Watch files

`yarn server` - Run Proxy server for the theme

`yarn download` - Download theme files

`yarn zip` - Archives the project

## Basic options

| Option   			|      Description      											|  Default Value 	|
|-------------------|:------------------------------------------------------------------|:-----------------:|
| -c, --config 		|  Path to config.yml 												| "config.yml" 		|
| -d, --dir 		|  Directory that command will take effect 							|  					|
| -e, --env 		|  Environment from config file 									| "development" 	|
| -a, --allenvs 	|  Will run this command for each environment in your config file 	| false 			|
| -n, --nodelete 	|  Will run deploy without removing files from shopify 				| false 			|
| --nh, --nohooks 	|  Will skip git hooks 												| false 			|
| --help 			|  Show help 														|  					|

## Documentation
It is important!
* [File structure](./docs/file-structure.md)
* [JavaScript](./docs/js.md)
* [CSS](./docs/css.md)
* [Examples of usage](./docs/example-usage.md)
* [Icons](./docs/icons.md)

## Last changes
All recent changes are available here: [changelog](./docs/changelog.md).
Bugs and feature-request here: [issues](/issues).
