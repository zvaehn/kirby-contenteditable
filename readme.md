# Kirby Frontend Editor

A [Kirby 2](http://getkirby.com) plugin which allows text-editing via the HTML5 `contenteditable`-Attribute.

NOTE: THIS PLUGIN IS STILL IN DEVELOPMENT

## Requirements
- PHP 5.6+
- Kirby

## Installation

### Download
[Download](https://github.com/zvaehn/kirby-contenteditable/archive/master.zip) the repository and extract it to `site/plugins/contenteditable`.

### Git Submodule
```
$ cd your/project/root
$ git submodule add https://github.com/zvaehn/kirby-contenteditable.git site/plugins/contenteditable
$ git submodule update --init --recursive
$ git commit -am "Added Kirby Plugin: contenteditable"
```

### Setup
Add the plugin assets to you footer-snippet:

```
<?php contenteditableassets($kirby) ?>
```

Note: This Plugin requires a disabled Kirby Cache to work properly.

### Contributing?
YES!
