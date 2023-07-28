export interface SinglePokemon {
  name: string;
  url: string;
}

export interface Pokemon {
  count: number;
  next: string;
  previous: string | null;
  results: SinglePokemon[];
}

export interface PokemonByNameOrIdResult {
  abilities: [
    {
      ability: SinglePokemon;
    }
  ];
  base_experience: number;
  forms: SinglePokemon[];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_types: [];
  species: SinglePokemon;
  sprites: {};
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }
  ];
  types: [
    {
      slot: number;
      type: SinglePokemon;
    }
  ];
  weight: number;
}
