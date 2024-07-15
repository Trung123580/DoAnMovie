'use client';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { useApp } from '@/context/ContextProvider';
import DetailsBanner from '@/layout/DetailsBanner';
import {
  addLikesComment,
  addLikesReplyComment,
  createComment,
  createReplyComment,
  deleteComment,
  deleteReplyComment,
  editComment,
  editReplyComment,
  getCategoryAndRegions,
  getComments,
  getDetailsMovie,
  getDirector,
  getEpisodesMovie,
  getRelatedMovies,
  getViews,
  updateViews,
} from '@/service';
import { usePathname, useSearchParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuid } from 'uuid';
import { Autoplay } from '@/utils/moduleSwiper';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { popup, typeToast } from '@/utils/constants';
import TitlePath from '@/components/TitlePath';
import Comments from '@/components/Comment';
import { checkVulgarWord, convertJson } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import CardProduct from '@/components/CardProduct';
enum numberPage {
  zero,
  one,
  two,
  three,
  four,
}
const date = new Date();
const Details = ({ slug, dataComment }: { slug: string; dataComment: comment }) => {
  const router = useRouter();
  const [dataDetailMovie, setDataDetailMovie] = useState<any>(null);
  const [dataRelated, setDataRelated] = useState<any>([]);
  const [dataMovie, setDataMovie] = useState<any>([]);
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false);
  const refMovie = useRef<any>(null);
  const refSwiper = useRef<any>(null);
  // comment
  const [comments, setComments] = useState<any>(() =>
    dataComment.length
      ? dataComment.map((it) => ({
          ...it,
          usersLike: convertJson(String(it.usersLike).replace(/'/g, '"')),
          repComments: it?.repComments.length
            ? it.repComments.map((item: itemComment) => {
                return {
                  ...item,
                  usersLike: convertJson(String(item.usersLike).replace(/'/g, '"')),
                };
              })
            : [],
        }))
      : []
  );
  const [idShowPopupComment, setIdShowPopupComment] = useState(0);
  const [idEditComment, setIdEditComment] = useState(0);
  // hidden comment
  const [listHiddenComment, setListHiddenComment] = useState<number[]>([]);
  const [replyIdComment, setReplyIdComment] = useState(0);
  const [isPending, startPending] = useTransition();
  //replayComment
  const [idShowPopupReplyComment, setIdShowPopupReplyComment] = useState(0);
  const [idEditReplyComment, setIdEditReplyComment] = useState(0);
  const [listHiddenReplyComment, setListHiddenReplyComment] = useState<number[]>([]);
  // sort
  const [typeSortComment, setTypeSortComment] = useState('newest');
  const {
    user,
    isAuthenticated,
    currentUser,
    handle: { onLoading, onShowPopup, onShowToast, onToggleMovie, onAddHistory },
  }: any = useApp();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const searchPractice: number | null = Number(searchParams.get('tap') ?? numberPage.one);
  useEffect(() => {
    (async () => {
      onLoading(true);
      updateViews({ slug }); // update
      const [response, dataCategory, dataRegions, countViews] = await Promise.all([
        getDetailsMovie(slug),
        getCategoryAndRegions('data-the-loai'),
        getCategoryAndRegions('data-quoc-gia'),
        getViews({ slug }),
      ]);
      if (!response.data?.length) return;
      const detailValue = response.data[numberPage.zero];
      setDataDetailMovie({
        ...detailValue,
        slugMovies: dataCategory.filter((item: any) => detailValue.category_ids.split(',').some((it: string) => Number(it) === Number(item.id))),
        slugRegions: dataRegions.filter((item: any) => detailValue.region_ids.split(',').some((it: string) => Number(it) === Number(item.id))),
        fillEpisodes:
          detailValue?.episode_current === 'Full'
            ? 1
            : detailValue.status === 'completed' || detailValue.status === 'ongoing'
            ? detailValue?.episode_total.split(' ')[0]
            : String(detailValue?.episode_current).split(' ')[1],
        totalViews: countViews?.views ?? 0,
      });
      onLoading(false);
    })();
  }, [slug]);
  // call episodes
  // phim le type single
  // phim tap series
  console.log(dataDetailMovie);
  useEffect(() => {
    if (dataDetailMovie && currentUser) onAddHistory(dataDetailMovie, currentUser);
  }, [dataDetailMovie, currentUser, slug]);
  const isCheckPackage = currentUser?.historyPay.length;
  useEffect(() => {
    if (!dataDetailMovie) return;
    (async () => {
      const checkMovie = dataDetailMovie.type === 'single';
      setIsLoadingVideo(true);
      if (!isCheckPackage && searchPractice > 2) {
        router.back();
        return;
      }
      const resMovie = await getEpisodesMovie(slug, checkMovie ? 'full' : searchPractice);
      setDataMovie(resMovie.data);
      setIsLoadingVideo(false);
      if (Number(searchPractice) !== 1 && !!refMovie.current) {
        refMovie.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    })();
  }, [dataDetailMovie, searchPractice, refMovie.current, isCheckPackage]);
  useEffect(() => {
    if (!dataDetailMovie) return;
    const MAX_ITEM = 24;
    const dataCategory = dataDetailMovie.slugMovies;
    (async () => {
      const maxCount = Math.round(MAX_ITEM / dataCategory.length);
      const dataResultRelated = await dataCategory.reduce(async (accPromise: any, item: any) => {
        const relatedMovies = await getRelatedMovies(item.cate_slug, maxCount);
        const acc = await accPromise; // acc la 1 promise cần await chuyển đổi promise thành dữ liệu js
        return [...acc, ...relatedMovies];
      }, Promise.resolve([]));
      const filterMovieId = Array.from(new Set(dataResultRelated.map((movie: any) => movie.id))); // set lọc ra các id trùng nhau lấy 1 => 1 [] chỉ lưu các id
      const filterMovie = filterMovieId.map((movieId) => dataResultRelated.find((movie: any) => movie.id === movieId));
      // random movie
      setDataRelated(
        filterMovie.sort(function () {
          return 0.5 - Math.random();
        })
      );
    })();
  }, [dataDetailMovie, slug]);

  const fillEpisodes = Array(Number(dataDetailMovie?.fillEpisodes ?? 1)).fill(0);
  //swiper
  const handleNext = useCallback(() => {
    if (refSwiper.current) refSwiper.current?.swiper.slidePrev();
  }, [refSwiper.current]);

  const handlePrev = useCallback(() => {
    if (refSwiper?.current) refSwiper.current?.swiper.slideNext();
  }, [refSwiper.current]);

  //Comments
  const handleReset = () => {
    setIdShowPopupComment(0);
    setIdEditComment(0);
    //rep
    setIdShowPopupReplyComment(0);
  };
  // add comment
  const handleAddComment = async (e: any) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const value = fromData.get('comment');
    if (!isAuthenticated) {
      onShowToast('vui lòng đăng nhập để comment', typeToast.error);
      e.target.reset();
      return;
    }
    if (!value) {
      onShowToast('vui lòng nhập nội dung comment', typeToast.error);
      e.target.reset();
      return;
    }
    if (checkVulgarWord(String(value))) {
      onShowToast('vui lòng nhập nội dung không chứa các từ ngữ thô tục', typeToast.error);
      e.target.reset();
      return;
    }
    const data = {
      uid: user?.uid,
      slug: slug,
      name: user?.displayName,
      content: value,
      avatar: user?.photoURL,
      likes: 0,
      usersLike: [],
      date: date,
    };
    startPending(async () => {
      const isRes: any = await createComment({ ...data });
      const responseComment = await getComments(slug);
      if (isRes && responseComment.length) setComments(responseComment);
    });
    e.target.reset();
  };

  // edit comment
  const handleEditComment = async (e: any, id: number, idUser: string) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const value = fromData.get('editComment');

    if (!value) {
      onShowToast('vui lòng nhập nội dung commnet', typeToast.error);
      return;
    }
    if (user?.uid === idUser) {
      startPending(async () => {
        const isRes: any = await editComment(id, `${value}`, date);
        if (isRes) {
          setComments(
            [...comments].map((comment) => {
              return {
                ...comment,
                content: comment.id === id ? value : comment.content,
                date: comment.id === id ? date : comment.date,
              };
            })
          );
        }
        onShowToast('Sửa bình luận thành công', typeToast.success);
        handleReset();
      });
    }
  };
  // deleteComment
  const handleDeleteComment = async (id: number, idUser: string) => {
    if (!isAuthenticated) {
      onShowToast('bạn không có quyền xóa comment này', typeToast.error);
      return;
    }
    if (user?.uid === idUser) {
      // check user
      const isDelete = await deleteComment(id);
      if (isDelete) {
        setComments((prev: comment) => prev.filter((item) => item.id !== id));
      }
    } else {
      onShowToast('comment này không phải của bạn', typeToast.error);
      setIdShowPopupComment(0);
    }
  };
  // likes comment
  const handleLikesComment = async (id: number, uid: string) => {
    const isCheckLike = comments.some((item: itemComment) => item.id === id && item.usersLike.includes(uid));
    if (!isAuthenticated) {
      onShowToast('Vui lòng đăng nhập để thích bình luận', typeToast.error);
      return;
    }
    if (isCheckLike) {
      const isAddLike = await addLikesComment(id, uid);
      if (isAddLike) {
        setComments(
          [...comments].map((comment) => {
            return {
              ...comment,
              usersLike: comment.id === id ? [...comment.usersLike].filter((item) => item !== uid) : comment.usersLike,
              likes: comment.id === id ? --comment.likes : comment.likes,
            };
          })
        );
      }
      return;
    }
    const isAddLike = await addLikesComment(id, uid);
    if (isAddLike) {
      setComments(
        [...comments].map((comment) => {
          return {
            ...comment,
            usersLike: comment.id === id ? [...comment.usersLike, uid] : comment.usersLike,
            likes: comment.id === id ? ++comment.likes : comment.likes,
          };
        })
      );
    }
  };
  const handleShowPopupComment = (id: number) => {
    if (id === Number(idShowPopupComment)) {
      handleReset();
      return;
    }
    setIdShowPopupComment(id);
    setReplyIdComment(0);
    setIdEditComment(0);
    setIdShowPopupReplyComment(0);
  };
  const handleShowReplyComment = (id: number) => {
    if (!isAuthenticated) {
      onShowToast('vui lòng đăng nhập để comment', typeToast.error);
      return;
    }
    if (id === Number(replyIdComment)) {
      handleReset();
      setReplyIdComment(0);
      return;
    }
    handleReset();
    setReplyIdComment(id);
  };
  const handleShowEditComment = (id: number, idUser: string) => {
    if (!isAuthenticated) {
      onShowToast('bạn không có quyền sửa comment này', typeToast.error);
      return;
    }
    if (user?.uid !== idUser) {
      onShowToast('comment này không phải của bạn', typeToast.error);
      handleReset();
      return;
    }
    setIdShowPopupComment(0);
    setIdEditComment(id);
  };
  // hidden comment
  const handleHiddenComment = (idComment: number) => {
    if (listHiddenComment.includes(idComment)) {
      setListHiddenComment((prev) => [...prev].filter((item) => item !== idComment));
      handleReset();
      return;
    }
    setListHiddenComment((prev) => [...prev, idComment]);
    handleReset();
  };

  // add replyComment
  const handleAddReplyComment = async (e: any, id: number) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const value = fromData.get('replyComment');
    if (!value) {
      onShowToast('vui lòng nhập nội dung commnet', typeToast.error);
      e.target.reset();
      return;
    }
    if (checkVulgarWord(String(value))) {
      onShowToast('vui lòng nhập nội dung không chứa các từ ngữ thô tục', typeToast.error);
      e.target.reset();
      return;
    }
    const data = {
      idRep: id,
      uid: user?.uid,
      slug: slug,
      name: user?.displayName,
      content: value,
      avatar: user?.photoURL,
      likes: 0,
      usersLike: [],
      date: date,
    };
    startPending(async () => {
      const isRes: any = await createReplyComment({ ...data });
      if (isRes) {
        const responseComment = await getComments(slug);
        if (responseComment.length) setComments(responseComment); // Cập nhật comments với dữ liệu mới từ API
      }
    });
    e.target.reset();
    setReplyIdComment(0);
  };
  // deleteReplyComment
  const handleDeleteReplyComment = async (id: number, idUser: string) => {
    if (user?.uid === idUser) {
      // check user
      const isDelete = await deleteReplyComment(id);
      if (isDelete) {
        setComments(
          [...comments].map((comment) => {
            return {
              ...comment,
              repComments: [...comment.repComments].filter((item) => item.id !== id),
            };
          })
        );
      }
    } else {
      onShowToast('comment này không phải của bạn', typeToast.error);
      setIdShowPopupComment(0);
      setIdShowPopupReplyComment(0);
    }
  };
  const handleShowPopupReplyComment = (id: number) => {
    if (id === Number(idShowPopupReplyComment)) {
      handleReset();
      return;
    }
    setIdShowPopupReplyComment(id);
    setIdEditReplyComment(0);
    setReplyIdComment(0);
    setIdEditComment(0);
    setIdShowPopupComment(0);
  };
  const handleShowEditReplyComment = (id: number, idUser: string) => {
    if (user?.uid !== idUser) {
      onShowToast('comment này không phải của bạn', typeToast.error);
      handleReset();
      return;
    }
    setIdEditReplyComment(id);
    setIdShowPopupComment(0);
    setIdShowPopupReplyComment(0);
  };
  // edit comment
  const handleEditReplyComment = async (e: any, id: number, idUser: string) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const value = fromData.get('editComment');
    if (!value) {
      onShowToast('vui lòng nhập nội dung commnet', typeToast.error);
      return;
    }
    if (user?.uid === idUser) {
      startPending(async () => {
        const isRes: any = await editReplyComment(id, `${value}`, date);
        if (isRes) {
          setComments(
            [...comments].map((comment) => {
              return {
                ...comment,
                repComments: [...comment.repComments].map((item) => {
                  return {
                    ...item,
                    date: item.id === id ? date : item.date,
                    content: item.id === id ? value : item.content,
                  };
                }),
              };
            })
          );
        }
        onShowToast('Sửa bình luận thành công', typeToast.success);
        setIdEditReplyComment(0);
        handleReset();
      });
    }
  };
  const handleHiddenReplyComment = (idComment: number) => {
    if (listHiddenReplyComment.includes(idComment)) {
      setListHiddenReplyComment((prev) => [...prev].filter((item) => item !== idComment));
      handleReset();
      return;
    }
    setListHiddenReplyComment((prev) => [...prev, idComment]);
    handleReset();
  };
  const handleLikesReplyComment = async (id: number, uid: string) => {
    const isCheckLike = comments.some((item: itemComment) => {
      return item.repComments.some((item: itemComment) => item.id === id && item.usersLike.includes(uid));
    });
    if (!isAuthenticated) {
      onShowToast('Vui lòng đăng nhập để sử dụng chức năng này', typeToast.error);
      return;
    }
    if (isCheckLike) {
      const isAddLike = await addLikesReplyComment(id, uid);
      if (isAddLike) {
        setComments(
          [...comments].map((comment) => {
            return {
              ...comment,
              repComments: comment.repComments.map((item: itemComment) => {
                return {
                  ...item,
                  usersLike: item.id === id ? [...item.usersLike].filter((idUSer) => idUSer !== uid) : item.usersLike,
                  likes: item.id === id ? --item.likes : item.likes,
                };
              }),
            };
          })
        );
      }
      return;
    }
    const isAddLike = await addLikesReplyComment(id, uid);
    if (isAddLike) {
      setComments(
        [...comments].map((comment) => {
          return {
            ...comment,
            repComments: comment.repComments.map((item: itemComment) => {
              return {
                ...item,
                usersLike: item.id === id ? [...item.usersLike, uid] : item.usersLike,
                likes: item.id === id ? ++item.likes : item.likes,
              };
            }),
          };
        })
      );
    }
  };
  // sort
  const handleChangeSortComment = (e: any) => setTypeSortComment(e.currentTarget.value);
  useEffect(() => {
    if (typeSortComment === 'newest') {
      setComments(
        [...comments].sort((a, b) => {
          if (a.date > b.date) return 1;
          if (a.date < b.date) return -1;
          return 0;
        })
      );
      return;
    }
    if (typeSortComment === 'oldest') {
      setComments(
        [...comments].sort((a, b) => {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        })
      );
      return;
    }
    if (typeSortComment === 'featured') {
      setComments(
        [...comments].sort((a, b) => {
          if (a.likes > b.likes) return -1;
          if (a.likes < b.likes) return 1;
          return 0;
        })
      );
      return;
    }
  }, [typeSortComment]);
  const disableEpisode = (index: number) => {
    const checkMovie = dataDetailMovie.type === 'single';
    if (isCheckPackage) {
      return true;
    }
    if (checkMovie) {
      return true;
    }
    if (!checkMovie) {
      return index > 1 ? false : true;
    }
  };

  const handleMouseEnter = () => {
    if (refSwiper.current && refSwiper.current.swiper) {
      refSwiper.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (refSwiper.current && refSwiper.current.swiper) {
      refSwiper.current.swiper.autoplay.start();
    }
  };

  const optionComment = {
    data: comments,
    user: user,
    isPending,
    // comment
    onAddComment: handleAddComment,
    idShowPopupComment,
    onShowPopupComment: handleShowPopupComment,
    onDeleteComment: handleDeleteComment,
    onAddReplyComment: handleAddReplyComment,
    idEditComment,
    onEditComment: handleEditComment,
    onShowEditComment: handleShowEditComment,
    onHiddenComment: handleHiddenComment,
    listHiddenComment,
    onLikesComment: handleLikesComment,
    onShowReplyComment: handleShowReplyComment,
    replyIdComment,
    // ReplyComment
    idShowPopupReplyComment,
    idEditReplyComment,
    listHiddenReplyComment,
    onDeleteReplyComment: handleDeleteReplyComment,
    onShowPopupReplyComment: handleShowPopupReplyComment,
    onShowEditReplyComment: handleShowEditReplyComment,
    onEditReplyComment: handleEditReplyComment,
    onHiddenReplyComment: handleHiddenReplyComment,
    onLikesReplyComment: handleLikesReplyComment,
    // sort
    onChangeSortComment: handleChangeSortComment,
  };
  if (!dataDetailMovie) return;
  return (
    <>
      <DetailsBanner
        data={dataDetailMovie}
        onShowPopup={onShowPopup}
        popup={popup}
        findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === dataDetailMovie.id)}
        onToggleMovie={() => onToggleMovie(dataDetailMovie)}
      />
      <div className='bg-overlay py-14'>
        <div className='container'>
          <h3 className='text-base font-bold mb-4'>Vietsub #1</h3>
          <div className={`grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-12 text-center gap-2`}>
            {fillEpisodes.map((_it: any, index: number, arr: any) => {
              const callDisableEpisode = !disableEpisode(index);
              return (
                <Button
                  key={uuid()}
                  onClick={() => {
                    if (callDisableEpisode) {
                      onShowToast('vui lòng mua gói để xem tập tiếp theo', typeToast.error);
                      onShowPopup(popup.packages);
                      return;
                    }
                    setIsLoadingVideo(true);
                    router.push(`${pathName}?tap=${index + numberPage.one}`);
                  }}
                  content={arr.length === 1 ? 'Full' : index + 1}
                  className={`${Number(searchPractice) === index + 1 ? '!bg-primary text-black' : ''} bg-white/5 rounded hover:bg-primary ${
                    callDisableEpisode ? 'hover:bg-white/5 hover:text-white lock' : ''
                  }  duration-200 py-1 hover:text-black`}
                />
              );
            })}
          </div>
          <div className='max-w-5xl mx-auto mt-16' ref={refMovie}>
            {isLoadingVideo ? (
              <div className='animate-pulse bg-white/5  w-full aspect-video overflow-hidden bg-stone-900 rounded-md relative'>
                <Loading hFull={true} />
              </div>
            ) : (
              <iframe
                allowFullScreen
                referrerPolicy='no-referrer'
                scrolling='no'
                className='w-full bg-white/5 aspect-video overflow-hidden bg-stone-900 rounded-md'
                src={dataMovie[numberPage.one]?.link ?? ''}
                frameBorder='0'
                allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
            )}
          </div>
        </div>
      </div>
      <div className='container'>
        <Comments {...optionComment} />
      </div>
      <div className='container'>
        <TitlePath title='Phim Liên Quan' onClickNext={() => handleNext()} onClickPrev={() => handlePrev()} />
        <Swiper
          ref={refSwiper}
          breakpoints={{
            200: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            360: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            728: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            984: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1248: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={20}
          loop={true}
          keyboard={true}
          rewind={true}
          noSwiping={true}
          slidesPerView={4}
          autoplay={{
            delay: 5000,
          }}
          modules={[Autoplay]}>
          {dataRelated.map((movie: any) => (
            <SwiperSlide key={movie?.movie_id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <CardProduct
                data={movie}
                onToggleMovie={() => onToggleMovie(movie)}
                findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === movie.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Details;
