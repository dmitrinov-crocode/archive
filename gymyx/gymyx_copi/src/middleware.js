export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/lk/booking/:path*',
    '/lk/checkout/:path*',
    '/lk/profile/:path*',
    '/lk/guide/:path*',
    '/lk/workouts/:path*',
    '/lk/trainers/:path*',
    '/lk/login/create-profile/:path*',
  ],
};
