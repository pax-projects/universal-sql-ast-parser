/* eslint-disable @typescript-eslint/no-unused-vars */
import { Lexer } from "./lexer/Lexer.js";
import { Logger } from "./utils/Logger.js";

import { Parser } from "./parser/Parser.js";

// const lexer: Lexer = new Lexer('SELECT * FROM tables WHERE (x > 18.75 AND y < -5);');
const lexer: Lexer = new Lexer('SELECT id, name, COUNT(*) AS c FROM users u WHERE age >= 18 AND (name LIKE "A%" OR city = "Paris") ORDER BY c DESC LIMIT 10;');
const tokens = lexer.scan();

const logger = new Logger();

logger.log(
	tokens
	.map(token => token.toString())
	.join('\n')
);

// logger.success("Compiled successfuly!");