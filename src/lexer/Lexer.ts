import * as TokenCategory from "../tokens/index.js";
import { LiteralType } from "../tokens/literal.js";
import { SYMBOL_MAP } from "../tokens/symbol.js";

import { Token } from "./Token.js";

class Lexer {
	#source: string;
	readonly #tokens: Array<Token> = [];

	#start: number = 0;
	#current: number = 0;
	#line: number = 1;

	constructor(source: string) {
		this.#source = source;
	}

	/************************************************************/
	/* LEXER STATE & POINTER METHODS                            */
	/************************************************************/
	#isAtEnd(): boolean {
		return this.#current >= this.#source.length;
	}

	#advance(): string {
		return this.#source.charAt(this.#current++);
	}

	#addToken(type: TokenCategory.Type, literal: LiteralType): void {
		const text: string = this.#source.substring(this.#start, this.#current);

		this.#tokens.push(
			new Token(type, text, literal, this.#line, this.#current)
		);
	}

	/************************************************************/
	/* SOURCE INPUT GETTERS                                     */
	/************************************************************/
	#match(expected: string): boolean {
		if (this.#isAtEnd()) return false;
		if (expected !== this.#source.charAt(this.#current)) return false;

		this.#current++;
		return true;
	}

	#peek(): string {
		if (this.#isAtEnd()) return '\0';

		return this.#source.charAt(this.#current);
	}

	#peekNext(): string {
		if (this.#current + 1 >= this.#source.length) return '\0';
		return this.#source.charAt(this.#current + 1);
	}

	// Char categorties
	#isDigit(c: string): boolean {
		return c >= '0' && c <= '9';
	}

	#isAlpha(c: string): boolean {
		return (c >= 'a' && c <= 'z') ||
		(c >= 'A' && c <= 'Z') ||
		c == '_';
	}

	#isAlphaNumeric(c: string): boolean {
		return this.#isAlpha(c) || this.#isDigit(c);
	}

	/************************************************************/
	/* TOKEN ANALYSER METHODS                                   */
	/************************************************************/
	#string(): void {
		while (this.#peek() != '"' && !this.#isAtEnd()) {
			if (this.#peek() == '\n') this.#line++;
			this.#advance();
		}

		if (this.#isAtEnd()) {
			// console.error("Unterminated string");
			return;
		}

		// The closing ".
		this.#advance();

		// Trim the surrounding quotes.
		const value: string = this.#source.substring(this.#start + 1, this.#current - 1);
		this.#addToken(TokenCategory.Literal.SINGLE_QUOTE, value);
	}

	#number(): void {
		let isInteger = true;

		while (this.#isDigit(this.#peek())) this.#advance();

		// Look for a fractional part.
		if (this.#peek() == '.' && this.#isDigit(this.#peekNext())) {
			// Consume the "."
			this.#advance();

			while (this.#isDigit(this.#peek())) this.#advance();

			isInteger = false;
		}

		this.#addToken(
			(isInteger ? TokenCategory.Literal.INTEGER : TokenCategory.Literal.DECIMAL),
			parseFloat(
				this.#source.substring(this.#start, this.#current)
			)
		);
	}

	#identifier(): void {
		while (this.#isAlphaNumeric(this.#peek())) this.#advance();

		this.#addToken(TokenCategory.Keyword.IDENTIFIER, null);
	}

	/************************************************************/
	/* MAIN SCANNING LOGIC                                      */
	/************************************************************/
	#scanToken() {
		const c: string = this.#advance();

		if (this.#isDigit(c)) this.#number();
		if (this.#isAlpha(c)) this.#identifier();
		if (SYMBOL_MAP[c]) this.#addToken(SYMBOL_MAP[c], null);

		switch (c) {
		case '<':
			this.#addToken(
				(
					this.#match("=")
					? TokenCategory.Comparator.LTE
					: this.#match(">")
						? TokenCategory.Comparator.NEQ
						: TokenCategory.Comparator.LT
				),
				null
			);
			break;
		case '>':
			this.#addToken(
				(
					this.#match("=")
					? TokenCategory.Comparator.GTE
					: TokenCategory.Comparator.GT
				),
				null
			);
			break;
		// Handle minus and comments
		case '-':
			if (this.#match("-")) {
				while (this.#peek() != '\n' && !this.#isAtEnd()) this.#advance();
			} else {
				this.#addToken(TokenCategory.ArithmeticOperator.MINUS, null);
			}

			break;
		// Handle strings
		case '"': this.#string(); break;

		case ' ':
		case '\t':
		case '\r':
			break;

		case '\n':
			this.#line++;
			break;
		default:
			// console.error("Default case");

			break;
		}
	}

	scan(): Array<Token> {
		while (!this.#isAtEnd()) {
			this.#start = this.#current;

			this.#scanToken();
		}

		this.#addToken(TokenCategory.FileControl.EOF, null);

		return this.#tokens;
	}
}

export { Lexer };