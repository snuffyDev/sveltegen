# sveltegen

A simple, easy to use CLI for creating Svelte/SvelteKit components, actions, and routes, quickly and conveniently.

> Now with 0 dependencies!

> \*Find me on **[NPM!](https://www.npmjs.com/package/sveltegen)\***

## Features

- Simple and easy generation of:
  - Components
  - Routes/Endpoints
  - Actions
- Sveltegen handles file structure for you

## Installation

> Note: only run Sveltegen at your project root directory.

Install globally _(recommended)_:

```
npm install -g sveltegen
```

...or use npx to skip the install

```
npx sveltegen
```

## Commands

| command                    | description                                          |
| -------------------------- | ---------------------------------------------------- |
| `config`                   | allows you to change the path to your output folders |
| `help`                     | shows all available commands                         |
| `action`<br/>`alias: a`    | makes a new action                                   |
| `component`<br/>`alias: c` | makes a new component                                |
| `route` <br/> `alias: r`   | makes a new route                                    |

## Command Options

Below is a table of what commands have what options.

|             | TypeScript         | SCSS               | Endpoint           | Page               |
| ----------- | ------------------ | ------------------ | ------------------ | ------------------ |
| `action`    | :white_check_mark: | :x:                | :x:                | :x:                |
| `component` | :white_check_mark: | :white_check_mark: | :x:                | :x:                |
| `route`     | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

Don't want to use TypeScript / SCSS? Don't worry, just don't put any `-t -s` flags! Sveltegen will create `.css` and `.js` files, as well as properly format your `.svelte` files, if you opt-out of either of them.

## Usage

```
sveltegen <command> [options]
```

For example, to create a new component named Button with SCSS and Typescript:

```
sveltegen component Button -t -s

// you can use the shorthand format too!

sveltegen c Button -t -s
```

## File Output

Components:

```
[name].svelte
index.ts       // or index.js if not using Typescript
index.scss     // or index.css if not using SCSS
```

Routes:

```
[name]/index.svelte    // optional
[name]/index.json.ts   // optional ; or index.json.js if not using Typescript
```

Actions:

```
[name].ts     // or [name].js if not using Typescript
```

### Thanks for checking out Sveltegen!
