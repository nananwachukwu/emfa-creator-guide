import { useState } from "react";

const SCOPE_ENTITIES = [
  {
    who: "Media service providers",
    definition: "A natural or legal person whose professional activity is to provide a media service and who has editorial responsibility for the choice of the content of the media service and determines the manner in which it is organised.",
    ref: "Article 2(2)",
    examples: "Newsrooms, broadcasters, press publishers, podcast networks, documentary producers, independent journalists, freelancers — anyone whose professional activity involves providing editorial content to the public.",
  },
  {
    who: "Public service media providers",
    definition: "A media service provider which is entrusted with a public service remit under national law and receives national public funding for the fulfilment of such a remit.",
    ref: "Article 2(3)",
    examples: "BBC, ARD/ZDF, France Télévisions, SVT, RTÉ and equivalents across EU Member States.",
  },
  {
    who: "Providers of very large online platforms",
    definition: "A provider of an online platform that has been designated as a very large online platform pursuant to Article 33(4) of Regulation (EU) 2022/2065.",
    ref: "Article 2(10)",
    examples: "Currently includes platforms like YouTube, TikTok, Instagram, X, Facebook, LinkedIn, and others designated under the Digital Services Act with 45+ million monthly active users in the EU.",
  },
  {
    who: "Video-sharing platform providers",
    definition: "Video-sharing platform provider as defined in Article 1(1), point (da), of Directive 2010/13/EU.",
    ref: "Article 2(12)",
    examples: "Platforms whose essential functionality is devoted to providing video content to the general public.",
  },
  {
    who: "Providers of audience measurement systems",
    definition: "Those collecting, interpreting or otherwise processing data about the number and characteristics of users of media services or users of content on online platforms for the purposes of decisions regarding advertising allocation, pricing, or content distribution.",
    ref: "Article 2(16)–(17)",
    examples: "Nielsen, Comscore, platform-internal analytics (YouTube Analytics, Meta Business Suite), Joint Industry Committees, and any proprietary measurement system.",
  },
  {
    who: "Device manufacturers, developers & importers",
    definition: "Those who place on the market devices or user interfaces controlling or managing access to and the use of media services providing programmes.",
    ref: "Article 20",
    examples: "Smart TV manufacturers (Samsung, LG), set-top box makers, connected car audio systems, app store operators — anyone whose hardware or interface gates access to media content.",
  },
  {
    who: "Public authorities and entities",
    definition: "A national or subnational government, a regulatory authority or body, or an entity controlled, directly or indirectly, by a national or subnational government.",
    ref: "Article 2(18)",
    examples: "Subject to state advertising transparency obligations under Article 25.",
  },
  {
    who: "Recipients of media services",
    definition: "Natural persons who are nationals of Member States or benefit from rights conferred upon them by Union law and legal persons established in the Union.",
    ref: "Recital 8",
    examples: "Every citizen and business in the EU that consumes media — protected through the right to media plurality under Article 3.",
  },
];

const THRESHOLD_ELEMENTS = [
  {
    element: "Professional activity",
    lawText: '"The definition of media service should be limited to services as defined by the TFEU and, therefore, should cover any form of economic activity."',
    lawRef: "Recital 9",
    analysis: "Your content creation must constitute a professional activity — meaning it is an economic activity, normally provided for consideration (payment or other forms of value). This is the first filter. A teenager posting vlogs as a hobby falls outside. A creator who monetises through subscriptions, ad revenue, brand deals, platform payment programmes, or Patreon likely falls inside. The consideration does not need to be direct payment from audiences — advertising-supported content qualifies. The law explicitly states this covers 'any form of economic activity' under the Treaty.",
    creatorTest: "Do you earn money — directly or indirectly — from your content? If yes, you likely clear this threshold.",
  },
  {
    element: "Principal purpose",
    lawText: '"\'Media service\' means a service [...] where the principal purpose of the service or a dissociable section thereof consists in providing programmes or press publications [...] to the general public, by any means, in order to inform, entertain or educate."',
    lawRef: "Article 2(1)",
    analysis: "The principal purpose of your service — or a separable section of it — must be providing programmes or press publications to the general public. 'Programme' is defined broadly as any set of moving images or sounds constituting an individual item (Article 2(4)). 'Press publication' follows the Copyright Directive definition. The key phrase is 'principal purpose': if content creation is incidental to another service — say, a restaurant posting promotional videos — that is excluded. But note the crucial words 'or a dissociable section thereof.' A creator who runs a broader business but maintains a distinct content channel, podcast series, or publication could qualify for that section even if content is not their entire operation.",
    creatorTest: "Is providing content to the public the main thing your service does — or a clearly distinct part of it? A YouTube channel, a podcast, a Substack, a documentary series all qualify. Promotional content for a non-media business does not.",
  },
  {
    element: "Editorial responsibility",
    lawText: '"\'Editorial responsibility\' means the exercise of effective control both over the selection of programmes or press publications and over their organisation, for the purposes of the provision of a media service, regardless of the existence of liability under national law for the service provided."',
    lawRef: "Article 2(8)",
    analysis: "This is the most consequential threshold. You must exercise effective control over two things: what content is selected and how it is organised. A creator who decides what topics to cover, what footage to include, how to structure a podcast episode, or what articles to publish in a newsletter exercises editorial responsibility. The law is clear that this does not depend on whether you face legal liability for the content under national law — it is about effective control over selection and organisation. Importantly, this distinguishes media service providers from platform users who simply upload content into a structure controlled by someone else. When you upload a video to YouTube, YouTube organises it within its interface, its algorithm, its recommendation system. You controlled the content of the video; YouTube controlled its organisation within the platform. The question is whether your own service — your channel, your publication, your podcast feed — constitutes a service over which you exercise both selection and organisation.",
    creatorTest: "Do you decide what content appears in your publication, channel, or feed — and do you determine how it is structured and presented? If you control both the 'what' and the 'how,' you are exercising editorial responsibility.",
  },
  {
    element: "To the general public",
    lawText: '"It should exclude user-generated content uploaded to an online platform unless it constitutes a professional activity normally provided for consideration, be it of a financial or other nature. It should also exclude purely private correspondence, such as e-mails, and all services that do not have the provision of programmes or press publications as their principal purpose."',
    lawRef: "Recital 9",
    analysis: "The service must be directed at the general public, not at private groups or internal audiences. A podcast available on public platforms qualifies. A private newsletter to friends does not. Corporate communications and promotional materials for public or private entities are explicitly excluded. The exclusion of user-generated content 'unless it constitutes a professional activity' is the critical clause for creators — it means the law explicitly contemplates that some content uploaded to platforms does cross the threshold into media service provision when it becomes professional and economic in nature.",
    creatorTest: "Is your content publicly available to anyone who wants to access it? If it is behind a paywall, that is fine — it is still directed at the general public. If it is a private group chat, it is not.",
  },
  {
    element: "To inform, entertain or educate",
    lawText: '"[...] in order to inform, entertain or educate."',
    lawRef: "Article 2(1)",
    analysis: "The purpose must be to inform, entertain, or educate. This is deliberately broad — it covers news, commentary, analysis, documentary, fiction, comedy, music, educational content, and everything in between. It would exclude pure advertising (though advertising within a media service is fine) and purely functional or transactional services. For most creators producing substantive content, this threshold is easily met.",
    creatorTest: "Does your content aim to inform, entertain, or educate your audience? Unless you are running a pure product catalogue, the answer is almost certainly yes.",
  },
];

const PLATFORM_THRESHOLD = {
  lawText: '"In the increasingly convergent media environment, some video-sharing platform providers or providers of very large online platforms have started to exercise editorial control over a section or sections of their services. Therefore, where such providers exercise editorial control over a section or sections of their services, they could be qualified as both a video-sharing platform provider or a provider of a very large online platform and a media service provider."',
  lawRef: "Recital 11",
  analysis: "This is where the law gets radical. A platform does not need to exercise editorial control over its entire service to become a media service provider — only over a section. YouTube's curated 'Trending' page, editorially selected homepage features, commissioned original content sections, platform-produced news digests — any of these could constitute a 'section' over which the platform exercises editorial responsibility. The moment a platform moves from algorithmic organisation of user-submitted content to editorial selection and curation of content in a distinct section, it potentially acquires dual status: regulated as a platform under the DSA and as a media service provider under the EMFA. For creators, this means the platform you upload to may simultaneously be your distributor, your competitor (as a fellow media service provider), your funder (through creator programmes), and the entity that controls your audience measurement data. That convergence of roles — made visible by this law — is the structural condition that my research on media capture investigates.",
};

const PROVISIONS = [
  {
    id: "takedown", icon: "\u{1F507}",
    creatorQuestion: "Ever had content removed with no real explanation and no one to talk to?",
    theme: "YOUR CONTENT, THEIR RULES",
    tagline: "New rules before they silence you",
    lawText: '"Where a provider of a very large online platform considers that content provided by such media service providers is incompatible with its terms and conditions, it should duly consider media freedom and media pluralism [...] and provide, as early as possible, the necessary explanations to media service providers in a statement of reasons [...] very large online platforms should submit their statement of reasons prior to the suspension or restriction of visibility taking effect."',
    lawRef: "Recital 50",
    articleText: '"Where a provider of a very large online platform intends to take a decision to suspend the provision of its online intermediation services in relation to content provided by a media service provider [...] prior to such a decision to suspend or restrict visibility taking effect, it shall: (a) communicate to the media service provider concerned a statement of reasons [...] for its envisaged decision to suspend or restrict visibility; and (b) give the media service provider the opportunity to reply to the statement of reasons [...] within 24 hours of receiving it."',
    articleRef: "Article 18(4)",
    creatorImpact: "For the first time in EU law, very large online platforms must explain themselves before taking down or restricting media content — not after. They must provide a statement of reasons before the suspension takes effect and give the media service provider 24 hours to respond. This inverts the traditional platform power dynamic where content disappears first and appeals happen later, if at all.",
    whatChanges: "If you qualify as a media service provider, platforms must tell you why before they restrict your content and give you a chance to respond. The burden of explanation shifts to the platform.",
    status: "active",
    caveat: "This protection applies to media service providers who have submitted a declaration under Article 18(1). It does not apply where platforms act under DSA obligations against illegal content or to protect minors (Articles 28, 34, 35 of Regulation 2022/2065).",
  },
  {
    id: "complaints", icon: "\u26A1",
    creatorQuestion: "Filed a complaint with a platform and waited weeks — or never heard back?",
    theme: "PRIORITY COMPLAINTS", tagline: "Your complaint moves to the front of the line",
    lawText: '"It is justified, in view of an expected positive impact on the freedom to provide services and the freedom of expression, that where media service providers comply with certain regulatory, co-regulatory or self-regulatory standards, their complaints against decisions of providers of very large online platforms be treated with priority and without undue delay."',
    lawRef: "Recital 52",
    articleText: '"Providers of very large online platforms shall take all the necessary technical and organisational measures to ensure that complaints lodged by media service providers [...] are processed and decided upon with priority and without undue delay."',
    articleRef: "Article 18(5)",
    creatorImpact: "Platforms must process complaints from qualifying media service providers with priority. No more disappearing into a generic support queue. Media service providers who meet certain standards get expedited treatment, while other users remain subject to standard processes.",
    whatChanges: "If you meet the criteria, your disputes with platforms get fast-tracked. But this creates a privileged tier — raising questions about equal treatment for those who do not qualify.",
    status: "active",
  },
  {
    id: "dialogue", icon: "\u{1F91D}",
    creatorQuestion: "Feel like you are shouting into a void when platforms repeatedly suppress your work?",
    theme: "FORCED DIALOGUE", tagline: "Platforms must sit down and talk",
    lawText: '"Providers of very large online platforms should engage in a dialogue with media service providers that respect standards of credibility and transparency and that consider that restrictions on or suspensions of their content are repeatedly imposed by providers of very large online platforms without sufficient grounds, in order to find an amicable solution for terminating any unjustified restrictions or suspensions and avoiding them in the future."',
    lawRef: "Recital 55",
    articleText: '"Where a media service provider [...] considers that a provider of a very large online platform has repeatedly restricted or suspended, without sufficient grounds, the provision of its services in relation to content provided by the media service provider, the provider of a very large online platform shall engage in a meaningful and effective dialogue with the media service provider, at its request, in good faith with a view to finding an amicable solution."',
    articleRef: "Article 18(6)",
    creatorImpact: "When a platform repeatedly restricts or suspends media content without sufficient grounds, it must engage in meaningful dialogue — in good faith — to resolve the pattern. The media service provider can escalate by notifying the European Board for Media Services and the Commission, and can request the Board to issue an opinion including recommended actions. This creates institutional pressure that individual complaint mechanisms never could.",
    whatChanges: "Repeated unjustified suppression triggers a structured process with European-level oversight. Platforms can no longer treat pattern restrictions as isolated incidents.",
    status: "active",
  },
  {
    id: "transparency", icon: "\u{1F4CA}",
    creatorQuestion: "Do you know how many creators like you have been silenced — and why?",
    theme: "PLATFORM TRANSPARENCY", tagline: "The numbers become public",
    lawText: '"A provider of a very large online platform shall make publicly available on an annual basis detailed information on: (a) the number of instances in which it imposed any restriction or suspension on the grounds that the content provided by a media service provider [...] is incompatible with its terms and conditions; (b) the grounds for imposing such restrictions or suspensions [...]; (c) the number of dialogues with media service providers [...]; (d) the number of instances in which it rejected declarations submitted by a media service provider [...] and the grounds for rejection."',
    lawRef: "Article 18(8)",
    creatorImpact: "Platforms must publish annual data on how often they restrict media content, on what grounds, how many dialogues they engaged in, and how many media service provider declarations they rejected. This creates a public record that researchers, policymakers, and creators can use to identify patterns of suppression.",
    whatChanges: "Platform content moderation decisions about media become part of the public record. Patterns that were previously invisible become measurable.",
    status: "active",
  },
  {
    id: "audience", icon: "\u{1F4C8}",
    creatorQuestion: "Do you trust the numbers the platform shows you about your own audience?",
    theme: "AUDIENCE MEASUREMENT", tagline: "Your reach, their black box — now opened",
    lawText: '"Certain new players that have emerged in the media ecosystem, such as online platforms, do not abide by the industry standards or best practices agreed through relevant industry self-regulatory mechanisms and provide their proprietary measurement services without making available information on their methodologies. That could result in audience measurement solutions that are not comparable, information asymmetries among media market players and potential market distortions."',
    lawRef: "Recital 69",
    articleText: '"Providers of proprietary audience measurement systems shall provide, without undue delay and free of charge, to media service providers, to advertisers and to third parties authorised by media service providers and advertisers accurate, detailed, comprehensive, intelligible and up-to-date information on the methodology used by their audience measurement systems. [...] Providers of proprietary audience measurement systems shall ensure that the methodology used [...] is independently audited once a year."',
    articleRef: "Article 24(2)",
    creatorImpact: "Platforms using proprietary audience measurement must disclose their methodology, provide it free of charge, and submit to independent annual audits. Media service providers can request their own non-aggregated audience data. Audience numbers determine advertising rates, sponsorship value, and negotiating power. When platforms control measurement and keep methodology secret, they control the economic terms of the entire relationship.",
    whatChanges: "The black box around how platforms count your audience must be opened. Independent audits become mandatory. You gain the right to your own data.",
    status: "active",
  },
  {
    id: "devices", icon: "\u{1F4F1}",
    creatorQuestion: "Ever feel like certain platforms are pre-installed into people's lives before you have a chance to reach them?",
    theme: "DEVICE ACCESS", tagline: "Your audience gets to choose — not the manufacturer",
    lawText: '"Users should be able to change, at any time, in a simple, easily accessible and user-friendly manner, the configuration, including default settings, of a device [...] or of a user interface controlling or managing access to and the use of media services providing programmes."',
    lawRef: "Recital 57",
    articleText: '"Users shall have a right to easily change the configuration, including default settings, of any device or user interface controlling or managing access to and the use of media services providing programmes in order to customise the media offering in accordance with their interests or preferences."',
    articleRef: "Article 20(1)",
    creatorImpact: "Device manufacturers can no longer lock users into default media configurations that privilege pre-installed services. Users must be able to easily customise which media they access. For creators distributed through media service providers, the playing field for audience attention becomes less determined by hardware deals and more by what audiences want.",
    whatChanges: "The gatekeeping power of device defaults is weakened. Audience access becomes about choice, not about which platform paid for pole position.",
    status: "upcoming", appliesFrom: "8 May 2027",
  },
  {
    id: "stateads", icon: "\u{1F4B0}",
    creatorQuestion: "Do you know which media outlets your government is paying — and how much?",
    theme: "FOLLOW THE MONEY", tagline: "State advertising becomes transparent",
    lawText: '"Public funds or any other consideration or advantage made available, directly or indirectly, by public authorities or entities to media service providers or providers of online platforms for state advertising or supply or service contracts [...] shall be awarded in accordance with transparent, objective, proportionate and non-discriminatory criteria, made publicly available in advance by electronic and user-friendly means."',
    lawRef: "Article 25(1)",
    articleText: '"Public authorities or entities shall make publicly available by electronic and user-friendly means information on an annual basis about their public expenditure for state advertising. That information shall include at least the following: (a) the legal names of the media service providers or the providers of online platforms from which services were purchased [...] (c) the total annual amount spent and the annual amounts spent per media service provider or provider of an online platform."',
    articleRef: "Article 25(2)",
    creatorImpact: "State advertising money must be allocated transparently, with criteria published in advance and annual expenditure per recipient made public. This matters for creators because state advertising shapes which media environments thrive and which starve. When governments quietly funnel money to favoured outlets, they distort the competitive landscape that all content producers operate within.",
    whatChanges: "The financial relationship between governments and media becomes visible. Creators and the public can see who is funding whom.",
    status: "active",
  },
  {
    id: "declaration", icon: "\u{1F6E1}\uFE0F",
    creatorQuestion: "What would it mean if you could declare yourself a recognised media voice — and platforms had to respect that?",
    theme: "THE SELF-DECLARATION", tagline: "A new status on platforms — if you qualify",
    lawText: '"Providers of very large online platforms shall provide a functionality allowing recipients of their services to: (a) declare that they are media service providers; (b) declare that they comply with [ownership transparency requirements]; (c) declare that they are editorially independent from Member States, political parties, third countries [...]; (d) declare that they are subject to regulatory requirements for the exercise of editorial responsibility [...] or that they adhere to a co-regulatory or self-regulatory mechanism governing editorial standards [...]; (e) declare that they do not provide content generated by artificial intelligence systems without subjecting it to human review or editorial control."',
    lawRef: "Article 18(1)",
    creatorImpact: "Very large online platforms must provide a functionality for users to declare themselves media service providers — subject to editorial standards, transparent about ownership, editorially independent, and not publishing unreviewed AI content. This declaration unlocks the protections above: pre-takedown notice, priority complaints, dialogue rights, and Board oversight. But it also draws a line. The declaration requires adherence to regulatory or self-regulatory editorial standards. It requires human editorial control over AI-generated content. It requires ownership transparency. The criteria define who qualifies — and, implicitly, who is left outside.",
    whatChanges: "A formal mechanism for media service providers to identify themselves on platforms and access enhanced protections. Platforms can reject or invalidate declarations, but must state grounds.",
    status: "active",
  },
];

const TIMELINE = [
  { date: "8 November 2024", provision: "Article 3 — Right of recipients to media plurality", status: "past" },
  { date: "8 February 2025", provision: "Articles 4, 6(3), 7\u201313, 28 — Media rights, editorial independence, Board established", status: "past" },
  { date: "8 May 2025", provision: "Articles 14\u201317 — Regulatory cooperation framework", status: "past" },
  { date: "8 August 2025", provision: "Full regulation applies — Articles 18\u201319, 21\u201326", status: "past" },
  { date: "8 May 2027", provision: "Article 20 — Device and interface customisation rights", status: "upcoming" },
];

function ScopeCard({ entity }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{
      padding: "16px 20px", background: open ? "#1a1a2e" : "#0f0f1a",
      border: "1px solid " + (open ? "#e94560" : "#1a1a3e"),
      borderRadius: 2, marginBottom: 8, cursor: "pointer", transition: "all 0.2s ease",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#eee", fontWeight: 500 }}>{entity.who}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#555" }}>{entity.ref}</div>
      </div>
      {open && (
        <div style={{ marginTop: 14, animation: "fadeIn 0.2s ease" }}>
          <div style={{
            fontFamily: "'Georgia', serif", fontSize: 13, lineHeight: 1.8, color: "#aaa",
            padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderLeft: "3px solid #333", marginBottom: 12,
          }}>{entity.definition}</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#888", lineHeight: 1.7 }}>{entity.examples}</div>
        </div>
      )}
    </div>
  );
}

function ThresholdCard({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      marginBottom: 24, background: open ? "#1a1a2e" : "#0f0f1a",
      border: "1px solid " + (open ? "#e94560" : "#1a1a3e"),
      borderRadius: 2, cursor: "pointer", transition: "all 0.3s ease", position: "relative", overflow: "hidden",
    }} onClick={() => setOpen(!open)}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#e94560" }} />
      <div style={{ padding: "20px 24px 20px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: "#e94560", marginBottom: 6, textTransform: "uppercase" }}>
              Element {index + 1} of 5
            </div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: "#eee" }}>{item.element}</div>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#555", flexShrink: 0 }}>{item.lawRef}</div>
        </div>
        {open && (
          <div style={{ marginTop: 20, animation: "fadeIn 0.3s ease" }}>
            <div style={{
              fontFamily: "'Georgia', serif", fontSize: 13, lineHeight: 1.8, color: "#aaa",
              padding: "14px 18px", background: "rgba(255,255,255,0.02)", borderLeft: "3px solid #333", marginBottom: 16,
            }}>{item.lawText}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#ccc", marginBottom: 16 }}>{item.analysis}</div>
            <div style={{
              padding: "12px 16px", background: "rgba(233,69,96,0.06)",
              border: "1px solid rgba(233,69,96,0.15)", borderRadius: 2,
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: "#e94560", marginBottom: 6, textTransform: "uppercase" }}>The creator test</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, lineHeight: 1.7, color: "#ddd" }}>{item.creatorTest}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProvisionCard({ provision, isExpanded, onToggle }) {
  return (
    <div style={{
      marginBottom: 24, background: isExpanded ? "#1a1a2e" : "#0f0f1a",
      border: "1px solid " + (isExpanded ? "#e94560" : "#1a1a3e"),
      borderRadius: 2, cursor: "pointer", transition: "all 0.3s ease", position: "relative", overflow: "hidden",
    }} onClick={onToggle}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: provision.status === "active" ? "#e94560" : "#f5a623" }} />
      <div style={{ padding: "24px 24px 24px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: provision.status === "active" ? "#e94560" : "#f5a623", marginBottom: 8, textTransform: "uppercase" }}>{provision.theme}</div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: "#eee", lineHeight: 1.3, marginBottom: 12 }}>{provision.creatorQuestion}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#666" }}>
              {provision.lawRef}{provision.articleRef ? " \u00B7 " + provision.articleRef : ""}{provision.appliesFrom ? " \u00B7 Applies from " + provision.appliesFrom : ""}
            </div>
          </div>
          <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0, opacity: 0.7 }}>{provision.icon}</div>
        </div>
        <div style={{ marginTop: 12, padding: "8px 12px", background: "rgba(233,69,96,0.08)", borderLeft: "2px solid rgba(233,69,96,0.3)", fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#ccc", fontStyle: "italic" }}>{provision.tagline}</div>
      </div>
      {isExpanded && (
        <div style={{ padding: "0 24px 28px 28px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: "#e94560", marginBottom: 10, textTransform: "uppercase" }}>What the law says — {provision.lawRef}</div>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: 13, lineHeight: 1.8, color: "#aaa", padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderLeft: "3px solid #333" }}>{provision.lawText}</div>
          </div>
          {provision.articleText && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: "#e94560", marginBottom: 10, textTransform: "uppercase" }}>The operative provision — {provision.articleRef}</div>
              <div style={{ fontFamily: "'Georgia', serif", fontSize: 13, lineHeight: 1.8, color: "#aaa", padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderLeft: "3px solid #333" }}>{provision.articleText}</div>
            </div>
          )}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: "#e94560", marginBottom: 10, textTransform: "uppercase" }}>What this means for creators</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#ccc" }}>{provision.creatorImpact}</div>
          </div>
          <div style={{ padding: "14px 18px", background: "rgba(233,69,96,0.06)", border: "1px solid rgba(233,69,96,0.15)", borderRadius: 2 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: "#e94560", marginBottom: 6, textTransform: "uppercase" }}>The bottom line</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, lineHeight: 1.7, color: "#ddd" }}>{provision.whatChanges}</div>
          </div>
          {provision.caveat && (
            <div style={{ marginTop: 16, padding: "12px 18px", background: "rgba(245,166,35,0.06)", border: "1px solid rgba(245,166,35,0.15)", borderRadius: 2, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, lineHeight: 1.7, color: "#f5a623" }}>
              {"\u26A0"} {provision.caveat}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function EMFACreatorGuide() {
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [expandAll, setExpandAll] = useState(false);
  const toggleCard = (id) => { setExpandedCards(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }); };
  const handleExpandAll = () => { setExpandedCards(expandAll ? new Set() : new Set(PROVISIONS.map(p => p.id))); setExpandAll(!expandAll); };

  const sectionTitle = (part, title, desc) => (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#e94560", marginBottom: 8, textTransform: "uppercase" }}>{part}</div>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#eee", margin: "0 0 12px 0" }}>{title}</h2>
      {desc && <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#999", maxWidth: 620 }}>{desc}</div>}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a14", color: "#eee", fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        ::selection { background: rgba(233,69,96,0.3); color: #fff; }
        * { box-sizing: border-box; }
      `}</style>

      {/* HEADER */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "80px 24px 20px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: "#e94560", marginBottom: 24, textTransform: "uppercase" }}>
          Regulation (EU) 2024/1083 · European Media Freedom Act
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: "#fff", margin: "0 0 24px 0" }}>
          The EU Media Act,<br /><span style={{ fontStyle: "italic", color: "#e94560" }}>decoded for creators</span>
        </h1>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, lineHeight: 1.8, color: "#999", maxWidth: 620, marginBottom: 16 }}>
          The European Media Freedom Act entered into force in 2024 and most of its provisions are now active.
          It regulates how platforms treat media content, who counts as media, and what protections exist when
          platforms silence voices. This guide starts where the law starts: with who it applies to, what a media
          service provider is, and what it takes for a content creator to cross that threshold.
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#555", marginBottom: 60 }}>
          Analysis by Nana Nwachukwu · AI Accountability Lab, Trinity College Dublin
        </div>
      </div>

      {/* PART ONE */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 48px" }}>
        {sectionTitle("Part one", "Who does this law apply to?", "The EMFA creates obligations for eight categories of actors. Each has different responsibilities under the regulation. Click to see the legal definition and who falls within it.")}
        {SCOPE_ENTITIES.map((e, i) => <ScopeCard key={i} entity={e} />)}
      </div>

      {/* PART TWO */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 48px" }}>
        {sectionTitle("Part two", "When does a creator become a media service provider?")}
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#999", marginBottom: 16, maxWidth: 620 }}>
          This is the question that determines whether the EMFA's protections reach you. The law does not use the word "creator." It defines a media service provider through five cumulative elements. You need to meet all of them. Each element below includes the legal text, analysis, and a practical test.
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#999", marginBottom: 32, maxWidth: 620 }}>
          The boundary matters. On one side: pre-takedown notice, priority complaints, forced dialogue, Board oversight. On the other: the same terms-of-service regime that exists today.
        </div>
        {THRESHOLD_ELEMENTS.map((item, i) => <ThresholdCard key={i} item={item} index={i} />)}

        {/* Platform threshold */}
        <div style={{ marginTop: 16, padding: "24px 28px", background: "#0f0f1a", border: "1px solid #1a1a3e", borderRadius: 2 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#f5a623", marginBottom: 12, textTransform: "uppercase" }}>
            And when does a platform become a media service provider?
          </div>
          <div style={{ fontFamily: "'Georgia', serif", fontSize: 13, lineHeight: 1.8, color: "#aaa", padding: "14px 18px", background: "rgba(255,255,255,0.02)", borderLeft: "3px solid #333", marginBottom: 16 }}>
            {PLATFORM_THRESHOLD.lawText}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#555", marginBottom: 12 }}>{PLATFORM_THRESHOLD.lawRef}</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#ccc" }}>{PLATFORM_THRESHOLD.analysis}</div>
        </div>
      </div>

      {/* PART THREE */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 48px" }}>
        {sectionTitle("Part three", "What protections does the law provide?", "If you meet the media service provider threshold, the EMFA creates a set of enforceable rights in your relationship with very large online platforms. Here are the eight provisions that most directly affect creators — with the actual legislative text and analysis of what changes.")}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#555", textTransform: "uppercase" }}>
            {PROVISIONS.length} provisions · Click to expand
          </div>
          <button onClick={handleExpandAll} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, color: "#e94560", background: "transparent", border: "1px solid rgba(233,69,96,0.3)", padding: "6px 14px", cursor: "pointer", borderRadius: 2, textTransform: "uppercase" }}>
            {expandAll ? "Collapse all" : "Expand all"}
          </button>
        </div>
        {PROVISIONS.map(p => <ProvisionCard key={p.id} provision={p} isExpanded={expandedCards.has(p.id)} onToggle={() => toggleCard(p.id)} />)}
      </div>

      {/* TIMELINE */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#e94560", marginBottom: 24, textTransform: "uppercase" }}>Implementation timeline</div>
        <div style={{ position: "relative", paddingLeft: 24 }}>
          <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 1, background: "#1a1a3e" }} />
          {TIMELINE.map((item, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 24, paddingLeft: 20 }}>
              <div style={{ position: "absolute", left: -22, top: 6, width: 10, height: 10, borderRadius: "50%", background: item.status === "past" ? "#e94560" : "transparent", border: "2px solid " + (item.status === "past" ? "#e94560" : "#f5a623") }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: item.status === "past" ? "#e94560" : "#f5a623", marginBottom: 4 }}>
                {item.date} {item.status === "past" ? "— ACTIVE" : "— UPCOMING"}
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#999", lineHeight: 1.6 }}>{item.provision}</div>
            </div>
          ))}
        </div>
      </div>

      {/* THE GAP */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ padding: 32, background: "#0f0f1a", border: "1px solid #1a1a3e", borderRadius: 2 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#e94560", marginBottom: 16, textTransform: "uppercase" }}>The question the law does not answer</div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, lineHeight: 1.4, color: "#eee", marginBottom: 20 }}>
            The EMFA protects media service providers from platforms. But who protects media service providers from becoming dependent on the very companies they cover?
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#999", marginBottom: 20 }}>
            The regulation requires transparency about state advertising and public funding. It says nothing about the hundreds of millions in private funding flowing from technology companies to journalism — the grants, partnerships, tools, training programmes, and licensing deals that create structural dependencies between the platforms being regulated and the media outlets that should be holding them accountable. The EMFA was built for a world where the state is the primary threat to media independence. The world creators actually inhabit is one where platforms are simultaneously their distributor, their funder, their competitor, and — where they exercise editorial control — their fellow media service provider.
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#999" }}>
            That convergence of roles is what my research at Trinity College Dublin's AI Accountability Lab investigates. The <span style={{ color: "#e94560" }}>Media Capture Watch</span> visualisation maps these funding relationships. This guide maps the legal architecture. Together, they show the distance between the protections the law provides and the protections the information ecosystem actually needs.
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #1a1a2e" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#444", lineHeight: 1.8 }}>
            All quoted text is from Regulation (EU) 2024/1083 of the European Parliament and of the Council of 11 April 2024, published in the Official Journal of the European Union, L series, 17.4.2024.
            <br />ELI: http://data.europa.eu/eli/reg/2024/1083/oj
            <br /><br />Analysis: Nana Nwachukwu · AI Accountability Lab · Trinity College Dublin · 2025
          </div>
        </div>
      </div>
    </div>
  );
}
