type func = () => void;
type funcProps = (prop: any) => void;
type func2Props = (prop: any, prop2: any) => void;
type funcEvent = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
type navTypes = {
  isShowNavBar: boolean;
  onToggleNavbar: func;
  user: any;
  isAuthenticated: boolean;
  openMenuCategory: string;
  onToggleOpenMenuCategory: any;
  convertHeader: any;
  isMobile: boolean;
};
type MenuGenresAndRegions = {
  category: string[] | number[] | null;
  regions: string[] | number[] | null;
  typeMovie: string[] | number[] | null;
};
type popup = {
  sharePopup: string;
  trailerPopup: string;
  packages: string;
};

type comment = [
  {
    id: number;
    uid: string;
    slug: string;
    date: string;
    name: string;
    content: string;
    avatar: string;
    likes: number;
    usersLike: string | any;
    repComments: any;
  }
];
type itemComment = {
  id: number;
  uid: string;
  slug: string;
  date: string;
  name: string;
  content: string;
  avatar: string;
  usersLike: string | any;
  repComments: any;
  likes: number;
};
