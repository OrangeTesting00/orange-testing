export default (timeMS) => new Promise(resolve => {
  setTimeout(resolve, timeMS)
});