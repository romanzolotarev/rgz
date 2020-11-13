# Optimize images for the web

## Convert to another format

Install `ImageMagick`:

<pre>
# <b>pkg_add ImageMagick</b>
quirks-3.16 signed on 2018-10-12T15:26:25Z
ImageMagick-6.9.10.10p1: ok
#
</pre>

Convert PNG to JPEG:

<pre>
$ <b>convert <em>file</em>.png <em>file</em>.jpeg</b>
$
</pre>

## Optimize size of JPEG and PNG files

Install `jpegoptim` and `optipng`:

<pre>
# <b>pkg_add jpegoptim optipng</b>
quirks-3.16 signed on 2018-10-12T15:26:25Z
jpegoptim-1.4.6: ok
optipng-0.7.7: ok
#
</pre>

<!-- cut -->

Run `jpegoptim`:

<pre>
$ <b>jpegoptim \</b>
<i></i><b>--strip-all \</b>
<i></i><b>--preserve \</b>
<i></i><b>--preserve-perms \</b>
<i></i><b>--verbose -m80 \</b>
<i></i><b><em>file</em>.jpeg</b>
Image quality limit set to: 80
file.jpeg 300x300 24bit N JFIF
[OK] 22417 --> 11849 bytes (<u>47.14%</u>), optimize
$
</pre>

Run `optipng`:

<pre>
$ <b>optipng -preserve -strip all -o7 <em>file</em>.png</b>
** Processing: file.png
400x400 pixels, 4x16 bits/pixel, RGB+alpha
Reducing image to 3x16 bits/pixel, RGB
Stripping metadata...
Input IDAT size = 42804 bytes
Input file size = 43049 bytes

Trying:
  zc = 9  zm = 9  zs = 0  f = 0         IDAT size = 27513

Selecting parameters:
  zc = 9  zm = 9  zs = 0  f = 0         IDAT size = 27513

Output IDAT size = 27513 bytes (15291 bytes decrease)
Output file size = 27570 bytes (15479 bytes = <u>35.96%</u> decrease)
$
</pre>

## Optimize size of SVG file

Install `node` and `svgo`:

<pre>
# <b>pkg_add node</b>
quirks-3.16 signed on 2018-10-12T15:26:25Z
node-8.12.0: ok
# <b>npm install -g svgo</b>
/usr/local/bin/svgo -> /usr/local/lib/node_modules/svgo/bin/svgo
+ svgo@1.2.0
added 49 packages from 83 contributors in 1.274s
#
</pre>

Run `svgo`:

<pre>
$ <b>svgo <b>file</b>.svg</b>

file.svg:
Done in 59 ms!
3.522 KiB - <u>45.2%</u> = 1.93 KiB
$
</pre>
