import {
	KeywordToken,
	ComparatorToken,
	// LogicalOperatorToken,
	ArithmeticOperatorToken,
	LiteralToken,
	SymbolToken,
	FileToken,
	type TokenType
} from "./tokenType.js";

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

	#isAtEnd(): boolean {
		return this.#current >= this.#source.length;
	}

	#match(expectations: Array<string>): boolean {
		if (this.#isAtEnd()) return false;
		if (!expectations.includes(this.#source.charAt(this.#current))) return false;

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
		this.#addToken(LiteralToken.QUOTED_STR, value);
	}

	#isDigit(c: string): boolean {
		return c >= '0' && c <= '9';
	}

	#number(): void {
		while (this.#isDigit(this.#peek())) this.#advance();

		// Look for a fractional part.
		if (this.#peek() == '.' && this.#isDigit(this.#peekNext())) {
			// Consume the "."
			this.#advance();

			while (this.#isDigit(this.#peek())) this.#advance();
		}

		this.#addToken(
			LiteralToken.NUMBER,
			parseFloat(
				this.#source.substring(this.#start, this.#current)
			)
		);
	}

	#isAlpha(c: string): boolean {
		return (c >= 'a' && c <= 'z') ||
		(c >= 'A' && c <= 'Z') ||
		c == '_';
	}

	#isAlphaNumeric(c: string): boolean {
		return this.#isAlpha(c) || this.#isDigit(c);
	}


	#identifier(): void {
		while (this.#isAlphaNumeric(this.#peek())) this.#advance();

		this.#addToken(KeywordToken.INDENTIFIER, null);
	}


	#scanToken() {
		const c: string = this.#advance();

		switch (c) {
		case '(': this.#addToken(SymbolToken.L_PAREN, null); break;
		case ')': this.#addToken(SymbolToken.R_PAREN, null); break;
		case '{': this.#addToken(SymbolToken.L_CURLY, null); break;
		case '}': this.#addToken(SymbolToken.R_CURLY, null); break;
		case '[': this.#addToken(SymbolToken.L_BRACK, null); break;
		case ']': this.#addToken(SymbolToken.R_BRACK, null); break;
		case ',': this.#addToken(SymbolToken.COMMA, null); break;
		case '.': this.#addToken(SymbolToken.DOT, null); break;
		case '?': this.#addToken(SymbolToken.WTF, null); break;
		case '<':
			this.#addToken(
				(
					this.#match(["="])
					? ComparatorToken.LTE
					: this.#match([">"])
						? ComparatorToken.NEQ
						: ComparatorToken.LT
				),
				null
			);
			break;
		case '>':
			this.#addToken(
				(
					this.#match(["="])
					? ComparatorToken.GTE
					: ComparatorToken.GT
				),
				null
			);
			break;
		// Handle minus and comments
		case '-':
			if (this.#match(["-"])) {
				while (this.#peek() != '\n' && !this.#isAtEnd()) this.#advance();
			} else {
				this.#addToken(ArithmeticOperatorToken.HYPHEN, null);
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
			if (this.#isDigit(c)) {
				this.#number();
			} else if (this.#isAlpha(c)) {
				this.#identifier();
			} else {
				// console.error("Default case");
			}

			break;
		}
	}

	#advance(): string {
		return this.#source.charAt(this.#current++);
	}

	#addToken(type: TokenType, literal: string | number | null): void {
		const text: string = this.#source.substring(this.#start, this.#current);

		this.#tokens.push(
			new Token(type, text, literal, this.#line)
		);
	}

	scan(): Array<Token> {
		while (!this.#isAtEnd()) {
			this.#start = this.#current;

			this.#scanToken();
		}

		this.#tokens.push(new Token(FileToken.EOF, "", null, this.#line));

		return this.#tokens;
	}
}

export { Lexer };