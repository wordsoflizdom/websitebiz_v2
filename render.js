/* RENDERING CODE. You should not need to edit this file.
   It reads everything from /content and builds the page. */
(function () {
  "use strict";
  var app = document.getElementById("app");
  var page = document.body.getAttribute("data-page");

  function fail(msg) {
    var email = (window.CONTENT && CONTENT.site && CONTENT.site.email) || "";
    app.innerHTML = '<div class="errorbox"><p><strong>This page could not load.</strong></p><p>' + msg +
      '</p>' + (email ? '<p>Email: <a href="mailto:' + email + '">' + email + '</a></p>' : "") + "</div>";
    if (window.console) console.error(msg);
  }

  var C = window.CONTENT;
  var needed = ["site", "home", "artists", "institutions", "about", "projects", "contact"];
  if (!C) return fail("No content loaded. Check that the folder named content is uploaded next to index.html.");
  for (var i = 0; i < needed.length; i++) {
    if (!C[needed[i]]) return fail("Missing or broken file: content/" + (needed[i] === "projects" ? "projects" : needed[i]) + ".js. If you just edited it, undo your last change.");
  }
  var S = C.site;

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function tpl(s) { return String(s == null ? "" : s).replace(/\{\{(\w+)\}\}/g, function (m, k) { return S[k] !== undefined ? S[k] : m; }); }
  function t(s) { return esc(tpl(s)).replace(/\*([^*]+)\*/g, "<em>$1</em>"); }
  function paras(arr) { return (arr || []).map(function (p) { return "<p>" + t(p) + "</p>"; }).join(""); }
  function num(i) { return (i < 9 ? "0" : "") + (i + 1); }
  var ARR = '<span class="arr" aria-hidden="true">→</span>';

  /* ---------- shared pieces ---------- */
  function header() {
    var links = S.nav.map(function (n) {
      var cur = n.page === page ? ' aria-current="page"' : "";
      return '<a href="' + esc(n.href) + '" data-page="' + esc(n.page) + '"' + cur + ">" + esc(n.label) + "</a>";
    }).join("");
    return '<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="wrap bar">' +
      '<a class="brand" href="index.html">' + esc(S.name) + "</a>" +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>' +
      '<nav id="nav" class="nav" aria-label="Main">' + links + "</nav></div></header>";
  }

  function footer() {
    var soc = (S.social || []).filter(function (s) { return s.href; }).map(function (s) {
      return '<li><a href="' + esc(s.href) + '" rel="noopener">' + esc(s.label) + "</a></li>";
    }).join("");
    var phone = S.phone ? '<li><a href="tel:' + esc(S.phone.replace(/\s/g, "")) + '">' + esc(S.phone) + "</a></li>" : "";
    return '<footer class="site-footer"><div class="wrap foot"><div><p class="label">' + esc(S.name) + "</p><p>" + t(S.footerLine) +
      '</p></div><div><p class="label">Contact</p><ul><li><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></li>" + phone +
      "<li>" + esc(S.location) + "</li></ul></div><div><p class=\"label\">Elsewhere</p><ul>" + (soc || "<li>—</li>") +
      '</ul><p style="margin-top:1.5rem">© ' + new Date().getFullYear() + " " + esc(S.copyright) + "</p></div></div></footer>";
  }

  function pageHero(h) {
    return '<section class="page-hero"><div class="wrap reveal"><p class="eyebrow">' + t(h.eyebrow) + '</p><h1 class="h1">' + t(h.headline) + "</h1>" +
      (h.intro ? '<p class="lead">' + t(h.intro) + "</p>" : "") + "</div></section>";
  }

  function cta(c, as) {
    var href = "contact.html" + (as ? "?as=" + as : "");
    return '<section class="cta"><div class="wrap reveal"><h2 class="h2">' + t(c.headline) + '</h2><p class="lead">' + t(c.text) +
      '</p><a class="btn" href="' + href + '">' + esc(c.button) + " " + ARR + "</a></div></section>";
  }

  function rowsList(items) {
    return '<ol class="rows">' + items.map(function (it, i) {
      return '<li class="row reveal"><span class="n">' + num(i) + "</span><div><h3>" + t(it.title) + "</h3>" +
        (it.situation ? '<p class="sit">' + t(it.situation) + "</p>" : "") + "</div><div><p>" + t(it.text) + "</p></div></li>";
    }).join("") + "</ol>";
  }

  function project(p, i, full) {
    var img = p.image
      ? '<figure class="ph"><img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt || p.title) + '" loading="lazy"></figure>'
      : '<div class="ph ph--empty" role="img" aria-label="Image to come"><span>' + num(i) + "</span></div>";
    var draft = p.placeholder ? '<span class="draft">Draft</span>' : "";
    var metaBits = [p.category, p.year].filter(Boolean).map(esc).join(" · ");
    if (!full) {
      return '<article class="proj reveal">' + img + '<p class="meta">' + metaBits + draft + "</p><h3>" + t(p.title) + "</h3>" +
        (p.client ? '<p class="meta">' + esc(p.client) + "</p>" : "") + "</article>";
    }
    var facts = [["Client / institution", p.client], ["My role", p.role], ["Context", p.context], ["Scope of work", p.scope], ["Outcomes", p.outcomes]]
      .filter(function (f) { return f[1]; })
      .map(function (f) { return "<dt>" + f[0] + "</dt><dd>" + t(f[1]) + "</dd>"; }).join("");
    var gal = (p.images || []).length ? '<div class="gallery">' + p.images.map(function (src) {
      return '<img src="' + esc(src) + '" alt="" loading="lazy">'; }).join("") + "</div>" : "";
    var link = p.link ? '<p><a class="textlink" href="' + esc(p.link) + '" rel="noopener">View project</a></p>' : "";
    return '<article class="proj proj--full reveal">' + img + '<div class="body"><p class="meta">' + metaBits + draft + "</p><h2 class=\"h2\" style=\"font-size:var(--size-h2);margin:.5rem 0 0\">" +
      t(p.title) + "</h2>" + (facts ? '<dl class="facts">' + facts + "</dl>" : "") + gal + link + "</div></article>";
  }

  /* ---------- pages ---------- */
  var pages = {};

  pages.home = function () {
    var H = C.home;
    var s = {
      hero: function () {
        return '<section class="hero"><div class="wrap reveal"><p class="eyebrow">' + t(H.hero.eyebrow) + '</p><h1 class="h1">' + t(H.hero.headline) +
          '</h1><p class="lead" style="margin-top:2.5rem">' + t(H.hero.text) + "</p></div></section>";
      },
      audiences: function () {
        var a = H.audiences;
        function door(k, cls, href) {
          return '<a class="door door--' + cls + ' reveal" href="' + href + '"><div><span class="kicker">' + t(a[k].kicker) + "</span><h2>" + t(a[k].title) +
            "</h2><p>" + t(a[k].text) + '</p></div><span class="go">' + t(a[k].link) + " " + ARR + "</span></a>";
        }
        return '<section style="border-top:0;padding-top:0"><div class="wrap"><p class="label">' + t(a.label) + '</p><div class="doors">' +
          door("artists", "artists", "artists.html") + door("institutions", "institutions", "institutions.html") + "</div></div></section>";
      },
      problem: function () {
        var p = H.problem;
        return '<section><div class="wrap grid"><div class="col-label"><p class="label">' + t(p.label) + '</p></div><div class="col-main reveal"><p class="statement">' +
          t(p.statement) + "</p>" + paras(p.paragraphs) + "</div></div></section>";
      },
      territories: function () {
        var x = H.territories;
        return '<section><div class="wrap"><div class="grid"><div class="col-label"><p class="label">' + t(x.label) + '</p></div><div class="col-main"><p class="lead reveal" style="margin-bottom:3rem">' +
          t(x.intro) + "</p></div></div>" + rowsList(x.items) + "</div></section>";
      },
      work: function () {
        var w = H.work, items = C.projects.items.slice(0, w.howMany || 3);
        if (!items.length) return "";
        return '<section><div class="wrap"><div class="grid" style="margin-bottom:3rem"><div class="col-label"><p class="label">' + t(w.label) +
          '</p></div><div class="col-main"><p class="lead">' + t(w.intro) + '</p></div></div><div class="projects">' +
          items.map(function (p, i) { return project(p, i, false); }).join("") +
          '</div><p style="margin-top:2.5rem"><a class="textlink" href="work.html">' + t(w.link) + "</a></p></div></section>";
      },
      about: function () {
        var a = H.about;
        return '<section><div class="wrap grid"><div class="col-label"><p class="label">' + t(a.label) + '</p></div><div class="col-main reveal"><p class="statement">' + t(a.statement) +
          "</p><p>" + t(a.text) + '</p><p><a class="textlink" href="about.html">' + t(a.link) + "</a></p></div></div></section>";
      },
      cta: function () { return cta(H.cta, ""); }
    };
    return H.sections.filter(function (x) { return x.show !== false && s[x.id]; }).map(function (x) { return s[x.id](); }).join("");
  };

  function audiencePage(key, as) {
    return function () {
      var P = C[key];
      return pageHero(P.hero) +
        '<section><div class="wrap"><p class="label">' + t(P.situationsLabel) + "</p>" + rowsList(P.situations.map(function (x) { return { title: x.title, text: x.text }; })) + "</div></section>" +
        '<section><div class="wrap grid"><div class="col-label"><p class="label">' + t(P.capabilitiesLabel) + '</p></div><div class="col-main reveal"><ul class="tags">' +
        P.capabilities.map(function (c) { return "<li>" + t(c) + "</li>"; }).join("") + "</ul></div></div></section>" +
        '<section class="stance"><div class="wrap grid"><div class="col-label"><p class="label">' + t(P.stance.label) + '</p></div><div class="col-main reveal"><p class="statement">' + t(P.stance.text) + "</p></div></div></section>" +
        '<section><div class="wrap grid"><div class="col-label"><p class="label">' + t(P.engagement.label) + '</p></div><div class="col-main reveal"><p class="lead" style="margin-bottom:2rem">' + t(P.engagement.text) +
        '</p><ul class="plain">' + P.engagement.forms.map(function (f) { return "<li>" + t(f) + "</li>"; }).join("") + "</ul></div></div></section>" +
        cta(P.cta, as);
    };
  }
  pages.artists = audiencePage("artists", "artist");
  pages.institutions = audiencePage("institutions", "institution");

  pages.about = function () {
    var A = C.about;
    var portrait = A.portrait ? '<figure class="portrait"><img src="' + esc(A.portrait) + '" alt="' + esc(A.portraitAlt) + '"></figure>' : "";
    function list(label, items, cls) {
      return '<div class="reveal" style="margin-bottom:3rem"><p class="label">' + t(label) + '</p><ul class="plain">' + items.map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul></div>";
    }
    return pageHero(A.hero) +
      '<section><div class="wrap grid"><div class="col-label">' + portrait + '</div><div class="col-main reveal">' + paras(A.paragraphs).replace("<p>", '<p class="lead">') + "</div></div></section>" +
      '<section><div class="wrap grid"><div class="col-label"><p class="label">' + t(A.understandsLabel) + '</p></div><div class="col-main"><ul class="plain reveal">' +
      A.understands.map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul></div></div></section>" +
      '<section><div class="wrap grid"><div class="col-label"></div><div class="col-main">' +
      list(A.educationLabel, A.education.map(function (e) { return "<strong>" + esc(e.title) + "</strong>" + (e.detail ? "<br>" + esc(e.detail) : ""); }).map(function (h) { return h; }), "") +
      list(A.experienceLabel, A.experience) +
      '<div class="reveal"><p class="label">' + t(A.organisationsLabel) + "</p><p>" + t(A.organisationsNote) + '</p><ul class="tags">' +
      A.organisations.map(function (o) { return "<li>" + t(o) + "</li>"; }).join("") + "</ul></div></div></div></section>" +
      cta(A.cta, "");
  };

  pages.work = function () {
    var P = C.projects;
    return pageHero(P.hero) + '<section style="border-top:0;padding-top:0"><div class="wrap"><div class="projects projects--full">' +
      P.items.map(function (p, i) { return project(p, i, true); }).join("") + "</div></div></section>" +
      cta(C.home.cta, "");
  };

  pages.contact = function () {
    var K = C.contact, L = K.labels;
    var opts = L.iamOptions.map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + "</option>"; }).join("");
    return pageHero(K.hero) +
      '<section style="border-top:0;padding-top:0"><div class="wrap grid"><div class="col-label"><p class="label">Direct</p><p><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></p></div>" +
      '<div class="col-main"><form class="enq" id="enq" novalidate>' +
      '<div class="field"><label for="f-name">' + esc(L.name) + '</label><input id="f-name" name="name" autocomplete="name" required></div>' +
      '<div class="field"><label for="f-email">' + esc(L.email) + '</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>' +
      '<div class="field"><label for="f-org">' + esc(L.organisation) + '</label><input id="f-org" name="organisation" autocomplete="organization"></div>' +
      '<div class="field"><label for="f-iam">' + esc(L.iam) + '</label><select id="f-iam" name="iam">' + opts + "</select></div>" +
      '<div class="field"><label for="f-enq">' + esc(L.enquiry) + "</label><small>" + esc(L.enquiryHint) + '</small><textarea id="f-enq" name="enquiry" required></textarea></div>' +
      '<div class="field"><label for="f-time">' + esc(L.timeline) + '</label><input id="f-time" name="timeline"></div>' +
      '<input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div><button class="btn" type="submit">' + esc(L.send) + " " + ARR + '</button></div><p class="status" id="status" role="status" aria-live="polite"></p>' +
      '</form><p class="meta" style="margin-top:3rem">' + t(K.note) + "</p></div></div></section>";
  };

  function wireForm() {
    var form = document.getElementById("enq");
    if (!form) return;
    var K = C.contact, L = K.labels, status = document.getElementById("status");
    var as = new URLSearchParams(location.search).get("as");
    var sel = form.elements.iam;
    if (as === "artist") sel.selectedIndex = 0;
    if (as === "institution") sel.selectedIndex = 1;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.elements._gotcha.value) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var fd = new FormData(form);
      if (K.formEndpoint) {
        status.textContent = L.sending;
        fetch(K.formEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw new Error("bad"); status.textContent = L.success; form.reset(); })
          .catch(function () { status.innerHTML = esc(L.error) + ' <a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>"; });
        return;
      }
      var body = ["Name: " + fd.get("name"), "Email: " + fd.get("email"), "Organisation / studio: " + fd.get("organisation"), "I am: " + fd.get("iam"), "Timeline: " + fd.get("timeline"), "", fd.get("enquiry")].join("\n");
      location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Enquiry from " + fd.get("name")) + "&body=" + encodeURIComponent(body);
      status.textContent = "Your email app should open with the message ready to send.";
    });
  }

  /* ---------- meta / SEO ---------- */
  function setMeta(name, val, attr) {
    var sel = "meta[" + (attr || "name") + '="' + name + '"]', m = document.head.querySelector(sel);
    if (!m) { m = document.createElement("meta"); m.setAttribute(attr || "name", name); document.head.appendChild(m); }
    m.setAttribute("content", val);
  }
  function seo() {
    var src = page === "home" ? { title: S.title, description: S.description } : (C[page] && C[page].seo) || {};
    var title = src.title || S.title, desc = src.description || S.description;
    document.title = title;
    setMeta("description", desc);
    setMeta("og:title", title, "property"); setMeta("og:description", desc, "property"); setMeta("og:type", "website", "property");
    var file = location.pathname.split("/").pop();
    setMeta("og:url", S.siteUrl + (file && file !== "index.html" ? "/" + file : "/"), "property");
    if (page === "home") {
      var ld = document.createElement("script"); ld.type = "application/ld+json";
      ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: S.name, jobTitle: S.descriptor, email: S.email, url: S.siteUrl, address: { "@type": "PostalAddress", addressLocality: "Johannesburg", addressCountry: "ZA" } });
      document.head.appendChild(ld);
    }
  }

  /* ---------- build ---------- */
  try {
    if (!pages[page]) throw new Error("Unknown page: " + page);
    document.body.setAttribute("data-theme", page === "artists" ? "artists" : page === "institutions" ? "institutions" : "neutral");
    app.innerHTML = header() + '<main id="main">' + pages[page]() + "</main>" + footer();
    seo(); wireForm();

    var btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
    btn.addEventListener("click", function () { var o = nav.classList.toggle("is-open"); btn.setAttribute("aria-expanded", o); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { nav.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); } });

    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ("IntersectionObserver" in window && !reduce) {
      document.documentElement.classList.add("js-reveal");
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }); }, { threshold: 0.08 });
      document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    }
  } catch (err) { fail("Something in the content could not be read (" + err.message + "). If you just edited a file in content/, undo your last change."); }
})();
