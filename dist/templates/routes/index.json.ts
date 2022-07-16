///@ts-expect-error These types
import type { EndpointOutput, RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async (request): Promise<EndpointOutput> => {
	const body = request.query.toString();
	return {
		body,
		status: 200
	};
};
