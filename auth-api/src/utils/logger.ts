import logger from "pino";
import dayjs from "dayjs";
import config from "config";

const logLevel = config.get("logLevel") as string;
const log = logger({
	transport: {
		target: "pino-pretty",
	},
	logLevel,
	base: {
		pid: false,
	},
	timestamp: () => `, "time": "${dayjs().format("DD-MM-YYYY:mm:ss A")}"`,
});

export default log;
