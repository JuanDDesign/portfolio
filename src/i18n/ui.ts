import type { AstroGlobal } from "astro";

const LANGUAGES = { es: "Español", en: "English" } as const;

export type Language = keyof typeof LANGUAGES;

export const FULL_NAME = "Juan Riaño" as const;
export const DEFAULT_LANG: Language = "en" as const;

const UI = {
  en: {
    "theme.dark": "Dark",
    "theme.light": "Light",
    "theme.system": "System",
    "theme.select": "Select your theme",

    "header.projects": "Projects",
    "header.about-me": "About Me",
    "header.experience": "Experience",

    "social.cv": "Download CV",
    "social.linkedin": "LinkedIn",
    "social.contact": "Contact me",

    "greeting.hello": `Hi, I’m ${FULL_NAME}`,
    "badge.available": "Available for work",
    "language.select": "Select your language",
  },
  es: {
    "theme.dark": "Oscuro",
    "theme.light": "Claro",
    "theme.system": "Sistema",
    "theme.select": "Selecciona tu tema",

    "header.about-me": "Sobre mí",
    "header.projects": "Proyectos",
    "header.experience": "Experiencia",

    "social.cv": "Descargar CV",
    "social.linkedin": "LinkedIn",
    "social.contact": "Contáctame",

    "language.select": "Selecciona tu idioma",
    "greeting.hello": `Hola, soy ${FULL_NAME}`,
    "badge.available": "Disponible para trabajar",
  },
} as const;

export function useTranslations(astro: AstroGlobal, key: keyof (typeof UI)[typeof DEFAULT_LANG]) {
  const lang = astro.currentLocale as Language;

  return UI[lang][key] || UI[DEFAULT_LANG][key];
}

type GetLanguage<Flags extends Record<Language, unknown>> = {
  icon: Flags[Language];
  label: string;
  key: Language;
  url: string;
};

type GetLanguages<Flags extends Record<Language, unknown>> = {
  selected: GetLanguage<Flags>;
  all: GetLanguage<Flags>[];
};

export const getLanguage = (astro: AstroGlobal): Language => (astro.currentLocale ?? DEFAULT_LANG) as Language;

export const getLanguages = <Flags extends Record<Language, unknown>>(
  astro: AstroGlobal,
  flags?: Flags
): GetLanguages<Flags> => {
  const languageKey = getLanguage(astro);
  const path = astro.originPathname.split("/").slice(2).join("/");
  const selected = { label: LANGUAGES[languageKey], icon: flags?.[languageKey] };

  const languages = Object.entries(LANGUAGES).map(([key, label]) => {
    const url = path ? `/${key}/${path}` : `/${key}`;

    return { key, label, url, icon: flags?.[key as Language] };
  });

  return { selected, all: languages } as GetLanguages<Flags>;
};
