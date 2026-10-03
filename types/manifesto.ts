export interface Candidate {
  name: string;
  position: string;
  school: string;
  university: string;
  slogan: string;
  electionDate?: string;
  votingTimeAndVenue?: string;
}

export interface ManifestoPoint {
  number: number;
  title: string;
  text: string;
}

export interface ManifestoBox {
  id: number;
  heading: string;
  points: ManifestoPoint[];
}

export interface ManifestoContent {
  title: string;
  opening: string;
  boxes: ManifestoBox[];
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  body: string;
}

export interface SuggestIdeaContent {
  eyebrow: string;
  title: string;
  body: string;
  buttonText: string;
  formUrl: string;
}

export interface MobileBarContent {
  whatsappLabel: string;
  suggestLabel: string;
  shareText: string;
}

export interface ManifestoData {
  candidate: Candidate;
  manifesto: ManifestoContent;
  about: AboutContent;
  suggestIdea: SuggestIdeaContent;
  mobileBar: MobileBarContent;
}
