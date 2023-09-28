import {Character} from "@/api/types/character";

export const defaultValue = (value: number | string, defaultStr: string): string | number => {
    if (value) return value
    return defaultStr
}

export const sortCharacterByName = (array: Character[], desc: boolean): Character[] => {
    return array.sort((a, b) => {
        const propA = a.name.toLowerCase();
        const propB = b.name.toLowerCase();
        if (propA < propB) {
            return desc ? 1 : -1;
        }
        if (propA > propB) {
            return desc ? -1 : 1;
        }
        return 0;
    });
}
export const sortCharacterByGender = (array: Character[], desc: boolean): Character[] => {
    return array.sort((a, b) => {
        const propA = a.gender.toLowerCase();
        const propB = b.gender.toLowerCase();
        if (propA < propB) {
            return desc ? 1 : -1;
        }
        if (propA > propB) {
            return desc ? -1 : 1;
        }
        return 0;
    });
}

export const sortCharacterBySpecies = (array: Character[], desc: boolean): Character[] => {
    return array.sort((a, b) => {
        const propA = a.species.toLowerCase();
        const propB = b.species.toLowerCase();
        if (propA < propB) {
            return desc ? 1 : -1;
        }
        if (propA > propB) {
            return desc ? -1 : 1;
        }
        return 0;
    });
}
