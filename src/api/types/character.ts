interface LocationCharacter {
    name: string,
    url: string
}
interface OriginCharacter{
    name: string,
    url: string
}
export interface Character{
    created: string,
    episode: string[],
    gender: string,
    id: number,
    image: string,
    location: LocationCharacter,
    name: string,
    origin: OriginCharacter
    species:string,
    status: string,
    type :string,
    url: string
}
