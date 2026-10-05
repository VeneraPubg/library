export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  views: number;
  likes: number;
  isPublished: boolean;
  createdAt: Date;
  likedBy: string[];
}

export const posts: Post[] = [
  {
    id: "1",
    title:
      "В РФ начали защищать интернет от выходящих из-под контроля нейросетей",
    content:
      "Крупнейшие российские компании начали разрабатывать ИТ-продукты на основе искусственного интеллекта, в том числе системы для контроля за действиями других ИИ-агентов. Потребность в таких решениях резко выросла после того, как бизнес начал переходить от чат-ботов к автономным ИИ-программам, способным самостоятельно выполнять многошаговые задачи. Риски подобного подхода уже проявились на практике: летом сотни ИИ-агентов скоординировали атаку на крупнейшую платформу открытых нейросетей Hugging Face. Как компании будут контролировать действия автономных систем и предотвращать их сбои",
    author: "Известия",
    tags: ["ИИ", "безопасность", "нейросети"],
    views: 0,
    likes: 0,
    isPublished: true,
    createdAt: new Date(),
    likedBy: [],
  },
  {
    id: "2",
    title:
      "Настройки Windows посоветовали изменить, если ОС начала отвлекать уведомлениями",
    content:
      "Чтобы Windows не отвлекала от работы, нужно внести изменения в настройки операционной системы (ОС). Об этом сообщает издание MakeUseOf.",
    author: "Lenta.ru",
    tags: ["Windows", "настройки", "уведомления"],
    views: 0,
    likes: 0,
    isPublished: true,
    createdAt: new Date(),
    likedBy: [],
  },
  {
    id: "3",
    title: "В Москве открылся крупнейший в Европе центр киберспорта",
    content:
      "В Москве состоялось открытие нового киберспортивного центра площадью 10 тысяч квадратных метров. Центр оснащен современными компьютерами, игровыми консолями и оборудованием для проведения турниров международного уровня. В центре будут проходить соревнования по популярным играм, а также тренировки киберспортивных команд. Инвестиции в проект составили более 2 миллиардов рублей. Ожидается, что центр примет первые международные турниры уже в этом году.",
    author: "ТАСС",
    tags: ["киберспорт", "Москва", "технологии"],
    views: 0,
    likes: 0,
    isPublished: true,
    createdAt: new Date(),
    likedBy: [],
  },
];

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

export const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    content: "Мне нравится ваш пост!",
    author: "Иван Петров",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    postId: "2",
    content: "Мощно сказал!",
    author: "Алексей Смирнов",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    postId: "1",
    content: "Мне нравится ваш пост!",
    author: "Мария Иванова",
    createdAt: new Date().toISOString(),
  },
];

export interface User {
  id: string;
  username: string;
  fullName: string;
  biography?: string;
  avatarUrl?: URL | null;
  passwordHash: string;
  createdAt: string;
}

export const users: User[] = [
  {
    id: "1",
    username: "Известия",
    fullName: "Редакция газеты «Известия»",
    biography: "Российская общественно-политическая газета",
    passwordHash: "izvestia123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    username: "Lenta.ru",
    fullName: "Редакция Lenta.ru",
    biography: "Российское новостное интернет-издание",
    passwordHash: "lenta123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    username: "ТАСС",
    fullName: "Информационное агентство ТАСС",
    biography: "Российское государственное информационное агентство",
    passwordHash: "tass123",
    createdAt: new Date().toISOString(),
  },
];
