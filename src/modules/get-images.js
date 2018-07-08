// Eating
import hotStove from '../assets/images/hot-stove.jpg';
import bacon from '../assets/images/bacon.jpg';
import toast from '../assets/images/toast.jpg';
import strawberry from '../assets/images/strawberry.jpg';
import bowl from '../assets/images/bowl.jpg';
import chair from '../assets/images/chair.jpg';

// Feelings

import angry from '../assets/images/angry.jpg';
import crying from '../assets/images/crying.jpg';
import sad from '../assets/images/sad.jpg';
import stomacheAche from '../assets/images/stomache-ache.jpg';
import sick from '../assets/images/sick.jpg';

// animals

import dog from '../assets/images/dog.jpg';
import horse from '../assets/images/horse.jpg';

// Activies

import birthday from '../assets/images/birthday.jpg';
import afternoon from '../assets/images/afternoon.jpg';
import television from '../assets/images/television.jpg';
import bowling from '../assets/images/bowling.jpg';
import tablet from '../assets/images/tablet.jpg';

// Body
import knee from '../assets/images/knee.jpg';
import shirt from '../assets/images/shirt.jpg';

// This module is currently replacing an API call to the database


const categories = {
  eating: [bowl, bacon, strawberry, hotStove, chair, toast],
  activies: [birthday, afternoon, television, bowling, tablet],
  feelings: [angry, sick, sad, stomacheAche, crying],
  other: [knee, shirt, dog, horse],
};

const fetchImages = ({ category }) => categories[category];


export default fetchImages;
