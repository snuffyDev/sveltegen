​

export const get​ = async (request)​ => {
	const body = request.query.toString();
	return {
		body,
		status: 200
	};
};
