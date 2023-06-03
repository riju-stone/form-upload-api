export default {
	port: 3010,
	logLevel: "info",
	apiVersion: "v1",
	dbUrl: `mongodb+srv://${process.env.DB_ADMIN_USER}:${process.env.DB_ADMIN_PASSWORD}@cluster0.xgfzi.mongodb.net/test`,
};
