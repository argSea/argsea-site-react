interface iProject {
  projectID: string;
  userIDs: string[];
  projectType: string;
  name: string;
  shortName: string;
  createdDate: string;
  updatedDate: string;
  publishedDate: string;
  icon: string;
  images: {
    order: number;
    image: {
      src: string;
      alt: string;
    };
  }[];
  slug: string;
  repoURL: string;
  description: string;
  shortDescription: string;
  skills: string[];
  roles: string[];
  priority: number;
  progress: number;
  isHidden: boolean;
  isActive: boolean;
  isReleased: boolean;
  bookID: string;
  relatedCourse: string;
  relatedExperience: [];
  links: {
    type: string;
    text: string;
    url: string;
  }[];
  snippets: string[];
  features: string[];
}

export default iProject;
