import * as TokenCategory from "../tokens/index.js";
import { LiteralType } from "../tokens/literal.js";

class Token {
	readonly #type: TokenCategory.Type;
	readonly #lexeme: string;
	// readonly #literal: string | number | null;
	readonly #line: number;
	readonly #column: number;

	constructor(type: TokenCategory.Type, lexeme: string, literal: LiteralType, line: number, column: number) {
		this.#type = type;
		this.#lexeme = lexeme;
		// this.#literal = literal;
		this.#line = line;
		this.#column = column;
	}

	toString(): string {
		return `[${this.#lexeme}]: ${this.#type.toString()} (at ${this.#line}:${this.#column})`;
	}
}

export { Token };