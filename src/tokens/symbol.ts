export enum Symbol {
	L_PAREN = "L_PAREN",  			 	// (
	R_PAREN = "R_PAREN",  			 	// )
	L_BRACK = "L_BRACK",  			 	// [
	R_BRACK = "R_BRACK",  			 	// ]
	L_CURLY = "L_CURLY",  			 	// {
	R_CURLY = "R_CURLY",  			 	// }
	COMMA = "COMMA",					// ,
	DOT = "DOT",						// .
	QUESTION_MARK = "QUESTION_MARK",	// ?
}

export const SYMBOL_MAP: Record<string, Symbol> = {
	'(': Symbol.L_PAREN,
	')': Symbol.R_PAREN,
	'[': Symbol.L_BRACK,
	']': Symbol.R_BRACK,
	'{': Symbol.L_CURLY,
	'}': Symbol.R_CURLY,
	',': Symbol.COMMA,
	'.': Symbol.DOT,
	'?': Symbol.QUESTION_MARK
}