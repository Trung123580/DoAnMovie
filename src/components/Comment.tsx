import Button from '@/components/Button';
import CardComment from '@/components/CardComment';
import Input from '@/components/Input';
import { AiOutlineSend, AiOutlineLoading3Quarters } from '@/utils/icons';
import Image from 'next/image';

const Comments = (props: {
  data: comment;
  user: any;
  onAddComment: any;
  isPending: boolean;
  idShowPopupComment: number;
  onShowPopupComment: funcProps;
  onDeleteComment: (id: number, idUser: string) => void;
  onEditComment: any;
  idEditComment: number;
  onShowEditComment: any;
  onHiddenComment: funcProps;
  listHiddenComment: number[];
  onLikesComment: func2Props;
  onShowReplyComment: funcProps;
  onAddReplyComment: any;
  replyIdComment: number;
  // replyComment
  idEditReplyComment: number;
  idShowPopupReplyComment: number;
  listHiddenReplyComment: number[];
  onShowPopupReplyComment: funcProps;
  onDeleteReplyComment: func2Props;
  onShowEditReplyComment: func2Props;
  onEditReplyComment: any;
  onHiddenReplyComment: funcProps;
  onLikesReplyComment: func2Props;
  // sort
  onChangeSortComment: funcProps;
}) => {
  const {
    data,
    user,
    onAddComment,
    onShowPopupComment,
    isPending,
    onDeleteComment,
    onShowEditComment,
    onEditComment,
    onHiddenComment,
    onLikesComment,
    idShowPopupComment,
    idEditComment,
    listHiddenComment,
    onShowReplyComment,
    replyIdComment,
    onAddReplyComment,
    //replayComment
    idShowPopupReplyComment,
    onShowPopupReplyComment,
    onDeleteReplyComment,
    onShowEditReplyComment,
    idEditReplyComment,
    onEditReplyComment,
    onHiddenReplyComment,
    listHiddenReplyComment,
    onLikesReplyComment,
    // sort
    onChangeSortComment,
  } = props;
  // console.log('date', formatViToEN(new Date()));
  // data,
  // user,
  // onAddComment,
  // isPending,
  // idShowPopupComment,
  // onShowPopupComment,
  console.log(data);

  return (
    <div className='mt-10'>
      <div className='flex justify-between items-center'>
        <h3 className='text-2xl lg:text-3xl font-extrabold capitalize font-VarelaRound'>Bình Luận</h3>
        <div className='relative h-10 w-[140px] min-w-[120px]'>
          <select
            onChange={onChangeSortComment}
            className='peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-black px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'>
            <option value='newest'>Mới nhất</option>
            <option value='oldest'>Cũ nhất</option>
            <option value='featured'>Nổi bật</option>
          </select>
          <label className="before:content[' '] after:content[' ']  pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Sắp xếp
          </label>
        </div>
      </div>
      <div className='mt-3 flex gap-4 items-center text-xl font-bold'>
        <div className='md:w-14 md:h-14 md:max-w-14 md:min-w-14 w-10 h-10 max-w-10 min-w-10 '>
          <Image
            width={1000}
            height={1000}
            loading='lazy'
            className='rounded-full object-contain w-full h-full aspect-[40/40]'
            src={user?.photoURL ?? '/images/default-avatar.jpg'}
            alt=''
          />
        </div>
        <form className='relative flex-1 flex h-8 md:h-10 overflow-hidden rounded-lg bg-primary  inputInsetShadow' onSubmit={onAddComment}>
          <Input placeholder='Nhập comment' name='comment' />
          <div className='active:bg-primary w-12 h-full bg-white flex items-center justify-center hover:bg-white/70 cursor-pointer duration-300'>
            <Button
              icon={
                isPending ? (
                  <AiOutlineLoading3Quarters size={25} className='text-black animate-spin' />
                ) : (
                  <AiOutlineSend size={25} className='text-black' />
                )
              }
            />
          </div>
        </form>
      </div>
      <div className='flex flex-col gap-5 mt-5'>
        {!!data.length &&
          data.map((comment) => (
            <div key={comment.id}>
              <CardComment
                {...props}
                comment={comment}
                onDeleteComment={() => onDeleteComment(Number(comment.id), comment.uid)}
                onShowPopupComment={() => onShowPopupComment(Number(comment.id))}
                onShowEditComment={() => onShowEditComment(Number(comment.id), comment.uid)}
                onEditComment={(e: any) => onEditComment(e, comment.id, comment.uid)}
                onHiddenComment={() => onHiddenComment(comment.id)}
                onLikesComment={() => onLikesComment(comment.id, user.uid)}
                onShowReplyComment={() => onShowReplyComment(comment.id)}
                onAddReplyComment={(e: any) => onAddReplyComment(e, comment.id)}
                findItemMenu={comment.id === idShowPopupComment}
                findEditComment={idEditComment === comment.id}
                hiddenComment={listHiddenComment?.includes(comment.id)}
                findReplyComment={comment.id === replyIdComment}
                activeLike={comment.usersLike.includes(user?.uid)}
              />
              {!!comment.repComments?.length && (
                <div className='flex gap-4 items-center mt-2'>
                  <div className='md:w-14 md:h-14 md:max-w-14 md:min-w-14 w-10 h-10 max-w-10 min-w-10 '></div>
                  <div className='flex-1'>
                    {comment.repComments.map((item: itemComment) => (
                      <CardComment
                        key={item.id}
                        {...props}
                        comment={item}
                        onDeleteComment={() => onDeleteReplyComment(Number(item.id), item.uid)}
                        onShowEditComment={() => onShowEditReplyComment(Number(item.id), item.uid)}
                        onShowPopupComment={() => onShowPopupReplyComment(Number(item.id))}
                        onEditComment={(e: any) => onEditReplyComment(e, item.id, item.uid)}
                        onHiddenComment={() => onHiddenReplyComment(item.id)}
                        onLikesComment={() => onLikesReplyComment(item.id, user?.uid)}
                        onShowReplyComment={() => onShowReplyComment(comment.id)}
                        onAddReplyComment={(e: any) => onAddReplyComment(e, comment.id)}
                        findItemMenu={item.id === idShowPopupReplyComment}
                        findEditComment={item.id === idEditReplyComment}
                        hiddenComment={listHiddenReplyComment?.includes(item.id)}
                        activeLike={item.usersLike.includes(user?.uid)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
export default Comments;
