export interface DataForSend {
	person: {
		v: number
	}
	markers: {
		place: {
			point: number
			gases: {
				gas: number
				v: number
			}[]
		}
		x: number
		y: number
	}[]
}
