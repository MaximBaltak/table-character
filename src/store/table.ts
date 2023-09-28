import {defineStore} from "pinia";
import {TableStore} from "@/store/types/table-store";
import {CharacterApi} from "@/api/CharacterApi";
import {TypeSort} from "@/enums/type-sort";
import {sortCharacterByGender, sortCharacterByName, sortCharacterBySpecies} from "@/helpers";

export const useTableStore = defineStore('character', {
    state(): TableStore {
        return {
            pagination: {
                pages: 1,
                prevPage: null,
                nextPage: null,
                currentPage: 1,
            },
            characters: [],
            sortCharacters: [],
            by: {
                byGender: {
                    desc: false,
                    active: false
                },
                byName: {
                    desc: false,
                    active: false
                },
                bySpecies: {
                    desc: false,
                    active: false
                },
            }
        }
    },
    actions: {
        async getCharacters(page: number) {
            try {
                if (page <= this.pagination.pages && page) {
                    const {data: {results, info}} = await CharacterApi.getCharacter(page)
                    this.characters = [...results]
                    this.sortCharacters = [...results]
                    this.pagination.pages = info.pages
                    this.pagination.currentPage = page
                    this.pagination.prevPage = page - 1
                    this.pagination.nextPage = page + 1
                    this.by.byName.active = false
                    this.by.byGender.active = false
                    this.by.bySpecies.active = false
                    this.by.byName.desc = false
                    this.by.byGender.desc = false
                    this.by.bySpecies.desc = false
                }
            } catch (e) {
                console.log(e)
            }
        },
        sortTable(sortType: number, desc = false) {
            switch (sortType) {
                case TypeSort.BY_GENDER:
                    this.by.byGender.active = true
                    this.by.byName.active = false
                    this.by.bySpecies.active = false
                    this.by.byGender.desc = desc
                    this.by.byName.desc = false
                    this.by.bySpecies.desc = false
                    this.sortCharacters = sortCharacterByGender(this.sortCharacters, desc)
                    break
                case TypeSort.BY_NAME:
                    this.by.byGender.active = false
                    this.by.byName.active = true
                    this.by.bySpecies.active = false
                    this.by.byGender.desc = false
                    this.by.byName.desc = desc
                    this.by.bySpecies.desc = false
                    this.sortCharacters = sortCharacterByName(this.sortCharacters, desc)
                    break
                case TypeSort.BY_SPECIES:
                    this.by.byGender.active = false
                    this.by.byName.active = false
                    this.by.bySpecies.active = true
                    this.by.byGender.desc = false
                    this.by.byName.desc = false
                    this.by.bySpecies.desc = desc
                    this.sortCharacters = sortCharacterBySpecies(this.sortCharacters, desc)
                    break
                case TypeSort.DEFAULT:
                    this.by.byGender.active = false
                    this.by.byName.active = false
                    this.by.bySpecies.active = false
                    this.by.byGender.desc = false
                    this.by.byName.desc = false
                    this.by.bySpecies.desc = false
                    this.sortCharacters = [...this.characters]
                    break
                default:
                    break
            }
        }

    }
})
