export enum Literal {
	// Strings
	SINGLE_QUOTE,        // 'abc'
	DOUBLE_QUOTE,		 // "abc"
	ESCAPED,             // E'abc\n' (Postgres)
	DOLLAR_QUOTED,       // $$abc$$ (Postgres)
	ALT_QUOTED,          // q'[abc]' (Oracle)
	UNICODE,             // N'abc' (SQL Server)
	
	// Numbers
	INTEGER,             // 42 or -42
	DECIMAL,             // 3.14
	SCIENTIFIC,          // 1.2E10 or 1.2E-10
	HEX,                 // 0xFF, X'FF'
	BINARY,              // b'1010', 0b1010
	NAN,                 // NaN (Postgres)
	INFINITY,            // Infinity (Postgres)

	// Booleans
	TRUE,
	FALSE,
	
	// Null
	NULL,
	
	// Datetime
	DATE,                // DATE '2025-09-20'
	TIME,                // TIME '12:34:56'
	TIMESTAMP,           // TIMESTAMP '2025-09-20 12:34:56'
	INTERVAL,            // INTERVAL '1' DAY
	
	// Binary
	HEX_STRING,          // X'ABCD' (SQLite, Postgres, MySQL)
	BYTE_ARRAY,          // 0xABCD (SQL Server)
	BLOB,                // BLOB '...' (Oracle, SQLite)
	
	// Specials
	UUID,                // '550e8400-e29b-41d4-a716-446655440000' (Postgres, SQL Server)
	JSON,                // '{ "a": 1 }'::json (Postgres, MySQL, SQLite)
	XML,                 // '<a>1</a>'::xml (Postgres)
	UNIQUEIDENTIFIER,    // SQL Server uniqueidentifier
	RAW,                 // RAW '...' (Oracle)
	CLOB,                // CLOB '...' (Oracle)
}