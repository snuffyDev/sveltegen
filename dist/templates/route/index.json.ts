//ts import { EndpointOutput, ServerRequest } from "@sveltejs/kit/types/endpoint";
type ServerRequest = {
	method: string;
	host: string;
	path: string;
	query: URLSearchParams;
};
type EndpointOutput =
	| string
	| number
	| boolean
	| null
	| EndpointOutput[]
	| { [key: string]: EndpointOutput };
export const get = async (request: ServerRequest): Promise<EndpointOutput> => {
	const body = request.query.toString();
	return {
		body,
		status: 200
	};
};
