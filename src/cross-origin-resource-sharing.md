---
date: [2021-04-13 Tue]
title: Cross-Origin Resource Sharing
---

As a web developer dealing with CORS, it's not your page making
requests to other domains that you allow. It's the other way around:
you allow other domains making requests to your API (the "resource").
Hence the configuration is with the API, not the requester.

Entities:

-   Client browser
-   The domain to reach your API
-   Cookies in client browser for above domain, maintaining logged in
    status
-   A different domain, from which requests to your API are issued

----------------------------------------------------------------------

# Nominal case

Cookies are domain specific. Once set on a domain, a cookie is
transmitted with every request to that domain. This is whether by
clicking a link, entering an address in the URL bar, or, and of
particular interest to us, by a script on a page[^1].

Cookies are great at maintaining logged in status when browsing pages
on a domain: once a user logs in, cookies are saved for that domain in
the user's client browser. Then for every request made to the domain,
the browser sends them along. The server checks said cookies and knows
the request is legitimate for that user.

----------------------------------------------------------------------

# When you need CORS

By default, browsers (eg Firefox) block cross-origin requests
(requests from one domain to another). If they didn't, the following
scenario would be possible.

User has visited mybank.com/account and is still logged in. Now they
visit shadywebsite.com. shadywebsite.com has a script that makes a
request to mybank.com/account. The browser obliges and sends cookies
along for the domain. The server at mybank.com verifies said cookies
and finds that the user is logged in and legitimate. The server
proceeds with the request. shadywebsite.com successfully manipulated
the user's bank account, without the user knowing!

To prevent the above, cross-origin requests are blocked by default. As
a web developer though, you sometimes need them. You need them if your
single page app is accessing your API hosted on a different domain. A
properly configured API lets the client browser know which other
domains may make requests to it. Just don't configure allowed-origin
in your API to "\*" (any domain). Don't allow shadywebsite.com!

[^1]: Actually, in the asynchronous case such as from a script,
    cookies are sent only if withCredentials on the xhr object is set
    to true.
