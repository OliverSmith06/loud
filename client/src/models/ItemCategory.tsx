export interface ItemCategory {
  id: number;
  name: string;
  color?: string;
  categoryImgUrl?: string;
}

enum ItemCategories {
  TVSHOW = 'TV Shows',
  MOVIE = 'Movies',
  BAR = 'Bars',
  RESTURANT = 'Resturants',
  OUTING = 'Outings',
  NONSYDNEY = 'Outings (Non-Sydney)',
  EVENT = 'Events',
  SONG = 'Songs',
}