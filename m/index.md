# Before we start

_Subscribe via [RSS](https://www.romanzolotarev.com/rss.xml)_

Most of my how-tos are portable and should work with macOS, BSD,
or Linux, but I encourage you to try OpenBSD. It's a minimalist OS
and has everything we need in its base, requires minimal maintenance.

There are four options to start:

- [rent a VM from OpenBSD.Amsterdam](/openbsd/oams.html "2018-07-01"),
- [rent a VM from Vultr](/openbsd/vultr.html "2018-04-11"),
- [install OpenBSD in VirtualBox](/virtualbox/openbsd.html) on your computer, or
- [install OpenBSD on bare metal](/openbsd/install.html "2017-09-20")


## OpenBSD as a desktop

You set up minimalist _web development environment_ on your laptop
(or desktop computer).

<p class="f7">
xenodm, cwm, xterm, tmux, vi.<br>
OpenBSD compatible computer required.</p>

- **[connect to Wi-Fi and Ethernet networks](/m/on.html)**
- [upgrade OpenBSD on bare metal](/openbsd/upgrade.html "2018-10-18")
- [generate random string with random(4)](/random.html "2018-09-27")
- [find disk name and partition with sysctl(1) and dmesg(1)](/openbsd/disk.html "2018-09-19")
- [make bootable image geteltorito(1) and dd(1)](/openbsd/geteltorito.html "2018-09-12")
- [dock laptop with with xrandr(1), xinput(1), xrdb(1), and sysctl(8)](/openbsd/dock.html "2018-09-12")
- [prepare ThinkPad X1&nbsp;Carbon&nbsp;Gen&nbsp;5 for OpenBSD](/openbsd/lenovo-thinkpad-x1c5.html "2018-08-13")
- [encrypt disk with bioctl(8) and CRYPTO](/openbsd/bioctl-crypto.html "2018-08-12")
- [configure newsboat(1) to read RSS feeds in&nbsp;terminal](/newsboat.html "2018-05-06")
- [set default programs with xdg-mime(1)](/xdg-mime.html "2018-05-01")
- [change time zone on OpenBSD](/openbsd/timezone.html "2018-03-16")
- [generate passphrases with random(4)](/diceware.html "2018-03-30")
- [manage passwords with openssl(1) and oathtool(1)](/pass.html "2017-10-10")
- [generate SSH keys](/ssh.html "2017-05-01")
- [customize xenodm(1) login screen](/openbsd/xenodm.html "2018-05-01")
- [configure cwm(1)](/openbsd/cwm.html "2019-02-04")
- [mount(1) on OpenBSD](/openbsd/mount.html "2018-03-01")
- [mount exFAT file system on OpenBSD](/openbsd/exfat.html "2018-11-16")
- [mount file system via Media Transfer Protocol on OpenBSD](/openbsd/mtp.html "2018-11-06")
- [configure login.conf(5) and sshd(8) for YubiKey on OpenBSD](/openbsd/yubikey.html "2017-09-01")

## Web server on OpenBSD

You install _production-ready web server_ on your bare metal server
or on a VM provided by OpenBSD.Amsterdam or Vultr.

<p class="f7">sshd, pf, ntpd, httpd, nsd, crontab, mtree, pax,
vmctl, pkg_add, pkg_info, pkg_delete<br>OpenBSD compatible computer
or a virtual machine required.</p>

- [host Git repositories on OpenBSD](/git.html "2018-06-07")
- [publish Git repositories with stagit(1) on OpenBSD](/stagit.html "2018-06-07")
- [configure httpd(8)](/openbsd/httpd.html "2018-04-12")
- [enable HTTPS with acme-client(1) and Let's Encrypt on OpenBSD](/openbsd/acme-client.html "2018-04-13")
- **[add HTTP security headers with relayd(8)](/m/ow.html)**
- [forward outgoing mail to a remote SMTP server](/openbsd/smtpd-forward.html "2018-11-23")
- [configure nsd(8)](/openbsd/nsd.html "2018-12-14")
- [manage backups with mtree(8) and pax(1)](/arc.html)
- [set up virtual machines](/openbsd/vm.html)


## Plain text and files

You organize your files and make your terminal sessions cozy.

<p class="f7">awk, cat, chmod, cpio, ed, find, grep, head, jot,
mkdir, mtree, printf, readlink, rm, sed, sort, tail, tr, wc.<br>
*BSD or macOS required.</p>

- [find and remove whitespaces with grep(1) and sed(1)](/ws.html "2018-09-23")
- [learn Markdown](/markdown.html "2016-08-30")
- [manage terminals with tmux(1)](/tmux.html "2018-05-18")
- [edit text with vi(1)](/vi.html "2018-05-12")


## Static web pages

<p class="f7">Site generators. HTML and CSS. RSS. Meta tags.</p>

- [make a static site with lowdown(1) and rsync(1)](/ssg.html "2018-04-07")
- [generate RSS feeds with grep(1), sed(1), and awk(1)](/rssg.html "2018-09-21")

## HTTP and CGI

<p class="f7">Good-old HTTP and CGI as backend: httpd, slowcgi,
cron, smtpd, awk, b64encode, cat, chmod, cpio, date, dd, find, grep,
head, jot, mkdir, printf, readlink, rm, sed, sh, sha256, sort, tail,
tee, tr, wc), jq, and curl.</p>

- [submit web forms](/form.html)

---

## Archive

_In reverse chronological order_

- [archive with borg(1)](/borg.html "2018-03-02")
- [print with cups(1) on macOS](/macos/cups.html "2018-02-27")
- [prepare a bootable USB drive with OpenBSD installer on macOS](/macos/openbsd-installer.html "2017-09-19")
- [edit text with Vim](/vim.html "2017-08-26")
- [manage passwords with security(1) on macOS](/macos/security.html "2017-05-16")
- [host repositories on GitHub](/github.html "2017-04-16")
- [make a static site with Jekyll](/jekyll.html "2016-11-22")
- [learn touch typing](/typing.html "2016-11-19")
- [watch screencasts for programmers](/screencasts.html "2016-10-25")
- [compare JavaScript, with Ramda, and Elm](/js-ramda-elm.html "2016-10-26")
- [edit text with TextEdit.app](/macos/textedit.html "2016-09-17")
- [start a standalone website](/standalone.html "2016-08-23")
- [decide if you need a website](/website.html "2016-08-15")
