module.exports = (fish) => ({
	'post ': fish.$ctrl.login.index,
	'post /token': fish.$ctrl.login.token,
})
