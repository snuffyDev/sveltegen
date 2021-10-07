//ts import { EndpointOutput, RequestHandler } from "@sveltejs/kit/types/endpoint";

export const get: RequestHandler = async (request): Promise<EndpointOutput> => {
	const body = request.query.toString();
	return {
		body,
		status: 200
	};
};
