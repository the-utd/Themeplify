# CSS

### A working folder: `./src/styles/`

The builder supports SCSS and SASS

## Structure

```
├── _base/        # Basic styles like typographi / fonts / etc.
├── _blocks/      # ONE FILE - ONE BEM BLOCK
├── _functions/   # SCSS functions
├── _layout/      # Layout styles
├── _libs/        # Libs styles
├── _mixins/      # SCSS Mixins
├── _templates/   # Additional template styles (Rarely used)
├── _ui/          # Contains all general UI styles, like buttons, selects, inputs, etc.
└── main.scss     # Main CSS file
```

## Variables

The builder creates a file `./dist/snippets/variables.css.liquid` in which it places the settings from the file `settings_schema.json`
in the form of global CSS variables. This file contains only this type of settings:
`color`, `text`, `image_picker`.
For example, if the setting has this ID `"id":"color_sale_text"`,
then the CSS variable will be called
`--settings-color-sale-text`, prefix `settings` is added and all underscores are replaced with hyphens.
All you need is to include this file in the layout.

```html
{% render 'variables.css' %}
```

#### OR

```html
{% include 'variables.css' %}
```

If you need your own custom global CSS variables, then you can create a snippet like `globals.css.liquid` and
also include in the layout.
We recommend a defining SASS/SCSS variables for this with further use in your code.

#### Example of usage

For example, we need to dynamically change the background color of the page.
In the file `globals.css.liquid` we define the desired CSS variable.

```html
<style>
	:root {
		--background-color: {{ settings.background_color | color_mix: '#ffc0cb', 50 }};
	}
</style>
```

Then we define our SCSS variable.
* If you want, you can leave out the SCSS variable and use the [settings](#settings) function instead.

```scss
$background-color: var(--background-color, #fff)
```

And now we can use it in styles.

```scss
body {
	background-color: $background-color;
}
```

## Functions

### settings

Function file: `./src/styles/_functions/_functions.scss`

It accepts two parameters, the name of the setting (without a prefix), and a default value(not required).

```scss
html {
	color: settings('color-sale-text', #000);
}
```

After compiling

```css
html {
	color: var(--settings-color-sale-text, #000);
}
```

## Mixins

### breakpoints

Mixin file: `./src/styles/_mixins/_breakpoints.scss`

Using media queries.

#### Example of usage

```scss
@include breakpoint('medium') {
	.container {
		padding-left: 0;
		padding-right: 0;
	}
}
```

#### OR

```scss
.container {
	@include breakpoint('medium') {
		padding-left: 0;
		padding-right: 0;
	}
}
```

After compiling

```scss
@media (max-width: 1199px) {
	.container {
		padding-left: 0;
		padding-right: 0;
	}
}
```

### hover / isHoverEnabled / isHoverDisabled

Mixin file: `./src/styles/_mixins/_hover.scss`

Used if you need to prevent CSS pseudo-class `:hover` from working on touch devices.
Or if you need to set custom styles in case the touch is not supported or vice versa.

#### Example of usage

---

#### Example `include hover()`

```scss
.item {
	@include hover() {
		background-color: black;
	}
}
```

After compiling

```scss
@media (-moz-touch-enabled: 0), (hover: hover) {
	.item:hover {
		background-color: black;
	}
}
```

---

#### Example `include isHoverEnabled()`

```scss
.item {
	@include isHoverEnabled() {
		background-color: black;
	}
}
```

After compiling

```scss
@media (-moz-touch-enabled: 0), (hover: hover) {
	.item {
		background-color: black;
	}
}
```

---

#### Example `include isHoverDisabled()`

```scss
.item {
	@include isHoverEnabled() {
		background-color: black;
	}
}
```

After compiling

```scss
@media (-moz-touch-enabled: 1), (hover: none) {
	.item {
		background-color: black;
	}
}
```

### min / max

Mixin file: `./src/styles/_mixins/_min-max-fix.scss`

SASS fix. More: https://github.com/sass/sass/issues/2378.

### html-has-class

Mixin file: `./src/styles/_mixins/_has-class.scss`

It is used if you need to add additional styles if `<html>` contains the specified class.

#### Example of usage

```scss
@include html-has-class('supports-sticky') {
	.header {
		position: sticky;
	}
}
```

After compiling

```scss
html.supports-sticky .header {
	position: sticky;
}
```

### body-has-class

Mixin file: `./src/styles/_mixins/_has-class.scss`

Same as [@include html-has-class](#html-has-class), but it checks if the tag `<body>` has the specified class.
