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

export interface ManifestoData {
  candidate: Candidate;
  manifesto: ManifestoContent;
}
