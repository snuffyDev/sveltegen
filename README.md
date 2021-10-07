# sveltegen
A simple, easy to use CLI for creating Svelte/SvelteKit components, actions, and routes, quickly and conveniently.

> *Find me on **[NPM!](https://www.npmjs.com/package/sveltegen)***
## Features
- Simple and easy generation of:
  * Components
  * Routes/Endpoints
  * Actions
- Optionally export components from ```$lib/components``` for easy importing
- Sveltegen handles file structure for you
## Installation
> Note: only run Sveltegen at your project root directory.

Install globally *(recommended)*:
```
npm install -g sveltegen
```

...or use npx to skip the install

```
npx sveltegen
```

## Commands
| command | description |
|-- |--  |
| ```config``` | allows you to change the path to your output folders |
| ```help```   | shows all available commands |
| ```action```<br/>```alias: a``` | makes a new action|
| ```component```<br/>```alias: c``` | makes a new component |
| ```route```	<br/> ```alias: r``` | makes a new route|

## Command Options

Below is a table of what commands have what options.

|  	| TypeScript 	| SCSS 	| Endpoint 	| Page 	|
|---	|---	|---	|---	|---	|
| ```action``` 	| :white_check_mark: 	| :x: 	| :x:	| :x: 	|
| ```component``` 	| :white_check_mark: 	| :white_check_mark: 	| :x: 	| :x: 	|
| ```route``` 	| :white_check_mark: 	| :white_check_mark: 	| :white_check_mark: 	| :white_check_mark: 	|

Don't want to use TypeScript / SCSS? Don't worry, just don't put any ```-t -s``` flags! Sveltegen will create ```.css``` and ```.js``` files, as well as properly format your ```.svelte``` files, if you opt-out of either of them.

### Heads up!
 The ```component``` command has a special ```--library``` flag, which will generate an ```index.js/ts``` at the root of your component folder. This will neatly export all components generated with Sveltegen from your ```$lib/components```. Say goodbye to spaghetti imports!
## Usage

For those who prefer a menu system, run ```sveltegen menu``` to have a more visual experience.

Otherwise, the format for the terminal commands is:
```
sveltegen <command> [options]
```
For example, to create a new component named Button with SCSS and Typescript:
```
sveltegen component Button -t -s

// you can use the shorthand format too!

sveltegen c Button -ts
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
> *Due to a bug, currently both the endpoint and page will be output. will be fixed soon!*

Actions:
```
[name].ts     // or [name].js if not using Typescript
```


### Thanks for checking out Sveltegen!
This project is still in it's early days, so it's still a little rough around the edges, but it'll smoothen out soon!
