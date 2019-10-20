/*
  To Filter Out the search data with given values.
  @params Data object, Search value
*/
export const performSearch = (data, value) =>{
  if (data && data.results && data.results.length>0){
    let dataArray = data.results;
    let searchedValues = dataArray.filter(item=>{
      return item.name.includes(value);
    });
    return searchedValues;
  }
}

export const getLastSegmentFromUrl = (url) =>{
  if(url){
    let urlArray = url.split('/');
    let lastSegment = urlArray[urlArray.length - 1];
    return lastSegment;
  }
}
export const timeDifference = (date) =>{
  var _date = new Date(date).getTime();
  var OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)
  if (OneDay > _date) {
    return false;
  } else if (OneDay < _date) {
    return true;
  }
}