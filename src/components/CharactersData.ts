export interface Character {
    id: number;
    name: string;
    image: string;
    rarity: string;
    speed: number;
    skill?: string; // Optional skill property for UR characters
}

export const charactersData: Character[] = [
    { id: 1, name: 'Nico Yazawa', image: '/idol/nico-yazawa-6.jpg', rarity: 'UR', speed: 4, skill: 'Tăng 10% tốc độ khi làm công việc liên quan tới tính toán.' },
    { id: 2, name: 'Maki Nishikino', image: '/idol/maki-nishikino-6.jpg', rarity: 'SR', speed: 2 },
    { id: 3, name: 'Kotori Minami', image: '/idol/kotori-minami-7.jpg', rarity: 'R', speed: 1 },
    { id: 4, name: 'Rina Tennoji', image: '/idol/rina-tennoji-2.jpg', rarity: 'SSR', speed: 3 },
];