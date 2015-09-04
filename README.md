# [![annotater](http://atstp.github.io/annotater/annotater.svg)](http://atstp.github.io/annotater/)

> a minimal, versatile annotating tool

`annotater` takes a target string (or regex) and hunts down every instance,
chops it out of it's text node, wraps it in a tag, and adds a tooltip.

this makes it _perfect_ for annotating rendered markdown.

[demos](http://atstp.github.io/annotater/)

### cursory use

include the library, `annotater.js`, and use it

    annotater({
        name: 'stackoverflow.com',
        tooltip: 'you will likely stumble upon it during every bug hunt'
    });

    annotater({
        name: /foo|bar|baz/,
        tooltip: 'this is a placeholder variable that means "you can use anything here"'
    });


it's also availablie via `bower install annotater`

--------------------------------------------------------------------------------

that's the gist, but it does more than tooltips:
[tooltip interpolation](http://atstp.github.io/annotater/built-in-interpolation/),
function templating,
[live models](http://atstp.github.io/annotater/making-live-models/),
match replacement,
[jekyll friendliness](http://atstp.github.io/annotater/using-with-jekyll/),
and more.
