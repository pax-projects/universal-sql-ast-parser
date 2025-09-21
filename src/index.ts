import { Lexer } from "./lexer/Lexer.js";
import { Logger } from "./utils/Logger.js";
// import { Parser } from "./parser/Parser";

const lexer: Lexer = new Lexer('SELECT * FROM tables WHERE (x > 18 AND y < -5);');

const tokens = lexer.scan();

const logger = new Logger();

logger.info(
	tokens
	.map(token => token.toString())
	.join('\n')
);
