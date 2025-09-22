export enum SqlFunction {
	COUNT = "COUNT",        // COUNT(expr)
	SUM = "SUM",            // SUM(expr)
	AVG = "AVG",            // AVG(expr)
	MIN = "MIN",            // MIN(expr)
	MAX = "MAX",            // MAX(expr)
	UPPER = "UPPER",        // UPPER(str)
	LOWER = "LOWER",        // LOWER(str)
	LENGTH = "LENGTH",      // LENGTH(str)
	TRIM = "TRIM",          // TRIM(str)
	ROUND = "ROUND",        // ROUND(num, decimals)
	ABS = "ABS",            // ABS(num)
	COALESCE = "COALESCE",  // COALESCE(expr, ...)
	IFNULL = "IFNULL",      // IFNULL(expr, alt) (MySQL)
	NOW = "NOW",            // NOW()
	DATE = "DATE",          // DATE(expr)
	CAST = "CAST",          // CAST(expr AS type)
	CONCAT = "CONCAT",      // CONCAT(a, b, ...)
	SUBSTRING = "SUBSTRING" // SUBSTRING(str, start, length)
}

export const FUNCTION_MAP: Record<string, SqlFunction> = {
	"COUNT": SqlFunction.COUNT,
	"SUM": SqlFunction.SUM,
	"AVG": SqlFunction.AVG,
	"MIN": SqlFunction.MIN,
	"MAX": SqlFunction.MAX,
	"UPPER": SqlFunction.UPPER,
	"LOWER": SqlFunction.LOWER,
	"LENGTH": SqlFunction.LENGTH,
	"TRIM": SqlFunction.TRIM,
	"ROUND": SqlFunction.ROUND,
	"ABS": SqlFunction.ABS,
	"COALESCE": SqlFunction.COALESCE,
	"IFNULL": SqlFunction.IFNULL,
	"NOW": SqlFunction.NOW,
	"DATE": SqlFunction.DATE,
	"CAST": SqlFunction.CAST,
	"CONCAT": SqlFunction.CONCAT,
	"SUBSTRING": SqlFunction.SUBSTRING
};
