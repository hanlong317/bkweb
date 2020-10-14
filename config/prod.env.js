module.exports = {
	NODE_ENV: process.env.NODE_ENV === 'production' ? '"production"'
		: process.env.NODE_ENV === 'pr' ? '"pr"'
			: process.env.NODE_ENV === 'qa' ? '"qa"'
				: process.env.NODE_ENV === 'dev' ? '"dev"'
					: '""',
}
