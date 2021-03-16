# Icons

### A working folder: `./src/icons/`

Any `*.svg` files that will be placed in the working folder will be copied into the snippets.

For example, in the working folder there is an icon `icon-close.svg`,
when working with a theme, this file
will be placed in snippets `./dist/snippets` called `icon-close.liquid`,
for further including in the theme.

```html
{% include 'icon-close' %}
```

####OR

```html
{% render 'icon-close' %}
```

If you used the command `yarn download`, then all such snippets `icon-*.liquid`
will be removed and placed in the working folder as svg icons.

