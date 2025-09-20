import * as TokenCategory from "../tokens/index.js";

class Token {
	// readonly #type: TokenType;
	readonly #lexeme: string;
	readonly #literal: string | number | null;
	readonly #line: number;

	constructor(type: TokenCategory.Type, lexeme: string, literal: string | number | null, line: number) {
		// this.#type = type;
		this.#lexeme = lexeme;
		this.#literal = literal;
		this.#line = line;
	}

	toString(): string {
		return this.#lexeme + " " + this.#literal + `: (${this.#line})`;
	}
}

export { Token };