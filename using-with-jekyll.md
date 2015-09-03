---
title: using with jekyll
description: <
  using annotater with jekyll is straightforward and keeps your
  markdown uncluttered with a 9 line include.
annotater:
  -
    name: "name: curl .*url"
    tooltip: "this will annotate all instances of curl with the tooltip"
---

## Annotater with Jekyll

just include a file called `page-annotater.html` in `_includes`. It should look like this


{% raw %}

    {% if page.annotater %} <script>

    {% for anno in page.annotater %}
        annotater({
        {% for notation in anno %}
            {{notation[0]}}: "{{ notation[1] }}",
        {% endfor %}
        });
    {% endfor %}

    </script> {% endif %}

{% endraw %}

now, in your yaml-front-matter you can do this

    ---
    title: my annotated page
    annotater:
      -
        name: curl
        tooltip: "a nice command line utility for fetching the content at a url"
    ---
