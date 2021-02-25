module.exports = {
  preset: 'ts-jest',
  //testEnvironment: 'node',
  bail: true, //se algum dos testes falhar não dá continuidade
  clearMocks: true,
  coverageProvider: "v8",
  

  //testEnvironment: "node"
  testMatch:[
    "**/__tests__/*.test.ts"
  ],
  
};