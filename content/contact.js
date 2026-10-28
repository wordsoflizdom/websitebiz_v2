/* CONTACT PAGE CONTENT AND FORM SETTINGS. */
window.CONTENT = window.CONTENT || {};
CONTENT.contact = {
  seo: { title: "Contact — Liz Dom", description: "Tell me what you're working on." },
  hero: {
    eyebrow: "Contact",
    headline: "What are you trying to make *happen?*",
    intro: "Tell me a little about the project, where it stands and what you think it needs. We can work out whether I'm the right person to bring in."
  },

  // FORM DELIVERY. Leave empty and the form opens the visitor's email app,
  // pre-filled to {{email}}. For a form that sends by itself, create a free
  // Formspree (formspree.io) form and paste its address here, e.g. "https://formspree.io/f/abcdwxyz".
  formEndpoint: "",

  labels: {
    name: "Name",
    email: "Email",
    organisation: "Organisation / studio",
    iam: "I am",
    iamOptions: ["An artist", "An institution", "Something else"],
    enquiry: "What are you working on?",
    enquiryHint: "The project, where it stands, what you think it needs.",
    timeline: "Timeline, if relevant",
    send: "Send",
    sending: "Sending…",
    success: "Thank you. Your message has been sent and I'll be in touch.",
    error: "That did not send. Please email me directly instead."
  },

  note: "Engagements are scoped around the project, its stage and the kind of capacity required."
};
