export {}
declare global {
	interface string {
		isNumber: boolean
	}
	interface String {
		isNumber: boolean
		isOperator: boolean
		isAction: boolean
		lastIsDot: boolean
		hasDot: boolean
	}
}
