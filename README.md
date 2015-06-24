##DEPRECATED: Babel is now included on elixir by default.

# laravel-elixir-6to5

Simple extension to *laravel elixir* to build javascript bundle with *6to5*.

## Install

```
npm install --save-dev laravel-elixir-6to5
```

## Usage

### Example *Gulpfile*:

```javascript
var elixir = require("laravel-elixir");

require("laravel-elixir-6to5");

elixir(function(mix) {
    mix.to5("main.js");
});

```
First argument is the entry point of your application _(default directory is resources/assets/js)_. Second argument is destination directory. In third argument you could pass 6to5 options. Two latest parameters are optional. In production main will be compressed.

#### Advanced example

```javascript
elixir(function(mix) {
    mix.6to5("main.js", {
        output: "public/js"
    });
});
```

## Options

See the `6to5` [options](https://6to5.org/usage.html#options).
