export const truncate = (text: string): string => {
  const length = 15;
  return text && text.length > length ? `${text.substr(0, length)}...` : text;
}
