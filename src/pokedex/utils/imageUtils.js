export function getImagesFromProfile(imagesArr, matchingKey) {
  //It will return a object which contain key and images array connected to that key
  var imagesData = {
    images: null,
    imageList: []
  };
  imagesArr.filter(item => {
    if (item.imageType === `${matchingKey}`) {
      imagesData = item;
    }
    return false;
  });
  return imagesData;
}
