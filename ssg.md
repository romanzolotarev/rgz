_Tested on [OpenBSD](/openbsd/) 6.3, 6.4, and macOS 10.14 with lowdown and Markdown.pl_

# Make a static site with find(1), grep(1), and lowdown or Markdown.pl

[ssg](/bin/ssg5) is a static site generator written in shell.
Optionally it converts Markdown files to HTML with
[lowdown(1)](https://kristaps.bsd.lv/lowdown/) or
[Markdown.pl](https://daringfireball.net/projects/markdown/).

Unless a page has `<HTML>` tag _ssg5_ extracts its title from `<H1>`
tag, wraps the page with `_header.html`, `_footer.html`.

Then copies everything (excluding `.*` or paths listed in
`src/.ssgignore`) from `src` to `dst` directory.

[![ssg4](ssg4.png)](ssg4.png)
_180 LoC. [Enlarge, enhance, zoom!](ssg4.png)_

## Install

On OpenBSD:

<pre>
$ <b>mkdir -p bin</b>
$ <b>ftp -Vo bin/ssg5 https://rgz.ee/bin/ssg5</b>
ssg5       100% |*********************|    4916      00:00
$ <b>chmod +x bin/ssg5</b>
$ <b>doas pkg_add lowdown</b>
quirks-2.414 signed on 2018-03-28T14:24:37Z
lowdown-0.3.1: ok
$
</pre>

Or on macOS:

<pre>
$ <b>mkdir -p bin</b>
$ <b>curl -s https://rgz.ee/bin/ssg5 > bin/ssg5</b>
$ <b>curl -s https://rgz.ee/bin/Markdown.pl > bin/Markdown.pl</b>
$ <b>chmod +x bin/ssg5 bin/Markdown.pl</b>
$
</pre>

lowdown(1) and Markdown.pl are optional. They are required only if
there are any `*.md` files.

## Usage

Make sure `ssg5` and `lowdown` or `Markdown.pl` are in your `$PATH`:

<pre>
$ <b>PATH="$HOME/bin:$PATH"</b>
$ <b>mkdir src dst</b>
$ <b>echo '# Hello, World!' > src/index.md</b>
$ <b>echo '&lt;html&gt;&lt;title&gt;&lt;/title&gt;' > src/_header.html</b>
$ <b>bin/ssg5 src dst 'Test' 'http://www'</b>
./index.md
[ssg] 1 files, 1 url
$ <b>find dst</b>
dst
dst/.files
dst/index.html
dst/sitemap.xml
$ <b>open dst/index.html</b>
</pre>

## Markdown and HTML files

HTML files from `src` have greater priority than Markdown ones.
_ssg5_ converts Markdown files from `src` to HTML in `dst` and then
copies HTML files from `src` to `dst`. In the following example
`src/a.html` wins:

	src/a.md   -> dst/a.html
	src/a.html -> dst/a.html

## Favicon

Make sure you have `/favicon.png` in place.

Some browsers fetch `/favicon.ico` despite what you specified in
the `<LINK>` tag, so you can use [an empty one](/favicon.ico) (180
bytes) as a placeholder.

## Sitemap

_ssg5_ generates `sitemap.xml` with the list of all pages. Don't forget
to add the absolute URL of the sitemap to your `robot.txt`.<br>
For example:

	user-agent: *
	sitemap: https://rgz.ee/sitemap.xml

## RSS

To generate RSS feeds use [rssg](rssg.html), then add their URLs
to `_header.html`.<br>For example:

	<link rel="alternate" type="application/atom+xml" href="/rss.xml">

## Incremental updates

On every run _ssg5_ saves a list of files in `dst/.files` and updates
only newer files. If no files were modified after that, _ssg5_ does
nothing.

<pre>
$ <b>bin/ssg5 src dst 'Test' 'https://www'</b>
[ssg] no files, 1 url
$
</pre>

To force the update delete `dst/.files` and re-run _ssg5_.

<pre>
$ <b>rm dst/.files</b>
$ <b>bin/ssg5 src dst 'Test' 'https://www'</b>
index.md
[ssg] 1 file, 1 url
$
</pre>

## Watch

Save this helper to `~/bin/sssg`. It re-runs _ssg5_ with
[entr(1)](http://entrproject.org) on every file change.

<pre>
$ <b>cat $HOME/bin/sssg</b>
#!/bin/sh
while :
do
	find . -type f ! -path '*/.*' |
	entr -d "$HOME/bin/ssg5" . "$1" "$(date)" '//www'
done
$
</pre>

Install entr(1):

<pre>
$ <b>doas pkg_add entr</b>
quirks-2.414 signed on 2018-03-28T14:24:37Z
entr-4.0: ok
$
</pre>

Start the helper and keep it running:

<pre>
$ <b>~/bin/s /var/www/htdocs/www</b>
[ssg] 1 file, 1 url
</pre>

---

## Users

[blog.solobsd.org](https://blog.solobsd.org/)<br>
[bloguslibrus.fr](https://www.bloguslibrus.fr)<br>
[cryogenix.net](https://cryogenix.net)<br>
[dethronedemperor.com](https://www.dethronedemperor.com)<br>
[dev.levlaz.org](https://dev.levlaz.org)<br>
[grosu.nl](https://grosu.nl/)<br>
[h3artbl33d.nl](https://h3artbl33d.nl/)<br>
[high5.nl](https://high5.nl/)<br>
[matthewgraybosch.com](https://matthewgraybosch.com/)<br>
[mvidal.net](https://mvidal.net/)<br>
[ols.wtf](https://ols.wtf/)<br>
[openbsd.amsterdam](https://openbsd.amsterdam/?rz)<br>
[openbsd.space](https://openbsd.space/)<br>
[philstjacques.com](http://philstjacques.com/)<br>
[romanzolotarev.com](https://www.romanzolotarev.com/) &mdash; obviously ;)<br>
[runbsd.info](https://runbsd.info/)<br>
[stockersolutions.com](https://www.stockersolutions.com/)<br>
[why-vi.rocks](http://why-vi.rocks)<br>

---

**Thanks** to
[Devin Teske](https://twitter.com/freebsdfrau/status/1075797843460288512)
for helping with awk(1),
[Kristaps Dzonsons](https://www.divelog.blue/) for
[lowdown(1)](https://kristaps.bsd.lv/lowdown/), and
[Eric Radman](http://eradman.com) for
[entr(1)](http://entrproject.org).
