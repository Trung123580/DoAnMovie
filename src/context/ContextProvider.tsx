'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider, twitterProvider } from '@/app/fireBase-config';
import { signInWithRedirect, signInWithPopup, getRedirectResult, signOut } from 'firebase/auth';
import Cookies from 'universal-cookie';
import { doc, collection, getDocs, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { getCategoryAndRegions } from '@/service';
import { toast } from 'react-toastify';
import { typeToast } from '@/utils/constants';
const ContextApp = createContext({});
const expirationDate = new Date();
const cookies = new Cookies();
const keyUserCookies: any = process.env.MOVIE_AUTH_USER;
enum StringEnum {
  success = 'success',
  error = 'error',
}
const ContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  //hook
  const [user, setUser] = useState<any>(() => cookies.get(keyUserCookies) ?? null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<{
    popup: string;
    isShow: boolean;
    srcTrailer?: string;
  }>({
    popup: '',
    isShow: false,
    srcTrailer: '',
  });
  // Header
  const [dataMenu, setDataMenu] = useState<MenuGenresAndRegions>({
    category: [],
    regions: [],
    typeMovie: [],
  });
  //firebase
  const userCollection = collection(db, 'users');
  const handleLoginGG = async () => await signInWithRedirect(auth, googleProvider);
  const handleLoginTW = async () => await signInWithRedirect(auth, twitterProvider);
  const handleAppSignOut = async () => {
    if (!user) return;
    cookies.remove(keyUserCookies);
    setUser(null);
    setCurrentUser(null);
    await signOut(auth);
  };
  // Loading app
  const handleLoading = (boolean: boolean) => setIsLoading(boolean);
  // show popup
  const handleShowPopup = (popup: string, srcTrailer?: string) =>
    setShowPopup({ popup: popup, isShow: !showPopup.isShow, srcTrailer: srcTrailer ? srcTrailer : '' });
  // data header
  useEffect(() => {
    (async () => {
      const [resCategory, resRegions, resTypeMovie] = await Promise.all([
        getCategoryAndRegions('data-the-loai'),
        getCategoryAndRegions('data-quoc-gia'),
        getCategoryAndRegions('data-loai-phim'),
      ]);
      setDataMenu({
        category: resCategory,
        regions: resRegions,
        typeMovie: resTypeMovie.filter((item: any) => item.type !== 'Việt Nam'),
      });
    })();
  }, []);
  // check user login
  console.log(user);
  useEffect(() => {
    const checkLoginResult = async () => {
      try {
        const responseUser = await getRedirectResult(auth);
        if (!responseUser) return;
        const currentMonth = expirationDate.getMonth();
        expirationDate.setMonth(currentMonth + 1);
        if (expirationDate.getMonth() === currentMonth) {
          expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        }
        cookies.set(keyUserCookies, responseUser.user, { expires: expirationDate });
        setUser(responseUser.user);
        // => add các trường để lưu thông tin theo user
        const data = await getDocs(userCollection);
        const userData = data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        const isUser = userData.some((user) => user.id === auth.currentUser?.uid);
        if (!isUser) {
          await setDoc(doc(db, 'users', auth.currentUser?.uid as string), {
            userName: auth.currentUser?.displayName as string,
            email: auth.currentUser?.email as string,
            avatar: auth.currentUser?.photoURL as string,
            loveMovie: [], // theo doi movie
            historyMovie: [], // lịch sử xem phim
            // loveMusic: [], // theo doi song music
            // createPlayList: [], // [ lồng arr để lưu các play list khác nhau[] ] // tu tao play list cho rieng minh
            // followMv: [], // theo doi video
            // followAlbum: [], // theo doi album
            // followArtist: [], // theo doi nghe si
            // historyMv: [], // lich su xem mv
            // historyPlaylist: [], // lịch sử nghe bài hát trong play list đó
            // uploadAudio: [], // uploadAudio
          });
        }
      } catch (error) {
        console.error('Error getting redirect result: ', error);
      }
    };

    checkLoginResult();
  }, []);
  // database firebase
  useEffect(() => {
    const getUser = async () => {
      try {
        if (!!user) {
          if (user?.uid) {
            const docRef = doc(db, 'users', user?.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setCurrentUser(data);
          }
        }
      } catch (error) {
        console.error(error);
        console.log('loi');
      }
    };
    getUser();
    // eslint-disable-next-line
    //  appCallBack,
  }, [user]);
  const handleShowToast = (message: string, type: string) => {
    if (type === StringEnum.success) {
      toast.success(message);
    }
    if (type === StringEnum.error) {
      toast.error(message);
    }
  };
  const handleToggleMovie = useCallback(
    async (movie: any) => {
      const isMovieLove = currentUser?.loveMovie.some((item: any) => item.id === movie.id);
      if (!user) {
        handleShowToast('Vui lòng đăng nhập để thực hiện chức năng này', StringEnum.error);
        return;
      }
      const userDoc = doc(db, 'users', user?.uid);
      if (isMovieLove) {
        const newLoveMovie = currentUser?.loveMovie.filter(({ id }: { id: number }) => id !== movie.id);
        await updateDoc(userDoc, {
          loveMovie: newLoveMovie,
        }).then(() => {
          setCurrentUser({ ...currentUser, loveMovie: [...newLoveMovie] });
          handleShowToast('đã xóa phim khỏi danh sách yêu thích', StringEnum.success);
        });
        return;
      }
      await updateDoc(userDoc, {
        loveMovie: arrayUnion({ ...movie }),
      }).then(() => {
        setCurrentUser({ ...currentUser, loveMovie: [...currentUser.loveMovie, { ...movie }] });
        handleShowToast('đã thêm phim vào danh sách yêu thích', StringEnum.success);
      });
    },
    [user, currentUser, typeToast]
  );
  console.log(currentUser);

  return (
    <ContextApp.Provider
      value={{
        // user
        isAuthenticated: !!user,
        user: user,
        currentUser: currentUser,
        //state
        showPopup,
        isLoading,
        // data
        headerData: { ...dataMenu },
        // handle
        handle: {
          // login
          onLoginGG: handleLoginGG,
          onLoginTW: handleLoginTW,
          onAppSignOut: handleAppSignOut,
          // loading
          onLoading: handleLoading,
          // popup
          onShowToast: handleShowToast,
          onShowPopup: handleShowPopup,
          // add database
          onToggleMovie: handleToggleMovie,
        },
      }}>
      {children}
    </ContextApp.Provider>
  );
};
export default ContextProvider;
export const useApp = () => useContext(ContextApp);
