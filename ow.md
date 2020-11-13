_Tested with [OpenBSD](/openbsd/) 6.4_

[httpd](/openbsd/httpd.html) supports TLS 1.2 and works well with
[acme-client](/openbsd/acme-client.html). In this example, [relayd(8)]
only adds some HTTP headers to get higher grades from the following
tests:

<code class="dib w2 tc mr1 white bg-green f7 b">A+</code>
<a href="https://observatory.mozilla.org/analyze/rgz.ee">Observatory by Mozilla</a><br>
<code class="dib w2 tc mr1 white bg-green f7 b">A+</code>
<a href="https://www.ssllabs.com/ssltest/analyze?d=rgz.ee">SSL Labs by Qualys</a><br>
<code class="dib w2 tc mr1 white bg-green f7 b">A&nbsp;</code>
<a href="https://tls.imirhil.fr/https/rgz.ee">CryptCheck</a><br>
<code class="dib w2 tc mr1 white bg-green f7 b">A+</code>
<a href="https://securityheaders.com/?followRedirects=on&hide=on&q=rgz.ee">Security Headers</a><br>
<code class="dib w2 tc mr1 white bg-green f7 b">+</code>
<a href="https://hstspreload.org/?domain=rgz.ee">HSTS Preload</a></br>
<code class="dib w2 tc mr1 white bg-green f7 b">100</code>
<a href="https://developers.google.com/web/tools/lighthouse/">Lighthouse by Google</a></br>

There are some drawbacks:

Because relayd(8) is fronting httpd(8): `REMOTE_ADDR` in
`access.log` is always `127.0.0.1`. Here is [a diff for httpd(8)][2]
to include `X-Forwarded-For` and `X-Forwarded-Port` to the log.

Also httpd(8) [doesn't support][1] `gzip`
compression for static files.  You can use `gzip` via FastCGI, if
needed.

# Set up a web server with httpd(8) and relayd(8) on OpenBSD

[httpd(8)] listens on ports `80` and `8080`, serves plain HTTP,
redirects `//www.tld` to `//tld` and `http://tld:80` to `https://tld:443`.

relayd(8) listens on ports `443` and terminates TLS for IPv4 and
IPv6 addresses, [acme-client(1)] issues a certificate via Let's
Encrypt, [cron(8)] runs acme-client(1) to check and renew the
certifictate.

In this example, TLD is `rgz.ee`, IPv4 address of the server is `46.23.88.178`
and IPv6 is `2a03:6000:1015::178`.

<pre class="dark-gray">
   https://<em>rgz.ee</em> &rarr;
   <b>relayd</b> <em>46.23.88.178</em>       :443
or <b>relayd</b> <em>2a03:6000:1015::178</em>:443  &rarr;
   <b>httpd</b>  127.0.0.1          :8080 HTTP 200 OK

   https://<em>www.rgz.ee</em> &rarr;
   <b>relayd</b> *                  :443 &rarr;
   <b>httpd</b>  127.0.0.1          :8080 HTTP 301 https://<em>rgz.ee</em>

   http://<em>rgz.ee</em>
or http://www.<em>rgz.ee</em> &rarr;
   <b>httpd</b>  *                  :80   HTTP 301 https://<em>rgz.ee</em>
</pre>

---

[1]: https://marc.info/?m=142407262812306
[2]: https://marc.info/?m=154997964411756

[httpd(8)]: https://man.openbsd.org/httpd.8
[relayd(8)]: https://man.openbsd.org/relayd.8
[cron(8)]: https://man.openbsd.org/cron.8
[acme-client(1)]: https://man.openbsd.org/acme-client.1


## Configure httpd(8)

acme-client(1) stores a challenge in `/var/www/acme` directory,
Let's Encrypt sends an HTTP request `GET /.well-known/acme-challengs/*`,
and httpd(8) serves static files from that directory on such requests.

Note: httpd(8) is chrooted in `/var/www/`, so httpd(8) sees it as `/acme/`.

<pre>
# <b>&gt; <u>/etc/httpd.conf</u> echo '</b>
<i>server "<em>rgz.ee</em>" {</i>
<i>&#9;listen on 127.0.0.1 port 8080</i>
<i>&#9;location "/.well-known/acme-challenge/*" {</i>
<i>&#9;&#9;root "/acme"</i>
<i>&#9;&#9;request strip 2</i>
<i>&#9;}</i>
<i>}</i>
<i>server "www.<em>rgz.ee</em>" {</i>
<i>&#9;listen on 127.0.0.1 port 8080</i>
<i>&#9;block return 301 "https://<em>rgz.ee</em>$REQUEST_URI"</i>
<i>}</i>
<i>server "<em>rgz.ee</em>" {</i>
<i>&#9;alias "www.<em>rgz.ee</em>"</i>
<i>&#9;listen on * port 80</i>
<i>&#9;block return 301 "https://<em>rgz.ee</em>$REQUEST_URI"</i>
<i>}</i>
<i><b>'</b></i>
#
</pre>

Verify the configuration, enable and restart httpd(8).

<pre>
# <b>httpd -n</b>
configuration OK
#
# <b>rcctl enable httpd</b>
# <b>rcctl restart httpd</b>
httpd (ok)
#
</pre>


## Configure relayd(8)

relayd(8) listens on port `443` and relays all HTTP requests
to port `8080` to be served by httpd(8).

Must read **before** setting HTTP headers:<br>
[HSTS deployment recommendations](https://hstspreload.org/#deployment-recommendations)<br>
[Content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)<br>
[Feature policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy)<br>
[TLS configurations](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_configurations)

<!-- cut -->
<pre>
# <b>&gt; <u>/etc/relayd.conf</u> echo '</b>
<i>ipv4="<em>46.23.88.178</em>"</i>
<i>ipv6="<em>2a03:6000:1015::178</em>"</i>
<i></i>
<i>table &lt;local&gt; { 127.0.0.1 }</i>
<i></i>
<i>http protocol https {</i>
<i>&#9;tls ciphers "<em>ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256</em>"</i>
<i></i>
<i>&#9;match request header append "X-Forwarded-For" value "$REMOTE_ADDR"</i>
<i>&#9;match request header append "X-Forwarded-Port" value "$REMOTE_PORT"</i>
<i></i>
<i>&#9;match response header set "Content-Security-Policy" value "<em>default-src 'none'; style-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'</em>"</i>
<i>&#9;match response header set "Feature-Policy" value "<em>camera 'none'; microphone 'none'</em>"</i>
<i>&#9;match response header set "Referrer-Policy" value "no-referrer"</i>
<i>&#9;match response header set "Strict-Transport-Security" value "<em>max-age=31536000; includeSubDomains; preload</em>"</i>
<i>&#9;match response header set "X-Content-Type-Options" value "nosniff"</i>
<i>&#9;match response header set "X-Frame-Options" value "deny"</i>
<i>&#9;match response header set "X-XSS-Protection" value "1; mode=block"</i>
<i></i>
<i>&#9;return error</i>
<i>&#9;pass</i>
<i>}</i>
<i>relay wwwtls {</i>
<i>&#9;listen on $ipv4 port 443 tls</i>
<i>&#9;listen on $ipv6 port 443 tls</i>
<i>&#9;protocol https</i>
<i>&#9;forward to &lt;local&gt; port 8080</i>
<i>}</i>
<i><b>'</b></i>
#
</pre>

relayd(8) loads a full-chain certificate for both IPv4 and IPv6
addresses from `$address.crt` file and private key from
`private/$address.key` from `/etc/ssl` directory.

Generate a temporary key and certificate, then create symbolic links
for IPv4 and IPv6 addresses. Later that key and certificate will
be replaced by acme-client(1).

<pre>
# <b>mkdir -p -m 0700 <u>/etc/ssl/private</u></b>
#
# <b>openssl req -x509 -newkey rsa:4096 \
<i>-days 365 -nodes \</i>
<i>-subj '/CN=<em>rgz.ee</em>' \</i>
<i>-keyout <u>/etc/ssl/private/<em>rgz.ee</em>.key</u> \</i>
<i>-out <u>/etc/ssl/<em>rgz.ee</em>.pem</u></b></i>
Generating a 4096 bit RSA private key
.................................................++
....................................................................++
writing new private key to '/etc/ssl/private/rgz.ee.key'
-----
#
# <b>ln -fs <u>/etc/ssl/private/{<em>rgz.ee</em>,<em>46.23.88.178</em>}.key</u></b>
# <b>ln -fs <u>/etc/ssl/private/{<em>rgz.ee</em>,<em>2a03:6000:1015::178</em>}.key</u></b>
# <b>ln -fs <u>/etc/ssl/{<em>rgz.ee</em>.pem,<em>46.23.88.178</em>.crt}</u></b>
# <b>ln -fs <u>/etc/ssl/{<em>rgz.ee</em>.pem,<em>2a03:6000:1015::178</em>.crt}</u></b>
#
# <b>chmod 0600 <u>/etc/ssl/private/*.key</u></b>
#
</pre>

Verify the configuration, enable and restart relayd(8).

<pre>
# <b>relayd -n</b>
configuration OK
#
# <b>rcctl enable relayd</b>
# <b>rcctl restart relayd</b>
relayd (ok)
#
</pre>

## Configure acme-client

acme-client(1) generates an account key `letsencrypt.key`, a domain
key `rgz.ee.key` and stores them in `/etc/ssl/private`, stores
challenges in `/var/www/acme` directory, a cerficifate in
`/etc/ssl/rgz.ee.crt` (not needed for this setup), a full-chain
cerficifate in `/etc/ssl/rgz.ee.pem` (needed for relayd).

<pre>
# <b>&gt; <u>/etc/acme-client.conf</u> echo '</b>
<i>authority letsencrypt {</i>
<i>&#9;api url "https://acme-v01.api.letsencrypt.org/directory"</i>
<i>&#9;account key "/etc/ssl/private/letsencrypt.key"</i>
<i>}</i>
<i>domain <em>rgz.ee</em> {</i>
<i>&#9;alternative names { www.<em>rgz.ee</em> }</i>
<i>&#9;domain key "/etc/ssl/private/<em>rgz.ee</em>.key"</i>
<i>&#9;domain certificate "/etc/ssl/<em>rgz.ee</em>.crt"</i>
<i>&#9;domain full chain certificate "/etc/ssl/<em>rgz.ee</em>.pem"</i>
<i>&#9;sign with "letsencrypt"</i>
<i>}</i>
<i><b>'</b></i>
#
</pre>

Remove the temporary cerficifate and keys, if any. Create the
directory for challenges.

<pre>
# <b>rm -f /etc/ssl/<em>rgz.ee</em>.pem</b>
# <b>rm -f /etc/ssl/<em>rgz.ee</em>.crt</b>
# <b>rm -f /etc/ssl/private/<em>rgz.ee</em>.key</b>
# <b>rm -f /etc/ssl/private/letsencrypt.key</b>
#
# <b>mkdir -p -m 755 <u>/var/www/acme</u></b>
#
</pre>

Verify the configuration, run acme-client(1), and reload relayd(8).

<pre>
# <b>acme-client -n <em>rgz.ee</em></b>
authority letsencrypt {
        api url "https://acme-v01.api.letsencrypt.org/directory"
        account key "/etc/ssl/private/letsencrypt.key"
}

domain <em>rgz.ee</em> {
        domain key "/etc/ssl/private/<em>rgz.ee</em>.key"
        domain certificate "/etc/ssl/<em>rgz.ee</em>.crt"
        domain full chain certificate "/etc/ssl/<em>rgz.ee</em>.pem"
        sign with "letsencrypt"
}
#
# <b>acme-client -vFAD <em>rgz.ee</em></b>
acme-client: /etc/ssl/private/letsencrypt.key: generated RSA account key
acme-client: /etc/ssl/private/<em>rgz.ee</em>.key: generated RSA domain key
acme-client: https://acme-v01.api.letsencrypt.org/directory: directories
acme-client: acme-v01.api.letsencrypt.org: DNS: 23.15.57.150
acme-client: https://acme-v01.api.letsencrypt.org/acme/new-reg: new-reg
acme-client: https://acme-v01.api.letsencrypt.org/acme/new-authz: req-auth: <em>rgz.ee</em>
acme-client: /var/www/acme/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx: created
acme-client: https://acme-v01.api.letsencrypt.org/acme/challenge/yyyyyyyyyyy_yyyyyyyyyyyyyyyyy-yyyyyyyyyyyyy/yyyyyyyyyyy: challenge
acme-client: https://acme-v01.api.letsencrypt.org/acme/challenge/yyyyyyyyyyy_yyyyyyyyyyyyyyyyy-yyyyyyyyyyyyy/yyyyyyyyyyy: status
acme-client: https://acme-v01.api.letsencrypt.org/acme/new-cert: certificate
acme-client: http://cert.int-x3.letsencrypt.org/: full chain
acme-client: cert.int-x3.letsencrypt.org: DNS: 23.13.65.208
acme-client: /etc/ssl/<em>rgz.ee</em>.crt: created
acme-client: /etc/ssl/<em>rgz.ee</em>.pem: created
#
# <b>rcctl reload relayd</b>
relayd(ok)
#
</pre>

Schedule a new crontab to check and renew the certificate.

<pre>
# <b>echo '0 0 * * * acme-client <em>rgz.ee</em> && rcctl reload relayd' |</b>
<i><b>crontab -</b></i>
#
</pre>
