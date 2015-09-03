---
title: built-in interpolation
description: <
  annotater has a powerful, flexible interpolation utility. You can use it to
  get custom mesages easily.
---

## The Interpolator

keep things DRY with `annotater`'s interpolation

                                                  the full match
                                                  |
                                                  V
    "this string would be interpolated with the {name} {caputure[0]}"
                                                           ^
                                                           |
                                      the first capture group

#### so this code &#x02198;

<div>
<pre><code>annotater([{
    name: /wg<!-- don't capture me -->et|c<!-- don't capture me -->url/,
    tooltip: "windows users might want to use&lt;br&gt;Invoke-RestMethod instead of {name}"
},{
    name: /(([a-z_]+)_api_key):/,
    tooltip: "your {capture[1]} key will be available&lt;br&gt;at Rails.application.secrets.{capture[0]}"
},{
    name: /\d+([a-z]+)EXAMPLEKEY\d+/,
    tooltip: "this is just a demo key, get a real&lt;br&gt;one from {capture[0]} for your application"
}]);</code></pre>
</div>

#### would yield these results &#x02198;

>
> ### hypothetical documentation for something
>
> get into your project before you start working
>
>     cd ~/path/to/project
>
> first, check your api key to make sure it works
>
>     wget https://api.facebook.com/users/?key=0124facebookEXAMPLEKEY5678
>
> after that, you can check out your github key
>
>     curl https://api.github.com/users/?key=0124githubEXAMPLEKEY5678
>
> Then set it up in your `config/secrets.yml`
>
>     development:
>       secret_key_base: 3b7cd727ee24e8444053437c36cc66c3
>       facebook_api_key: 0124facebookEXAMPLEKEY5678
>       github_api_key: 0124githubEXAMPLEKEY5678
>

<script>
    annotater({
        name: /wget|curl/,
        tooltip: "windows users might want to use<br>Invoke-RestMethod instead of {name}"
    });
    annotater({
        name: /(([a-z_]+)_api_key):/,
        tooltip: "your {capture[1]} key will be available<br>at Rails.application.secrets.{capture[0]}"
    });
    annotater({
        name: /\d+([a-z]+)EXAMPLEKEY\d+/,
        tooltip: "this is just a demo key, get a real<br>one from {capture[0]} for your application"
    });
</script>
