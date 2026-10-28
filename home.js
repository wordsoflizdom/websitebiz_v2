/* HOMEPAGE CONTENT.
   To hide a section set show: false. To reorder, move a line up or down.
   Section ids must stay exactly as written. */
window.CONTENT = window.CONTENT || {};
CONTENT.home = {
  sections: [
    { id: "hero",       show: true },
    { id: "audiences",  show: true },
    { id: "problem",    show: true },
    { id: "territories",show: true },
    { id: "work",       show: true },
    { id: "about",      show: true },
    { id: "cta",        show: true }
  ],

  hero: {
    eyebrow: "{{name}} — {{descriptor}}",
    headline: "The work *behind* the work.",
    text: "I work with established artists and cultural institutions to develop ambitious projects, find the money and the partners, and see them through, from first proposition to finished work."
  },

  audiences: {
    label: "Who I work with",
    artists: {
      kicker: "For artists",
      title: "The work is yours. The *logistics* don't have to be.",
      text: "Funding, research, proposals and partnerships for artists building something that needs more than their time alone.",
      link: "See how I work with artists"
    },
    institutions: {
      kicker: "For institutions",
      title: "More capacity. More *ways forward.*",
      text: "I work alongside your team to develop programmes, build partnerships, strengthen funding cases and deliver complex projects.",
      link: "See how I work with institutions"
    }
  },

  problem: {
    label: "The project behind the project",
    statement: "Ambition is rarely what runs out. Time, money, introductions and a second informed pair of eyes usually do.",
    paragraphs: [
      "Most projects I'm brought into already have a strong idea and a capable team. What they lack is someone to hold the research, the funding case, the partners and the production in one head, and to notice which of them is about to become the problem.",
      "That is the job. Not a list of tasks, but an eye for what a project needs next, and the means to make that next stage happen."
    ]
  },

  territories: {
    label: "How I become useful",
    intro: "I can join at any point between the first idea and the final report. These are the moments I'm most often asked in.",
    items: [
      { title: "Development",  situation: "When an idea has to become a project.",
        text: "Research, framing and R&D that turn a proposition into something that can be funded and built." },
      { title: "Funding",      situation: "When a project has to find its money.",
        text: "Funding strategy, opportunity research and high-stakes proposals that carry the argument without flattening the work." },
      { title: "Connection",   situation: "When a project needs other people around it.",
        text: "Partnerships and introductions across curators, institutions, funders and researchers, locally and abroad." },
      { title: "Intelligence", situation: "When you need to know where you stand.",
        text: "Research, positioning, case studies and impact documentation, so decisions rest on evidence." },
      { title: "Delivery",     situation: "When a project has to move.",
        text: "Production, coordination and added capacity at the stage where a team is most stretched, plus the systems that make the next project easier." },
      { title: "Expression",   situation: "When the work has to be said clearly.",
        text: "Writing, editing and documentation that stay faithful to the practice." }
    ]
  },

  work: {
    label: "Selected work",
    intro: "A few projects, in the context they happened in.",
    howMany: 3,
    link: "All selected work"
  },

  about: {
    label: "About",
    statement: "I work where artistic ambition meets the conditions that make it possible.",
    text: "{{yearsExperience}} across the South African and Scandinavian art sectors, and an MFA from Kunstakademiet i Trondheim / NTNU. I know what a studio needs, what a funder reads for, and what a team can realistically deliver.",
    link: "More about my work"
  },

  cta: {
    headline: "What are you trying to make *happen?*",
    text: "Tell me a little about the project, where it stands and what you think it needs. We can work out whether I'm the right person to bring in.",
    button: "Start the conversation"
  }
};
