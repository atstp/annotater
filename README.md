# [![annotater](http://atstp.github.io/annotater/annotater.svg)](http://atstp.github.io/annotater/)

> a super-lightweight annotating tool

`annotater` takes a target string (or regex) and hunts down every instance,
chops it out of it's text node, wraps it in a new tag, and adds a tooltip.

this makes it _perfect_ for annotating text written as markdown.

### cursory use

include the library, `annotater.js`, and use it

    annotater({
        name: 'YOUR1234EXAMPLEAPIKEY5678',
        tooltip: "this isn't a working key the key you should use. " +
                 "Get your own from the developer site"
    });

    annotater({
        name: /foo|bar|baz/,
        tooltip: 'this is a placeholder variable, that means ' +
                 '"you can use anything here"'
    });

more [details and demos](http://atstp.github.io/annotater/)

it's also availablie via `bower install annotater`
