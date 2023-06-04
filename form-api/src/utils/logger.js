import pino from "pino";
import dayjs from "dayjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levels = {
	emerg: 80,
	alert: 70,
	crit: 60,
	error: 50,
	warn: 40,
	notice: 30,
	info: 20,
	debug: 10,
};

const log = pino({
	level: "info",
	customLevels: levels,
	useOnlyCustomLevels: true,
	transport: {
		pipeline: [
			{
				target: "pino-pretty",
				options: {
					colorize: true,
					ignore: "pid",
					colorizeObjects: true,
					translateTime: "SYS:yyyy-mm-dd hh:MM:ss",
				},
			},
			{
				target: "pino/file",
				options: {
					destination: `${__dirname}/../../logs/app.log`,
				},
			},
		],
	},
	formatters: {
		bindings: (bindings) => {
			return {
				pid: bindings.pid,
				host: bindings.hostname,
				node_version: process.version,
			};
		},
		level: (label) => {
			return { level: label.toUpperCase() };
		},
	},
	timestamp: () => `,"timestamp":"${dayjs().format("DD-MM-YYYY:hh:mm:ss A")}"`,
});

export default log;
