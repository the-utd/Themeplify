# File structure

Builder has the following file structure:

```
└── src/
    ├── assets/         # Contains all the assets used in the theme
    ├── config/         # Includes a settings_schema.json file and a settings_data.json file
    ├── icons/          # Contains all svg icons
    ├── layout/         # Contains theme layout templates
    ├── locales/        # Contains the theme's locale files
    ├── scripts/        # Contains javascript files
    ├── sections/       # Contains a theme's sections
    ├── snippets/       # Contains all the theme's Liquid snippet files
    ├── styles/         # Contains SCSS and .css.liquid files
    └── templates/      # Contains all other Liquid templates
└── config.yml          # Config file based on Shopify Themekit
```

The structure is very similar to a [Shopify/slate](https://github.com/Shopify/slate), so if you used slate, you can easily migrate to our builder
