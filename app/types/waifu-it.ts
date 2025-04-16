export interface WaifuItImage {
	status: number
	_id: number
	name: Name
	image: Image
	favourites: number
	siteUrl: string
	description: string
	age: string
	gender: string
	bloodType: string
	dateOfBirth: DateOfBirth
	media: Media
}

export interface DateOfBirth {
	year: string
	month: string
	day: string
}

export interface Image {
	large: string
}

export interface Media {
	nodes: Node[]
}

export interface Node {
	id: number
	idMal: number
	coverImage: CoverImage
	bannerImage: string
	title: Title
	synonyms: string[]
	popularity: number
	type: string
	format: string
}

export interface CoverImage {
	medium: string
}

export interface Title {
	romaji: string
	english: string
	native: string
	userPreferred: string
}

export interface Name {
	first: string
	middle: string
	last: string
	full: string
	native: string
	userPreferred: string
	alternative: string[]
	alternativeSpoiler: string[]
}
