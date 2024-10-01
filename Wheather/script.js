const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6683448fc2msh09751d777a0709bp14d631jsn666aa1385244',
		'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = fetch(url, options);
	console.log(response);
} catch (error) {
	console.error(error);
}