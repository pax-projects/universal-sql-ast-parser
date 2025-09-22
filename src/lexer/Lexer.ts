import * as TokenCategory from "../tokens/index.js";
import { LiteralType } from "../tokens/literal.js";
import { SYMBOL_MAP } from "../tokens/symbol.js";
import { ARITHMETIC_OPERATORS_MAP } from "../tokens/arithmetic.js";
import { LOGICAL_OPERATORS_MAP } from "../tokens/logic.js";
import { KEYWORDS_MAP } from "../tokens/keyword.js";
import { FUNCTION_MAP } from "../tokens/sqlFunction.js";

import { Token } from "./Token.js";

import { Logger } from "../utils/Logger.js";

class Lexer {
	#source: string;
	readonly #tokens: Array<Token> = [];

	#start: number = 0;
	#current: number = 0;
	#line: number = 1;

	readonly #logger: Logger;

	constructor(source: string) {
		this.#source = source;

		this.#logger = new Logger();
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

		// Avoid coupling last query char with EOF token.
		if (type === TokenCategory.FileControl.EOF) {
			this.#tokens.push(
				new Token(type, '', '', this.#line, this.#current + 1)
			);
			return;
		}

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
		c == '_' ||
		c == '.';
	}

	#isAlphaNumeric(c: string): boolean {
		return this.#isAlpha(c) || this.#isDigit(c);
	}

	/************************************************************/
	/* TOKEN ANALYSER METHODS                                   */
	/************************************************************/
	#string(type: TokenCategory.Literal): void {
		let string_separator = '"';

		// Get right string separator allowing multiple strings type
		if (type === TokenCategory.Literal.SINGLE_QUOTE) string_separator = "'";
		if (type === TokenCategory.Literal.DOUBLE_QUOTE) string_separator = '"';
		if (type === TokenCategory.Literal.BACKTICK_QUOTE) string_separator = "`";

		// Loop throw all chars inside string
		while (!this.#isAtEnd()) {
			const ch = this.#peek();

			// newline inside string
			if (ch === '\n') {
				this.#line++;
				this.#advance();
				continue;
			}

			// SQL-style escaping by doubling: ''  ""  ``
			if (ch === string_separator && this.#peekNext() === string_separator) {
				// consume both separators and keep going (escaped quote)
				this.#advance();
				this.#advance();
				continue;
			}

			// closing separator (not doubled) -> stop scanning content
			if (ch === string_separator) break;

			// backslash escape: consume backslash + next char (if any)
			if (ch === '\\') {
				this.#advance(); // consume '\'
				if (!this.#isAtEnd()) this.#advance(); // consume escaped char (could be quote)
				continue;
			}

			// normal char
			this.#advance();
		}

		if (this.#isAtEnd()) {
			this.#logger.error(`Unterminated string at ${this.#start}`);
			return;
		}

		// The closing ".
		this.#advance();

		// Trim the surrounding quotes.
		const value: string = this.#source.substring(this.#start + 1, this.#current - 1);
		this.#addToken(type, value);
	}

	// TODO: Check for the scientific notation
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

		// Checks type to ensure it's not a keyword, else, it gives type as KW
		const text: string 		= this.#source.substring(this.#start, this.#current);
		const upperText: string = text.toUpperCase();

		if (LOGICAL_OPERATORS_MAP[upperText]) {
			this.#addToken(LOGICAL_OPERATORS_MAP[upperText], text);
			return;
		}

		if (KEYWORDS_MAP[upperText]) {
			this.#addToken(KEYWORDS_MAP[upperText], text);
			return;
		}

		if (FUNCTION_MAP[upperText]) {
			this.#addToken(FUNCTION_MAP[upperText], text);
			return;
		}

		this.#addToken(TokenCategory.Keyword.IDENTIFIER, null);
	}

	/************************************************************/
	/* MAIN SCANNING LOGIC                                      */
	/************************************************************/
	#scanToken() {
		const c: string = this.#advance();

		if (this.#isDigit(c)) {
			this.#number();
			return;
		}

		if (this.#isAlpha(c)) {
			this.#identifier();
			return;
		}

		if (SYMBOL_MAP[c]) {
			this.#addToken(SYMBOL_MAP[c], null);
			return;
		}

		if (ARITHMETIC_OPERATORS_MAP[c]) {
			this.#addToken(ARITHMETIC_OPERATORS_MAP[c], null);
			return;
		}

		switch (c) {
		case '=': this.#addToken(TokenCategory.Comparator.EQ, null); break;
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
		case '"': this.#string(TokenCategory.Literal.DOUBLE_QUOTE); break;
		case "'": this.#string(TokenCategory.Literal.SINGLE_QUOTE); break;
		case "`": this.#string(TokenCategory.Literal.BACKTICK_QUOTE); break;

		case ' ':
		case '\t':
		case '\r':
			break;

		case '\n':
			this.#line++;
			break;
		default:
			this.#logger.error(`Default case: ${c}`);
			break;
		}
	}

	scan(): Array<Token> {
		while (!this.#isAtEnd()) {
			this.#start = this.#current;

			this.#scanToken();
		}

		this.#addToken(TokenCategory.FileControl.EOF, "");

		return this.#tokens;
	}
}

export { Lexer };