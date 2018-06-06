> "Fellow OpenBSD, YubiKey, Kensington Orbit Trackball, & ErgoDox user - I salute you!"<br>
[equalunique](https://mobile.twitter.com/no1evanrowley/status/992498136118677505 "4 May 2018")
(@no1evanrowley)

> "Dope setup"<br>
[nixCraft](https://mobile.twitter.com/nixcraft/status/991738751666794497 "2 May 2018")
(@nixcraft)

> "I am in love with this setup. Simple. Awesome. Functional. Efficient."<br>
[BuildItBenjamin](https://mobile.twitter.com/liddy_io/status/989840013650288640 "27 Apr 2018")
(@liddy_io)

> "my X1 Carbon was delayed yet again... That @romanzolotarev will be ready
with his OpenBSD setup by the time it finally ships is the only good thing
about the delay. Tot stealing his work"<br>
[Vlad Kozin](https://mobile.twitter.com/zeRusski/status/930362868440162304 "14 Nov 2017")
(@zeRusski)

> "Sweet rig, I know what I'm asking for on my next birthday!"<br>
[Sean](https://mobile.twitter.com/smhhms/status/909899624948920320 "18 Sep 2017")
(@smhhms)

---

# OpenBSD on my fanless desktop computer

You asked me about my setup. Here you go.

I've been using [OpenBSD](/openbsd/why.html) on servers for years as a web
developer, but never had a chance to dive in to system administration
before. If you appreciate the simplicity of OpenBSD and you have to give
it a try on your desktop.

Bear in mind, this is a relatively _cheap ergonomic_ setup, because all I
need is [xterm(1)](http://man.openbsd.org/xterm.1) with [Vim](/vim.html)
and Firefox, I don't care about CPU/GPU performance or mobility too much,
but I want a large screen and a good keyboard.

![My desktop](/setup.jpeg "2017")
_This website has been made with this setup_

Item                                           | Price, USD
:--                                            | --:
[Zotac CI527 NANO-BE][z]                       | 371
16GB RAM Crucial DDR4-2133                     | 127
250GB SSD Samsung 850 EVO                      | 104
[Asus VZ249HE][a] 23.8" IPS Full HD            | 129
[ErgoDox EZ V3][e], Cherry MX Brown, blank DCS | 325
[Kensington Orbit Trackball][k]                | 33
                                               | **1,107**
[a]: https://www.asus.com/Monitors/VZ249HE/
[k]: https://www.kensington.com/us/us/4493/k72337us/orbit-trackball-with-scroll-ring
[e]: https://ergodox-ez.com/products/ergodox-ez-original-standalone?variant=40172496643
[z]: https://www.zotac.com/us/product/mini_pcs/ci527-nano

## OpenBSD

I tried few times to install OpenBSD on my MacBooks---I heard some models
are compatible with it,---but in my case it was a bit of a fiasco
(thanks to Nvidia and Broadcom). That's why I bought a new computer, just
to be able to run this wonderful operating system.

Now I run [`-stable`](https://www.openbsd.org/stable.html) on my desktop
and servers. Servers are supposed to be reliable, that's obvious, why not
run `-current` on a desktop? Because `-stable` is shipped every six months
and I that's is often enough for me. I prefer [slow
fashion](https://www.youtube.com/watch?v=Wiw3YcwGwrU).

Regarding my window manager of choice: it's
[cwm(1)](http://man.openbsd.org/cwm.1). It has tiling mode, so I don't
have to rearrange windows manually.

Here is my [.cwmrc](/openbsd/cwmrc). Quite often I keep just two windows
open. On the left side: [tmux(1)](http://man.openbsd.org/tmux.1) in
[xterm(1)](http://man.openbsd.org/xterm.1). On the right side: Firefox.

![cwm](/cwm.jpeg)

> "It’s a nice .cwmrc! I even modeled mine after it. Recommended. 5&nbsp;stars."<br>
[(((Mischa &#x1F576; &#x1F421; RCX)))](https://mobile.twitter.com/mischapeters/status/987004963682430976 "19 Apr 2018")
(@mischapeters)

## Zotac CI527

    Intel Core i3-7100U, dual core 2.4 GHz CPU
    RAM1: 16GB Crucial DDR4-2133 SODIMM CT16G4SFD8213
    RAM2: empty
    SATA: 250gB Samsung 850 EVO Series MZ-75E250BW
    146.4 x 126.5 x 60.5 mm, VESA mount, DC 19V/65W

    Intel HD Graphics 620
    HDMI: 3840x2160 @ 60Hz
    DisplayPort: 4096x2160 @ 60Hz
    3-in-1 SD/SDHC/SDXC
    Stereo output, Microphone
    5 x USB 3.0 (1 front, 4 rear)
    2 x USB 3.1 Type-C (front)
    LAN Realtek 1000 Mbps
    LAN Intel 1000 Mbps
    Wifi 802.11ac

This machine is silent, thanks to passive cooling, has no moving parts.
That's cool! Right? Of course, from time to time it gets literally hot,
but figuratively it stays cool all the time. ;)

According to [sysctl(8)](https://man.openbsd.org/sysctl.8) its CPU is at
50&deg;C while it's idle and up to 80&deg;C at the maximum load. It cools
down in five minutes.

![Zotac CI527](/zotac-ci527.jpeg)
_Zotac CI527 with [RUNBSD](http://runbsd.info/) sticker on the top_

---

If you're curious about the sticker, here is how it found me:

> [RZ](https://mobile.twitter.com/romanzolotarev/status/925424605367623680
"31 Oct 2017"): Hi <a
href="https://mobile.twitter.com/FiLiS">@FiLiS</a>, where can I buy
those wonderful RUN BSD stickers?

> [FiLiS](https://mobile.twitter.com/FiLiS/status/925425396941770755 "31
Oct 2017"): > you can't. You can DM me your address and I'll send you
some. :)

Two weeks later...

> [RZ](https://mobile.twitter.com/romanzolotarev/status/931467864896409600
"17 Nov 2017"): <a
href="https://mobile.twitter.com/hashtag/RUNBSD">#RUNBSD</a> It's
official now. Thank you <a
href="https://mobile.twitter.com/FiLiS">@FiLiS</a>

> [FiLiS](https://mobile.twitter.com/FiLiS/status/931619067185811459 "17
Nov 2017"): You're welcome. :)

---

Almost all the hardware is supported by OpenBSD 6.3 out-of-the-box. For
Intel network devices (LAN and WiFi) you'll need firmware binary images.
OpenBSD downloads and installs them automatically on the first boot.
I've not tested DisplayPort and USB-C, but supposed to work.

Only Bluetooth doesn't work because, well, [it
shouldn't](https://marc.info/?l=openbsd-cvs&m=140511572108715&w=2).

> "I'm not very familiar, but the implementation had too many issues for
it to be salvageable, it was treated like a network protocol which
turned out to be the wrong design. Commit message suggests it also
simply didn't work: <a
href="https://marc.info/?l=openbsd-cvs&m=140511572108715&w=2">marc.info?l=openbsd-cvs...</a>"<br>
[Bryan Steele](https://mobile.twitter.com/canadianbryan/status/984782198887911425 "13 Apr 2018")
(@canadianbryan)

## ErgoDox EZ V3

The ErgoDox is a DIY keyboard project initiated by Dominic Beauchamp. The
design is ergonomic, split in two separate halves with a columnar layout.

![ErgoDox](/ergodox-ez.jpeg)
_The right half of ErgoDox EZ_

Why EZ, not DIY kit? Wrist rest and tilt kit. High quality. Excellent
service. 2-year warranty. I have chosen ErgoDox with Cherry MX Brown
switches, blank DCS keycaps, and my custom single-layer layout.

Why Cherry MX Brown? Blue switches are louder than brown; other
switches are not that good for typing. If you are not sure, browns are the
great default choice.

Why DCS? I tried DSA for a month, but during that experiment, my
accuracy was lower than with DCS. With sculpted keycaps my fingers "know"
where they are, while it is a bit harder with DSA profile keycaps to find
home row.

Why blank keycaps? When I'm typing I look at my screen, not my keyboard.

## Asus VZ249HE

I picked the cheapest 24" IPS. It happens to be light-weight (2.9 kg) with
an slim profile (7mm) and 178&deg; viewing angles. It works great for
text, but for graphics I'd recommend 4K displays.

## Kensington Orbit Trackball

First, I use keyboard a lot. Rarely touch any pointing devices, just to
select a text in the browser or make a screenshot. Okay, I make quite a
few screenshots sometimes. :)

This trackball is definitely more comfortable then Apple Trackpad and much
better than Apple Magic Mouse.

Second, I had never used trackball before I bought this one, so it's hard
to compare with other trackballs.

## Low tech

For notes I use [Field Notes 48-page Memo Books][m]. In those
rare moments when I'm away from my computer I can jot things down at the
rate of two hundred pages per year.

---

> "Bonus points for using the Field Notes ;)"<br>
[BuildItBenjamin](https://mobile.twitter.com/liddy_io/status/910086740223946753 "19 Sep 2017")
(@liddy_io)

![Field Notes Memo Book](/field-notes-memo-book.jpeg)
_My first memo book. Circa 2012_

Another thing is [Field Notes Space Pen][s], which lasts forever: one
refill per thousand memo book pages.

![Nokia 105](/nokia-105.jpeg)
_The charger, phone, memo book cover, and Space Pen._

My main phone is [Nokia
105](https://www.nokia.com/en_int/phones/nokia-105). No internet. No
camera. No distractions. It's always on, one battery charge lasts for two
weeks.

Disclaimer: I still use Maps, Mail, Twitter, and Telegram on my old
iPhones, when I travel, because it's a bit exhausting to carry display and
keyboard too far away from my [IKEA desk][i].

[s]: https://fieldnotesbrand.com/products/space-pen
[m]: https://fieldnotesbrand.com/products/original-kraft
[i]: https://www.ikea.com/us/en/catalog/products/S39932699/

---

Have questions? Want to show your setup? [Let's discuss on
Twitter](https://mobile.twitter.com/romanzolotarev/status/909807483149066248).