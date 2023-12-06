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
  links: string[];
  snippets: string[];
  features: string[];
}

export default iProject;
