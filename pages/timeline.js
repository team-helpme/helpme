import { NextAuth } from 'next-auth/client';
import { components } from '../components/timeLine';

const { TimeLine } = components;

TimeLine.getInitialProps = async function ({ req }) {
    const props = await ({ req });
    props.linkedAccounts = await NextAuth.linked({ req });
    console.log(props);
};
export default TimeLine;
