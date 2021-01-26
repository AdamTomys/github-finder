import React, {useContext} from 'react';
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from '../../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithubContext);

  const {loading, users, initData} = githubContext;

  if (loading) {
    return <Spinner/>
  }
  if (users.length === 0) {
    initData();
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} {...user}/>
        ))}
      </div>
    );
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} {...user}/>
        ))}
      </div>
    );
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rm',
}

export default Users;
