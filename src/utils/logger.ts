import Logger from "https://deno.land/x/logger@v1.1.3/logger.ts";

const logger = new Logger();

await logger.initFileLogger('./log', {
    rotate: true,
});

// logger.disableConsole();

export default logger;
