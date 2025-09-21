import { Lexer } from "./lexer/Lexer.js";
// import { Parser } from "./parser/Parser";

const lexer: Lexer = new Lexer('SELECT * FROM tables WHERE (x > 18 AND y < -5);');

const tokens = lexer.scan();

tokens
.map(token => token.toString())
.forEach(tokenString => console.log(tokenString));
