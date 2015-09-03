---
title: making live models
description: <
  Annotater doesn't force you to use tooltips; sometimes it's
  better not to! It supports modeling chunks of data so you
  and your readers don't need to about any tooltips
---

## The Interpolator

suggestions/blogs/tutorials often look like this:

> ### build an example app
>
> > for this example your app is called mytodo
>
> first
>
>     mkdir mytodo && cd mytodo
>
> > As an added bonus, the Angular generator will dynamically use the name of
> > your folder to make a namespace for your app. For example, mytodo will become
> > angular.module('mytodoApp', []). So make sure that you don't have any typos
> > in mytodo before going onto the next step.
>
> your new package.json will look like:
>
>     {
>       "name": "mytodoApp"
>       "description": "An example module to illustrate the usage of a package.json",
>     ....
>     ....
>     ....


<button id="magic" style="background:white;" onclick="laterAnnotater()">click here for the magic of that &darr;</button>

<div><pre><code>annotater({
    name: /\bmytodo/,
    modelReplaces: 'your <!-- don't capture me -->app is called mytodo',
    modelPrompt: 'your app name: '
});</code></pre></div>

<script>
function laterAnnotater(){
  var m = document.getElementById('magic');
  annotater({
      name: /\bmytodo/,
      modelReplaces: 'your app is called mytodo',
      modelPrompt: 'your app name: '
  });
  m.blur();
  m.style.transitionDuration = '.5s';
  m.style.opacity = 0;
  m.style.pointerEvents = 'none';
  setTimeout(function(){
    m.innerHTML = 're-check the example above';
    m.style.opacity = 1;
  },1000);
}
</script>
