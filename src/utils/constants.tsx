import { v4 as uuid } from 'uuid';
import {
  FaRankingStar,
  MdLocalMovies,
  RiGlobalLine,
  RiMovie2Line,
  FaFacebookSquare,
  FaGithubSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from '@/utils/icons';
export const statusMovie = [
  { id: uuid(), status: 'ongoing' },
  { id: uuid(), status: 'completed' },
];
export const navHeader = [
  { id: uuid(), name: 'Loại Phim', path: '/loai-phim', category: [], Icon: RiMovie2Line },
  { id: uuid(), name: 'Thể loại', path: '/the-loai', category: [], Icon: MdLocalMovies },
  { id: uuid(), name: 'quốc gia', path: '/quoc-gia', category: [], Icon: RiGlobalLine },
  { id: uuid(), name: 'top phim', path: '/top-phim', category: [], Icon: FaRankingStar },
];
export const popup: popup = {
  sharePopup: 'sharePopup',
  trailerPopup: 'trailerPopup',
  packages: 'packages',
};

export const typeToast = {
  error: 'error',
  success: 'success',
};

export const aboutUs = [
  { id: uuid(), name: 'FAQ', path: '' },
  { id: uuid(), name: 'TRUNG TÂM TRỢ GIÚP', path: '' },
  { id: uuid(), name: 'ĐIỀU KHOẢN', path: '' },
  { id: uuid(), name: 'CHÍNH SÁCH', path: '' },
];
export const aboutIcon = [
  { id: uuid(), icon: FaFacebookSquare, path: 'https://www.facebook.com/' },
  { id: uuid(), icon: FaGithubSquare, path: 'https://github.com/' },
  { id: uuid(), icon: FaTwitterSquare, path: 'https://x.com/' },
  { id: uuid(), icon: FaInstagramSquare, path: 'https://www.instagram.com/' },
];

export const comboList = [
  {
    id: uuid(),
    title: '1 tháng',
    discountMoney: '200.000.000 vnd',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus fugiat aliquam laboriosam architecto sunt enim? Minus natus dignissimos error architecto facere dolor maxime. Itaque ab quisquam harum at accusamus tempora.',
    defaultMoney: '300.000.000 vnd',
  },
  {
    id: uuid(),
    title: '7 tháng',
    discountMoney: '1.200.000.000 vnd',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus fugiat aliquam laboriosam architecto sunt enim? Minus natus dignissimos error architecto facere dolor maxime. Itaque ab quisquam harum at accusamus tempora.',
    defaultMoney: '1.700.000.000 vnd',
  },
  {
    id: uuid(),
    title: '1 năm',
    discountMoney: '2.000.000.000 vnd',
    desc: 'Lorem ipsum dolor sit amet,adipisicing elit Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit fugit maiores distinctio aliquid perferendis iusto harum porro odio voluptatem at soluta exercitationem nostrum dicta ratione hic recusandae assumenda, sit nihil.. Delectus fugiat aliquam laboriosam architecto sunt enim? Minus natus dignissimos error architecto facere dolor maxime. Itaque ab quisquam harum at accusamus tempora.',
    defaultMoney: '3.300.000.000 vnd',
  },
];
