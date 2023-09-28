import {Character} from "@/api/types/character";

interface Pagination {
    currentPage: number,
    pages: number
    prevPage: number | null,
    nextPage: number | null
}
interface By{
    byName: { desc: boolean, active: boolean },
    byGender: { desc: boolean, active: boolean },
    bySpecies: { desc: boolean, active: boolean },
}
export interface TableStore {
    by: By,
    pagination: Pagination,
    characters: Character[],
    sortCharacters: Character[],
}
