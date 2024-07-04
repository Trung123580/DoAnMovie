import axios from 'axios';
import dayjs from 'dayjs';

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const BASE_API_BANK = process.env.NEXT_PUBLIC_BASE_API_BANK;
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
// phim lien quan :cat/:number
export const getRelatedMovies = async (cat: number, count: number) => {
  try {
    const response = await axios.get(`${BASE_API}/lien-quan/${cat}/${count}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return false;
  }
};
//
export const paymentMomo = async ({ method, price, fullname, type, title }: PayMoMo) => {
  const body = {
    orderInfo: 'Thanh toán MOMO',
    method: method,
    requestType: 'payWithMethod',
    price: price,
    name: fullname,
    type: type,
    title: title,
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

// pay vnPay
export const paymentVnPay = async ({ method, price, fullname, type, title }: any) => {
  const ipAddr = await getIpAddress(); // Function to get the user's IP address
  const orderId = dayjs().format('DDHHmmss');
  const locale = 'vn'; // You can set this based on user preference or other logic
  const body = {
    orderInfo: 'Thanh toán MOMO',
    method: method,
    requestType: 'payWithMethod',
    price: price,
    name: fullname,
    type: type,
    title: title,
    language: locale,
    orderId: orderId,
    amount: price,
    bankCode: method, // Assuming method is bankCode, adjust as necessary
    ipAddr: ipAddr,
  };

  try {
    const response = await axios.post(`${BASE_API_BANK}/create_payment_url`, body, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8888',
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

const getIpAddress = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Unable to get IP address:', error);
    return '127.0.0.1'; // Fallback to localhost
  }
};
export const getViews = async ({ slug }: { slug: string }) => {
  try {
    const response = await axios.get(`${BASE_API}/views`, {
      params: { slug },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return 0;
  }
};
export const updateViews = async ({ slug }: { slug: string }) => {
  try {
    const response = await axios.put(`${BASE_API}/views`, null, { params: { slug } });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Data not found!');
    }
  } catch (error) {
    return 0;
  }
};

// top-phim
export const getTopMovies = async (page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_API}/view_sort`, {
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
export const getTopTypeMovies = async (type: string, slug: string, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_API}/view_sort_loai_phim/${type}/${slug}`, {
      params: {
        page: page,
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
// // toop-quocgia
export const getTopMoviesRegions = async (slug: string, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_API}/view_sort_quoc-gia/${slug}`, {
      params: {
        page: page,
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
// // top-loaiphim
export const getTopMoviesCategory = async (cat: string, page: number = 1) => {
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
