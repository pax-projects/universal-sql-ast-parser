export enum Literal {
	// Strings
	SINGLE_QUOTE = "SINGLE_QUOTE",			// 'abc'
	DOUBLE_QUOTE = "DOUBLE_QUOTE",			// "abc"
	ESCAPED = "ESCAPED",					// E'abc\n' (Postgres)
	DOLLAR_QUOTED = "DOLLAR_QUOTED",		// $$abc$$ (Postgres)
	ALT_QUOTED = "ALT_QUOTED",				// q'[abc]' (Oracle)
	UNICODE = "UNICODE",					// N'abc' (SQL Server)
	
	// Numbers
	INTEGER = "INTEGER",					// 42 or -42
	DECIMAL = "DECIMAL",					// 3.14
	SCIENTIFIC = "SCIENTIFIC",				// 1.2E10 or 1.2E-10
	HEX = "HEX",							// 0xFF, X'FF'
	BINARY = "BINARY",						// b'1010', 0b1010
	NAN = "NAN",							// NaN (Postgres)
	INFINITY = "INFINITY",					// Infinity (Postgres)

	// Booleans
	TRUE = "TRUE",
	FALSE = "FALSE",
	
	// Null
	NULL = "NULL",
	
	// Datetime
	DATE = "DATE",							// DATE '2025-09-20'
	TIME = "TIME",							// TIME '12:34:56'
	TIMESTAMP = "TIMESTAMP",				// TIMESTAMP '2025-09-20 12:34:56'
	INTERVAL = "INTERVAL",					// INTERVAL '1' DAY
	
	// Binary
	HEX_STRING = "HEX_STRING",				// X'ABCD' (SQLite, Postgres, MySQL)
	BYTE_ARRAY = "BYTE_ARRAY",				// 0xABCD (SQL Server)
	BLOB = "BLOB",							// BLOB '...' (Oracle, SQLite)
	
	// Specials
	UUID = "UUID",							// '550e8400-e29b-41d4-a716-446655440000' (Postgres, SQL Server)
	JSON = "JSON",							// '{ "a": 1 }'::json (Postgres, MySQL, SQLite)
	XML = "XML",							// '<a>1</a>'::xml (Postgres)
	UNIQUEIDENTIFIER = "UNIQUEIDENTIFIER",	// SQL Server uniqueidentifier
	RAW = "RAW",							// RAW '...' (Oracle)
	CLOB = "CLOB",							// CLOB '...' (Oracle)
}

export type LiteralType = string | number | null;