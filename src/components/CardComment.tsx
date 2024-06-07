import Button from '@/components/Button';
import { formatViToEN } from '@/utils/helpers';
import {
  AiOutlineLike,
  AiOutlineLoading3Quarters,
  AiOutlineSend,
  FaCommentSlash,
  BiReply,
  MdDeleteOutline,
  HiOutlineDotsHorizontal,
  TbEdit,
  IoClose,
} from '@/utils/icons';
import Image from 'next/image';
import Input from '@/components/Input';
const CardComment = (props: {
  comment: itemComment;
  isPending: boolean;
  onShowPopupComment?: funcProps;
  onDeleteComment?: any;
  onEditComment?: any;
  onShowEditComment?: any;
  onHiddenComment?: funcProps;
  onLikesComment?: any;
  findItemMenu?: boolean;
  findEditComment?: boolean;
  hiddenComment?: boolean;
  onShowReplyComment?: any;
  findReplyComment?: boolean;
  user?: any;
  onAddReplyComment?: any;
  activeLike?: boolean;
}) => {
  const {
    comment,
    isPending,
    onShowPopupComment,
    onDeleteComment,
    onEditComment,
    onShowEditComment,
    onHiddenComment,
    onLikesComment,
    findItemMenu,
    findEditComment,
    hiddenComment,
    onShowReplyComment,
    findReplyComment,
    user,
    activeLike,
    onAddReplyComment,
  } = props;
  return (
    <div className='flex gap-x-4'>
      <div className='md:w-14 md:h-14 md:max-w-14 md:min-w-14 w-10 h-10 max-w-10 min-w-10'>
        <Image
          width={1000}
          height={1000}
          loading='lazy'
          className='rounded-full object-contain w-full h-full aspect-[40/40]'
          src={comment?.avatar}
          alt=''
        />
      </div>
      <div className='w-full '>
        <div className='flex items-center relative'>
          <h2 className='flex-1 text-lg font-semibold font-VarelaRound line-clamp-1'>{comment?.name}</h2>
          <div className='relative mr-4'>
            <Button
              icon={findItemMenu || findEditComment ? <IoClose size={25} className='text-primary' /> : <HiOutlineDotsHorizontal size={25} />}
              className='text-3xl leading-none'
              onClick={onShowPopupComment}
            />
            {findItemMenu && (
              <div className='absolute z-40 top-full right-0 w-40 text-gray-900 bg-black border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                <Button
                  className='hover:bg-primary duration-300 hover:text-black gap-2 inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg'
                  content='Sửa bình luận'
                  onClick={onShowEditComment}
                  icon={<TbEdit size={20} />}
                />
                <Button
                  className='hover:bg-primary duration-300 hover:text-black gap-2 inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 '
                  content='Xóa bình luận'
                  onClick={onDeleteComment}
                  icon={<MdDeleteOutline size={20} />}
                />
                <Button
                  className='hover:bg-primary duration-300 hover:text-black gap-2 inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-b-lg'
                  content='Ẩn bình luận'
                  onClick={onHiddenComment}
                  icon={<FaCommentSlash size={20} />}
                />
              </div>
            )}
          </div>
        </div>
        {findEditComment ? (
          <form
            className='my-2 relative w-full flex-1 flex h-8 md:h-10 overflow-hidden rounded-lg bg-primary  inputInsetShadow'
            onSubmit={onEditComment}>
            <Input placeholder='Nhập comment' name='editComment' defaultValue={comment?.content} />
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
        ) : (
          <>
            <div className='relative '>
              <h3 className='font-medium text-md leading-6 line-clamp-6 mt-1'>{comment?.content}</h3>
              {hiddenComment && <div className='absolute top-0 h-5 bg-primary rounded-sm w-full mb-2.5 animate-pulse'></div>}
            </div>
            <div className='flex items-center mt-2 flex-wrap gap-1'>
              <div className='gap-x-5 flex-1 flex items-center flex-wrap'>
                <Button content='Trả lời' className='flex-basis flex items-center' onClick={onShowReplyComment} icon={<BiReply size={25} />} />
                <div className='flex gap-1 items-center flex-basis'>
                  <Button
                    onClick={onLikesComment}
                    content='Yêu thích'
                    className={`flex items-center gap-x-1 ${activeLike ? 'text-primary' : ''}`}
                    icon={<AiOutlineLike size={18} />}
                  />
                  <span className={`text-sm ${activeLike ? 'text-primary' : ''}`}>( {comment?.likes ?? 0} )</span>
                </div>
              </div>
              <div className='mr-4 text-sm font-semibold'>{formatViToEN(comment?.date)}</div>
            </div>
          </>
        )}
        {findReplyComment && (
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
            <form className='relative flex-1 flex h-8 md:h-10 overflow-hidden rounded-lg bg-primary inputInsetShadow' onSubmit={onAddReplyComment}>
              <Input placeholder='Nhập comment' name='replyComment' />
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
        )}
      </div>
    </div>
  );
};

export default CardComment;
