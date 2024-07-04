'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider, twitterProvider } from '@/app/fireBase-config';
import { signInWithRedirect, signInWithPopup, getRedirectResult, signOut } from 'firebase/auth';
import Cookies from 'universal-cookie';
import { doc, collection, getDocs, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { getCategoryAndRegions, paymentMomo } from '@/service';
import { toast } from 'react-toastify';
import { comboList, popup, typeToast } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
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
  const router = useRouter();
  //hook
  const [user, setUser] = useState<any>(() => cookies.get(keyUserCookies) ?? null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<{
    popup: string;
    isShow: boolean;
    srcTrailer?: string;
    infoPay?: any;
    dataPopupYesNo?: any;
  }>({
    popup: '',
    isShow: false,
    srcTrailer: '',
    infoPay: null,
    dataPopupYesNo: null,
  });
  // Header
  const [dataMenu, setDataMenu] = useState<MenuGenresAndRegions>({
    category: [],
    regions: [],
    typeMovie: [],
    topMovies: [],
  });
  //firebase
  const userCollection = collection(db, 'users');
  const handleLoginGG = async () => {
    try {
      const responseUser = await signInWithPopup(auth, googleProvider);
      if (!responseUser) return;
      const currentMonth = expirationDate.getMonth();
      expirationDate.setMonth(currentMonth + 1);
      if (expirationDate.getMonth() === currentMonth) {
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }
      cookies.set(keyUserCookies, responseUser.user, { expires: expirationDate });
      setUser(responseUser.user);
      handleShowPopup();
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
          historyPay: [], // lịch sử thanh toán
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
  const handleLoginTW = async () => {
    try {
      const responseUser = await signInWithPopup(auth, twitterProvider);
      if (!responseUser) return;
      const currentMonth = expirationDate.getMonth();
      expirationDate.setMonth(currentMonth + 1);
      if (expirationDate.getMonth() === currentMonth) {
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }
      cookies.set(keyUserCookies, responseUser.user, { expires: expirationDate });
      setUser(responseUser.user);
      handleShowPopup();
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
          historyPay: [], // lịch sử thanh toán
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
  const handleShowPopup = (popup?: string, srcTrailer?: string, infoPay?: any, dataPopupYesNo?: any) =>
    setShowPopup({
      popup: popup as string,
      isShow: !showPopup.isShow,
      dataPopupYesNo: dataPopupYesNo ?? null,
      infoPay: infoPay ?? null,
      srcTrailer: srcTrailer ? srcTrailer : '',
    });
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
        topMovies: [
          { path: '', type: 'views-tops', name: 'Lượt xem', menuLv2: [] },
          { path: '/loai-phim', type: 'views-category', name: 'loại phim', menuLv2: resTypeMovie.filter((item: any) => item.type !== 'Việt Nam') },
          { path: '/the-loai', type: 'views-regions', name: 'thể loại', menuLv2: resCategory },
          { path: '/quoc-gia', type: 'views-typeMovie', name: 'quốc gia', menuLv2: resRegions },
        ],
      });
    })();
  }, []);

  // check user login
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
            historyPay: [], // lịch sử thanh toán
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
            const date = dayjs().valueOf();
            let timeExpired: any = null;
            const checkTime = data?.historyPay.filter((pay: PayItem) => {
              // loc phim con thoi han
              if (date > pay.deadline) {
                timeExpired = pay;
                return false;
              } else {
                return true;
              }
            });
            const userDoc = doc(db, 'users', user?.uid);
            if (!!timeExpired) {
              // update lai list goi
              await updateDoc(userDoc, {
                historyPay: checkTime,
              }).then(() => {
                setCurrentUser({ ...data, historyPay: [...checkTime] });
                // handleShowToast('đã xóa phim khỏi danh asdasdasdasd sách yêu thích', StringEnum.error);
                // => showPopup hien thi thong bao da het goi nao
                // const findCombo = comboList.find((combo) => combo.type === Number(type));
                // handleShowToast(
                //   `bạn đã thành công thánh toán gói ${findCombo?.title} với giá ${findCombo?.discountMoney}` as string,
                //   StringEnum.success
                // );
                handleShowPopup(popup.info, '', {
                  ...timeExpired,
                  data: comboList.find((combo) => combo.type === Number(timeExpired?.type)),
                });
              });
              return;
            } else {
              setCurrentUser({ ...data });
            }
          }
        }
      } catch (error) {
        console.error(error);
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
  const handleToggleMovie = async (movie: any) => {
    if (!user) {
      handleShowToast('Vui lòng đăng nhập để thực hiện chức năng này', StringEnum.error);
      return;
    }
    if (currentUser) {
      const isMovieLove = currentUser?.loveMovie.some((item: any) => item.id === movie.id);
      const userDoc = doc(db, 'users', user?.uid);
      if (isMovieLove) {
        const newLoveMovie = currentUser?.loveMovie.filter(({ id }: { id: number }) => id !== movie.id);
        await updateDoc(userDoc, {
          loveMovie: newLoveMovie,
        }).then(() => {
          setCurrentUser({ ...currentUser, loveMovie: [...newLoveMovie] });
          handleShowToast('đã xóa phim khỏi danh sách yêu thích', StringEnum.error);
        });
        return;
      }
      await updateDoc(userDoc, {
        loveMovie: arrayUnion({ ...movie }),
      }).then(() => {
        setCurrentUser({ ...currentUser, loveMovie: [...currentUser.loveMovie, { ...movie }] });
        handleShowToast('đã thêm phim vào danh sách yêu thích', StringEnum.success);
      });
    }
  };
  const handleAddHistory = async (movie: any, currentUser: any) => {
    if (!user) {
      return;
    }
    const isMovieHistory = currentUser?.historyMovie.some((item: any) => Number(item.id) === Number(movie.id));
    if (isMovieHistory) {
      return;
    }
    const userDoc = doc(db, 'users', user?.uid);
    if (currentUser) {
      await updateDoc(userDoc, {
        historyMovie: arrayUnion({ ...movie }),
      }).then(() => {
        setCurrentUser({ ...currentUser, historyMovie: [...currentUser?.historyMovie, { ...movie }] });
        handleShowToast('đã thêm phim vào Lịch Sử', StringEnum.success);
      });
    }
  };
  const handleRemoveHistory = async (movie: any) => {
    if (!user) {
      return;
    }
    const userDoc = doc(db, 'users', user?.uid);
    const newHistoryMovie = currentUser?.historyMovie.filter(({ id }: { id: number }) => id !== movie.id);
    await updateDoc(userDoc, {
      historyMovie: newHistoryMovie,
    }).then(() => {
      setCurrentUser({ ...currentUser, historyMovie: [...newHistoryMovie] });
      handleShowToast('đã xóa phim khỏi lịch sử', StringEnum.success);
    });
    return;
  };

  // payment MoMo
  const handlePayMoMo = async ({
    method,
    price,
    fullname,
    type,
    title,
  }: {
    title: string;
    method: string;
    price: string;
    fullname: string;
    type: number;
  }) => {
    if (!user) {
      handleShowToast('Vui lòng đăng nhập để thực hiện tính năng này', typeToast.error);
      handleShowPopup(popup.logins);
      return;
    }
    const resMoMo = await paymentMomo({ method, price, fullname, type, title });
    const { payUrl } = resMoMo;
    if (payUrl) {
      router.push(payUrl);
    } else {
      handleShowToast('Thực hiện thanh toán đang lỗi vui lòng thực hiện lại sau', typeToast.error);
    }
  };
  const handleAddPayHistory = async (type: number, currentUser: any, payAt: number) => {
    if (!user) {
      return;
    }
    const isMovieHistory = currentUser?.historyPay.some((item: any) => item.type === type);
    if (isMovieHistory) {
      return;
    }
    if (currentUser?.historyPay.length >= 1) {
      return; // chi dx dang ky 1 goi
    }
    const data = {
      type: type,
      deadline: payAt ?? 0,
    };
    const userDoc = doc(db, 'users', user?.uid);
    if (currentUser) {
      await updateDoc(userDoc, {
        historyPay: arrayUnion({
          ...data,
        }),
      }).then(() => {
        setCurrentUser({ ...currentUser, historyPay: [...currentUser?.historyPay, { ...data }] });
        const findCombo = comboList.find((combo) => combo.type === Number(type));
        handleShowToast(`bạn đã thành công thánh toán gói ${findCombo?.title} với giá ${findCombo?.discountMoney}` as string, StringEnum.success);
      });
    }
  };
  const handleRemovePackage = async (packages: any) => {
    if (!user) {
      handleShowToast('Vui lòng đăng nhập để thực hiện chức năng này', StringEnum.error);
      return;
    }
    if (currentUser) {
      const userDoc = doc(db, 'users', user?.uid);
      const newLoveMovie = currentUser?.historyPay.filter(({ type }: { type: string }) => Number(type) !== packages.type);
      await updateDoc(userDoc, {
        historyPay: newLoveMovie,
      }).then(() => {
        setCurrentUser({ ...currentUser, historyPay: [...newLoveMovie] });
        handleShowToast(`đã hủy gói đăng ký ${packages.title}`, StringEnum.error);
        handleShowPopup();
      });
    }
  };
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
          onAddHistory: handleAddHistory,
          onRemovePackage: handleRemovePackage,
          onRemoveHistory: handleRemoveHistory,
          // Pay
          onPayMoMo: handlePayMoMo,
          onAddPayHistory: handleAddPayHistory,
        },
      }}>
      {children}
    </ContextApp.Provider>
  );
};
export default ContextProvider;
export const useApp = () => useContext(ContextApp);
