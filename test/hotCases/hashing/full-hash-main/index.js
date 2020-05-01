import "./module";

const getFile = name =>
	__non_webpack_require__("fs").readFileSync(
		__non_webpack_require__("path").join(__dirname, name),
		"utf-8"
	);

it("should generate the main file and change full hash on update", done => {
	const hash1 = __webpack_hash__;
	expect(getFile("bundle.js")).toContain(hash1);
	module.hot.accept("./module", () => {
		const hash2 = __webpack_hash__;
		expect(hash1).toBeTypeOf("string");
		expect(hash2).not.toBe(hash1);
		expect(getFile("bundle.js")).toContain(hash2);
		expect(getFile("bundle.js")).not.toContain(hash1);
		done();
	});
	NEXT(require("../../update")(done));
});
