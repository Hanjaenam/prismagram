// export const USER_FRAGMENT = `
// fragment UserParts on User {
//   id
//   username
//   email
//   firstName
//   lastName
//   bio
//   posts {
//     id
//     caption
//   }
// }
// `;

/**
 * 1. "UserParts"는 신경쓰지 않아도 된다.
 * 2. 영향을 주는 것은 on "User"이것 뿐 -> datamodel과 같은 이름으로 지정해주어야 한다.
 */
export const USER_FRAGMENT = `
  id
  username
  avatar
`;

export const COMMENT_FRAGMENT = `
  id
  text
  user {
    ${USER_FRAGMENT}
  }
`;

export const FILES_FRAGMENT = `
  id
  url
`;

export const MESSAGE_FRAGMENT = `
id
text
to{
  ${USER_FRAGMENT}
}
from{
  ${USER_FRAGMENT}
}
`;

export const ROOM_FRAGMENT = `
fragment RoomParts on Room {
  id
  participants {
    ${USER_FRAGMENT}
  }
  messages {
    ${MESSAGE_FRAGMENT}
  }
}
`;
