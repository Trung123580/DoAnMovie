import axios from 'axios';

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
export const getCatMovie = async (cat: string, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_API}/the-loai/${cat}`, {
      params: {
        page: page,
        // time: new Date().getTime(),
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};

export const getHomeMovie = async () => {
  try {
    const response = await axios.get(`${BASE_API}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};
// detail movie
export const getDetailsMovie = async (slug: string) => {
  try {
    const response = await axios.get(`${BASE_API}/detail/${slug}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};
// số tập
export const getEpisodesMovie = async (slug: string, number: number | string) => {
  try {
    const response = await axios.get(`${BASE_API}/episodes/${slug}`, {
      params: {
        number: number,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};

// the-loai === quoc-gia === loai-phim
export const getCategoryAndRegions = async (url: string) => {
  try {
    const response = await axios.get(`${BASE_API}/${url}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};

// quoc gia
export const getRegionsMovie = async (slug: string, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_API}/quoc-gia/${slug}`, {
      params: {
        page: page,
        // time: new Date().getTime(),
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};

// loai-phim
export const getTypeMovie = async (type: string, slug: string, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_API}/loai-phim/${type}/${slug}`, {
      params: {
        page: page,
        // time: new Date().getTime(),
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};

// Comments
export const getComments = async (slug: string) => {
  try {
    const response = await axios.get(`${BASE_API}/comments/${slug}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};
export const createComment = async (data: any) => {
  const body = {
    uid: data.uid,
    slug: data.slug,
    name: data.name,
    date: data.date,
    content: data.content,
    avatar: data.avatar,
    likes: data.likes ?? 0,
    usersLike: JSON.stringify([]), // list Id
  };
  try {
    const response = await axios.post(`${BASE_API}/create/comments`, body);
    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return false;
  }
};
// delete
export const deleteComment = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_API}/delete/comments`, {
      params: {
        id: id,
      },
    });
    console.log(response.status);
    if (response.status === 201) {
      return true;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return false;
  }
};
// edit comment
export const editComment = async (id: number, content: string, date: any) => {
  const body = {
    id: id,
    content: content,
    date: date,
  };
  try {
    const response = await axios.put(`${BASE_API}/update/comments`, { ...body });
    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return false;
  }
};
// like comments;
export const addLikesComment = async (id: number, idUser: string) => {
  const body = {
    id: id,
    idUser: idUser,
  };
  try {
    const response = await axios.put(`${BASE_API}/update/comment/likes`, { ...body });
    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return false;
  }
};

// replyComment
export const createReplyComment = async (data: any) => {
  const body = {
    idRep: data.idRep,
    uid: data.uid,
    slug: data.slug,
    name: data.name,
    date: data.date,
    content: data.content,
    avatar: data.avatar,
    likes: data.likes ?? 0,
    usersLike: JSON.stringify([]), // list Id
  };
  try {
    const response = await axios.post(`${BASE_API}/create/replayComment`, body);
    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return false;
  }
};
export const deleteReplyComment = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_API}/delete/replayComment`, {
      params: {
        id: id,
      },
    });
    if (response.status === 201) {
      return true;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return false;
  }
};
// edit replyComment
export const editReplyComment = async (id: number, content: string, date: any) => {
  const body = {
    id: id,
    content: content,
    date: date,
  };
  try {
    const response = await axios.put(`${BASE_API}/update/replayComment`, { ...body });
    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return false;
  }
};
//
export const addLikesReplyComment = async (id: number, idUser: string) => {
  const body = {
    id: id,
    idUser: idUser,
  };
  try {
    const response = await axios.put(`${BASE_API}/update/replayComment/likes`, { ...body });
    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return false;
  }
};

//
export const paymentMomo = async ({ method, price, fullname }: { method: string; price: number; fullname: string }) => {
  const body = {
    orderInfo: 'Thanh toán MOMO',
    method: method,
    requestType: 'payWithMethod',
    price: price.toString(),
    name: fullname,
  };
  try {
    const response = await axios.post(`${BASE_API}/payment`, body);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};

export const transactionMomo = async ({ orderId }: { orderId: string }) => {
  const body = {
    orderId: orderId,
  };
  try {
    const response = await axios.post(`${BASE_API}/transaction-status`, body);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return [];
  }
};
