/**
 * Extracts the first 2 initials from a given name.
 * @example getNameInitials('John Doe') => 'JD'
 * @param {string} name
 * @returns {string}
 */
export const getNameInitials = (name: string) => {
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0)).slice(0, 2);
  return initials.join("");
};

export const convertImageToBase64 = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
};
