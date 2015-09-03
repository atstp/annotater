---
title: the easiest annotation
description: <
  the most flexible annotation tool around. No fussing with HTML, just a string
  and an annotation.
annotater:
  -
    name: 'annotate mercilessly'
    tooltip: 'seriously, it will hunt down matches and pull them out of text nodes for you'
---

>
> ### You write in markdown
>
> #### most tooltip libraries want HTML
>
>     <!-- no bueno for markdown -->
>     <span data‑some‑tooltip‑lib="your inline tooltip content">something</span>
>
> ### _annotater_ doesn't fuss about
>
> it will annotate mercilessly in any modern browser. Just give it a string.
>

## include it

    <script src="/path/to/annotater.js"><script>

## use it

<div><pre class="annotater-no-descend"><code>annotater({
    name: 'annotate mercilessly',
    tooltip: 'seriously, it will hunt down matches and pull them out of text nodes for you',
});</code></pre></div>
