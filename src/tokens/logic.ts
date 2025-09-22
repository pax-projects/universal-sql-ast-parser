export enum LogicalOperator {
	AND = "AND",
	OR = "OR",
}

export const LOGICAL_OPERATORS_MAP: Record<string, LogicalOperator> = {
	'AND': LogicalOperator.AND,
	'OR': LogicalOperator.OR,
}