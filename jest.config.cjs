module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust this if you have absolute imports like "@/utils/CartDb"
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Use ts-jest to process TypeScript files
  },
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)", // Matches files ending with .test.ts or .spec.ts
  ],
};
