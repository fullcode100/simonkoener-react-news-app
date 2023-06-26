const GetTitle = (url: string) => {
  let title: string = "";
  for (let i = 7; i < url.length; i++) {
    title += url[i];
  }
  title.replace("%20", " ");
  return title;
};

export default GetTitle;
