

const requestPromise = jest.genMockFromModule('request-promise');

// requestPromise.constructor = async (options) => {
//   console.log(111111);
//   return 'test11';
// };


module.exports = requestPromise;
