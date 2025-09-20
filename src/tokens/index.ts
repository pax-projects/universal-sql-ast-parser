import { Keyword } from "./keyword.js";
import { ArithmeticOperator } from "./arithmetic.js";
import { Comparator } from "./comparator.js";
import { LogicalOperator } from "./logic.js";
import { Symbol } from "./symbol.js";
import { Literal } from "./literal.js";
import { FileControl } from "./fileControl.js";

export {
	Keyword,
	ArithmeticOperator,
	Comparator,
	LogicalOperator,
	Symbol,
	Literal,
	FileControl,
}

export type Type =
	| Keyword
	| Comparator
	| LogicalOperator
	| ArithmeticOperator
	| Symbol
	| Literal
	| FileControl;
