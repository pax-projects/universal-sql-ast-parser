export enum Symbol {
	L_PAREN = "L_PAREN",  			 	// (
	R_PAREN = "R_PAREN",  			 	// )
	L_BRACK = "L_BRACK",  			 	// [
	R_BRACK = "R_BRACK",  			 	// ]
	L_CURLY = "L_CURLY",  			 	// {
	R_CURLY = "R_CURLY",  			 	// }
	COMMA = "COMMA",					// ,
	SEMI_COLON = "SEMI_COLON",			// ;
	DOT = "DOT",						// .
	QUESTION_MARK = "QUESTION_MARK",	// ?
	STAR_MUL = "STAR_MUL",				// * (All or Multiplication)
}

export const SYMBOL_MAP: Record<string, Symbol> = {
	'(': Symbol.L_PAREN,
	')': Symbol.R_PAREN,
	'[': Symbol.L_BRACK,
	']': Symbol.R_BRACK,
	'{': Symbol.L_CURLY,
	'}': Symbol.R_CURLY,
	',': Symbol.COMMA,
	';': Symbol.SEMI_COLON,
	'.': Symbol.DOT,
	'?': Symbol.QUESTION_MARK,
	'*': Symbol.STAR_MUL
}