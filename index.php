<?php
header('Content-Type: text/html; charset=UTF-8');
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ethernet Cable Diagnostic</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="wrap">
<header class="top">
  <div>
    <div class="eyebrow">ETHERNET DIAGNOSTICS</div>
    <h1>Ethernet Cable Test</h1>
    <p class="sub">PC A ↔ Ethernet cable ↔ PC B</p>
  </div>
  <div class="live"><span></span> SYSTEM ONLINE</div>
</header>

<main>
<section class="hero panel">
  <div>
    <h2>Physical cable diagnostic workspace</h2>
    <p>This interface is designed for two computers connected directly by one Ethernet cable. Each computer can identify its active Ethernet adapter and report the diagnostic capabilities available from its network hardware and driver.</p>
  </div>
  <div class="topology">
    <div class="device"><strong>PC A</strong><small>Local endpoint</small><b id="aState">Waiting</b></div>
    <div class="cable"><i></i><i></i><i></i><i></i><span>RJ45 CABLE</span></div>
    <div class="device"><strong>PC B</strong><small>Remote endpoint</small><b id="bState">Waiting</b></div>
  </div>
</section>

<section class="grid">
  <article class="panel">
    <div class="panelHead"><h3>PC A — Adapter detection</h3><span class="badge" id="aBadge">WAITING</span></div>
    <div class="rows">
      <div><span>Browser</span><b id="browser">Detecting…</b></div>
      <div><span>Platform</span><b id="platform">Detecting…</b></div>
      <div><span>Network interfaces</span><b>Requires local diagnostic agent</b></div>
      <div><span>PHY / TDR</span><b class="muted">Not exposed by normal web browsers</b></div>
    </div>
  </article>
  <article class="panel">
    <div class="panelHead"><h3>PC B — Adapter detection</h3><span class="badge" id="bBadge">NOT CONNECTED</span></div>
    <div class="rows">
      <div><span>Remote endpoint</span><b id="remote">Waiting for PC B</b></div>
      <div><span>Direct Ethernet</span><b id="link">Not verified</b></div>
      <div><span>NIC model</span><b>Automatic detection by local agent</b></div>
      <div><span>PHY / TDR</span><b class="muted">Hardware/driver dependent</b></div>
    </div>
  </article>
</section>

<section class="panel test">
  <div class="panelHead"><h3>Eight-conductor view</h3><span class="badge neutral">READY</span></div>
  <p class="notice">The browser cannot directly read RJ45 pins 1–8. The display below is prepared for results supplied by a compatible local NIC diagnostic agent; it does not invent PASS/FAIL results.</p>
  <div class="pins" id="pins">
    <?php for($i=1;$i<=8;$i++): ?>
      <div class="pin"><strong>Pin <?= $i ?></strong><span class="dot neutral"></span><em>Awaiting hardware result</em></div>
    <?php endfor; ?>
  </div>
  <div class="actions"><button id="scan" type="button">Scan this PC</button><button id="reset" type="button" class="secondary">Reset</button></div>
</section>

<section class="panel result">
  <div class="panelHead"><h3>Diagnostic result</h3><span id="resultBadge" class="badge neutral">NOT RUN</span></div>
  <div id="resultText">Connect PC A and PC B with the Ethernet cable, then run the local diagnostic agent on each computer. The website will be used as the visual dashboard.</div>
</section>
</main>
<footer>Ethernet Diagnostic Dashboard · Two PCs · One RJ45 cable · Automatic adapter capability detection</footer>
</div>
<script src="app.js"></script>
</body>
</html>
