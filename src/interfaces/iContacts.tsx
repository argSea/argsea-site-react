interface SimpleImage {
  src: string;
  alt: string;
}

interface iContacts {
  id: string;
  name: string;
  link: string;
  icon: SimpleImage;
}

export default iContacts;
