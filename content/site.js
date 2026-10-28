/* SITE SETTINGS: the details used on every page.
   Change text only between the quotation marks. Keep the quotes and commas.
   Wrap a word in *asterisks* anywhere in the site to make it an accent italic. */
window.CONTENT = window.CONTENT || {};
CONTENT.site = {
  name: "Liz Dom",
  descriptor: "Cultural producer & project development partner",
  title: "Liz Dom — Cultural producer & project development partner",
  description: "Liz Dom works with established artists and cultural institutions as an external project partner: research, development, funding, partnerships and delivery.",

  // Your live address, no slash at the end. Used for search engines and sharing.
  siteUrl: "https://lizdom.xyz",

  email: "wordsoflizdom@gmail.com",
  phone: "",                       // leave empty to hide
  location: "Johannesburg, South Africa",

  // Used in text as {{yearsExperience}}. Change it here once, it updates everywhere.
  yearsExperience: "Over ten years",

  // Navigation. "page" must stay as it is; change label and href freely.
  nav: [
    { label: "Artists",      href: "artists.html",      page: "artists" },
    { label: "Institutions", href: "institutions.html", page: "institutions" },
    { label: "Selected work", href: "work.html",        page: "work" },
    { label: "About",        href: "about.html",        page: "about" },
    { label: "Contact",      href: "contact.html",      page: "contact" }
  ],

  // Leave href empty ("") to hide a link. Paste your full profile addresses here.
  social: [
    { label: "LinkedIn",  href: "" },
    { label: "Instagram", href: "" }
  ],

  footerLine: "Independent practice for artists and cultural institutions. Based in Johannesburg, working internationally.",
  copyright: "Liz Dom"
};
