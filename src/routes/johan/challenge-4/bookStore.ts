import { writable } from "svelte/store"

type Book = {
	title: string
	author: string
}

function createBookStore() {
	const { subscribe, set, update } = writable<Book[]>([])

	function addBook(book: Book) {
		update((object) => {
			return [...object, book]
		})
	}

	function removeBook(index: number) {
		update((object) => {
			return [...object.slice(0, index), ...object.slice(index + 1)]
		})
	}

	return {
		addBook,
		removeBook,
		set,
		subscribe,
	}
}
export const bookStore = createBookStore()
