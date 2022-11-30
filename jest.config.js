module.exports = {
    "testMatch": [
        "<rootDir>/**/*.tests.ts",
    ],
    "testPathIgnorePatterns": [
        "/node_modules/",
    ],
    "transform": {
        "\\.ts$": "ts-jest",
    },
}