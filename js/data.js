import {getRandomNumber} from './util.js';

const Messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const Names = [
  'Влад',
  'Саша',
  'Влада',
  'Настя',
  'Вова',
  'Лиза',
  'Аня',
  'Кирилл'
];

const Description = [
  'Это я',
  'Крутое место',
  'Очень красиво',
  'Крутяк'
];

const photosCount = 25;

function createPhotoObjects(){
  const photos = [];
  for (let i = 0; i < photosCount; i++){
    photos[i] = createPhotoObject(i);
  }
  return photos;
}

function createPhotoObject(id){
  return {
    id: id,
    url: `photos/${id + 1}.jpg`,
    description: Description[getRandomNumber(0, Description.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: createComments(id)
  };
}

function createComments(id){
  const maxCom = 6;
  const count = getRandomNumber(1, maxCom);
  const comments = [];
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

export {createPhotoObjects};
