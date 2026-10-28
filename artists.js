/* ARTISTS PAGE CONTENT.
   Each { title, text } line in "situations" is one item. Copy, delete or move lines.
   Same for "capabilities" (one short phrase per line). */
window.CONTENT = window.CONTENT || {};
CONTENT.artists = {
  seo: { title: "For artists — Liz Dom", description: "Funding, research, proposals and partnerships for established artists building ambitious projects." },

  hero: {
    eyebrow: "For established artists",
    headline: "The work is yours. The *logistics* don't have to be.",
    intro: "At some point a project outgrows the time and infrastructure around it: a new body of work, a commission, a research-led exhibition, a publication across two countries. I join at that point, take on the parts that need sustained attention, and leave the practice where it belongs, with you."
  },

  situationsLabel: "When I'm useful",
  situations: [
    { title: "Developing something ambitious",
      text: "A new exhibition, commission, publication or body of work needs developing beyond the first idea. I research it, test it and shape it until it can stand up to a funder, a curator and a production schedule." },
    { title: "Making the case",
      text: "A significant project needs a proposal that carries its artistic and intellectual weight without retreating into institutional language." },
    { title: "Finding the right opportunity",
      text: "There are many funds, residencies and institutional openings, and very few that fit. I find the ones that do and match them to the project." },
    { title: "Building the network around it",
      text: "Curators, institutions, partners, funders, researchers. I help the right people find the project, and the project find them." },
    { title: "Making it happen",
      text: "When the project has outgrown your available hours, I hold development, coordination and delivery, so you can stay in the work." },
    { title: "Saying it clearly",
      text: "Complex ideas need research, writing, editing and documentation that stay faithful to the practice." }
  ],

  capabilitiesLabel: "What sits behind this",
  capabilities: [
    "Funding strategy", "High-stakes proposal development", "Project research and development",
    "Opportunity research", "Partnership development", "Institutional bridge-building",
    "Artistic R&D", "Writing and editing", "Project production", "Additional project capacity"
  ],

  stance: {
    label: "What this is not",
    text: "I don't manage careers and I don't rescue practices. I work on specific projects, with artists who already know what they are making."
  },

  engagement: {
    label: "How we would work",
    text: "Engagements are scoped around the project, its stage and the kind of capacity required.",
    forms: [
      "A focused intervention", "A specific proposal", "A period of research and development",
      "Partnership development", "Project delivery", "Longer-term embedded capacity"
    ]
  },

  cta: {
    headline: "Have a project in development?",
    text: "Tell me what you're working on.",
    button: "Write to me"
  }
};
