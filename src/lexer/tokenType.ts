enum KeywordToken {
	SELECT,
	INSERT,
	UPDATE,
	DELETE,
	DISTINCT,
	FROM,
	WHERE,
	GROUP_BY,
	HAVING,
	ORDER_BY,
	LIMIT,
	INDENTIFIER
};

enum ComparatorToken {
	EQ,
	GT,
	LT,
	GTE,
	LTE,
	NEQ,
	DIFF,
};

enum LogicalOperatorToken {
	AND,
	OR
}

enum ArithmeticOperatorToken {
	PLUS,
	HYPHEN,
	SLASH,
	START,
};

enum LiteralToken {
	QUOTED_STR,
	APOSTROPHED_STR,
	NUMBER
};

enum SymbolToken {
	L_PAREN,
	R_PAREN,
	L_BRACK,
	R_BRACK,
	L_CURLY,
	R_CURLY,
	COMMA,
	DOT,
	WTF,
};

enum FileToken {
	EOF
}

type TokenType =
| KeywordToken
| ComparatorToken
| LogicalOperatorToken
| ArithmeticOperatorToken
| LiteralToken
| SymbolToken
| FileToken;

export {
	KeywordToken,
	ComparatorToken,
	LogicalOperatorToken,
	ArithmeticOperatorToken,
	LiteralToken,
	SymbolToken,
	FileToken,
	type TokenType
};
