// Objective: get the sender name of the message
const getSender = (loggedUser, users) => {
 // console.log(loggedUser);
 // console.log(users);
  return (users[0]?._id===loggedUser?._id ? users[1].name : users[0].name);
}

export const getSenderFull = (loggedUser, users) => {
  // console.log(loggedUser);
  // console.log(users);
   return (users[0]._id===loggedUser._id ? users[1] : users[0]);
 }

 export const isSameSender = (messages, m, i, userId) => { // this takes messages array, current message, index of current message, and loggedin userId

  return (
    i < messages.length-1 &&
    (messages[i+1].sender._id !== m.sender._id || // next msg in not from same user
    messages[i+1].sender._id === undefined) &&
    messages[i].sender._id !== userId  // nor is the curr message from loggedin User
  );
 };

 export const isLastMessage = (messages, i , userId) => { // all of the messages, current index, adn loggedin User

// check if the current msg is the last msg and of the oppo user or not

  return (                               
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  )


 }


 export const isSameSenderMargin = (messages, m, i, userId) => { // this takes messages array, current message, index of current message, and loggedin userId

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";

};


 export const isSameUser = (messages, m, i) => { // this takes messages array, current message, index of current message, and loggedin userId
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
 };

  export default getSender


