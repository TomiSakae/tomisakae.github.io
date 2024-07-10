// types/types.ts
export interface Anime {
    id: string;
    attributes: {
      titles: {
        en: string;
        en_jp: string;
      };
      posterImage: {
        large: string;
      };
      subtype: string;
    };
  }
  
  export interface KitsuResponse {
    data: Anime[];
  }
  