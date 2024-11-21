export default interface Digimon {
  id: number;
  name: string;
  xAntibody: boolean;
  image: string;
  images: {
    href: string;
    transparent: boolean;
  }[];
  levels: {
    id: number;
    level: string;
  }[];
  types: {
    id: number;
    type: string;
  }[];
  attributes: {
    id: number;
    attribute: string;
  }[];
  fields: {
    id: number;
    field: string;
    image: string;
  }[];
  releaseDate: string;
  descriptions: {
    origin: string;
    language: string;
    description: string;
  }[];
  skills: {
    id: number;
    skill: string;
    translation: string;
    description: string;
  }[];
  priorEvolutions: {
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
  }[];
  nextEvolutions: {
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
  }[];
}
