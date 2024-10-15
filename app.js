let $domain = '';
let $target = '';

jQuery(document).ready(function ($) {
  $('#save').click(function (event) {
    $domain = $('#DOMAIN').val();
    $target = $('#SERVER').val();

    try {
      var isFileSaverSupported = !!new Blob();
    } catch (e) {
      alert('FileSaver Not Supported Your Browser!');
      return false;
    }
    var blob = new Blob([_template()], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "" + $domain + "_cloudflare_dns_template.txt");

  });
});

function _template() {
  let _tmp = '' +
  ';;\n' +
  ';; Domain:     ' + $domain + '.\n' +
  ';; Exported:   ' + new Date().toISOString().slice(0, 19).replace('T', ' ') + '\n' +
  ';;\n' +
  ';; This file is intended for use for informational and archival\n' +
  ';; purposes ONLY and MUST be edited before use on a production\n' +
  ';; DNS server.  In particular, you must:\n' +
  ';;   -- update the SOA record with the correct authoritative name server\n' +
  ';;   -- update the SOA record with the contact e-mail address information\n' +
  ';;   -- update the NS record(s) with the authoritative name servers for this domain.\n' +
  ';;\n' +
  ';; For further information, please consult the BIND documentation\n' +
  ';; located on the following website:\n' +
  ';;\n' +
  ';; http://www.isc.org/\n' +
  ';;\n' +
  ';; And RFC 1035:\n' +
  ';;\n' +
  ';; http://www.ietf.org/rfc/rfc1035.txt\n' +
  ';;\n' +
  ';; Please note that we do NOT offer technical support for any use\n' +
  ';; of this zone data, the BIND name server, or any other third-party\n' +
  ';; DNS software.\n' +
  ';;\n' +
  ';; Use at your own risk.\n' +
  ';; SOA Record\n' +
  $domain + '. 3600  IN  SOA elinore.ns.cloudflare.com. dns.cloudflare.com. 2048068697 10000 2400 604800 3600\n' +
  '\n' +
  ';; NS Records\n' +
  $domain + '. 86400  IN  NS elinore.ns.cloudflare.com.\n' +
  $domain + '. 86400  IN  NS mitchell.ns.cloudflare.com.\n' +
  '\n' +
  ';; A Records\n' +
  $domain + '. 60  IN  A 195.26.250.47\n' +
  '\n' +
  ';; CNAME Records\n' +
  'autoconfig.' + $domain + '. 60  IN  CNAME ' + $target + '.\n' +
  'autodiscover.' + $domain + '. 60  IN  CNAME ' + $target + '.\n' +
  'www.' + $domain + '. 60  IN  CNAME ' + $domain + '.\n' +
  '\n' +
  ';; MX Records\n' +
  $domain + '. 60  IN  MX 0 ' + $target + '.\n' +
  '\n' +
  ';; SRV Records\n' +
  '_autodiscover._tcp.' + $domain + '. 60  IN  SRV 0 1 443 ' + $target + '.\n' +
  '_caldavs._tcp.' + $domain + '. 60  IN  SRV 0 1 443 ' + $target + '.\n' +
  '_carddavs._tcp.' + $domain + '. 60  IN  SRV 0 1 443 ' + $target + '.\n' +
  '_imaps._tcp.' + $domain + '. 60  IN  SRV 0 1 993 ' + $target + '.\n' +
  '_imap._tcp.' + $domain + '. 60  IN  SRV 0 1 143 ' + $target + '.\n' +
  '_pop3s._tcp.' + $domain + '. 60  IN  SRV 0 1 995 ' + $target + '.\n' +
  '_pop3._tcp.' + $domain + '. 60  IN  SRV 0 1 110 ' + $target + '.\n' +
  '_sieve._tcp.' + $domain + '. 60  IN  SRV 0 1 4190 ' + $target + '.\n' +
  '_smtps._tcp.' + $domain + '. 60  IN  SRV 0 1 465 ' + $target + '.\n' +
  '_submissions._tcp.' + $domain + '. 60  IN  SRV 0 1 465 ' + $target + '.\n' +
  '_submission._tcp.' + $domain + '. 60  IN  SRV 0 1 587 ' + $target + '.\n' +
  '\n' +
  ';; TXT Records\n' +
  '_caldavs._tcp.' + $domain + '. 60  IN  TXT "path=/SOGo/dav/"\n' +
  '_carddavs._tcp.' + $domain + '. 60  IN  TXT "path=/SOGo/dav/"\n' +
  $domain + '. 1  IN  TXT "v=spf1 mx a -all"\n' +
  '_dmarc.' + $domain + '. 60  IN  TXT "v=DMARC1; p=reject; rua=mailto:mailauth-reports@' + $target + '"\n';

  return _tmp;
}
