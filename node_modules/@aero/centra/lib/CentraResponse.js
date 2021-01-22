module.exports = class CentraResponse {

	constructor(res) {
		this.coreRes = res;
		this.body = Buffer.alloc(0);

		this.headers = res.headers;
		this.statusCode = res.statusCode;
	}

	_addChunk(chunk) {
		this.body = Buffer.concat([this.body, chunk]);
	}

	get json() {
		return JSON.parse(this.body);
	}

	get text() {
		return this.body.toString();
	}

};
