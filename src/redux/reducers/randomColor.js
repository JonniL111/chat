function randomColor() {
  //(users, userColors)
  const rgb = () => Math.floor(Math.random() * 155);
  const setColor = () => `${rgb()},${rgb()},${rgb()}`;

  /* проверяем существует ли цвет пользователя, если нет то добавляем, если да то 
  обновляем массив добавляя только нового пользователя */
  /* let colors = [];
  if (userColors.length <= 0) {
    colors = users.map((user) => {
      const color = setColor();
      return { user, color };
    });
  } else {
    users.forEach((user) => {
      if (userColors.every((item) => item.user !== user)) {
        const color = setColor();
        colors = userColors.concat({ user, color });
      }
    });
  } */
  return setColor();
}

export default randomColor;
