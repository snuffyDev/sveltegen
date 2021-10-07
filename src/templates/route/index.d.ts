interface IncomingRequest {
	method: string;
	host: string;
	path: string;
	query: URLSearchParams;
}

type DefaultBody = JSONString | Uint8Array;

interface EndpointOutput<Body extends DefaultBody = DefaultBody> {
	status?: number;
	headers?: ResponseHeaders;
	body?: Body;
}
interface ServerRequest<Locals = Record<string, any>, Body = unknown>
	extends IncomingRequest {
	params: Record<string, string>;
	body: any;
	locals: Locals;
}
type MaybePromise<T> = T | Promise<T>;
interface RequestHandler<
	Locals = Record<string, any>,
	Input = unknown,
	Output extends DefaultBody = DefaultBody
> {
	(request: ServerRequest<Locals, Input>): MaybePromise<void | EndpointOutput<
		Output
	>>;
}

type ResponseHeaders = Record<string, string | string[]>;

type JSONString =
	| string
	| number
	| boolean
	| null
	| JSONString[]
	| { [key: string]: JSONString };
