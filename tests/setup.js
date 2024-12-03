import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// useNotification mock
vi.mock('../src/contexts/Notification/useNotification', () => ({
  default: () => ({
    addNotification: vi.fn(),
  }),
}));

// useAuth mock
vi.mock('../src/contexts/Auth/useAuth', () => ({
  default: () => ({
    token: 'mock-token',
    user: { user_id: 1, full_name: 'Mock User' },
  }),
}));

// useLoader mock
vi.mock('../src/contexts/Loader/useLoader', () => ({
  default: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
}));

// useModal mock

vi.mock('../src/contexts/Modal/useModal', () => ({
  default: () => ({
    openModal: vi.fn(),
    closeModal: vi.fn(),
    modalData: null,
  }),
}));

// useProfileData mock
vi.mock('../src/hooks/useProfileData', () => ({
  default: (followerid) => ({
    profileUser: {
      user_id: followerid || 1,
      full_name: 'Mocked Profile User',
      avatar_url: '/mock-avatar.png',
    },
    isFollowerProfile: false,
  }),
}));

// usePosts mock
vi.mock('../src/hooks/usePosts', () => ({
  default: () => ({
    posts: [
      { post_id: 1, post_content: 'Mock Post 1', author_name: 'User 1' },
      { post_id: 2, post_content: 'Mock Post 2', author_name: 'User 2' },
    ],
    setPosts: vi.fn(),
  }),
}));
