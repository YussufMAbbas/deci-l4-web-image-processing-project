export default {
    spec_dir: "dist/tests",
    spec_files: ["**/*[sS]pec.?(m)js"],
    helpers: ["helpers/**/*.?(m)js"],
    env: {
        stopSpecOnExpectationFailure: false,
        random: true,
        forbidDuplicateNames: true,
    },
};
