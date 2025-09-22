export enum ArithmeticOperator {
	PLUS = "PLUS",
	MINUS = "MINUS",
	DIVIDE = "DIVIDE",
	MULTIPLY = "MULTIPLY",
	MODULO = "MODULO",
}

export const ARITHMETIC_OPERATORS_MAP: Record<string, ArithmeticOperator> = {
	'+': ArithmeticOperator.PLUS,
	'-': ArithmeticOperator.MINUS,
	'/': ArithmeticOperator.DIVIDE,
	'*': ArithmeticOperator.MULTIPLY,
	'%': ArithmeticOperator.MODULO
}