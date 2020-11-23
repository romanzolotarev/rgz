<p class="small">tested on <a href="/openbsd/">openbsd</a> 6.8 with lowdown and macos 11.2 with Markdown.pl</p>

# make a static site with find(1), grep(1), and lowdown or Markdown.pl

[ssg](/bin/ssg6) is a static site generator written in shell.

_ssg_ converts markdown files to html with
[lowdown(1)](https://kristaps.bsd.lv/lowdown/) or
[Markdown.pl](https://daringfireball.net/projects/markdown/), copies
`*.html` files with `<HTML>` tag as they are. for the rest of `.html`
files _ssg_ extracts their titles from `<H1>` tag, prepends
`_header.html`, appends `_footer.html`, copies from `src` to `dst`
directory, and generates `sitemap.xml`, ignores files with name `.*` or
listed in `src/.ssgignore`.

## install

lowdown(1) and Markdown.pl are required if there are `*.md` files.

On OpenBSD:

<pre>
$ <b>mkdir -p bin</b>
$ <b>ftp -Vo bin/ssg6 https://rgz.ee/bin/ssg6</b>
ssg6       100% |*********************|    4916      00:00
$ <b>chmod +x bin/ssg6</b>
$ <b>doas pkg_add lowdown</b>
quirks-2.414 signed on 2018-03-28T14:24:37Z
lowdown-0.3.1: ok
$
</pre>

Or on macOS:

<pre>
$ <b>mkdir -p bin</b>
$ <b>curl -s https://rgz.ee/bin/ssg6 > bin/ssg6</b>
$ <b>curl -s https://rgz.ee/bin/Markdown.pl > bin/Markdown.pl</b>
$ <b>chmod +x bin/ssg6 bin/Markdown.pl</b>
$
</pre>

## Usage

Make sure `ssg6` and `lowdown` or `Markdown.pl` are in your `$PATH`:

<pre>
$ <b>PATH="$HOME/bin:$PATH"</b>
$ <b>mkdir src dst</b>
$ <b>echo '# hello, world!' > src/index.md</b>
$ <b>echo '&lt;html&gt;&lt;title&gt;&lt;/title&gt;' > src/_header.html</b>
$ <b>bin/ssg6 src dst 'test' 'http://www'</b>
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

HTML files from `src` have priority over Markdown ones. _ssg_ converts
Markdown files from `src` to HTML in `dst` and then copies HTML files
from `src` to `dst`. In the following example `src/a.html` wins:

	src/a.md   -> dst/a.html
	src/a.html -> dst/a.html

## Incremental updates

On every run _ssg_ saves a list of files in `dst/.files` and updates
only newer files. If no files were modified after that, _ssg_ does
nothing.

<pre>
$ <b>bin/ssg6 src dst 'Test' 'https://www'</b>
[ssg] no files, 1 url
$
</pre>

To force the update delete `dst/.files` and re-run _ssg_.

<pre>
$ <b>rm dst/.files</b>
$ <b>bin/ssg6 src dst 'Test' 'https://www'</b>
index.md
[ssg] 1 file, 1 url
$
</pre>
