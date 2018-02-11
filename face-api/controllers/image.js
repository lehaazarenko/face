const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: 'ec693acbff4041fe89533fb23d1e10c0'
});

const handleApiCall = (req, res, db) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with api'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		return res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Error getting entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}