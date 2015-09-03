---
title: abundant annotation
description: <
  there's a second signature you can use if you'd prefer
  it's there for using multiple annotations.
---

## tons of taters

instead of writing

    annotater({
        name: 'fruity cheerios',
        tooltip: 'really, you should just get fruit loops instead'
    });
    annotater({
        name: 'phone',
        tooltip: 'good to look at when trying to avoid eye contact'
    });
    annotater({
        name: 'cat',
        tooltip: 'a small furry critter that sometimes hates'
    });

you can write

    annotater([{
        name: 'fruity cheerios',
        tooltip: 'really, you should just get fruit loops instead'
    },{
        name: 'phone',
        tooltip: 'good to look at when trying to avoid eye contact'
    },{
        name: 'cat',
        tooltip: 'a small furry critter that sometimes hates'
    }]);

if brevity and abundant annotation is your thing
