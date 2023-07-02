import { wrapper } from '@/store';
import { setToken } from '@/store/slices/auth/auth';

export default function Home({ token }: { token: string }) {
  return (
    <div>
      <h1>Template for Next.js app</h1>
      <h2>Token: {token}</h2>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(({ getState, dispatch }) => async () => {
  dispatch(setToken('token_from_server_side'));
  const token = getState().auth.token;

  return {
    props: { token },
  };
});
