function getRandomNumber(min, max){
  if (min < 0 || min >= max){
    throw{name : 'Invalid arguments', message : 'Invalid arguments'};
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkStringLength(string, maxLength){
  string = String(string);
  return string.length <= maxLength;
}

const Messages = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

const Names = [
  "Влад",
  "Саша",
  "Влада",
  "Настя",
  "Вова",
  "Лиза",
  "Аня",
  "Кирилл"
];

const Description = [
  "Это я",
  "Крутое место",
  "Очень красиво",
  "Крутяк"
];

const photosCount = 25;

function createPhotoObjects(count){
  let photos = [];
  for (let i = 0; i < count; i++){
    photos[i] = createPhotoObject(i);
  }
  return photos;
}

function createPhotoObject(id){
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: Description[getRandomNumber(0, Description.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: createComments(id)
  };
}

function createComments(id){
  let maxCom = 6;
  let count = getRandomNumber(1, maxCom);
  let comments = [];
  let comId = id * maxCom;
  for (let i = 0; i < count; i++){
    comments[i] = {
      id: comId,
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: Messages[getRandomNumber(0, Messages.length - 1)],
      name: Names[getRandomNumber(0, Names.length - 1)]
    };
    comId++;
  }
  return comments;
}

console.log(createPhotoObjects(photosCount));
