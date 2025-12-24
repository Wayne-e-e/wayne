import axios from 'axios'


// 模拟商品数据
const mockProducts = [
  { 
    id: 1, 
    name: 'iPhone 15', 
    image: '/iphone15.png',
    price: 5999, 
    category: 'phone', 
    stock: 10,
    comments: [
      {
        id: 101,
        userId: 'u1',
        username: '张三',
        rating: 5,
        content: '音质超棒，佩戴舒适！',
        createdAt: '2025-12-10'
      },
      {
        id: 102,
        userId: 'u4',
        username: '李思思',
        rating: 4,
        content: '拍照确实强，但电池续航一般。',
        createdAt: '2025-12-15'
      },
      {
        id: 103,
        userId: 'u7',
        username: '王工',
        rating: 5,
        content: '系统流畅，用了一周非常满意！',
        createdAt: '2025-12-18'
      }
    ]
  },
  { 
    id: 2, 
    name: 'MacBook Pro', 
    image: '/MacBookPro.png',
    price: 12999, 
    category: 'laptop', 
    stock: 5,
    comments: [
      {
        id: 201,
        userId: 'u2',
        username: '开发者小陈',
        rating: 5,
        content: 'M3芯片太强了，编译速度飞快！',
        createdAt: '2025-12-12'
      },
      {
        id: 202,
        userId: 'u5',
        username: '设计师阿琳',
        rating: 5,
        content: '屏幕色彩精准，做图毫无压力。',
        createdAt: '2025-12-20'
      }
    ]
  },
  { 
    id: 3, 
    name: 'AirPods Pro', 
    image: '/AirPodsPro.png',
    price: 1899, 
    category: 'audio', 
    stock: 20,
    comments: [
      {
        id: 301,
        userId: 'u3',
        username: '音乐爱好者',
        rating: 5,
        content: '主动降噪效果惊艳，通勤必备！',
        createdAt: '2025-12-08'
      },
      {
        id: 302,
        userId: 'u6',
        username: '学生党小刘',
        rating: 4,
        content: '音质不错，就是价格有点小贵。',
        createdAt: '2025-12-19'
      }
    ]
  },
  { 
    id: 4, 
    name: 'iPad Air', 
    image: '/iPadAir.png',
    price: 4599, 
    category: 'tablet', 
    stock: 8,
    comments: [
      {
        id: 401,
        userId: 'u8',
        username: '插画师小雨',
        rating: 5,
        content: '配合 Apple Pencil 画画太爽了！',
        createdAt: '2025-12-16'
      }
    ]
  }
]

const mockUser = { id: 1, username: 'user123', level: 'Gold', points: 1200 }

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    if (username === 'user' && password === '123') {
      resolve({ token: 'fake-jwt-token', user: mockUser })
    } else {
      reject(new Error('用户名或密码错误'))
    }
  })
}

  export const getProducts = () => Promise.resolve(mockProducts)
  export const getProductById = (id) => Promise.resolve(mockProducts.find(p => p.id == id))
  export const submitOrder = (orderData) => Promise.resolve({ orderId: Date.now() })
  export const getOrders = () => Promise.resolve([
    { id: 1001, total: 7898, status: '已支付', items: [mockProducts[0], mockProducts[2]] }
  ])