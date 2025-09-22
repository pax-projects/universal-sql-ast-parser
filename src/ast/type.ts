/* eslint-disable @typescript-eslint/no-unused-vars */
import * as TokenCategory from "../tokens/index.js";
import { type NumberType } from "../tokens/literal.js";

interface SourceLocation {
	start: number;
	end: number;
}

export interface ASTNode<K extends string = string> {
	kind: K;
	loc?: SourceLocation;
}

type Identifier = {
	name: string;
	alias?: string
};

/************************************************************/
/* STATEMENTS                                               */
/************************************************************/
export type Statement =
| SelectStatement
| InsertStatement
| UpdateStatement
| DeleteStatement;

export interface SelectStatement extends ASTNode<'SelectStatement'> {
	distinct?: 	boolean;
	columns: 	readonly (ColumnExpression & { alias?: string })[];
	from?: 		readonly (TableRef | Subquery)[];
	where?: 	Expression;
	groupBy?: 	RowExpression;
	having?: 	Expression;
	orderBy?: 	readonly { expr: Expression; desc?: boolean }[];
	limit?: 	number | TokenCategory.Literal;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InsertStatement extends ASTNode<"InsertStatement"> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateStatement extends ASTNode<"UpdateStatement"> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteStatement extends ASTNode<"DeleteStatement"> {}

// Subqueries
export interface Subquery extends ASTNode<"Subquery"> {
	statement: SelectStatement;
	alias?: string;
}

/************************************************************/
/* REFERENCES                                               */
/************************************************************/
export interface SchemaRef extends ASTNode<"SchemaRef"> {
	name: string;
	alias?: string;
}

export interface TableRef extends ASTNode<"TableRef"> {
	name: string;
	schemaRef?: SchemaRef;
	alias?: string;
}

export interface ColumnRef extends ASTNode<"ColumnRef"> {
	name: string;
	tableRef?: TableRef;
	alias?: string;
}

/************************************************************/
/* FUNCTIONS                                                */
/************************************************************/
export interface UnaryFunction extends ASTNode<"UnaryFunction"> {
	expr: Expression;
}

export interface BinaryFunction extends ASTNode<"BinaryFunction"> {
	exprLeft: Expression;
	exprRight: Expression;
}

export interface TernaryFunction extends ASTNode<"TernaryFunction"> {
	expr: readonly [Expression, Expression, Expression];
}

export interface FunctionCall extends ASTNode<"FunctionCall"> {
	args: RowExpression;
	filterClause?: FilterClause;
	overClause?: OverClause;
}

export interface CastFunction extends ASTNode<"Cast"> {
	expr: Expression;
	typeName: TypeName; // TODO
}

export interface LikeFunction extends ASTNode<"Like"> {
	exprLeft: Expression;
	exprRight: Expression;
	isNegate?: boolean;
	escape?: Expression;
}

export interface GlobFunction extends ASTNode<"Glob"> {
	exprLeft: Expression;
	exprRight: Expression;
	isNegate?: boolean;
}

export interface RegexpFunction extends ASTNode<"Regexp"> {
	exprLeft: Expression;
	exprRight: Expression;
	isNegate?: boolean;
}

export interface MatchFunction extends ASTNode<"Match"> {
	exprLeft: Expression;
	exprRight: Expression;
	isNegate?: boolean;
}

export interface IsNullFunction extends ASTNode<"IsNull"> {
	expr: Expression;
}

export interface NotNullFunction extends ASTNode<"NotNull"> {
	expr: Expression;
}

export interface IsFunction extends ASTNode<"Is"> {
	exprLeft: Expression;
	exprRight: Expression;
	isNegate?: boolean;
	isDistinctedFrom?: boolean;
}

export interface BetweenFunction extends ASTNode<"Between"> {
	expr: Expression;		// value BETWEEN low AND high
	low: Expression;
	high: Expression;
	isNegate?: boolean;
}

export interface InFunction extends ASTNode<"In"> {
	isNegate?: boolean;
	values?: RowExpression;						// IN (1,2,3) case
	select?: SelectStatement | Subquery;		// IN (SELECT ...)
}

export interface ExistsFunction extends ASTNode<"Exists"> {
	isNegate?: boolean;
	statement: SelectStatement;
}

export interface CaseFunction extends ASTNode<"Case"> {
	base?: Expression;
	whens: readonly ({when: Expression, then: Expression})[];
	else?: Expression;
	isNegate?: boolean;
}

export interface CollateFunction extends ASTNode<"CollateFunction"> {
	collationName: CollationName;
}

// Raising function
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RaiseIgnore extends ASTNode<"RaiseIgnore"> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RaiseRollback extends ASTNode<"RaiseRollback"> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RaiseAbort extends ASTNode<"RaiseAbort"> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RaiseFail extends ASTNode<"RaiseFail"> {}


export type RaiseFunctions = RaiseIgnore | RaiseRollback | RaiseAbort | RaiseFail;

export type Functions =
| UnaryFunction
| BinaryFunction
| TernaryFunction
| FunctionCall
| CastFunction
| LikeFunction
| GlobFunction
| RegexpFunction
| MatchFunction
| IsNullFunction
| NotNullFunction
| IsFunction
| BetweenFunction
| InFunction
| ExistsFunction
| CaseFunction
| CollateFunction
| RaiseFunctions;

/************************************************************/
/* OPERATORS                                                */
/************************************************************/
export interface UnaryOp extends ASTNode<"UnaryOp"> {
	operator: string;
	expr:  Expression;
}

export interface BinaryOp extends ASTNode<"BinaryOp"> {
	operator: string;
	exprLeft:  Expression;
	exprRight:  Expression;
}


/************************************************************/
/* CLAUSES                                                  */
/************************************************************/
export interface FilterClause extends ASTNode<"FilterClause"> {
	where: Expression;
}

// TODO
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OverClause extends ASTNode<"OverClause"> {}

/************************************************************/
/* OTHERS                                                   */
/************************************************************/
export interface TypeName extends ASTNode<"TypeName"> {
	name: string;
	signedNumbers: readonly [NumberType?, NumberType?];
}

export interface CollationName extends ASTNode<"CollationName"> {
	name: string;
}
/************************************************************/
/* EXPRESSIONS                                              */
/************************************************************/
type ColumnExpression = ColumnRef | Subquery | TokenCategory.Literal | FunctionCall | BinaryOp;

export interface RowExpression extends ASTNode<"RowExpression"> {
	elems: readonly Expression[];
}

export type Expression = 
| TokenCategory.Literal
| ColumnRef
| UnaryOp
| BinaryOp
| FunctionCall
| RowExpression
| LikeFunction
| GlobFunction
| RegexpFunction
| MatchFunction
| IsNullFunction
| NotNullFunction
| IsFunction
| BetweenFunction
| InFunction
| ExistsFunction
| CaseFunction
| RaiseFunctions
| CollateFunction;
