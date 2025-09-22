export enum Keyword {
	// Default statements
	SELECT = "SELECT",
	INSERT = "INSERT",
	UPDATE = "UPDATE",
	DELETE = "DELETE",

	// Filtering data
	FROM = "FROM",
	WHERE = "WHERE",
	GROUP = "GROUP",
	HAVING = "HAVING",
	ORDER = "ORDER",
	LIMIT = "LIMIT",
	DESC = "DESC",
	ASC = "ASC",

	// Comparisons
	LIKE = "LIKE",

	// Others
	DISTINCT = "DISTINCT",
	AS = "AS",
	BY = "BY",

	IDENTIFIER = "IDENTIFIER"
}


export const KEYWORDS_MAP: Record<string, Keyword> = {
	"SELECT": Keyword.SELECT,
	"INSERT": Keyword.INSERT,
	"UPDATE": Keyword.UPDATE,
	"DELETE": Keyword.DELETE,

	"FROM": Keyword.FROM,
	"WHERE": Keyword.WHERE,
	"GROUP": Keyword.GROUP,
	"HAVING": Keyword.HAVING,
	"ORDER": Keyword.ORDER,
	"LIMIT": Keyword.LIMIT,
	"DESC": Keyword.DESC,
	"ASC": Keyword.ASC,

	"LIKE": Keyword.LIKE,

	"DISTINCT": Keyword.DISTINCT,
	"AS": Keyword.AS,
	"BY": Keyword.BY,

	"IDENTIFIER": Keyword.IDENTIFIER,
}