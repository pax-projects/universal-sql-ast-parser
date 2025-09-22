export class Logger {
	static readonly #RESET: string = "\x1b[0m";
	static readonly #BLUE: string = "\x1b[38;5;33m";
	static readonly #BLUE_DARK: string = "\x1b[38;5;25m";
	static readonly #GREEN: string = "\x1b[38;5;34m";
	static readonly #GREEN_DARK: string = "\x1b[38;5;22m";
	static readonly #ORANGE: string = "\x1b[38;5;221m";
	static readonly #ORANGE_DARK: string = "\x1b[38;5;136m";
	static readonly #RED: string = "\x1b[38;5;196m";
	static readonly #RED_DARK: string = "\x1b[38;5;124m";
	static readonly #GREY: string = "\x1b[38;5;250m";
	static readonly #GREY_DARK: string = "\x1b[38;5;245m";

	#lightColor: string = "";
	#darkColor: string = "";

	#fileName: string;
	// #lineNumber: number;
	// #columnNumber: number;

	constructor() {
		const err = new Error();
		const line = err.stack?.split('\n')[2];

		const temp = line?.substring(line?.indexOf("C:"), line?.length).split(':');
		if (!temp) {
			this.#fileName = "unknown";
			// this.#lineNumber = 0;
			// this.#columnNumber = 0;

			return;
		}

		this.#fileName = `C:${temp[1]}`;
		// this.#lineNumber = Number(temp[2]);
		// this.#columnNumber = Number(temp[3]);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	info(message: any) {
		this.#lightColor = Logger.#BLUE;
		this.#darkColor = Logger.#BLUE_DARK;
		this.#logInternal(message, "Info");
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	success(message: any) {
		this.#lightColor = Logger.#GREEN;
		this.#darkColor = Logger.#GREEN_DARK;
		this.#logInternal(message, "Success");
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	warn(message: any) {
		this.#lightColor = Logger.#ORANGE;
		this.#darkColor = Logger.#ORANGE_DARK;
		this.#logInternal(message, "Warning");
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error(message: any) {
		this.#lightColor = Logger.#RED;
		this.#darkColor = Logger.#RED_DARK;
		this.#logInternal(message, "Error");
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	log(message: any) {
		this.#lightColor = Logger.#GREY;
		this.#darkColor = Logger.#GREY_DARK;
		this.#logInternal(message, "Log");
	}

	#reset() {
		this.#lightColor = Logger.#RESET;
		this.#darkColor = Logger.#RESET;
		console.log();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#logInternal(message: any, keyword: string) {
		let lines: string[] = ["null"];

		
		if (typeof message === "object") {
			try {
				lines = JSON.stringify(message, null, "\t").split("\n");
			} catch {
				lines = ["[Object: cannot stringify]"];
			}
		} else {
			lines = message.toString().split('\n');
		}

		// (${this.#lineNumber}:${this.#columnNumber})
		lines.unshift(`${Logger.#GREY_DARK}@ ${this.#fileName}${Logger.#RESET}`, '');

		// eslint-disable-next-line no-control-regex
		const width = Math.max(...lines.map((l) => l.replace(/\x1b\[[0-9;]*m/g, '').length));

		const borderTop =
			`${this.#lightColor}[${keyword}] ╔` +
			"═".repeat(width + 2) +
			`${this.#lightColor}╗` +
			Logger.#RESET;

		const borderBot =
			`${this.#darkColor}[${keyword}] ${this.#lightColor}╚` +
			"═".repeat(width + 2) +
			`${this.#lightColor}╝` +
			Logger.#RESET;

		console.log(borderTop);
		for (const line of lines) {
			console.log(
				`${this.#darkColor}[${keyword}] ${this.#lightColor}║${Logger.#RESET} ` +
				line.padEnd(width, " ") +
				`${this.#lightColor} ║`
			);
		}
		console.log(borderBot);

		this.#reset();
	}
}
